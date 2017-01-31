import VirtualActions from "./VirtualActions";
import VirtualRule from "./VirtualRule";

export default class VirtualStyleDeclarationRule extends VirtualRule{
  constructor(ruleInfo, parentRule = null, opts){
    super(ruleInfo, parentRule, opts);
  }

  parse(parseType){
    super.parse(parseType);
    if (parseType === VirtualActions.PARSE_BODY || parseType == VirtualActions.PARSE_ALL) {

    }
  }
}