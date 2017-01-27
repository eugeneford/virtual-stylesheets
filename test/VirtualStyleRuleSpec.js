var VirtualStyleRule = VSM.VirtualStyleRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;

describe("VirtualStyleRule", function(){
  describe("parse()", function(){
    it("Successfuly parsed selectorText", function(){
      var rule;

      rule = new VirtualStyleRule({
        type: 1,
        startOffset:0,
        endOffset:48,
        cssText: "* > .test + [attr='value'] > h1 { width: 30px; }"
      });

      expect(rule.selectorText).toEqual("* > .test + [attr='value'] > h1");
    });

    it("Did nothing when lazyParsing was true", function(){
      var rule;

      rule = new VirtualStyleRule({
        type: 1,
        startOffset:0,
        endOffset:48,
        cssText: "* > .test + [attr='value'] > h1 { width: 30px; }"
      }, null, {lazyParsing: true});

      expect(rule.selectorText).toEqual(undefined);
    });

    it("Did nothing when parseType was PARSE_BODY", function(){
      var rule;

      rule = new VirtualStyleRule({
        type: 1,
        startOffset:0,
        endOffset:48,
        cssText: "* > .test + [attr='value'] > h1 { width: 30px; }"
      }, null, {lazyParsing: true});

      rule.parse(VirtualStyleSheet.PARSE_BODY);

      expect(rule.selectorText).toEqual(undefined);
    });
  });

  describe("setSelector()", function(){
    it("Correctly changed selector of the rule", function(){
      var rule;

      rule = new VirtualStyleRule({
        type: 1,
        startOffset:0,
        endOffset:48,
        cssText: "* > .test + [attr='value'] > h1 { width: 30px; }"
      });

      rule.setSelector(".new-selector");

      expect(rule.selectorText).toEqual(".new-selector");
      expect(rule.cssText).toEqual(".new-selector{ width: 30px; }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(29);
    });
  });
});