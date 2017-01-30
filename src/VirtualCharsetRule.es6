import VirtualActions from "./VirtualActions";
import VirtualRule from "./VirtualRule";

const SINGLE_QUOTE = "\'".charCodeAt(0);
const DOUBLE_QUOTE = "\"".charCodeAt(0);
const SLASH        = "\\".charCodeAt(0);

export default class VirtualCharsetRule extends VirtualRule {
  constructor(ruleInfo, parentRule, opts){
    super(ruleInfo, parentRule, opts);
  }

  /**
   * Parse encoding prop from current cssText
   * @private
   */
  _parseEncoding(){
    let i, nextCode, prevCode, quotesCode, startOffset, endOffset;

    // Skip @charset definition, starting at 8
    for (i = 8; i < this.cssText.length; i++){
      nextCode = this.cssText.charCodeAt(i);

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

      prevCode = nextCode;
    }

    // Return null if encoding bounds wasnt found
    if (startOffset === undefined || endOffset === undefined) return null;

    return this.cssText.substring(startOffset, endOffset);
  }

  parse(parseType){
    super.parse(parseType);
    if (parseType === VirtualActions.PARSE_HEAD || parseType == VirtualActions.PARSE_ALL){
      this.encoding = this._parseEncoding();
    } else {
      this.encoding = null;
    }
  }

  /**
   * Applies new encoding to current rule
   * @param encoding
   */
  setEncoding(encoding){
    if (typeof encoding !== "string") throw new TypeError("Encoding is not a string");

    let newCharset = `@charset "${encoding}";`;

    this.patch({
      action: VirtualActions.PATCH_REPLACE,
      start: 0,
      end: this.cssText.length,
      value: newCharset,
      patchDelta: newCharset.length - this.cssText.length
    })
  }
}