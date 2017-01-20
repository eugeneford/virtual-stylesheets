var VirtualRule = VSM.VirtualRule;

describe("Virtual Rule", function() {
  describe("constructor()", function() {
    it("new VirtualRule() ==> Error", function() {
      expect(function() { new VirtualRule()}).toThrowError(Error);
    });

    it("new VirtualRule({}) ==> Error", function() {
      expect(function() { new VirtualRule({})}).toThrowError(Error);
    });

    it(`new VirtualRule({type: 1, startOffset:0, endOffset:11, cssText: ".example {}"}) ==> Success`, function() {
      var rule = new VirtualRule({type: 1, startOffset:0, endOffset:11, cssText: ".example {}"});
      expect(rule instanceof VirtualRule).toEqual(true);
      expect(rule.parentRule).toEqual(null);
      expect(rule._opts).toEqual({});
      expect(rule.lazyParsing).toEqual(0);
    });
  });

  describe("getHead()", function() {
    it(".selector { prop: value } ==> [0, 10]", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:25,
        cssText: ".selector { prop: value }"
      });

      var head = rule.getHead();

      expect(head).toEqual({
        startOffset: 0,
        endOffset: 10
      });
    });

    it("{ prop: value } ==> SyntaxError", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:15,
        cssText: "{ prop: value }"
      });

      expect(function() { rule.getHead() }).toThrowError(SyntaxError);
    });

    it(`@charset "UTF-8"; ==> [0,16]`, function() {
      var rule = new VirtualRule({
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

  describe("getBody()", function() {
    it(".selector { prop: value } ==> [10, 15]", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:25,
        cssText: ".selector { prop: value }"
      });

      var body = rule.getBody();

      expect(body).toEqual({
        startOffset: 11,
        endOffset: 24
      });
    });

    it("@media print { .test { prop: value } } ==> [14, 37]", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:38,
        cssText: "@media print { .test { prop: value } }"
      });

      var body = rule.getBody();

      expect(body).toEqual({
        startOffset: 14,
        endOffset: 37
      });
    });


    it("@media print { ==> SyntaxError", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:14,
        cssText: "@media print {"
      });

      expect(function() { rule.getBody() }).toThrowError(SyntaxError);
    });
  });
});