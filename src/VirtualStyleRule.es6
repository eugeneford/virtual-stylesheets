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

export default class VirtualStyleRule extends VirtualRule{
  constructor(ruleInfo, parentRule = null, hooks, lazyParsing = 0){
    super(ruleInfo, parentRule, hooks, lazyParsing);
  }

  /**
   * Parse a formatted selectorText from current VirtualStyleRule
   * @returns {String}
   * @private
   */
  _parseSelectorText(){
    let selectorText, head;

    // Get head props
    head = super.getHead();

    // Get raw selector text
    selectorText = this.cssText.substring(head.startOffset, head.endOffset);

    // Format selector text
    selectorText = selectorText.trim().replace(/\n/gi, "");

    return selectorText;
  }

  /**
   * Parse additional VirtualStyleRule props
   * @param parseType
   */
  parse(parseType){
    if (parseType === VirtualActions.PARSE_HEAD || parseType == VirtualActions.PARSE_ALL)
      this.selectorText = this._parseSelectorText();
  }

  /**
   * Applies a new selectorText to current VirtualStyleRule
   * @param selectorText
   */
  setSelector(selectorText){
    let head = super.getHead();

    this.patch({
      action: VirtualActions.PATCH_REPLACE,
      start: head.startOffset,
      end: head.endOffset,
      value: selectorText,
      patchDelta: selectorText.length - head.endOffset
    })
  }
}