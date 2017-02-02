import VirtualActions from "./VirtualActions.es6";
import VirtualGroupingRule from "./VirtualGroupingRule.es6";

export default class VirtualSupportsRule extends VirtualGroupingRule {
  constructor(ruleInfo, parentRule, opts){
    super(ruleInfo, parentRule, opts);
  }

  /**
   * Parse conditionText string from current cssText
   * @returns {string|*}
   * @private
   */
  _parseConditionText(){
    let bounds, conditionText;

    // Get rule head block's bounds
    bounds = this.getHead();

    // Get the head block of this rule
    conditionText = this.cssText.substring(bounds.startOffset, bounds.endOffset).trim();

    // Remove @supports prefix
    conditionText = conditionText.substring(9).trim();

    return conditionText;
  }

  parse(parseType){
    super.parse(parseType);
    if (parseType === VirtualActions.PARSE_HEAD || parseType == VirtualActions.PARSE_ALL){
      this.conditionText = this._parseConditionText();
    } else {
      this.conditionText = null;
    }
  }

  /**
   * Apply new conditionText string to current rule
   * @param conditionText
   */
  setCondition(conditionText){
    if (typeof conditionText !== "string") throw new TypeError("ConditionText is not a string");
    let head = this.getHead();

    let newCondition = "@supports " + conditionText;

    this.patch({
      action: VirtualActions.PATCH_REPLACE,
      start: head.startOffset,
      end: head.endOffset,
      value: newCondition,
      patchDelta: newCondition.length - head.endOffset
    })
  }
}

