/**
 * Copyright (c) 2017 Eugene Ford (stmechanus@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import VirtualActions from "./VirtualActions";
import VirtualGrammar from "./VirtualGrammar";
import VirtualRuleList from "./VirtualRuleList";
import VirtualRule from "./VirtualRule";
import VirtualStyleRule from "./VirtualStyleRule";
import VirtualTokenizer from "./VirtualTokenizer";

class VirtualRuleFactory {
  constructor(){
    this._types = {};
  }

  /**
   * Create a new VirtualRule based on ruleInfo
   * @param ruleInfo
   * @param parentRule
   * @param hooks
   * @returns {null}
   */
  create(ruleInfo, parentRule = null, hooks = {}){
    let filterResult;

    // Apply a pre parsing filter if was specified
    if (hooks.preParsingFilter){
      if ((filterResult = hooks.preParsingFilter(ruleInfo)) === VirtualActions.FILTER_REJECT) return null;
      filterResult = filterResult < 0 ? filterResult : 0;
    }

    // Create a VirtualRule based on type in ruleInfo
    if (this._types[ruleInfo.type])
      return new this._types[ruleInfo.type](ruleInfo, parentRule, hooks, filterResult);
    // Otherwise throw a TypeError
    throw new TypeError(`There is no ruleClass associated with ${ruleInfo.type}`);
  }

  /**
   * Create a new VirtualRule from token
   * @param token
   * @param parentRule
   * @param hooks
   * @returns {null}
   */
  createFromToken(token, parentRule, hooks){
    let type, ruleInfo;

    type = VirtualGrammar.getRuleType(token.value);

    ruleInfo = {
      type: type,
      startOffset: token.startOffset,
      endOffset: token.startOffset + token.length,
      cssText: token.value
    };

    return this.create(ruleInfo, parentRule, hooks);
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
  }
}

const RuleFactory = new VirtualRuleFactory();

RuleFactory.register(VirtualGrammar.UNKNOWN_RULE, VirtualRule);
RuleFactory.register(VirtualGrammar.STYLE_RULE, VirtualStyleRule);
RuleFactory.register(VirtualGrammar.MEDIA_RULE, VirtualRule);

export default RuleFactory;