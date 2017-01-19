import VirtualRule from "../../../src/VirtualRule.es6";

describe("Virtual Rule", () => {
  describe("constructor()", () => {
    it("new VirtualRule() ==> Error", () => {
      expect(() => new VirtualRule()).toThrowError(Error);
    });

    it("new VirtualRule({}) ==> Error", () => {
      expect(() => new VirtualRule({})).toThrowError(Error);
    });

    it(`new VirtualRule({type: 1, startOffset:0, endOffset:11, cssText: ".example {}"}) ==> Success`, () => {
      let rule = new VirtualRule({type: 1, startOffset:0, endOffset:11, cssText: ".example {}"});
      expect(rule instanceof VirtualRule).toEqual(true);
      expect(rule.parentRule).toEqual(null);
      expect(rule._hooks).toEqual({});
      expect(rule.lazyParsing).toEqual(0);
    });
  });

  describe("getHead()", () => {
    it(".selector { prop: value } ==> [0, 10]", () => {
      let rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:25,
        cssText: ".selector { prop: value }"
      });

      let head = rule.getHead();

      expect(head).toEqual({
        startOffset: 0,
        endOffset: 10
      });
    });

    it("{ prop: value } ==> SyntaxError", () => {
      let rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:15,
        cssText: "{ prop: value }"
      });

      expect(() => rule.getHead()).toThrowError(SyntaxError);
    });

    it(`@charset "UTF-8"; ==> [0,16]`, () => {
      let rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:17,
        cssText: `@charset "UTF-8";`
      });

      expect(rule.getHead()).toEqual({
        startOffset: 0,
        endOffset: 16
      });
    });
  });

  describe("getBody()", () => {
    it(".selector { prop: value } ==> [10, 15]", () => {
      let rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:25,
        cssText: ".selector { prop: value }"
      });

      let body = rule.getBody();

      console.log(rule.cssText.substring(body.startOffset, body.endOffset));

      expect(body).toEqual({
        startOffset: 11,
        endOffset: 24
      });
    });

    it("@media print { .test { prop: value } } ==> [14, 37]", () => {
      let rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:38,
        cssText: "@media print { .test { prop: value } }"
      });

      let body = rule.getBody();

      console.log(rule.cssText.substring(body.startOffset, body.endOffset));

      expect(body).toEqual({
        startOffset: 14,
        endOffset: 37
      });
    });


    it("@media print { ==> SyntaxError", () => {
      let rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:14,   
        cssText: "@media print {"
      });

      expect(() => rule.getBody()).toThrowError(SyntaxError);
    });
  });
});