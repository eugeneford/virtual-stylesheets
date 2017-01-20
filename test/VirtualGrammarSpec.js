var VirtualGrammar = VSM.VirtualGrammar;

describe("Virtual Grammar", function() {
  describe("KEYFRAME_RULE.test()", function() {
    it(`Returned true when correct rule definition was passed`, function() {
      expect(VirtualGrammar._test[8](`100% {}`)).toEqual(true);
    });

    it(`Returned false when incorrect rule definition was passed `, function() {
      expect(VirtualGrammar._test[8](`@first-child {}`)).toEqual(false);
    });
  });

  describe("getRuleType()", function() {
    it(`Returned a STYLE_RULE when .classname {} was passed `, function() {
      expect(VirtualGrammar.getRuleType(`.classname {}`)).toEqual(VirtualGrammar.STYLE_RULE);
    });

    it(`Returned a STYLE_RULE when :first-child {} was passed`, function() {
      expect(VirtualGrammar.getRuleType(`:first-child {}`)).toEqual(VirtualGrammar.STYLE_RULE);
    });

    it(`Returned a STYLE_RULE when body {} was passed`, function() {
      expect(VirtualGrammar.getRuleType(`body {}`)).toEqual(VirtualGrammar.STYLE_RULE);
    });

    it(`Returned a MEDIA_RULE when @media print {} was passed`, function() {
      expect(VirtualGrammar.getRuleType(`@media print {}`)).toEqual(VirtualGrammar.MEDIA_RULE);
    });

    it(`Returned a KEYFRAMES_RULE when @keyframes anim {} was passed`, function() {
      expect(VirtualGrammar.getRuleType(`@keyframes anim {}`)).toEqual(VirtualGrammar.KEYFRAMES_RULE);
    });

    it(`Returned a KEYFRAME_RULE when 100% {} was passed`, function() {
      expect(VirtualGrammar.getRuleType(`100% {}`)).toEqual(VirtualGrammar.KEYFRAME_RULE);
    });

    it(`Returned a FONT_FACE_RULE when @font-face {} was passed`, function() {
      expect(VirtualGrammar.getRuleType(`@font-face {}`)).toEqual(VirtualGrammar.FONT_FACE_RULE);
    });

    it(`Returned a CHARSET_RULE when @charset "UTF-8"; was passed`, function() {
      expect(VirtualGrammar.getRuleType(`@charset "UTF-8";`)).toEqual(VirtualGrammar.CHARSET_RULE);
    });

    it(`Returned a PAGE_RULE when @page :first {} was passed`, function() {
      expect(VirtualGrammar.getRuleType(`@page :first {}`)).toEqual(VirtualGrammar.PAGE_RULE);
    });

    it(`Returned a NAMESPACE_RULE when @namespace url(XML-namespace-URL); was passed`, function() {
      expect(VirtualGrammar.getRuleType(`@namespace url(XML-namespace-URL);`)).toEqual(VirtualGrammar.NAMESPACE_RULE);
    });

    it(`Returned a SUPPORTS_RULE when @supports (animation-name: test) {} was passed`, function() {
      expect(VirtualGrammar.getRuleType(`@supports (animation-name: test) {}`)).toEqual(VirtualGrammar.SUPPORTS_RULE);
    });

    it(`Returned a VIEWPORT_RULE when @viewport {} was passed`, function() {
      expect(VirtualGrammar.getRuleType(`@viewport {}`)).toEqual(VirtualGrammar.VIEWPORT_RULE);
    });

    it(`Returned a UNKNOWN_RULE when 123456qwerty {} was passed`, function() {
      expect(VirtualGrammar.getRuleType(`123456qwerty {}`)).toEqual(VirtualGrammar.UNKNOWN_RULE);
    });
  });

  describe("define()", function() {
    it(`Threw an Error when ruleType wasnt passed`, function() {
      var ruleType = {};
      expect(function() { VirtualGrammar.define(ruleType)}).toThrowError(TypeError);
    });

    it(`Threw an Error when ruleType's type wasnt a string`, function() {
      var ruleType = {type: 4};
      expect(function() { VirtualGrammar.define(ruleType) }).toThrowError(TypeError);
    });

    it(`Threw an Error when ruleType's value wasnt passed`, function() {
      var ruleType = {type: "CUSTOM_RULE"};
      expect(function() { VirtualGrammar.define(ruleType) }).toThrowError(TypeError);
    });

    it(`Threw an Error when ruleType's value wasnt a number`, function() {
      var ruleType = {type: "CUSTOM_RULE", value: "error"};
      expect(function() { VirtualGrammar.define(ruleType) }).toThrowError(TypeError);
    });

    it(`Threw an Error when ruleType's test function wasnt passed`, function() {
      var ruleType = {type: "CUSTOM_RULE", value: 99};
      expect(function() { VirtualGrammar.define(ruleType) }).toThrowError(TypeError);
    });

    it(`Threw an Error when ruleType's test wasnt a function`, function() {
      var ruleType = {type: "CUSTOM_RULE", value: 99, test: null};
      expect(function() { VirtualGrammar.define(ruleType) }).toThrowError(TypeError);
    });

    it(`Successfully defined a new RuleType`, function() {
      var ruleType = {type: "CUSTOM_RULE", value: 99, test: function(){return false}};
      expect(VirtualGrammar.define(ruleType)).toBe(true);
    });
  });
});