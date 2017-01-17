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
    head = super._getHeadProps();

    // Get raw selector text
    selectorText = this.cssText.substring(head.startOffset, head.endOffset);

    // Format selector text
    selectorText = selectorText.trim().replace(/\n/gi, "");

    return selectorText;
  }

  /**
   * Apply patch to head block of current rule
   * @param patchInfo
   * @private
   */
  _patchHead(patchInfo){
    this.selectorText = this._parseSelectorText();
  }

  /**
   * Apply patch to current rule
   * @param patchInfo
   * @private
   */
  _patchApply(patchInfo){
    switch (patchInfo.type){
      case VirtualTypes.PATCH_HEAD:
      case VirtualTypes.PATCH_ALL:
        this._patchHead(patchInfo);
        break;
    }
  }

  /**
   * Patch current rule
   * @param patchInfo
   */
  patch(patchInfo){
    // Invoke pre patching hook
    if (this._hooks.prePatchApply && this._hooks.prePatchApply(this, patchInfo) === VirtualTypes.PATCH_REJECT) return;

    super._patchApply(patchInfo);
    this._patchApply(patchInfo);

    // Invoke post patching hook
    if (this._hooks.postPatchApply) this._hooks.postPatchApply(this, patchInfo);
  }

  setSelector(selectorText){
    let head = super._getHeadProps();

    this.patch({
      type: VirtualTypes.PATCH_HEAD,
      action: VirtualTypes.PATCH_REPLACE,
      start: head.startOffset,
      end: head.endOffset,
      value: selectorText,
      patchDelta: selectorText.length - head.endOffset
    })
  }
}