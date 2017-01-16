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

/**
 * Virtual list is a array-like object containing an ordered collection of string values
 *
 * @example
 * list = new VirtualList();
 * list.append("value");
 * list.get(0); //=> value
 * list.remove("value"); //=> value
 */
export default class VirtualList {
  constructor(){
    this.items = [];
  }

  /**
   * Appends target item to set of  items in current VirtualList.
   * @param item
   *
   * @throws TypeError - if item is not a type of String
   */
  append(item){
    if ( typeof item !== "string" || this.items.indexOf(item) !== -1){
      throw new TypeError(`${typeof item} is not a type of String`);
    }
    this.items.push(item);
  }

  /**
   * Removes target item from set of  items in current VirtualStyleRule. Returns a removed item.
   * @param item
   * @returns {string}
   *
   * @throws Error - if item is missing in this list
   */
  remove(item){
    let index;
    if ( index = this.items.indexOf(item) > -1){
      return this.items.splice(index, 1)[0];
    }
    throw new Error(`"${item}" is missing in VirtualList`);
  }

  /**
   * Returns an item at target position index
   * @param index
   * @returns {string}
   */
  get(index){
    return this.items[index];
  }
}