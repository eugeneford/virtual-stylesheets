import VirtualGrammar from "../../../src/VirtualGrammar.es6";

describe("Virtual Grammar", () => {
  describe("constructor()", () => {
    it(`new VirtualGrammar() ==> TypeError`, () => {
      expect(() => new VirtualGrammar()).toThrowError(TypeError);
    });
  });

  describe("getRuleType()", () => {
    it(`.classname {} ==> STYLE_RULE`, () => {
      expect(VirtualGrammar.getRuleType(`.classname {}`)).toEqual(VirtualGrammar.STYLE_RULE);
    });

    it(`@media print {} ==> MEDIA_RULE`, () => {
      expect(VirtualGrammar.getRuleType(`@media print {}`)).toEqual(VirtualGrammar.MEDIA_RULE);
    });

    it(`@keyframes anim {} ==> KEYFRAMES_RULE`, () => {
      expect(VirtualGrammar.getRuleType(`@keyframes anim {}`)).toEqual(VirtualGrammar.KEYFRAMES_RULE);
    });

    it(`100% {} ==> KEYFRAME_RULE`, () => {
      expect(VirtualGrammar.getRuleType(`100% {}`)).toEqual(VirtualGrammar.KEYFRAME_RULE);
    });

    it(`@font-face {} ==> FONT_FACE_RULE`, () => {
      expect(VirtualGrammar.getRuleType(`@font-face {}`)).toEqual(VirtualGrammar.FONT_FACE_RULE);
    });

    it(`@charset "UTF-8"; ==> CHARSET_RULE`, () => {
      expect(VirtualGrammar.getRuleType(`@charset "UTF-8";`)).toEqual(VirtualGrammar.CHARSET_RULE);
    });

    it(`@page :first {} ==> PAGE_RULE`, () => {
      expect(VirtualGrammar.getRuleType(`@page :first {}`)).toEqual(VirtualGrammar.PAGE_RULE);
    });

    it(`@namespace url(XML-namespace-URL); ==> NAMESPACE_RULE`, () => {
      expect(VirtualGrammar.getRuleType(`@namespace url(XML-namespace-URL);`)).toEqual(VirtualGrammar.NAMESPACE_RULE);
    });

    it(`@supports (animation-name: test) {} ==> SUPPORTS_RULE`, () => {
      expect(VirtualGrammar.getRuleType(`@supports (animation-name: test) {}`)).toEqual(VirtualGrammar.SUPPORTS_RULE);
    });

    it(`@viewport {} ==> VIEWPORT_RULE`, () => {
      expect(VirtualGrammar.getRuleType(`@viewport {}`)).toEqual(VirtualGrammar.VIEWPORT_RULE);
    });

    it(`123456qwerty {} ==> UNKNOWN_RULE`, () => {
      expect(VirtualGrammar.getRuleType(`123456qwerty {}`)).toEqual(VirtualGrammar.UNKNOWN_RULE);
    });
  });
});