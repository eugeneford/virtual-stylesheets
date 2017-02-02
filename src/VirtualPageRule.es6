import VirtualActions from "./VirtualActions";
import VirtualStyleDeclarationRule from "./VirtualStyleDeclarationRule";

export default class VirtualPageRule extends VirtualStyleDeclarationRule {
  constructor(ruleInfo, parentRule, opts){
    super(ruleInfo, parentRule, opts);
  }

  /**
   * Parse a formatted selectorText from current VirtualPageRule
   * @returns {String}
   * @private
   */
  _parseSelectorText(){
    let bounds, selectorText;

    // Get rule head block's bounds
    bounds = this.getHead();

    // Get the head block of this rule
    selectorText = this.cssText.substring(bounds.startOffset, bounds.endOffset).trim();

    // Remove @page prefix
    selectorText = selectorText.substring(5).trim();

    return selectorText;
  }

  parse(parseType){
    super.parse(parseType);
    if (parseType === VirtualActions.PARSE_HEAD || parseType == VirtualActions.PARSE_ALL){
      this.selectorText = this._parseSelectorText();
    } else {
      this.selectorText = null;
    }
  }

  /**
   * Applies a new selectorText to current VirtualPageRule
   * @param selectorText
   */
  setSelector(selectorText){
    if (typeof selectorText !== "string") throw new TypeError("SelectorText is not a string");
    let head = this.getHead();

    let newCondition = "@page " + selectorText;

    this.patch({
      action: VirtualActions.PATCH_REPLACE,
      start: head.startOffset,
      end: head.endOffset,
      value: newCondition,
      patchDelta: newCondition.length - head.endOffset
    })
  }
}