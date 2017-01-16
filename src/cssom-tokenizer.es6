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

const STYLE_RULE         = 1;
const IMPORT_RULE        = 2;
const MEDIA_RULE         = 4;
const FONT_FACE_RULE     = 5;
const PAGE_RULE          = 6;
const KEYFRAMES_RULE     = 7; 
const KEYFRAME_RULE      = 8;
const NAMESPACE_RULE     = 10;
const COUNTER_STYLE_RULE = 11;
const SUPPORTS_RULE      = 12;
const DOCUMENT_RULE      = 13;
const VIEWPORT_RULE      = 15;

const WHITESPACE        = ' '.charCodeAt(0);
const NEW_LINE          = '\n'.charCodeAt(0);
const SLASH             = '/'.charCodeAt(0);
const HASH              = '#'.charCodeAt(0);
const ASTERISK          = '*'.charCodeAt(0);
const DOT_SIGN          = '.'.charCodeAt(0);
const COLON             = ':'.charCodeAt(0);
const SEMICOLON         = ';'.charCodeAt(0);
const OPEN_SQUARE       = '['.charCodeAt(0);
const OPEN_CURLY        = '{'.charCodeAt(0);
const CLOSE_CURLY       = '}'.charCodeAt(0);
const AT_SIGN           = '@'.charCodeAt(0);

const CF_WORD = function (code) {
  return (code >= 128 || code === 45 || code == 245 || (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122));
};

/**
 * The CSSOMTokenizer was designed for fast typed css rules tokenization from string.
 *
 * This tokenizer is processing the only top-level rules to achieve the maximum performance.
 * So, say, if you want to get StyleRules inside of a MediaRule, you need to run a tokenize() method on
 * MediaRule's value itself.
 *
 * All other type of data in target css string are completely ignored.
 *
 * NOTE: CSSOMTokenizer doesn't provide any parsing methods for tokenized data. Its main purpose
 * is to create a typed set of string data for further post-processing.
 *
 * @example
 * tokenizer = new CSSOMTokenizer();
 * tokens = tokenizer.tokenize(cssText);
 */
class CSSOMTokenizer {
  constructor(){}

  /**
   * Get a STYLE_RULE token from css string
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getStyleRuleToken(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), nextCode, length = 1, rule, value,  curlys = 0;

    if (startCode === ASTERISK || startCode === DOT_SIGN || CF_WORD(startCode)
      || startCode === HASH || startCode === OPEN_SQUARE || startCode === COLON){

      // Get <rule> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length)) && nextCode !== OPEN_CURLY)
        length++;

      // Get <rule> text
      rule = cssText.substr(startIndex, length);

      // Ignore <{>
      length = length + 1;

      // Get <rule { value> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length))){
        if (nextCode === OPEN_CURLY) curlys ++;

        if (nextCode === CLOSE_CURLY){
          if (curlys > 0) {
            curlys--;
          } else{
            break;
          }
        }

        length++;
      }

      // Get <value> text
      value = cssText.substring(startIndex + rule.length + 1, startIndex + length);

      // Ignore <}>
      length = length + 1;

      return {
        type: STYLE_RULE,
        rule, value, startIndex, length
      }
    }
    return null;
  }

  /**
   * Get a MEDIA_RULE token from css string
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getMediaRuleToken(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), nextCode, length = 1, rule, value, curlys = 0;

    if (startCode === AT_SIGN && cssText.substr(startIndex+1, 5).toLowerCase() === "media"){

      // Get <rule> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length)) && nextCode !== OPEN_CURLY)
        length++;

      // Get <rule> text
      rule = cssText.substr(startIndex, length);

      // Ignore <{>
      length = length + 1;

      // Get <rule { value> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length))){
        if (nextCode === OPEN_CURLY) curlys ++;

        if (nextCode === CLOSE_CURLY){
          if (curlys > 0) {
            curlys--;
          } else{
            break;
          }
        }

        length++;
      }

      // Get <value> text
      value = cssText.substring(startIndex + rule.length + 1, startIndex + length);

      // Ignore <}>
      length = length + 1;

      return {
        type: MEDIA_RULE,
        rule, value, startIndex, length
      }
    }
    return null;
  }

  /**
   * Get a IMPORT_RULE token from css string
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getImportRuleToken(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), nextCode, length = 1, rule;

    if (startCode === AT_SIGN && cssText.substr(startIndex+1, 6).toLowerCase() === "import"){
      // Get <rule> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length)) && nextCode !== SEMICOLON)
        length++;

      // Get <rule> text
      rule = cssText.substr(startIndex, length);

      // Ignore <;>
      length = length + 1;

      return {
        type: IMPORT_RULE,
        rule, value: null, startIndex, length
      }
    }
    return null;
  }

  /**
   * Get a NAMESPACE_RULE token from css string
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getNamespaceRuleToken(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), nextCode, length = 1, rule;

    if (startCode === AT_SIGN && cssText.substr(startIndex+1, 9).toLowerCase() === "namespace"){
      // Get <rule> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length)) && nextCode !== SEMICOLON)
        length++;

      // Get <rule> text
      rule = cssText.substr(startIndex, length);

      // Ignore <;>
      length = length + 1;

      return {
        type: NAMESPACE_RULE,
        rule, value: null, startIndex, length
      }
    }
    return null;
  }

  /**
   * Get a SUPPORTS_RULE token from css string
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getSupportsRuleToken(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), nextCode, length = 1, rule, value, curlys = 0;

    if (startCode === AT_SIGN && cssText.substr(startIndex+1, 8).toLowerCase() === "supports"){

      // Get <rule> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length)) && nextCode !== OPEN_CURLY)
        length++;

      // Get <rule> text
      rule = cssText.substr(startIndex, length);

      // Ignore <{>
      length = length + 1;

      // Get <rule { value> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length))){
        if (nextCode === OPEN_CURLY) curlys ++;

        if (nextCode === CLOSE_CURLY){
          if (curlys > 0) {
            curlys--;
          } else{
            break;
          }
        }

        length++;
      }

      // Get <value> text
      value = cssText.substring(startIndex + rule.length + 1, startIndex + length);

      // Ignore <}>
      length = length + 1;

      return {
        type: SUPPORTS_RULE,
        rule, value, startIndex, length
      }
    }
    return null;
  }

  /**
   * Get a KEYFRAMES_RULE token from css string
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getKeyframesRuleToken(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), nextCode, length = 1, rule, value, curlys = 0;

    if (startCode === AT_SIGN && (
      cssText.substr(startIndex+1, 9).toLowerCase() === "keyframes"
      || cssText.substr(startIndex+1, 17).toLowerCase() === "-webkit-keyframes"
      || cssText.substr(startIndex+1, 14).toLowerCase() === "-moz-keyframes"
      || cssText.substr(startIndex+1, 12).toLowerCase() === "-o-keyframes"
      || cssText.substr(startIndex+1, 13).toLowerCase() === "-ms-keyframes"
      )){

      // Get <rule> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length)) && nextCode !== OPEN_CURLY)
        length++;

      // Get <rule> text
      rule = cssText.substr(startIndex, length);

      // Ignore <{>
      length = length + 1;

      // Get <rule { value> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length))){
        if (nextCode === OPEN_CURLY) curlys ++;

        if (nextCode === CLOSE_CURLY){
          if (curlys > 0) {
            curlys--;
          } else{
            break;
          }
        }

        length++;
      }

      // Get <value> text
      value = cssText.substring(startIndex + rule.length + 1, startIndex + length);

      // Ignore <}>
      length = length + 1;

      return {
        type: KEYFRAMES_RULE,
        rule, value, startIndex, length
      }
    }
  }

  /**
   * Get a FONTFACE_RULE token from css string
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getFontFaceRuleToken(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), nextCode, length = 1, rule, value, curlys = 0;

    if (startCode === AT_SIGN && cssText.substr(startIndex+1, 9).toLowerCase() === "font-face"){

      // Get <rule> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length)) && nextCode !== OPEN_CURLY)
        length++;

      // Get <rule> text
      rule = cssText.substr(startIndex, length);

      // Ignore <{>
      length = length + 1;

      // Get <rule { value> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length))){
        if (nextCode === OPEN_CURLY) curlys ++;

        if (nextCode === CLOSE_CURLY){
          if (curlys > 0) {
            curlys--;
          } else{
            break;
          }
        }

        length++;
      }

      // Get <value> text
      value = cssText.substring(startIndex + rule.length + 1, startIndex + length);

      // Ignore <}>
      length = length + 1;

      return {
        type: FONT_FACE_RULE,
        rule, value, startIndex, length
      }
    }
    return null;
  }

  /**
   * Get a PAGE_RULE token from css string
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getPageRuleToken(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), nextCode, length = 1, rule, value, curlys = 0;

    if (startCode === AT_SIGN && cssText.substr(startIndex+1, 4).toLowerCase() === "page"){

      // Get <rule> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length)) && nextCode !== OPEN_CURLY)
        length++;

      // Get <rule> text
      rule = cssText.substr(startIndex, length);

      // Ignore <{>
      length = length + 1;

      // Get <rule { value> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length))){
        if (nextCode === OPEN_CURLY) curlys ++;

        if (nextCode === CLOSE_CURLY){
          if (curlys > 0) {
            curlys--;
          } else{
            break;
          }
        }

        length++;
      }

      // Get <value> text
      value = cssText.substring(startIndex + rule.length + 1, startIndex + length);

      // Ignore <}>
      length = length + 1;

      return {
        type: PAGE_RULE,
        rule, value, startIndex, length
      }
    }
    return null;
  }

  /**
   * Get a VIEWPORT_RULE token from css string
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getViewportRuleToken(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), nextCode, length = 1, rule, value, curlys = 0;

    if (startCode === AT_SIGN && cssText.substr(startIndex+1, 8).toLowerCase() === "viewport"){

      // Get <rule> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length)) && nextCode !== OPEN_CURLY)
        length++;

      // Get <rule> text
      rule = cssText.substr(startIndex, length);

      // Ignore <{>
      length = length + 1;

      // Get <rule { value> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length))){
        if (nextCode === OPEN_CURLY) curlys ++;

        if (nextCode === CLOSE_CURLY){
          if (curlys > 0) {
            curlys--;
          } else{
            break;
          }
        }

        length++;
      }

      // Get <value> text
      value = cssText.substring(startIndex + rule.length + 1, startIndex + length);

      // Ignore <}>
      length = length + 1;

      return {
        type: VIEWPORT_RULE,
        rule, value, startIndex, length
      }
    }
    return null;
  }

  /**
   * Get a DOCUMENT_RULE token from css string
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getDocumentRuleToken(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), nextCode, length = 1, rule, value, curlys = 0;

    if (startCode === AT_SIGN && cssText.substr(startIndex+1, 8).toLowerCase() === "document"){

      // Get <rule> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length)) && nextCode !== OPEN_CURLY)
        length++;

      // Get <rule> text
      rule = cssText.substr(startIndex, length);

      // Ignore <{>
      length = length + 1;

      // Get <rule { value> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length))){
        if (nextCode === OPEN_CURLY) curlys ++;

        if (nextCode === CLOSE_CURLY){
          if (curlys > 0) {
            curlys--;
          } else{
            break;
          }
        }

        length++;
      }

      // Get <value> text
      value = cssText.substring(startIndex + rule.length + 1, startIndex + length);

      // Ignore <}>
      length = length + 1;

      return {
        type: DOCUMENT_RULE,
        rule, value, startIndex, length
      }
    }
    return null;
  }

  /**
   * Get a COUNTER_STYLE_RULE token from css string
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getCounterStyleRuleToken(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), nextCode, length = 1, rule, value, curlys = 0;

    if (startCode === AT_SIGN && cssText.substr(startIndex+1, 13).toLowerCase() === "counter-style"){

      // Get <rule> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length)) && nextCode !== OPEN_CURLY)
        length++;

      // Get <rule> text
      rule = cssText.substr(startIndex, length);

      // Ignore <{>
      length = length + 1;

      // Get <rule { value> length
      while ( (nextCode = cssText.charCodeAt(startIndex + length))){
        if (nextCode === OPEN_CURLY) curlys ++;

        if (nextCode === CLOSE_CURLY){
          if (curlys > 0) {
            curlys--;
          } else{
            break;
          }
        }

        length++;
      }

      // Get <value> text
      value = cssText.substring(startIndex + rule.length + 1, startIndex + length);

      // Ignore <}>
      length = length + 1;

      return {
        type: COUNTER_STYLE_RULE,
        rule, value, startIndex, length
      }
    }
    return null;
  }

  /**
   * Get a whitespace length to ignore
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getWhitespaceLength(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), prevCode, nextCode, length = 1;

    if (startCode === WHITESPACE || startCode === NEW_LINE){
      while ( (nextCode = cssText.charCodeAt(startIndex + length) === WHITESPACE) || (nextCode === NEW_LINE) )
        length++;
      return { value: cssText.substr(startIndex, length), startIndex, length};
    }
    return null;
  }

  /**
   * Get a comment length to ignore
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getCommentLength(cssText, startIndex){
    let startCode = cssText.charCodeAt(startIndex), prevCode, nextCode, length = 1;

    if ((startCode === SLASH) && (nextCode = cssText.charCodeAt(startIndex + length++) === ASTERISK)){
      while (nextCode){
        prevCode = nextCode;
        nextCode = cssText.charCodeAt(startIndex + length++);

        if (prevCode === ASTERISK && nextCode === SLASH) break;
      }
      return { value: cssText.substr(startIndex, length), startIndex, length };
    }
    return null;
  }

  /**
   * Get a specific at-rule token
   * @param cssText
   * @param startIndex
   * @returns {object|null}
   */
  getAtRuleToken(cssText, startIndex){
    return this.getMediaRuleToken(cssText, startIndex)
      || this.getImportRuleToken(cssText, startIndex)
      || this.getSupportsRuleToken(cssText, startIndex)
      || this.getKeyframesRuleToken(cssText, startIndex)
      || this.getFontFaceRuleToken(cssText, startIndex)
      || this.getPageRuleToken(cssText, startIndex)
      || this.getDocumentRuleToken(cssText, startIndex)
      || this.getViewportRuleToken(cssText, startIndex)
      || this.getNamespaceRuleToken(cssText, startIndex)
      || this.getCounterStyleRuleToken(cssText, startIndex);
  }

  /**
   * Get a token starting from a target position
   * @param cssText
   * @param startIndex
   * @returns {object}
   *
   * @throws SyntaxError - if char at {startIndex} doesn't match any grammar rules
   */
  getToken(cssText, startIndex){
    let token, startCode;

    // Get token type
    switch (startCode = cssText.charCodeAt(startIndex)){
      // Try to ignore a comment
      case SLASH:
        if (token = this.getCommentLength(cssText, startIndex)) return token;
        break;

      // Try to ignore a much whitespaces as possible
      case WHITESPACE:
      case NEW_LINE:
        if (token = this.getWhitespaceLength(cssText, startIndex)) return token;
        break;

      // Try to consume an AT_RULE
      case AT_SIGN:
        if (token = this.getAtRuleToken(cssText, startIndex)) return token;
        break;

      // Try to consume a STYLE_RULE
      default:
        if (token = this.getStyleRuleToken(cssText, startIndex)) return token;
        break;
    }
    // Otherwise, ignore a character
    return { length: 1 };
  }

  /**
   * Create a set of tokens from target css string
   * @param cssText
   * @returns {Array}
   */
  tokenize(cssText){
    let tokens = [], index, token;

    // Loop through cssText char codes
    for ( index = 0; index < cssText.length; index++) {

      // Create a token
      token = this.getToken(cssText, index);

      // Shift loop pointer by token size
      index = index + token.length - 1;

      // Add token to tokensList
      if (token.type) tokens.push(token);
    }

    return tokens;
  }
}

export default CSSOMTokenizer;