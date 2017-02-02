import VirtualActions from "./VirtualActions";
import VirtualStyleDeclarationRule from "./VirtualStyleDeclarationRule";

export default class VirtualKeyframeRule extends VirtualStyleDeclarationRule{
  constructor(ruleInfo, parentRule, opts){
    super(ruleInfo, parentRule, opts);
  }

  /**
   * Parse a formatted key from current VirtualKeyframeRule
   * @returns {String}
   * @private
   */
  _parseKey(){
    let keyText, head;

    // Get head props
    head = super.getHead();

    // Get raw selector text
    keyText = this.cssText.substring(head.startOffset, head.endOffset);

    // Format selector text
    keyText = keyText.trim().replace(/\n/gi, "");

    return keyText;
  }

  /**
   * Parse additional VirtualKeyframeRule props
   * @param parseType
   */
  parse(parseType){
    super.parse(parseType);
    if (parseType === VirtualActions.PARSE_HEAD || parseType == VirtualActions.PARSE_ALL) {
      this.keyText = this._parseKey();
    } else {
      this.keyText = null;
    }
  }

  /**
   * Applies a new keyText to current VirtualKeyframeRule
   * @param keyText
   */
  setKey(keyText){
    if (typeof keyText !== "string") throw new TypeError("Your keyText is not a string");
    if (!/\d{1,3}%/.test(keyText)) throw new SyntaxError(`Unexpected keyText ${keyText}`);

    let head = super.getHead();

    this.patch({
      action: VirtualActions.PATCH_REPLACE,
      start: head.startOffset,
      end: head.endOffset,
      value: keyText,
      patchDelta: keyText.length - head.endOffset
    })
  }
}