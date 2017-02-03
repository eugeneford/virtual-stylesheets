import VirtualActions from "./VirtualActions";
import VirtualGrammar from "./VirtualGrammar";
import VirtualList from "./VirtualList";
import VirtualGroupingRule from "./VirtualGroupingRule";
import VirtualRuleFactory from "./VirtualRuleFactory";
import VirtualTokenizer from "./VirtualTokenizer";

class VirtualStyleSheet extends VirtualGroupingRule {
  constructor(cssText, opts){
    if (typeof cssText !== "string") throw TypeError("CSSText is not a string");

    let ruleInfo = {
      startOffset: 0,
      endOffset: cssText.length,
      cssText: cssText
    };

    super(ruleInfo, null, opts);
  }

  getBody(){
    return {startOffset: this.startOffset, endOffset: this.endOffset}
  }

  getHead(){
    return this.getBody();
  }

  parseFromString(cssText){
    if (typeof cssText !== "string") throw TypeError("CSSText is not a string");
    this.cssText = cssText;
    this.endOffset = cssText.length;
    this.parse(VirtualActions.PARSE_ALL);
  }
}

Object.assign(VirtualStyleSheet, VirtualActions);
Object.assign(VirtualStyleSheet, VirtualGrammar.getTypes());

export default VirtualStyleSheet;