import VirtualActions from "./VirtualActions.es6";
import VirtualGroupingRule from "./VirtualGroupingRule.es6";

export default class VirtualMediaRule extends VirtualGroupingRule {
  constructor(ruleInfo, parentRule, opts){
    super(ruleInfo, parentRule, opts);
  }

  parse(parseType){
    if (parseType === VirtualActions.PARSE_HEAD) {
      let bounds, media, i;

      bounds = this.getHead();

    }
    this.media = null;
  }
}

