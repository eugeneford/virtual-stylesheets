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

const HASH              = '#'.charCodeAt(0);
const ASTERISK          = '*'.charCodeAt(0);
const DOT_SIGN          = '.'.charCodeAt(0);
const COLON             = ':'.charCodeAt(0);
const OPEN_SQUARE       = '['.charCodeAt(0);

const CF_WORD = function (code) {
  return (code >= 128 || code === 45 || code == 245 || (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122));
};

export default class VirtualGrammar {
  /**
   * Check if rule is actually a type of KEYFRAME_RULE
   * @param rule
   * @returns {boolean}
   */
  static isKeyframeRule(rule){
    let value = rule.toLowerCase(), i,
      codes = [value.charCodeAt(0), value.charCodeAt(1), value.charCodeAt(2), value.charCodeAt(3)];

    for (i = 0; i < codes.length; i++) {
      // If code starts a percentage number
      if (i > 0 && codes[i] === 37) return true;

      // If code is not a digit
      if (codes[i] < 48 && codes[i] > 57) return false;
    }

    // Otherwise, codes refers to a number
    return false;
  }

  /**
   * Check if rule is actually a type of STYLE_RULE
   * @param rule
   * @returns {boolean}
   */
  static isStyleRule(rule){
    let startCode = rule.charCodeAt(0);
    if (startCode === ASTERISK || startCode === DOT_SIGN || CF_WORD(startCode)
      || startCode === HASH || startCode === OPEN_SQUARE || startCode === COLON){
      return true;
    }
    return false;
  }

  /**
   * Check if rule is actually a type of CHARSET_RULE
   * @param rule
   * @returns {boolean}
   */
  static isCharsetRule(rule){
    let value = rule.toLowerCase();
    return value.substr(0, "@charset".length) === "@charset";
  }

  /**
   * Check if rule is actually a type of IMPORT_RULE
   * @param rule
   * @returns {boolean}
   */
  static isImportRule(rule){
    let value = rule.toLowerCase();
    return value.substr(0, "@import".length) === "@import";
  }

  /**
   * Check if rule is actually a type of MEDIA_RULE
   * @param rule
   * @returns {boolean}
   */
  static isMediaRule(rule){
    let value = rule.toLowerCase();
    return value.substr(0, "@media".length) === "@media";
  }

  /**
   * Check if rule is actually a type of FONT_FACE_RULE
   * @param rule
   * @returns {boolean}
   */
  static isFontFaceRule(rule){
    let value = rule.toLowerCase();
    return value.substr(0, "@font-face".length) === "@font-face";
  }

  /**
   * Check if rule is actually a type of PAGE_RULE
   * @param rule
   * @returns {boolean}
   */
  static isPageRule(rule){
    let value = rule.toLowerCase();
    return value.substr(0, "@page".length) === "@page";
  }

  /**
   * Check if rule is actually a type of KEYFRAME_RULE
   * @param rule
   * @returns {boolean}
   */
  static isKeyframesRule(rule){
    let value = rule.toLowerCase();
    return value.substr(0, "@keyframes".length) === "@keyframes"
      || value.substr(0, "@-webkit-keyframes".length) === "@-webkit-keyframes"
      || value.substr(0, "@-moz-keyframes".length) === "@-moz-keyframes"
      || value.substr(0, "@-ms-keyframes".length) === "@-ms-keyframes"
      || value.substr(0, "@-o-keyframes".length) === "@-o-keyframes";
  }

  /**
   * Check if rule is actually a type of NAMESPACE_RULE
   * @param rule
   * @returns {boolean}
   */
  static isNamespaceRule(rule){
    let value = rule.toLowerCase();
    return value.substr(0, "@namespace".length) === "@namespace";
  }

  /**
   * Check if rule is actually a type of SUPPORTS_RULE
   * @param rule
   * @returns {boolean}
   */
  static isSupportsRule(rule){
    let value = rule.toLowerCase();
    return value.substr(0, "@supports".length) === "@supports";
  }

  /**
   * Check if rule is actually a type of VIEWPORT_RULE
   * @param rule
   * @returns {boolean}
   */
  static isViewportRule(rule){
    let value = rule.toLowerCase();
    return value.substr(0, "@viewport".length) === "@viewport";
  }

  /**
   * Get VirtualRule type based on specified rule
   * @param rule
   * @returns {number}
   */
  static getRuleType(rule){
    if (VirtualGrammar.isStyleRule(rule)) return VirtualTypes.STYLE_RULE;
    if (VirtualGrammar.isMediaRule(rule)) return VirtualTypes.MEDIA_RULE;
    if (VirtualGrammar.isImportRule(rule)) return VirtualTypes.IMPORT_RULE;
    if (VirtualGrammar.isFontFaceRule(rule)) return VirtualTypes.FONT_FACE_RULE;
    if (VirtualGrammar.isKeyframesRule(rule)) return VirtualTypes.KEYFRAMES_RULE;
    if (VirtualGrammar.isKeyframeRule(rule)) return VirtualTypes.KEYFRAME_RULE;
    if (VirtualGrammar.isCharsetRule(rule)) return VirtualTypes.CHARSET_RULE;
    if (VirtualGrammar.isSupportsRule(rule)) return VirtualTypes.SUPPORTS_RULE;
    if (VirtualGrammar.isViewportRule(rule)) return VirtualTypes.VIEWPORT_RULE;
    if (VirtualGrammar.isPageRule(rule)) return VirtualTypes.PAGE_RULE;
    if (VirtualGrammar.isNamespaceRule(rule)) return VirtualTypes.NAMESPACE_RULE;
    return VirtualTypes.UNKNOWN_RULE;
  }
}