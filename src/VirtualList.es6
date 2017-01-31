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

export default class VirtualList {
  constructor(){
    this._items = [];
    this.length = 0;
  }

  /**
   * Inserts an additional item at specified position index in current VirtualList.
   * @param item
   * @param index
   */
  insert(item, index){
    let id;
    if (!item) throw new Error("item is not defined");
    if (index < 0) throw new Error("index should be a positive int");

    if (typeof index === "undefined" || index > this._items.length) {
      id = this._items.length;
    } else {
      id = index;
    }

    item.id = id;
    this._items.splice(id, 0, item);
    this.length = this._items.length;

    for (let i = id + 1; i < this._items.length; i++){
      this._items[i].id = i;
    }
  }

  /**
   * Removes the item at target position index. Returns removed item
   * @param id
   * @returns {object}
   *
   * @throws Error = if there is not item with specified id
   */
  remove(id){
    if (typeof id === "undefined") throw new Error("id is not defined");
    if (id < 0) throw new Error("id should be a positive int");
    if (id >= this._items.length) throw new Error(`id (${id}) is out of range (${this._items.length})`);

    for (let i = id + 1; i < this._items.length; i++){
      this._items[i].id -= 1;
    }
    this.length = this._items.length - 1;
    return this._items.splice(id, 1)[0];
  }

  /**
   * Returns the item that has target id.
   * @param id
   * @returns {object}
   */
  get(id){
    return this._items[id];
  }

  /**
   * Returns a set of items that satisfy specified target filterFunc function and
   * VirtualStyleSheet.FILTER_ACCEPT, VirtualStyleSheet.FILTER_REJECT flags returned by it.
   * @param filterFunc
   * @returns {Array}
   */
  filter(filterFunc){
    return this._items.filter(filterFunc);
  }
}