import VirtualActions from "./VirtualActions";
import VirtualRule from "./VirtualRule";
import VirtualRuleList from "./VirtualRuleList";
import VirtualTokenizer from "./VirtualTokenizer";
import VirtualRuleFactory from "./VirtualRuleFactory";

export default class VirtualGroupingRule extends VirtualRule {
  constructor(ruleInfo, parentRule, hooks, lazyParsing){
    super(ruleInfo, parentRule, hooks, lazyParsing);
  }

  parse(parseType){
    // If we parsing rule body all entire rule
    if (parseType === VirtualActions.PARSE_BODY || parseType === VirtualActions.PARSE_ALL) {
      let bounds, body, tokens, rules, rule, i, id = 0;

      // Get Rule body bounds (startOffset and endOffset)
      bounds = this.getBody();
      body = this.cssText.substring(bounds.startOffset, bounds.endOffset);

      // Get a set of tokens to work with
      tokens = VirtualTokenizer.tokenize(body);

      if (tokens.length) {
        rules = new VirtualRuleList();

        for (i = 0; i < tokens.length; i++){
          rule = VirtualRuleFactory.createFromToken(tokens[i], this, this._opts);
          if (rule) rules.insert(rule, id++);
        }

        this.rules = rules;
        return;
      }
    }
    this.rules = null;
  }
}