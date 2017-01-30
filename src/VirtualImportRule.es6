import VirtualActions from "./VirtualActions";
import VirtualRule from "./VirtualRule";

const U_LETTER     = "u".charCodeAt(0);
const R_LETTER     = "r".charCodeAt(0);
const L_LETTER     = "l".charCodeAt(0);
const WHITESPACE   = " ".charCodeAt(0);
const SINGLE_QUOTE = "\'".charCodeAt(0);
const DOUBLE_QUOTE = "\"".charCodeAt(0);
const LEFT_BRACE   = "(".charCodeAt(0);
const RIGHT_BRACE  = ")".charCodeAt(0);
const SLASH        = "\\".charCodeAt(0);
const SEMICOLON    = ";".charCodeAt(0);

export default class VirtualImportRule extends VirtualRule {
  constructor(ruleInfo, parentRule, opts){
    super(ruleInfo, parentRule, opts);
  }

  /**
   * Get href prop bounds of current rule
   * @returns {*}
   * @private
   */
  _getLocationBounds(){
    let i, nextCode, prevCode, secondCode, thirdCode, quotesCode, startOffset, endOffset, urlSpotted;

    // Skip @import definition, start at 7
    for (i = 7; i < this.cssText.length; i++){
      nextCode = this.cssText.charCodeAt(i);

      // Check for url term
      if (!urlSpotted){
        if (!quotesCode && nextCode === R_LETTER && prevCode === U_LETTER){
          secondCode = this.cssText.charCodeAt(i + 1);
          thirdCode = this.cssText.charCodeAt(i + 2);
          if (secondCode === L_LETTER && thirdCode === LEFT_BRACE) {
            i += 2;
            startOffset = i + 1;
            urlSpotted = true;
            continue;
          }
        }
      }

      // Check if " or ' was spotted without escape \
      if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
        if (!!quotesCode) {
          if (nextCode === quotesCode) {
            endOffset = i;
            break;
          }
        } else {
          quotesCode = nextCode;
          startOffset = i + 1;
        }
      }

      if (urlSpotted){
        if (nextCode === RIGHT_BRACE) {
          endOffset = i;
        }
      }

      prevCode = nextCode;
    }

    if (startOffset === undefined || endOffset === undefined) return null;

    return { startOffset, endOffset };
  }

  _getMediaBounds(hrefBounds){
    /*istanbul ignore if*/
    if (!hrefBounds || !hrefBounds.endOffset) return null;

    let i, startOffset, endOffset, nextCode, prevCode;

    for (i = hrefBounds.endOffset; i < this.cssText.length; i++){
      nextCode = this.cssText.charCodeAt(i);

      if (startOffset === undefined && prevCode === WHITESPACE && nextCode !== WHITESPACE) {
        startOffset = i;
      }

      if (nextCode === SEMICOLON) {
        endOffset = i;
        break;
      }

      prevCode = nextCode;
    }

    if (startOffset === undefined || endOffset === undefined) return null;

    return { startOffset, endOffset };
  }

  parse(parseType){
    super.parse(parseType);
    if (parseType === VirtualActions.PARSE_HEAD || parseType == VirtualActions.PARSE_ALL){
      let hrefBounds = this._getLocationBounds();
      if (hrefBounds) {
        let mediaBounds = this._getMediaBounds(hrefBounds);
        this.href = this.cssText.substring(hrefBounds.startOffset, hrefBounds.endOffset);
        this.media = mediaBounds ? this.cssText.substring(mediaBounds.startOffset, mediaBounds.endOffset) : null;
        return;
      }
    }
    this.href = null;
    this.media = null;
  }

  /**
   * Applies new href to current rule
   * @param href
   */
  setLocation(href){
    if (typeof href !== "string") throw new TypeError("href is not a string");
    let hrefBounds = this._getLocationBounds(), start, end, value, oldValue;

    // Replace current location
    if (hrefBounds){
      value = href;
      start = hrefBounds.startOffset;
      end = hrefBounds.endOffset;
      oldValue = this.cssText.substring(start, end);
    }
    // Or create completely new rule
    else {
      value = `@import "${href}";`;
      start = 0;
      end = this.cssText.length;
      oldValue = this.cssText;
    }

    this.patch({
      action: VirtualActions.PATCH_REPLACE,
      patchDelta: value.length - oldValue.length,
      start, end, value
    });
  }

  /**
   * Applies new media string to current rule
   * @param media
   */
  setMedia(media){
    if (typeof media !== "string") throw new TypeError("media is not a string");
    let hrefBounds, mediaBounds, i, nextCode, start, end, oldValue, action;

    // If there is no location specified - rule makes no sense
    if (hrefBounds = this._getLocationBounds()){
      // Replace current media string
      if (mediaBounds = this._getMediaBounds(hrefBounds)){
        start = mediaBounds.startOffset;
        end = mediaBounds.endOffset;
        oldValue = this.cssText.substring(start, end);
        action = VirtualActions.PATCH_REPLACE;
      }
      // Or create a new one
      else {
        for(i = hrefBounds.endOffset; i < this.cssText.length; i++){
          nextCode = this.cssText.charCodeAt(i);

          if (nextCode !== WHITESPACE && nextCode !== SINGLE_QUOTE
            && nextCode !== DOUBLE_QUOTE && nextCode !== RIGHT_BRACE){
            start = i;
            action = VirtualActions.PATCH_INSERT;
            oldValue = "";
            break;
          }
        }
      }

      this.patch({
        value: " " + media,
        patchDelta: 1 + media.length - oldValue.length,
        start, end, action
      });
    }
  }
}