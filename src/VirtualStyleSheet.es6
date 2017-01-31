import VirtualActions from "./VirtualActions";
import VirtualGrammar from "./VirtualGrammar";
import VirtualList from "./VirtualList";
import VirtualRuleFactory from "./VirtualRuleFactory";
import VirtualTokenizer from "./VirtualTokenizer";

class VirtualStyleSheet {
  constructor(hooks){
    this.rules = [];
    this._opts = hooks;
  }

  parseFromString(cssText){
    if (typeof cssText !== "string") throw TypeError("cssText is not a string");
    let tokens, i, rule, rules, id = 0;
    tokens = VirtualTokenizer.tokenize(cssText);

    if (tokens.length) {
      rules = new VirtualList();

      for (i = 0; i < tokens.length; i++){
        rule = VirtualRuleFactory.createFromToken(tokens[i], this, this._opts);
        if (rule) rules.insert(rule, id++);
      }

      this.rules = rules;
      return;
    }

    this.rules = new VirtualList();
  }
}

Object.assign(VirtualStyleSheet, VirtualActions);
Object.assign(VirtualStyleSheet, VirtualGrammar.getTypes());

export default VirtualStyleSheet;