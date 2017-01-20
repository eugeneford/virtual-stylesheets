import VirtualActions from "./VirtualActions";
import VirtualGrammar from "./VirtualGrammar";
import VirtualRuleList from "./VirtualRuleList";
import VirtualRuleFactory from "./VirtualRuleFactory";
import VirtualTokenizer from "./VirtualTokenizer";

class VirtualStyleSheet {
  constructor(hooks){
    this.rules = [];
    this._opts = hooks;
  }

  parseFromString(cssText){
    let tokenizer = new VirtualTokenizer(), tokens, i, rule, rules, id = 0;
    tokens = VirtualTokenizer.tokenize(cssText);

    if (tokens.length) {
      rules = new VirtualRuleList();

      for (i = 0; i < tokens.length; i++){
        rule = VirtualRuleFactory.createFromToken(tokens[i], this, this._opts);
        if (rule) rules.insert(rule, id++);
      }

      this.rules = rules;
    }
  }
}

Object.assign(VirtualStyleSheet, VirtualActions);
Object.assign(VirtualStyleSheet, VirtualGrammar.getTypes());

export default VirtualStyleSheet;