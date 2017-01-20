import VirtualActions from "./VirtualActions";
import VirtualStyleDeclarationRule from "./VirtualStyleDeclarationRule";

export default class VirtualStyleRule extends VirtualStyleDeclarationRule{
  constructor(ruleInfo, parentRule, opts){
    super(ruleInfo, parentRule, opts);
  }

  /**
   * Parse a formatted selectorText from current VirtualStyleRule
   * @returns {String}
   * @private
   */
  _parseSelectorText(){
    let selectorText, head;

    // Get head props
    head = super.getHead();

    // Get raw selector text
    selectorText = this.cssText.substring(head.startOffset, head.endOffset);

    // Format selector text
    selectorText = selectorText.trim().replace(/\n/gi, "");

    return selectorText;
  }

  /**
   * Parse additional VirtualStyleRule props
   * @param parseType
   */
  parse(parseType){
    if (parseType === VirtualActions.PARSE_HEAD || parseType == VirtualActions.PARSE_ALL)
      this.selectorText = this._parseSelectorText();
  }

  /**
   * Applies a new selectorText to current VirtualStyleRule
   * @param selectorText
   */
  setSelector(selectorText){
    let head = super.getHead();

    this.patch({
      action: VirtualActions.PATCH_REPLACE,
      start: head.startOffset,
      end: head.endOffset,
      value: selectorText,
      patchDelta: selectorText.length - head.endOffset
    })
  }
}