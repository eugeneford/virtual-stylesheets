var VirtualKeyframeRule = VSM.VirtualKeyframeRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;

describe("VirtualKeyframeRule", function(){
  describe("parse()", function(){
    it("Successfuly parsed keyText", function(){
      var rule;

      rule = new VirtualKeyframeRule({
        type: 8,
        startOffset:0,
        endOffset:19,
        cssText: "1% { width: 24px; }"
      });

      expect(rule.keyText).toEqual("1%");
    });

    it("Did nothing when parseType was PARSE_BODY", function(){
      var rule;

      rule = new VirtualKeyframeRule({
        type: 8,
        startOffset:0,
        endOffset:19,
        cssText: "1% { width: 24px; }"
      });

      rule.parse(VirtualStyleSheet.PARSE_BODY);

      expect(rule.keyText).toEqual(null);
    });
  });

  describe("setSelector()", function(){
    it("Threw a TypeError when keyText was not a String", function(){
      var rule;

      rule = new VirtualKeyframeRule({
        type: 8,
        startOffset:0,
        endOffset:19,
        cssText: "1% { width: 24px; }"
      });

      expect(function(){
        rule.setKey(12321);
      }).toThrowError(TypeError);
    });

    it("Threw an Error when keyText was not a string representation of percentage number", function(){
      var rule;

      rule = new VirtualKeyframeRule({
        type: 8,
        startOffset:0,
        endOffset:19,
        cssText: "1% { width: 24px; }"
      });

      expect(function(){
        rule.setKey("hello");
      }).toThrowError(Error);
    });

    it("Correctly changed selector of the rule", function(){
      var rule;

      rule = new VirtualKeyframeRule({
        type: 8,
        startOffset:0,
        endOffset:19,
        cssText: "1% { width: 24px; }"
      });

      rule.setKey("100%");

      expect(rule.keyText).toEqual("100%");
      expect(rule.cssText).toEqual("100%{ width: 24px; }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(20);
    });
  });
});