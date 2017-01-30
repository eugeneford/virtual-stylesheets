import VirtualActions from "./VirtualActions";

const SLASH =        '\\'.charCodeAt(0);
const SEMICOLON =    ';'.charCodeAt(0);
const OPEN_CURLY =   '{'.charCodeAt(0);
const CLOSE_CURLY =  '}'.charCodeAt(0);
const SINGLE_QUOTE = '\''.charCodeAt(0);
const DOUBLE_QUOTE = '\"'.charCodeAt(0);

export default class VirtualRule {
  constructor(ruleInfo, parentRule = null, opts = {}) {
    if (!ruleInfo) throw new Error("ruleInfo is missing");
    if (typeof  ruleInfo.type === "undefined"
        || typeof  ruleInfo.startOffset === "undefined"
        || typeof  ruleInfo.endOffset === "undefined"
        || typeof  ruleInfo.cssText === "undefined"
    ){
      throw new Error("Bad input");
    }

    this._opts = opts;

    this.type = ruleInfo.type;
    this.startOffset = ruleInfo.startOffset;
    this.endOffset = ruleInfo.endOffset;
    this.cssText = ruleInfo.cssText;
    this.parentRule = parentRule;
    this.lazyParsing = opts.lazyParsing || 0;
    this._parseInvoke();
  }


  /**
   * Apply update action to current rule
   * @param patchInfo
   * @private
   */
  _patchUpdateApply(patchInfo) {
    if (patchInfo.patchDelta){
      this.startOffset += patchInfo.patchDelta;
      this.endOffset += patchInfo.patchDelta;
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
    /*istanbul ignore else*/
    if (patchInfo.reparse) this._parseInvoke();
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
    /*istanbul ignore else*/
    if (patchInfo.reparse) this._parseInvoke();
  }


  /**
   * Apply insert action to current rule
   * @param patchInfo
   * @private
   */
  _patchInsertApply(patchInfo) {
    let info = Object.assign({}, patchInfo, {end: patchInfo.start});
    this._patchReplaceApply(info);
    /*istanbul ignore else*/
    if (patchInfo.reparse) this._parseInvoke();
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
    /*istanbul ignore else*/
    if (patchInfo.reparse) this._parseInvoke();
  }


  /**
   * Apply delete action to current rule
   * @param patchInfo
   * @private
   */
  _patchDeleteApply(patchInfo) {
    let info = Object.assign({}, patchInfo, {value: ""});
    this._patchReplaceApply(info);
    /*istanbul ignore else*/
    if (patchInfo.reparse) this._parseInvoke();
  }


  /**
   * Apply patch changes
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
    if (this._opts.prePatchApply && this._opts.prePatchApply(this, patchInfo) === VirtualActions.PATCH_REJECT) return;

    // Accept rule reparse as default postPatch behavior
    if (patchInfo.reparse === undefined) {
      patchInfo = Object.assign({}, patchInfo, {reparse: true});
    }

    this._patchApply(patchInfo);

    // Invoke post patching hook
    if (this._opts.postPatchApply) this._opts.postPatchApply(this, patchInfo);
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
   * @returns {object}
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

      if (!quotesCode && openCurlyCount === 0 && nextCode === SEMICOLON) return null;
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
