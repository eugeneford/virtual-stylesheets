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

const SLASH =        '\\'.charCodeAt(0);
const SEMICOLON =    ';'.charCodeAt(0);
const OPEN_CURLY =   '{'.charCodeAt(0);
const CLOSE_CURLY =  '}'.charCodeAt(0);
const SINGLE_QUOTE = '\''.charCodeAt(0);
const DOUBLE_QUOTE = '\"'.charCodeAt(0);

export default class VirtualRule {
  constructor(ruleInfo, parentRule = null, hooks = {}, lazyParsing = 0){
    this._hooks = hooks;

    this.type = ruleInfo.type;
    this.startOffset = ruleInfo.startOffset;
    this.endOffset = ruleInfo.endOffset;
    this.cssText = ruleInfo.cssText;
    this.parentRule = parentRule;
    this.lazyParsing = lazyParsing;

    switch (this.lazyParsing){
      case VirtualTypes.LAZY_ALL_ACCEPT: break;
      case VirtualTypes.LAZY_BODY_ACCEPT:
        this.patch({
          type: VirtualTypes.PATCH_HEAD,
          action: VirtualTypes.PATCH_UPDATE
        });
        break;
      default:
        this.patch({
          type: VirtualTypes.PATCH_ALL,
          action: VirtualTypes.PATCH_UPDATE
        });
        break;
    }
  }

  /**
   * Parse head props from current rule
   * @returns {{startOffset: number, endOffset: number}}
   * @private
   */
  _getHeadProps(){
    let i, length = 0, quotesCode, nextCode, prevCode;

    // Get rule's head block length
    for (i = 0; i < this.cssText.length; i++){
      nextCode = this.cssText.charCodeAt(i);

      // Check if " or ' was spotted without escape \
      if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
        if (!!quotesCode) {
          if (nextCode === quotesCode) quotesCode = undefined;
        } else {
          quotesCode = nextCode;
        }
      }

      if (!quotesCode && (nextCode === OPEN_CURLY || nextCode === SEMICOLON)) break;

      length++;
      prevCode = nextCode;
    }

    // If there is no selectorText
    if (!length) throw SyntaxError("Bad input");

    return {startOffset: 0, endOffset: length}
  }

  // TODO optimize code
  _patchApply(patchInfo){
    let head, trail, oldText = this.cssText;

    switch (patchInfo.action){
      case VirtualTypes.PATCH_UPDATE:
        if (patchInfo.patchDelta) {
          this.startOffset += patchInfo.patchDelta;
          this.endOffset += patchInfo.patchDelta;
        }
        break;

      case VirtualTypes.PATCH_REPLACE:
        head = this.cssText.substring(0, patchInfo.start);
        trail = this.cssText.substring(patchInfo.end);
        this.cssText = head + patchInfo.value + trail;
        this.endOffset = this.endOffset + this.cssText.length - oldText.length;
        break;
    }

    // TODO Apply patch to child rules
    if (patchInfo.patchDelta && this.rules){
      let i;
      for (i = 0; i < this.rules.length; i++){
        this.rules.get(this.id + 1).patch({
          type: VirtualTypes.PATCH_ALL,
          action: VirtualTypes.PATCH_UPDATE,
          patchDelta: patchInfo.patchDelta
        });
      }
    }

    if (patchInfo.patchDelta && this.parentRule && this.parentRule.rules.get(this.id + 1)){
      this.parentRule.rules.get(this.id + 1).patch({
        type: VirtualTypes.PATCH_ALL,
        action: VirtualTypes.PATCH_UPDATE,
        patchDelta: patchInfo.patchDelta
      });
    }
  }

  patch(patchInfo){
    // Invoke pre patching hook
    if (this._hooks.prePatchApply && this._hooks.prePatchApply(this, patchInfo) === VirtualTypes.PATCH_REJECT) return;

    this._patchApply(patchInfo);

    // Invoke post patching hook
    if (this._hooks.postPatchApply) this._hooks.postPatchApply(this, patchInfo);
  }
}