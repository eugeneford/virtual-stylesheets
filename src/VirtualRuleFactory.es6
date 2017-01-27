import VirtualActions from "./VirtualActions";
import VirtualGrammar from "./VirtualGrammar";
import VirtualRuleList from "./VirtualRuleList";
import VirtualRule from "./VirtualRule";
import VirtualStyleRule from "./VirtualStyleRule";
import VirtualViewportRule from "./VirtualViewportRule";
import VirtualGroupingRule from "./VirtualGroupingRule";
import VirtualTokenizer from "./VirtualTokenizer";

class VirtualRuleFactory {
  constructor(){
    this._types = {};
  }

  /**
   * Create a new VirtualRule based on ruleInfo
   * @param ruleInfo
   * @param parentRule
   * @param opts
   * @returns {null}
   */
  create(ruleInfo, parentRule = null, opts = {}){
    if (ruleInfo === undefined) throw Error("ruleInfo is missing");
    if (ruleInfo.type === VirtualGrammar.UNKNOWN_RULE && !opts.acceptUnknown) return null;

    let filterResult;

    // Apply a pre parsing filter if was specified
    if (opts.preParsingFilter){
      if ((filterResult = opts.preParsingFilter(ruleInfo)) === VirtualActions.FILTER_REJECT) return null;
      filterResult = filterResult < 0 ? filterResult : 0;
    }

    // Create a VirtualRule based on type in ruleInfo
    if (!!this._types[ruleInfo.type])
      return new this._types[ruleInfo.type](ruleInfo, parentRule, Object.assign({}, opts, {lazyParsing: filterResult}));
    // Otherwise throw a TypeError
    throw new TypeError(`There is no ruleClass associated with ${ruleInfo.type}`);
  }

  /**
   * Create a new VirtualRule from token
   * @param token
   * @param parentRule
   * @param opts
   * @returns {null}
   */
  createFromToken(token, parentRule, opts){
    let type, ruleInfo;

    if (token === undefined) throw new Error("Token  is missing");

    type = VirtualGrammar.getRuleType(token.value);

    ruleInfo = {
      type: type,
      startOffset: token.startOffset,
      endOffset: token.startOffset + token.length,
      cssText: token.value
    };

    return this.create(ruleInfo, parentRule, opts);
  }

  /**
   * Register new VirtualRule type
   * @param ruleType
   * @param ruleClass
   */
  register(ruleType, ruleClass){
    if (typeof ruleType !== "number") throw TypeError("ruleType is not a number");
    if (typeof ruleClass !== "function") throw TypeError("ruleClass is not a function");
    this._types[ruleType] = ruleClass;
    return true;
  }
}

const RuleFactory = new VirtualRuleFactory();

RuleFactory.register(VirtualGrammar.UNKNOWN_RULE, VirtualRule);
RuleFactory.register(VirtualGrammar.STYLE_RULE, VirtualStyleRule);
RuleFactory.register(VirtualGrammar.CHARSET_RULE, VirtualRule);
RuleFactory.register(VirtualGrammar.IMPORT_RULE, VirtualRule);
RuleFactory.register(VirtualGrammar.MEDIA_RULE, VirtualGroupingRule);
RuleFactory.register(VirtualGrammar.FONT_FACE_RULE, VirtualRule);
RuleFactory.register(VirtualGrammar.PAGE_RULE, VirtualRule);
RuleFactory.register(VirtualGrammar.KEYFRAME_RULE, VirtualRule);
RuleFactory.register(VirtualGrammar.KEYFRAMES_RULE, VirtualGroupingRule);
RuleFactory.register(VirtualGrammar.NAMESPACE_RULE, VirtualRule);
RuleFactory.register(VirtualGrammar.SUPPORTS_RULE, VirtualRule);
RuleFactory.register(VirtualGrammar.VIEWPORT_RULE, VirtualViewportRule);

export default RuleFactory;