import VirtualActions from "./VirtualActions";
import VirtualRule from "./VirtualRule";

export default class VirtualStyleDeclarationRule extends VirtualRule{
  constructor(ruleInfo, parentRule = null, opts){
    super(ruleInfo, parentRule, opts);
  }
}