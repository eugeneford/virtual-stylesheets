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
import VirtualRule from "./VirtualRule.es6";

/**
 * Virtual list is a array-like object containing an ordered collection of VirtualRules
 */
export default class VirtualRuleList {
  constructor(){
    this.rules = [];
  }

  /**
   * Inserts an additional VirtualRule  rule at specified position index in current VirtualRuleList.
   * @param rule
   * @param index
   *
   * @throws TypeError - if rule is not a type of VirtualRule
   * @throws SyntaxError - if rule has not id prop
   */
  insert(rule, index){
    if (!rule instanceof VirtualRule){
      throw new TypeError("rule is not a type of VirtualRule");
    }

    rule.id = index;
    this.rules.splice(index, 0, rule);

    for (let i = index + 1; i < this.rules.length; i++){
      this.rules[i].id = i;
    }
  }

  /**
   * Removes a VirtualRule at target position index. Returns removed rule
   * @param id
   * @returns {VirtualRule}
   *
   * @throws Error = if there is not rule with specified id
   */
  remove(id){
    let i;
    for (i = 0; i < this.rules.length; i++){
      if (this.rules[i].id === id) return this.items.splice(i, 1)[0];
    }
    throw new Error(`"Rule at index ${index}" is missing in VirtualList`);
  }

  /**
   * Returns a VirtualRule that has target id.
   * @param id
   * @returns {VirtualRule}
   */
  get(id){
    let i;
    for (i = 0; i < this.rules.length; i++){
      if (this.rules[i].id === id) return this.rules[i];
    }
  }

  /**
   * Returns a set of VirtualRules that satisfy specified target filterFunc function and
   * VirtualStyleSheet.FILTER_ACCEPT, VirtualStyleSheet.FILTER_REJECT flags returned by it.
   * @param filterFunc
   * @returns {Array.<VirtualRule>}
   */
  filter(filterFunc){
    return this.rules.filter(filterFunc);
  }
}