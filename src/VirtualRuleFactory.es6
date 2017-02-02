import VirtualActions from "./VirtualActions";
import VirtualGrammar from "./VirtualGrammar";
import VirtualRuleList from "./VirtualList";
import VirtualRule from "./VirtualRule";
import VirtualCharsetRule from "./VirtualCharsetRule";
import VirtualStyleRule from "./VirtualStyleRule";
import VirtualImportRule from "./VirtualImportRule";
import VirtualViewportRule from "./VirtualViewportRule";
import VirtualFontFaceRule from "./VirtualFontFaceRule";
import VirtualGroupingRule from "./VirtualGroupingRule";
import VirtualMediaRule from "./VirtualMediaRule";
import VirtualKeyframeRule from "./VirtualKeyframeRule";
import VirtualKeyframesRule from "./VirtualKeyframesRule";
import VirtualPageRule from "./VirtualPageRule";
import VirtualNamespaceRule from "./VirtualNamespaceRule";
import VirtualSupportsRule from "./VirtualSupportsRule";
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
RuleFactory.register(VirtualGrammar.CHARSET_RULE, VirtualCharsetRule);
RuleFactory.register(VirtualGrammar.IMPORT_RULE, VirtualImportRule);
RuleFactory.register(VirtualGrammar.MEDIA_RULE, VirtualMediaRule);
RuleFactory.register(VirtualGrammar.FONT_FACE_RULE, VirtualFontFaceRule);
RuleFactory.register(VirtualGrammar.PAGE_RULE, VirtualPageRule);
RuleFactory.register(VirtualGrammar.KEYFRAME_RULE, VirtualKeyframeRule);
RuleFactory.register(VirtualGrammar.KEYFRAMES_RULE, VirtualKeyframesRule);
RuleFactory.register(VirtualGrammar.NAMESPACE_RULE, VirtualNamespaceRule);
RuleFactory.register(VirtualGrammar.SUPPORTS_RULE, VirtualSupportsRule);
RuleFactory.register(VirtualGrammar.VIEWPORT_RULE, VirtualViewportRule);

export default RuleFactory;