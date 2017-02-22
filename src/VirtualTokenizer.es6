const TYPES = {
  QUALIFIED_RULE_TOKEN : 1,
  AT_RULE_TOKEN :        2,
  COMMENT_TOKEN :        3,
  WHITESPACE_TOKEN :     4,
  UNKNOWN_TOKEN :        5
};

const WHITESPACE =   ' '.charCodeAt(0);
const NEW_LINE =     '\n'.charCodeAt(0);
const CARRIAGE_RETURN = 13;
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
    throw new Error("Attempt to create a copy of static class");
  }

  /**
   * Read a qualified rule token starting at specified position
   * @param cssText
   * @param startIndex
   * @returns {*}
   */
  static getQualifiedRuleToken(cssText, startIndex) {
    let index = startIndex, length = 0, fits, nextCode, hasAt, prevCode, startCode = cssText.charCodeAt(startIndex), quotesCode, commentOpened;

    if (startCode === ASTERISK || startCode === DOT_SIGN || CF_WORD(startCode)
      || startCode === HASH || startCode === OPEN_SQUARE || startCode === COLON) {
      while (index < cssText.length) {
        nextCode = cssText.charCodeAt(index);

        if (prevCode && prevCode === BACKSLASH && nextCode === ASTERISK) {
          commentOpened = true;
        }

        // Check if " or ' was spotted without escape \
        if (!commentOpened && prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
          if (!!quotesCode) {
            if (nextCode === quotesCode) quotesCode = undefined;
          } else {
            quotesCode = nextCode;
          }
        }

        length++;
        index++;

        if (!commentOpened && !quotesCode && nextCode === AT_SIGN) hasAt = true;
        if (!commentOpened && !quotesCode && fits && nextCode === OPEN_CURLY) { fits = false; break; }
        if (!commentOpened && !quotesCode && !fits && nextCode === OPEN_CURLY) fits = true;
        if (!commentOpened && !quotesCode && !fits && nextCode === SEMICOLON) break;
        if (!commentOpened && !quotesCode && nextCode === CLOSE_CURLY) break;

        if (commentOpened && prevCode && prevCode === ASTERISK && nextCode === BACKSLASH){
          commentOpened = false;
        }

        prevCode = nextCode;
      }

      return {type: fits && !hasAt ? TYPES.QUALIFIED_RULE_TOKEN : TYPES.UNKNOWN_TOKEN, startOffset: startIndex, length};
    }

    return null;
  }

  /**
   * Read a at-rule token starting at specified position
   * @param cssText
   * @param startIndex
   * @returns {*}
   */
  static getAtRuleToken(cssText, startIndex) {
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
  static getCommentToken(cssText, startIndex) {
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
  static getWhitespaceToken(cssText, startIndex) {
    let index = startIndex, nextCode, length = 0;

    while (index < cssText.length) {
      nextCode = cssText.charCodeAt(index);

      if (nextCode !== WHITESPACE && nextCode !== NEW_LINE && nextCode !== CARRIAGE_RETURN) break;

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
  static getUnknownToken(cssText, startIndex) {
    let index = startIndex, nextCode, secondCode, thirdCode, length = 0, isNextTokenBounds, hypothesis;

    while (index < cssText.length) {
      switch (nextCode = cssText.charCodeAt(index)) {
        case BACKSLASH:
          if (secondCode = cssText.charCodeAt(index + 1) === ASTERISK)
            isNextTokenBounds = true;
          break;

        case AT_SIGN:
          if ((hypothesis = VirtualTokenizer.getAtRuleToken(cssText, index)) && hypothesis.type === TYPES.AT_RULE_TOKEN) isNextTokenBounds = true;
          break;

        case CARRIAGE_RETURN:
        case NEW_LINE:
        case WHITESPACE:
          isNextTokenBounds = true;
          break;

        default:
          if (nextCode === ASTERISK || nextCode === DOT_SIGN || CF_WORD(nextCode)
            || nextCode === HASH || nextCode === OPEN_SQUARE || nextCode === COLON) {
            if ((hypothesis = VirtualTokenizer.getQualifiedRuleToken(cssText, index)) && hypothesis.type === TYPES.QUALIFIED_RULE_TOKEN) isNextTokenBounds = true;
          }
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
  static getToken(cssText, startIndex) {
    let token, startCode = cssText.charCodeAt(startIndex);

    switch (startCode) {
      case AT_SIGN:
        return VirtualTokenizer.getAtRuleToken(cssText, startIndex);

      case CARRIAGE_RETURN:
      case NEW_LINE:
      case WHITESPACE:
        return VirtualTokenizer.getWhitespaceToken(cssText, startIndex);

      case BACKSLASH:
        if (token = VirtualTokenizer.getCommentToken(cssText, startIndex)) return token;
        break;

      default:
        return VirtualTokenizer.getQualifiedRuleToken(cssText, startIndex);
    }
    return VirtualTokenizer.getUnknownToken(cssText, startIndex);
  }

  /**
   * Create a set of grammar tokens basing on tokenization level (default is 2).
   * There are 5 levels of tokenization:
   * 1 - include qualified rules only
   * 2 - include qualified and at-rules only
   * 3 - include qualified, at-rules and comments
   * 4 - include qualified, at-rules, comments and whitespaces
   * 5 - include any kind of data
   * @param cssText - source css  text
   * @param level - level of tokenization ( 1 to 5 )
   * @returns {Array}
   */
  static tokenize(cssText, level = 2) {
    let tokens = [], token, index = 0, i;

    while (index < cssText.length) {

      // Create a token
      token = VirtualTokenizer.getToken(cssText, index);

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