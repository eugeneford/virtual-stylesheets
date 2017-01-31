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
import VirtualRule from "./VirtualRule";

/**
 * Virtual list is a array-like object containing an ordered collection of VirtualRules
 */
export default class VirtualRuleList {
  constructor(){
    this._rules = [];
    this.length = 0;
  }

  /**
   * Inserts an additional VirtualRule  rule at specified position index in current VirtualList.
   * @param rule
   * @param index
   *
   * @throws TypeError - if rule is not a type of VirtualRule
   */
  insert(rule, index){
    let id;
    if (!rule) throw new Error("rule is not defined");
    if (index < 0) throw new Error("index should be a positive int");

    if (typeof index === "undefined" || index > this._rules.length) {
      id = this._rules.length;
    } else {
      id = index;
    }

    rule.id = id;
    this._rules.splice(id, 0, rule);
    this.length = this._rules.length;

    for (let i = id + 1; i < this._rules.length; i++){
      this._rules[i].id = i;
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
    if (typeof id === "undefined") throw new Error("id is not defined");
    if (id < 0) throw new Error("id should be a positive int");
    if (id >= this._rules.length) throw new Error(`id (${id}) is out of range (${this._rules.length})`);

    for (let i = id + 1; i < this._rules.length; i++){
      this._rules[i].id -= 1;
    }
    this.length = this._rules.length - 1;
    return this._rules.splice(id, 1)[0];
  }

  /**
   * Returns a VirtualRule that has target id.
   * @param id
   * @returns {VirtualRule}
   */
  get(id){
    return this._rules[id];
  }

  /**
   * Returns a set of VirtualRules that satisfy specified target filterFunc function and
   * VirtualStyleSheet.FILTER_ACCEPT, VirtualStyleSheet.FILTER_REJECT flags returned by it.
   * @param filterFunc
   * @returns {Array.<VirtualRule>}
   */
  filter(filterFunc){
    return this._rules.filter(filterFunc);
  }
}