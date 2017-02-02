import VirtualActions from "./VirtualActions.es6";
import VirtualGroupingRule from "./VirtualGroupingRule.es6";

export default class VirtualKeyframesRule extends VirtualGroupingRule {
  constructor(ruleInfo, parentRule, opts){
    super(ruleInfo, parentRule, opts);
  }

  _getAtDefinition(){
    switch (this.cssText.substr(1, 8)){
      case "-webkit-":
        return "@-webkit-keyframes";
      case "-moz-key":
        return "@-moz-keyframes";
      case "-o-keyfr":
        return "@-o-keyframes";
      case "-ms-keyf":
        return "@-ms-keyframes";
      default:
        return "@keyframes";
    }
  }

  /**
   * Parse name string from current cssText
   * @returns {string|*}
   * @private
   */
  _parseName(){
    let bounds, name;

    // Get rule head block's bounds
    bounds = this.getHead();

    // Get the head block of this rule
    name = this.cssText.substring(bounds.startOffset, bounds.endOffset).trim();

    // Remove @supports prefix
    name = name.substring(this._getAtDefinition().length).trim();

    return name;
  }

  parse(parseType){
    super.parse(parseType);
    if (parseType === VirtualActions.PARSE_HEAD || parseType == VirtualActions.PARSE_ALL){
      this.name = this._parseName();
    } else {
      this.name = null;
    }
  }

  /**
   * Apply new name string to current rule
   * @param name
   */
  setName(name){
    if (typeof name !== "string") throw new TypeError("ConditionText is not a string");
    let head = this.getHead();

    let newName = `${this._getAtDefinition()} ${name}`;

    this.patch({
      action: VirtualActions.PATCH_REPLACE,
      start: head.startOffset,
      end: head.endOffset,
      value: newName,
      patchDelta: newName.length - head.endOffset
    })
  }
}

