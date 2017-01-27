import VirtualActions from "./VirtualActions";
import VirtualRule from "./VirtualRule";
import VirtualRuleList from "./VirtualRuleList";
import VirtualTokenizer from "./VirtualTokenizer";
import VirtualRuleFactory from "./VirtualRuleFactory";

export default class VirtualGroupingRule extends VirtualRule {
  constructor(ruleInfo, parentRule, opts){
    super(ruleInfo, parentRule, opts);
  }

  /**
   * Force update patching for its child rules
   * @param patchInfo
   * @private
   */
  _patchChildRules(patchInfo, startFrom) {
    /*istanbul ignore else*/
    if (patchInfo.patchDelta && this.rules && this.rules.length) {
      let start = startFrom || 0;
      for (let i = start; i < this.rules.length; i++){
        this.rules.get(i).patch(patchInfo);
      }
    }
  }

  /**
   * Apply patch to parent rule
   * @param patchInfo
   * @private
   */
  _patchParent(patchInfo){
    if (patchInfo && patchInfo.action !== VirtualActions.PATCH_UPDATE) {
      let parentRule;
      /*istanbul ignore else*/
      if (parentRule = this.parentRule){
        let parentPatch, siblingPatch, body, i;

        // Get Parent Rule body bounds (startOffset and endOffset)
        body = parentRule.getBody();

        // Create parent patch excluding default reparse behavior
        parentPatch = Object.assign({}, patchInfo, {
          start: body.startOffset + this.startOffset + patchInfo.start,
          end: body.startOffset + this.startOffset + patchInfo.end,
          reparse: false
        });

        this.parentRule.patch(parentPatch);

        // Simply update the position of next rule's sibling if it has changed its length
        if (patchInfo.patchDelta){
          siblingPatch = {
            action: VirtualActions.PATCH_UPDATE,
            patchDelta: patchInfo.patchDelta
          };

          this.parentRule._patchChildRules(siblingPatch, this.id + 1);
        }
      }
    }
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

          if (rule) {
            // Inject grouping rule to _patchApply function
            rule._patchApply = (function(rule, _patchApply) {
              function call(patchInfo){
                _patchApply.bind(rule)(patchInfo);
                rule.parentRule._patchParent.bind(rule)(patchInfo);
              }

              return call;
            })(rule, rule._patchApply);

            // Add injected rule to list
            rules.insert(rule, id++);
          }
        }

        this.rules = rules;
        return;
      }
    }
    this.rules = null;
  }
}