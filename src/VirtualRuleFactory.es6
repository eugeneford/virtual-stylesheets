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

import VirtualTypes from "./VirtualTypes.es6";
import VirtualGrammar from "./VirtualGrammar.es6";
import VirtualRuleList from "./VirtualRuleList.es6";
import VirtualRule from "./VirtualRule.es6";
import VirtualTokenizer from "./VirtualTokenizer.es6";

export default class VirtualRuleFactory {
  constructor(hooks = {}){
    this._hooks = hooks;
  }

  create(ruleInfo, parentRule = null, lazyParsing = false){
    let filterResult;

    // Apply a pre parsing filter if was specified
    if (this._hooks.preParsingFilter){
      if ((filterResult = this._hooks.preParsingFilter(ruleInfo)) === VirtualTypes.FILTER_REJECT) return null;
    }

    // Create a VirtualRule based on type in ruleInfo
    switch (ruleInfo.type){
      default:
        return new VirtualRule(ruleInfo, parentRule, this._hooks, filterResult === VirtualTypes.LAZY_ACCEPT || false);
    }
  }

  createFromToken(token, parentRule = null, lazyParsing = false){
    let type, ruleInfo;

    type = VirtualGrammar.getRuleType(token.value);
    ruleInfo = {
      type: type,
      startOffset: token.startOffset,
      endOffset: token.startOffset + token.length,
      cssText: token.value
    };

    return this.create(ruleInfo, parentRule, lazyParsing);
  }
}