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
import VirtualRuleFactory from "./VirtualRuleFactory";
import VirtualTokenizer from "./VirtualTokenizer";

class VirtualStyleSheet {
  constructor(hooks){
    this.rules = [];
    this._hooks = hooks;
  }

  parseFromString(cssText){
    let tokenizer = new VirtualTokenizer(), tokens, i, rule, rules, id = 0;
    tokens = tokenizer.tokenize(cssText);

    if (tokens.length) {
      rules = new VirtualRuleList();

      for (i = 0; i < tokens.length; i++){
        rule = VirtualRuleFactory.createFromToken(tokens[i], this, this._hooks);
        if (rule) rules.insert(rule, id++);
      }

      this.rules = rules;
    }
  }
}

Object.assign(VirtualStyleSheet, VirtualActions);
Object.assign(VirtualStyleSheet, VirtualGrammar.getTypes());

export default VirtualStyleSheet;