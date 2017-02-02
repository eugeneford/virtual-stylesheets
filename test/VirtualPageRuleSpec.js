var VirtualPageRule = VSM.VirtualPageRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;

describe("VirtualPageRule", function(){
  describe("parse()", function(){
    it("Successfuly parsed selectorText", function(){
      var rule;

      rule = new VirtualPageRule({
        type: 6,
        startOffset:0,
        endOffset:44,
        cssText: "@page :first { border-top: 30px solid #000 }"
      });

      expect(rule.selectorText).toEqual(":first");
    });

    it("Did nothing when parseType was PARSE_BODY", function(){
      var rule;

      rule = new VirtualPageRule({
        type: 6,
        startOffset:0,
        endOffset:44,
        cssText: "@page :first { border-top: 30px solid #000 }"
      });

      rule.parse(VirtualStyleSheet.PARSE_BODY);

      expect(rule.selectorText).toEqual(null);
    });
  });

  describe("setSelector()", function(){
    it("Threw a TypeError when selectorText was not a String", function(){
      var rule;

      rule = new VirtualPageRule({
        type: 6,
        startOffset:0,
        endOffset:44,
        cssText: "@page :first { border-top: 30px solid #000 }"
      });

      expect(function(){
        rule.setSelector(12321);
      }).toThrowError(TypeError);
    });

    it("Correctly changed selector of the rule", function(){
      var rule;

      rule = new VirtualPageRule({
        type: 6,
        startOffset:0,
        endOffset:44,
        cssText: "@page :first { border-top: 30px solid #000 }"
      });

      rule.setSelector(":blank ");

      expect(rule.selectorText).toEqual(":blank");
      expect(rule.cssText).toEqual("@page :blank { border-top: 30px solid #000 }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(44);
    });
  });
});