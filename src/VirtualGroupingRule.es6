import VirtualActions from "./VirtualActions";
import VirtualRule from "./VirtualRule";
import VirtualList from "./VirtualList";
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
      let start = startFrom;
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
        rules = new VirtualList();

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

  /**
   * Creates a new VirtualRule from string and inserts it at specified position
   * @param ruleText
   * @param index
   */
  insertRule(ruleText, index){
    if (typeof ruleText !== "string") throw new TypeError("RuleText is not a string");
    if (typeof index !== "number") throw new TypeError("Index is not a number");
    if (index < 0) throw new Error("Index should be a positive number");

    let tokens, rule, anchorRule, start, end, patchDelta, bounds, value, action;

    // Try to get a token from ruleText
    tokens = VirtualTokenizer.tokenize(ruleText);

    // Throw an error if there are no tokens
    if (!tokens.length) throw SyntaxError("RuleText is not a CSS rule");

    rule = VirtualRuleFactory.createFromToken(tokens[0], this, this._opts);

    /*istanbul ignore else*/
    if (rule) {
      // Inject grouping rule to _patchApply function
      rule._patchApply = (function(rule, _patchApply) {
        function call(patchInfo){
          _patchApply.bind(rule)(patchInfo);
          rule.parentRule._patchParent.bind(rule)(patchInfo);
        }

        return call;
      })(rule, rule._patchApply);

      // Create new rules set if not exists
      if (!this.rules) this.rules = new VirtualList();

      // Try to get anchor rule
      anchorRule = this.rules.get(index);

      // Get body block bounds
      bounds = this.getBody();

      // Calculate patch data
      if (anchorRule){
        action = VirtualActions.PATCH_INSERT;
        start = bounds.startOffset + anchorRule.startOffset;
        value = `${rule.cssText}${this.cssText.substring(bounds.startOffset, bounds.startOffset + this.rules.get(0).startOffset)}`;
        patchDelta = value.length;
        rule.startOffset = anchorRule.startOffset;
        rule.endOffset = anchorRule.startOffset + rule.cssText.length;
      } else {
        anchorRule = this.rules.get(this.rules.length - 1);
        action = VirtualActions.PATCH_REPLACE;
        start = bounds.startOffset;
        end = bounds.endOffset;
        value = `\n  ${rule.cssText}\n`;
        patchDelta = value.length - bounds.endOffset - bounds.startOffset;
        rule.startOffset = 3;
        rule.endOffset = 3 + rule.cssText.length;
      }

      // Add injected rule to list
      this.rules.insert(rule, index);

      // Patch this rule with by inserting created one
      this.patch({
        action, start, end, value, patchDelta, reparse: false
      }, anchorRule);

      // Update child rules
      this._patchChildRules({
        action: VirtualActions.PATCH_UPDATE, patchDelta
      }, index + 1);
    }
  }

  /**
   * Deletes an existing rule at specified position.
   * @param index
   */
  deleteRule(index){
    if (typeof index !== "number") throw new TypeError("Index is not a number");
    if (index < 0) throw new Error("Index should be a positive number");
    if (this.rules && this.rules.length && index >= this.rules.length) throw new Error("Index is larger the child rules count");

    let rule, prevRule, nextRule, bounds, start, end, patchDelta;

    // Get target rule
    rule = this.rules.get(index);

    // Try to get siblings of target rule
    prevRule = this.rules.get(index - 1);
    nextRule = this.rules.get(index + 1);

    // Delete target rule from rules list
    this.rules.remove(index);

    // Get body block bounds
    bounds = this.getBody();

    // Create patch props
    start = bounds.startOffset + (prevRule ? prevRule.endOffset : rule.startOffset);
    end = bounds.startOffset + (!prevRule && nextRule ? nextRule.startOffset: rule.endOffset);
    patchDelta = -(end - start);

    // Patch this rule
    this.patch({
      action: VirtualActions.PATCH_DELETE,
      start, end, patchDelta
    }, rule);

    // Update child rule
    this._patchChildRules({
      action: VirtualActions.PATCH_UPDATE, patchDelta
    })
  }
}