const HASH              = '#'.charCodeAt(0);
const ASTERISK          = '*'.charCodeAt(0);
const DOT_SIGN          = '.'.charCodeAt(0);
const COLON             = ':'.charCodeAt(0);
const OPEN_SQUARE       = '['.charCodeAt(0);

const CF_WORD = function (code) {
  return (code >= 128 || code === 45 || code == 245 || (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122));
};

class VirtualGrammar {
  constructor(){
    this._test = {};
    this.UNKNOWN_RULE = 0;
  }

  /**
   * Get all rule types defined in grammar
   * @returns {object}
   */
  getTypes(){
    let types = {};
    for (let i in this) {
      if (this._test[this[i]]) types[i] = this[i];
    }
    types.UNKNOWN_RULE = this.UNKNOWN_RULE;
    return types;
  }

  /**
   * Get VirtualRule type based on specified rule
   * @param rule
   * @returns {number}
   */
  getRuleType(rule){
    for (let i in this) {
      if (this._test[this[i]] && this._test[this[i]](rule)) return this[i];
    }
    return this.UNKNOWN_RULE;
  }

  /**
   * Defines a new Rule lexeme in grammar
   * @param ruleType
   */
  define(ruleType) {
    if (typeof ruleType.type !== "string") throw TypeError("Lexeme.type is not a string");
    if (typeof ruleType.value !== "number") throw TypeError("Lexeme.value is not a number");
    if (typeof ruleType.test !== "function") throw TypeError("Lexeme.test is not a function");
    this[ruleType.type] = ruleType.value;
    this._test[ruleType.value] = ruleType.test;
    return true;
  }
}

const Grammar = new VirtualGrammar();

Grammar.define({
  type: "STYLE_RULE",
  value: 1,
  test: function(rule){
    let startCode = rule.charCodeAt(0);
    return !!(startCode === ASTERISK || startCode === DOT_SIGN || ( CF_WORD(startCode) && !((startCode >= 48 && startCode <= 57)))
    || startCode === HASH || startCode === OPEN_SQUARE || startCode === COLON);
  }
});

Grammar.define({
  type: "CHARSET_RULE",
  value: 2,
  test: function(rule){
    return rule.substr(0, "@charset".length) === "@charset";
  }
});

Grammar.define({
  type: "IMPORT_RULE",
  value: 3,
  test: function(rule){
    return rule.substr(0, "@import".length) === "@import";
  }
});

Grammar.define({
  type: "MEDIA_RULE",
  value: 4,
  test: function(rule){
    return rule.substr(0, "@media".length) === "@media";
  }
});

Grammar.define({
  type: "FONT_FACE_RULE",
  value: 5,
  test: function(rule){
    return rule.substr(0, "@font-face".length) === "@font-face";
  }
});

Grammar.define({
  type: "PAGE_RULE",
  value: 6,
  test: function(rule){
    return rule.substr(0, "@page".length) === "@page";
  }
});

Grammar.define({
  type: "KEYFRAMES_RULE",
  value: 7,
  test: function(rule){
    return rule.substr(0, "@keyframes".length) === "@keyframes"
      || rule.substr(0, "@-webkit-keyframes".length) === "@-webkit-keyframes"
      || rule.substr(0, "@-moz-keyframes".length) === "@-moz-keyframes"
      || rule.substr(0, "@-ms-keyframes".length) === "@-ms-keyframes"
      || rule.substr(0, "@-o-keyframes".length) === "@-o-keyframes";
  }
});

Grammar.define({
  type: "KEYFRAME_RULE",
  value: 8,
  test: function(rule){
    let value = rule, i,
      codes = [value.charCodeAt(0), value.charCodeAt(1), value.charCodeAt(2), value.charCodeAt(3)];

    for (i = 0; i < codes.length; i++) {
      // If code starts a percentage number
      if (i > 0 && codes[i] === 37) return true;

      // If code is not a digit
      if (codes[i] < 48 || codes[i] > 57) return false;
    }

    // Otherwise, codes refers to a number
    return false;
  }
});

Grammar.define({
  type: "NAMESPACE_RULE",
  value: 10,
  test: function(rule){
    return rule.substr(0, "@namespace".length) === "@namespace";
  }
});

Grammar.define({
  type: "SUPPORTS_RULE",
  value: 12,
  test: function(rule){
    return rule.substr(0, "@supports".length) === "@supports";
  }
});

Grammar.define({
  type: "VIEWPORT_RULE",
  value: 15,
  test: function(rule){
    return rule.substr(0, "@viewport".length) === "@viewport";
  }
});

export default Grammar;