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

const TYPES = {
  QUALIFIED_RULE_TOKEN : 1,
  AT_RULE_TOKEN :        2,
  COMMENT_TOKEN :        3,
  WHITESPACE_TOKEN :     4,
  UNKNOWN_TOKEN :        5
};

const WHITESPACE =   ' '.charCodeAt(0);
const NEW_LINE =     '\n'.charCodeAt(0);
const SLASH =        '\\'.charCodeAt(0);
const BACKSLASH =    '/'.charCodeAt(0);
const HASH =         '#'.charCodeAt(0);
const ASTERISK =     '*'.charCodeAt(0);
const DOT_SIGN =     '.'.charCodeAt(0);
const COLON =        ':'.charCodeAt(0);
const SEMICOLON =    ';'.charCodeAt(0);
const OPEN_SQUARE =  '['.charCodeAt(0);
const OPEN_CURLY =   '{'.charCodeAt(0);
const CLOSE_CURLY =  '}'.charCodeAt(0);
const AT_SIGN =      '@'.charCodeAt(0);
const SINGLE_QUOTE = '\''.charCodeAt(0);
const DOUBLE_QUOTE = '\"'.charCodeAt(0);

const CF_WORD = function (code) {
  return (code >= 128 || code === 45 || code == 245 || (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122));
};

/**
 * Simple and fast top-level css rule based tokenizer. Use a tokenize() method to create a set of tokens.
 * There are 5 levels (default is 2) of tokenization:
 * 1 - include qualified rules only
 * 2 - include qualified and at-rules only
 * 3 - include qualified, at-rules and comments
 * 4 - include qualified, at-rules, comments and whitespaces
 * 5 - include any kind of data
 *
 * @example
 * tokenizer = new VirtualTokenizer();
 * tokens = tokenizer.tokenize("#example { }");
 * tokens //=> [{type: 1, startOffset: 0, length: 12, value: "#example { }"}];
 */
class VirtualTokenizer {
  constructor() {

  }

  /**
   * Read a qualified rule token starting at specified position
   * @param cssText
   * @param startIndex
   * @returns {*}
   */
  getQualifiedRuleToken(cssText, startIndex) {
    let index = startIndex, length = 0, fits, nextCode, prevCode, startCode = cssText.charCodeAt(startIndex), quotesCode;

    if (startCode === ASTERISK || startCode === DOT_SIGN || CF_WORD(startCode)
      || startCode === HASH || startCode === OPEN_SQUARE || startCode === COLON) {
      while (index < cssText.length) {
        nextCode = cssText.charCodeAt(index);

        // Check if " or ' was spotted without escape \
        if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
          if (!!quotesCode) {
            if (nextCode === quotesCode) quotesCode = undefined;
          } else {
            quotesCode = nextCode;
          }
        }

        length++;
        index++;

        if (!quotesCode && fits && nextCode === OPEN_CURLY) fits = false;
        if (!quotesCode && !fits && nextCode === OPEN_CURLY) fits = true;
        if (!quotesCode && !fits && nextCode === SEMICOLON) break;
        if (!quotesCode && nextCode === CLOSE_CURLY) break;

        prevCode = nextCode;
      }

      return {type: fits ? TYPES.QUALIFIED_RULE_TOKEN : TYPES.UNKNOWN_TOKEN, startOffset: startIndex, length};
    }

    return null;
  }

  /**
   * Read a at-rule token starting at specified position
   * @param cssText
   * @param startIndex
   * @returns {*}
   */
  getAtRuleToken(cssText, startIndex) {
    let index = startIndex, fits, nextCode, prevCode, length = 0, startCode = cssText.charCodeAt(startIndex), quotesCode, openCurlyCount = 0;

    if (startCode === AT_SIGN) {
      while (index < cssText.length) {
        nextCode = cssText.charCodeAt(index);

        // Check if " or ' was spotted without escape \
        if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
          if (!!quotesCode) {
            if (nextCode === quotesCode) quotesCode = undefined;
          } else {
            quotesCode = nextCode;
          }
        }

        if (!quotesCode && !fits && (nextCode === OPEN_CURLY || nextCode === SEMICOLON)) fits = true;
        if (!quotesCode && nextCode === OPEN_CURLY) openCurlyCount++;
        if (!quotesCode && nextCode === CLOSE_CURLY) openCurlyCount--;

        length++;
        index++;

        if (!quotesCode && !openCurlyCount && nextCode === SEMICOLON) break;
        if (!quotesCode && !openCurlyCount && nextCode === CLOSE_CURLY) break;

        prevCode = nextCode;
      }

      return {type: fits ? TYPES.AT_RULE_TOKEN: TYPES.UNKNOWN_TOKEN, startOffset: startIndex, length};
    }

    return null;
  }

  /**
   * Read a comment token starting at specified position
   * @param cssText
   * @param startIndex
   * @returns {*}
   */
  getCommentToken(cssText, startIndex) {
    let startCode = cssText.charCodeAt(startIndex), prevCode, nextCode, length = 1;

    if ((startCode === BACKSLASH) && (nextCode = cssText.charCodeAt(startIndex + length++) === ASTERISK)) {
      while (nextCode) {
        prevCode = nextCode;
        nextCode = cssText.charCodeAt(startIndex + length);

        if (nextCode) length++;
        if (prevCode === ASTERISK && nextCode === BACKSLASH) break;
      }
      return {type: TYPES.COMMENT_TOKEN, startOffset: startIndex, length};
    }
    return null;
  }

  /**
   * Read a whitespace token starting at specified position
   * @param cssText
   * @param startIndex
   * @returns {*}
   */
  getWhitespaceToken(cssText, startIndex) {
    let index = startIndex, nextCode, length = 0;

    while (index < cssText.length) {
      nextCode = cssText.charCodeAt(index);

      if (nextCode !== WHITESPACE && nextCode !== NEW_LINE) break;

      length++;
      index++;
    }

    if (length) {
      return {type: TYPES.WHITESPACE_TOKEN, startOffset: startIndex, length};
    }

    return null;
  }

  /**
   * Read an unknown token starting at specified position
   * @param cssText
   * @param startIndex
   * @returns {*}
   */
  getUnknownToken(cssText, startIndex) {
    let index = startIndex, nextCode, secondCode, thirdCode, length = 0, isNextTokenBounds;

    while (index < cssText.length) {
      switch (nextCode = cssText.charCodeAt(index)) {
        case SLASH:
          if (secondCode = cssText.charCodeAt(index + 1) === ASTERISK)
            isNextTokenBounds = true;
          break;

        case NEW_LINE:
        case WHITESPACE:
          isNextTokenBounds = true;
          break;
      }

      if (isNextTokenBounds) break;

      length++;
      index++;
    }

    if (length) {
      return {type: TYPES.UNKNOWN_TOKEN, startOffset: startIndex, length};
    }

    return null;
  }

  /**
   * Read a token starting at specified position
   * @param cssText
   * @param startIndex
   * @returns {object}
   */
  getToken(cssText, startIndex) {
    let token, startCode = cssText.charCodeAt(startIndex);

    switch (startCode) {
      case AT_SIGN:
        if (token = this.getAtRuleToken(cssText, startIndex)) return token;
        break;

      case NEW_LINE:
      case WHITESPACE:
        if (token = this.getWhitespaceToken(cssText, startIndex)) return token;
        break;

      case SLASH:
        if (token = this.getCommentToken(cssText, startIndex)) return token;
        break;

      default:
        if (token = this.getQualifiedRuleToken(cssText, startIndex)) return token;
        break;
    }
    return this.getUnknownToken(cssText, startIndex);
  }

  /**
   * Create a set of grammar tokens basing on tokenization level (default is 2).
   * There are 5 levels of tokenization:
   * 1 - include qualified rules only
   * 2 - include qualified and at-rules only
   * 3 - include qualified, at-rules and comments
   * 4 - include qualified, at-rules, comments and whitespaces
   * 5 - include any kind of data
   * @param cssText - source css text
   * @param level - level of tokenization ( 1 to 5 )
   * @returns {Array}
   */
  tokenize(cssText, level = 2) {
    let tokens = [], token, index = 0, i;

    while (index < cssText.length) {

      // Create a token
      token = this.getToken(cssText, index);

      // Shift loop pointer by token size
      index = index + token.length;

      // Add token to tokensList if satisfy tokenization level
      if (token.type <= level) {
        token = Object.assign({}, token, { value: cssText.substr(token.startOffset, token.length)});
        tokens.push(token);
      }
    }

    return tokens;
  }
}

Object.assign(VirtualTokenizer, TYPES);

export default VirtualTokenizer;