var VirtualSupportsRule = VSM.VirtualSupportsRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;

describe("VirtualSupportsRule", function(){
  describe("constructor()", function(){
    it("Successfully created new rule", function(){
      expect(function(){
        var rule = new VirtualSupportsRule({
          type: 12,
          startOffset: 0,
          endOffset: 58,
          cssText: "@supports (animation-name: test) { body { color: green } }"
        });
      }).not.toThrowError();
    });
  });

  describe("parse()", function(){
    it ("Correctly parsed conditionText of VirtualSupportsRule", function(){
      var rule = new VirtualSupportsRule({
        type: 12,
        startOffset: 0,
        endOffset: 58,
        cssText: "@supports (animation-name: test) { body { color: green } }"
      });

      expect(rule.conditionText).toEqual("(animation-name: test)");
    });

    it ("Didnt parse conditionText when parseType.PARSE_BODY was passed", function(){
      var rule = new VirtualSupportsRule({
        type: 12,
        startOffset: 0,
        endOffset: 58,
        cssText: "@supports (animation-name: test) { body { color: green } }"
      });

      rule.parse(VirtualStyleSheet.PARSE_BODY);

      expect(rule.conditionText).toEqual(null);
    });
  }); 

  describe("setCondition()", function(){
    it ("Correctly changed conditionText string of VirtualSupportsRule", function(){
      var rule = new VirtualSupportsRule({
        type: 12,
        startOffset: 0,
        endOffset: 58,
        cssText: "@supports (animation-name: test) { body { color: green } }"
      });


      rule.setCondition("not ((text-align-last:justify) or (-moz-text-align-last:justify) )");

      expect(rule.conditionText).toEqual("not ((text-align-last:justify) or (-moz-text-align-last:justify) )");
    });

    it ("Threw a TypeError if media was not a string", function(){
      var rule = new VirtualSupportsRule({
        type: 12,
        startOffset: 0,
        endOffset: 58,
        cssText: "@supports (animation-name: test) { body { color: green } }"
      });

      expect(function(){
        rule.setCondition(123);
      }).toThrowError(TypeError);
    });
  });
});