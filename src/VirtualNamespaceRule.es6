import VirtualActions from "./VirtualActions";
import VirtualRule from "./VirtualRule.es6";

const WHITESPACE =   ' '.charCodeAt(0);
const NEW_LINE =     '\n'.charCodeAt(0);
const U_LETTER     = "u".charCodeAt(0);
const R_LETTER     = "r".charCodeAt(0);
const L_LETTER     = "l".charCodeAt(0);
const SINGLE_QUOTE = "\'".charCodeAt(0);
const DOUBLE_QUOTE = "\"".charCodeAt(0);
const LEFT_BRACE   = "(".charCodeAt(0);
const RIGHT_BRACE  = ")".charCodeAt(0);
const SLASH        = "\\".charCodeAt(0);
const MINUS         = "-".charCodeAt(0);

const CF_LETTER = function(code){
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
};

export default class VirtualNamespaceRule extends VirtualRule {
  constructor(ruleInfo, parentRule, opts){
    super(ruleInfo, parentRule, opts);
  }

  _getURIBounds(){
    let i, nextCode, secondCode, thirdCode, startOffset, endOffset, urlSpotted, prevCode, quotesCode;

    // Start parsing at 10 position skipping @namespace definition
    for(i = 10; i < this.cssText.length; i++){
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

    return {startOffset, endOffset};
  }

  _getPrefixBounds(){
    let i, nextCode, secondCode, thirdCode, prevCode, urlSpotted, quotesCode, startOffset, endOffset;

    // Start parsing at 10 position skipping @namespace definition
    for(i = 10; i < this.cssText.length; i++){
      nextCode = this.cssText.charCodeAt(i);

      // Check for url term
      if (!urlSpotted){
        if (!quotesCode && nextCode === R_LETTER && prevCode === U_LETTER){
          secondCode = this.cssText.charCodeAt(i + 1);
          thirdCode = this.cssText.charCodeAt(i + 2);
          if (secondCode === L_LETTER && thirdCode === LEFT_BRACE) {
            urlSpotted = true;
            continue;
          }
        }
      }

      // Check if " or ' was spotted without escape \
      if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
        if (!!quotesCode) {
          if (nextCode === quotesCode) quotesCode = undefined;
        } else {
          quotesCode = nextCode;
        }
      }

      // Check if url is closed
      if (!quotesCode && urlSpotted && nextCode === RIGHT_BRACE) urlSpotted = false;

      // Check for prefix started
      if (startOffset === undefined && !urlSpotted && !quotesCode && (nextCode === MINUS || CF_LETTER(nextCode))){
        startOffset = i;
      }

      // Check if prefix ended
      if (startOffset !== undefined && (nextCode === WHITESPACE || nextCode === NEW_LINE)){
        endOffset = i;
      }

      prevCode = nextCode;
    }

    if (startOffset === undefined || endOffset === undefined) return null;

    return {startOffset, endOffset};
  }

  parse(parseType){
    super.parse(parseType);
    if (parseType === VirtualActions.PARSE_HEAD || parseType == VirtualActions.PARSE_ALL) {
      let uriBounds, prefixBounds;

      uriBounds = this._getURIBounds();
      prefixBounds = this._getPrefixBounds();

      if (uriBounds) {
        this.uri = this.cssText.substring(uriBounds.startOffset, uriBounds.endOffset);

        if (prefixBounds) {
          this.prefix = this.cssText.substring(prefixBounds.startOffset, prefixBounds.endOffset);
        } else {
          this.prefix = null;
        }
      } else {
        this.uri = null;
        this.prefix = null;
      }
    } else {
      this.uri = null;
      this.prefix = null;
    }
  }

  setURI(uri){
    if (typeof uri !== "string") throw new TypeError("URI is not a string");

    let hrefBounds = this._getURIBounds(), start, end, value, oldValue;

    // Replace current location
    if (hrefBounds){
      value = uri;
      start = hrefBounds.startOffset;
      end = hrefBounds.endOffset;
      oldValue = this.cssText.substring(start, end);
    }
    // Or create completely new rule
    else {
      value = `@namespace url("${uri}");`;
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

  setPrefix(prefix){
    if (typeof prefix !== "string") throw new TypeError("URI is not a string");
    let uriBounds, prefixBounds, i, nextCode, start, end, oldValue, action, newValue;

    // If there is no uri specified - rule makes no sense
    if (uriBounds = this._getURIBounds()){
      // Replace current media string
      if (prefixBounds = this._getPrefixBounds()){
        start = prefixBounds.startOffset;
        end = prefixBounds.endOffset;
        oldValue = this.cssText.substring(start, end);
        newValue = prefix;
        action = VirtualActions.PATCH_REPLACE;
      }
      // Or create a new one
      else {
        start = 10; //Start at the end of @namespace definition
        action = VirtualActions.PATCH_INSERT;
        oldValue = "";
        newValue = " " + prefix;
      }

      this.patch({
        value: newValue,
        patchDelta: newValue.length - oldValue.length,
        start, end, action
      });
    }
  }
}