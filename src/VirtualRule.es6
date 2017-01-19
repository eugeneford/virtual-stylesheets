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

const SLASH =        '\\'.charCodeAt(0);
const SEMICOLON =    ';'.charCodeAt(0);
const OPEN_CURLY =   '{'.charCodeAt(0);
const CLOSE_CURLY =  '}'.charCodeAt(0);
const SINGLE_QUOTE = '\''.charCodeAt(0);
const DOUBLE_QUOTE = '\"'.charCodeAt(0);

export default class VirtualRule {
  constructor(ruleInfo, parentRule = null, hooks = {}, lazyParsing = 0) {
    if (!ruleInfo) throw new Error("ruleInfo is missing");
    if (typeof  ruleInfo.type === "undefined"
        || typeof  ruleInfo.startOffset === "undefined"
        || typeof  ruleInfo.endOffset === "undefined"
        || typeof  ruleInfo.cssText === "undefined"
    ){
      throw new Error("Bad input");
    }


    this._hooks = hooks;

    this.type = ruleInfo.type;
    this.startOffset = ruleInfo.startOffset;
    this.endOffset = ruleInfo.endOffset;
    this.cssText = ruleInfo.cssText;
    this.parentRule = parentRule;
    this.lazyParsing = lazyParsing;
    this._parseInvoke();
  }

  /**
   * Force update patching for its child rules
   * @param patchInfo
   * @private
   */
  _forceChildChainUpdate(patchInfo) {
    if (patchInfo.patchDelta && this.rules && this.rules.length) {
      this.rules.get(0).patch({
        action: VirtualActions.PATCH_UPDATE,
        patchDelta: patchInfo.patchDelta
      });
    }
  }

  /**
   * Force update patching for next sibling of this rule
   * @param patchInfo
   * @private
   */
  _forceChainUpdate(patchInfo) {
    if (patchInfo.patchDelta && this.parentRule && this.parentRule.rules.get(this.id + 1)) {
      this.parentRule.rules.get(this.id + 1).patch({
        action: VirtualActions.PATCH_UPDATE,
        patchDelta: patchInfo.patchDelta
      });
    }
  }

  /**
   * Apply update action to current rule
   * @param patchInfo
   * @private
   */
  _patchUpdateApply(patchInfo) {
    if (patchInfo.patchDelta) {
      this.startOffset += patchInfo.patchDelta;
      this.endOffset += patchInfo.patchDelta;
      this._forceChildChainUpdate(patchInfo);
    }
  }

  /**
   * Apply append action to current rule
   * @param patchInfo
   * @private
   */
  _patchAppendApply(patchInfo) {
    let oldText = this.cssText;
    this.cssText = oldText + patchInfo.value;
    this.endOffset = this.endOffset + this.cssText.length - oldText.length;
    this._parseInvoke();
  }

  /**
   * Apply prepend action to current rule
   * @param patchInfo
   * @private
   */
  _patchPrependApply(patchInfo) {
    let oldText = this.cssText;
    this.cssText = patchInfo.value + oldText;
    this.endOffset = this.endOffset + this.cssText.length - oldText.length;
    this._parseInvoke();
  }

  /**
   * Apply insert action to current rule
   * @param patchInfo
   * @private
   */
  _patchInsertApply(patchInfo) {
    let info = Object.assign({}, patchInfo, {end: patchInfo.start});
    this._patchReplaceApply(info);
    this._parseInvoke();
  }

  /**
   * Apply replace action to current rule
   * @param patchInfo
   * @private
   */
  _patchReplaceApply(patchInfo) {
    let head, trail, oldText = this.cssText;
    head = this.cssText.substring(0, patchInfo.start);
    trail = this.cssText.substring(patchInfo.end);
    this.cssText = head + patchInfo.value + trail;
    this.endOffset = this.endOffset + this.cssText.length - oldText.length;
    this._parseInvoke();
  }

  /**
   * Apply delete action to current rule
   * @param patchInfo
   * @private
   */
  _patchDeleteApply(patchInfo) {
    let info = Object.assign({}, patchInfo, {value: ""});
    this._patchReplaceApply(info);
    this._parseInvoke();
  }

  /**
   * Apply patch changes to current rule
   * @param patchInfo
   * @private
   */
  _patchApply(patchInfo) {
    switch (patchInfo.action) {
      case VirtualActions.PATCH_UPDATE:
        this._patchUpdateApply(patchInfo);
        break;

      case VirtualActions.PATCH_APPEND:
        this._patchAppendApply(patchInfo);
        break;

      case VirtualActions.PATCH_PREPEND:
        this._patchPrependApply(patchInfo);
        break;

      case VirtualActions.PATCH_INSERT:
        this._patchInsertApply(patchInfo);
        break;

      case VirtualActions.PATCH_REPLACE:
        this._patchReplaceApply(patchInfo);
        break;

      case VirtualActions.PATCH_DELETE:
        this._patchDeleteApply(patchInfo);
        break;
    }

    this._forceChainUpdate(patchInfo);
  }

  /**
   * Invokes rule parsing basing on lazyParsing state
   * @private
   */
  _parseInvoke(){
    switch (this.lazyParsing) {
      case VirtualActions.LAZY_BODY_ACCEPT:
        this.parse(VirtualActions.PARSE_HEAD);
        break;
      case VirtualActions.LAZY_REJECT:
        this.parse(VirtualActions.PARSE_ALL);
        break;
    }
  }

  /**
   * Patch current rule props with patchInfo
   * @param patchInfo
   */
  patch(patchInfo) {
    // Invoke pre patching hook
    if (this._hooks.prePatchApply && this._hooks.prePatchApply(this, patchInfo) === VirtualActions.PATCH_REJECT) return;

    this._patchApply(patchInfo);

    // Invoke post patching hook
    if (this._hooks.postPatchApply) this._hooks.postPatchApply(this, patchInfo);
  }

  /**
   * Parse head props from current rule
   * @returns {{startOffset: number, endOffset: number}}
   */
  getHead() {
    let i, length = 0, quotesCode, nextCode, prevCode;

    // Get rule's head block length
    for (i = 0; i < this.cssText.length; i++) {
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

    return {startOffset: 0, endOffset: length};
  }

  /**
   * Parse body props from current rule
   * @returns {{startOffset: number, endOffset: number}}
   */
  getBody(){
    let i, quotesCode, nextCode, prevCode, startOffset, endOffset, openCurlyCount = 0;

    for (i = 0; i < this.cssText.length; i++) {
      nextCode = this.cssText.charCodeAt(i);

      // Check if " or ' was spotted without escape \
      if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
        if (!!quotesCode) {
          if (nextCode === quotesCode) quotesCode = undefined;
        } else {
          quotesCode = nextCode;
        }
      }

      if (!startOffset && !quotesCode && i < this.cssText.length - 1 && nextCode === OPEN_CURLY){
        startOffset = i + 1;
      }

      if (!quotesCode && nextCode === OPEN_CURLY) openCurlyCount++;
      if (!quotesCode && nextCode === CLOSE_CURLY) openCurlyCount--;

      if (!quotesCode && !openCurlyCount && nextCode === CLOSE_CURLY) {
        endOffset = i;
        break;
      }

      prevCode = nextCode;
    }

    if (!startOffset || !endOffset) throw SyntaxError("Bad input");

    return {startOffset, endOffset};
  }



  /**
   * Parse specific props for current rule type basing on parseType
   * @param parseType
   * @interface
   */
  parse(parseType) {}
}
