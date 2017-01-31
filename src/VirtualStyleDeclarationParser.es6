
const WHITESPACE    = " ".charCodeAt(0);
const NEW_LINE      = "\n".charCodeAt(0);
const SLASH         = "/".charCodeAt(0);
const BACKSLASH     = "\\".charCodeAt(0);
const SINGLE_QUOTE  = "\'".charCodeAt(0);
const DOUBLE_QUOTE  = "\"".charCodeAt(0);
const MINUS         = "-".charCodeAt(0);
const COLON         = ":".charCodeAt(0);
const ASTERISK      = "*".charCodeAt(0);
const SEMICOLON     = ";".charCodeAt(0);

const CF_LETTER = function(code){
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
};

const CF_NUMBER = function(code){
  return code >= 48 && code <= 57;
};

const CF_NON_ASCII = function(code){
  return code >= 128;
};

class VirtualStyleDeclarationParser {
  constructor() {
    throw new Error("Attempt to create a copy of static class");
  }

  static getWhitespaceLength(cssText, startIndex){
    let index = startIndex, nextCode, endOffset;

    while (index < cssText.length) {
      nextCode = cssText.charCodeAt(index);

      if (nextCode !== WHITESPACE && nextCode !== NEW_LINE) break;

      index++;
      endOffset = index;
    }

    return {endOffset};
  }

  static getCommentLength(cssText, startIndex) {
    let index = startIndex, prevCode, nextCode, endOffset;

    while (index < cssText.length) {
      nextCode = cssText.charCodeAt(index);

      index++;
      endOffset = index;

      // Check if comment end was spotted
      if (prevCode === ASTERISK && nextCode === SLASH) break;

      prevCode = nextCode;
    }

    return {endOffset};
  }

  static getDeclarationToken(cssText, startIndex){
    let index = startIndex, nextCode, startOffset, endOffset, property, value, prevCode, quotesCode, valueOffset;

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

      /* Check if declaration was started */
      if (startOffset === undefined && (nextCode === MINUS || CF_LETTER(nextCode) || CF_NON_ASCII(nextCode))){
        startOffset = index;
      }

      /* Check if property name bounds spotted */
      if (!!startOffset && !quotesCode && nextCode === COLON ) {
        property = cssText.substring(startOffset, index).trim();
      }

      /* Check if property value bounds spotted*/
      if (property && !valueOffset && nextCode !== WHITESPACE && nextCode !== NEW_LINE && nextCode !== COLON){
        valueOffset = index;
      }

      index++;
      endOffset = index;

      // Check if end of rule was spotted
      if (!quotesCode && nextCode === SEMICOLON || index === cssText.length) {
        if (!!valueOffset) value = cssText.substring(valueOffset, index - 1);
        break;
      }

      prevCode = nextCode;
    }

    return {startOffset, endOffset, property, value};
  }

  static parseAt(cssText, startIndex) {
    let startCode;

    switch (startCode = cssText.charCodeAt(startIndex)){
      case WHITESPACE:
      case NEW_LINE:
        return VirtualStyleDeclarationParser.getWhitespaceLength(cssText, startIndex);

      case SLASH:
        return VirtualStyleDeclarationParser.getCommentLength(cssText, startIndex);

      default:
        return VirtualStyleDeclarationParser.getDeclarationToken(cssText, startIndex);
    }
  }

  static parse(cssText) {
    let declarations = [], declaration, index = 0;

    while (index < cssText.length) {

      // Create a token
      declaration = VirtualStyleDeclarationParser.parseAt(cssText, index);

      // Shift loop pointer by token size
      index = declaration.endOffset;

      // Add token to tokensList
      if (declaration.startOffset) {
        declarations.push(declaration);
      }
    }

    return declarations; 
  }
}

export default VirtualStyleDeclarationParser;