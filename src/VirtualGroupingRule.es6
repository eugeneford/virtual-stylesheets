import VirtualActions from "./VirtualActions";
import VirtualRule from "./VirtualRule";
import VirtualRuleList from "./VirtualRuleList";
import VirtualTokenizer from "./VirtualTokenizer";
import VirtualRuleFactory from "./VirtualRuleFactory";

export default class VirtualGroupingRule extends VirtualRule {
  constructor(ruleInfo, parentRule, hooks, lazyParsing){
    super(ruleInfo, parentRule, hooks, lazyParsing);
  }

  /**
   * Force update patching for its child rules
   * @param patchInfo
   * @private
   */
  _forceChildRulesUpdate(patchInfo) {
    if (patchInfo.patchDelta && this.rules && this.rules.length) {
      let start = patchInfo.startFrom;
      for (let i = start; i < this.rules.length; i++){
        this.rules.get(i).patch({
          action: VirtualActions.PATCH_UPDATE,
          patchDelta: patchInfo.patchDelta
        });
      }
    }
  }

  /**
   * Force parent rule update
   * @param patchInfo
   * @private
   */
  _forceParentRuleUpdate(patchInfo){
    if (this.parentRule) {

      let parentPatch = Object.assign({}, patchInfo, {
        action: VirtualActions.PATCH_UPDATE,
        initialAction: patchInfo.action,
        startFrom: this.id !== undefined ? this.id + 1 : 0
      });

      this.parentRule.patch(parentPatch);
    }
  }

  /**
   * Apply patch to parent rule
   * @param patchInfo
   * @private
   */
  _patchParent(patchInfo){
    switch (patchInfo.action) {
      case VirtualActions.PATCH_UPDATE: break;

      default:
        this._forceParentRuleUpdate(patchInfo);
        break;
    }
  }

  /**
   * Apply patch changes
   * @param patchInfo
   * @private
   */
  _patchApply(patchInfo) {
    this._patchParent(patchInfo);
  }

  /**
   * Apply update action to current rule
   * @param patchInfo
   * @private
   */
  _patchUpdateApply(patchInfo) {
    if (patchInfo.startFrom !== undefined) {
      let body = this.getBody();

      patchInfo.start += body.startOffset;
      patchInfo.end += body.startOffset;

      this._patchThis(Object.assign({}, patchInfo, {
        action: patchInfo.initialAction,
        initialAction: void 0
      }));
    }
    else if (patchInfo.patchDelta){
      this._forceChildRulesUpdate(patchInfo);
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
          if (rule) rules.insert(rule, id++);
        }

        this.rules = rules;
        return;
      }
    }
    this.rules = null;
  }
}