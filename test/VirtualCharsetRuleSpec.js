var VirtualCharsetRule = VSM.VirtualCharsetRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;

describe("VirtualCharsetRule", function(){
  describe("constructor()", function(){
    it("Successfully created new VirtualCharsetRule", function(){
      expect(function(){
        var rule = new VirtualCharsetRule({
          type: 2,
          startOffset: 0,
          endOffset: 22,
          cssText: "@charset '\\\'\"test\"\\\'';"
        });
      }).not.toThrowError();
    });
  });

  describe("parse()", function(){
    it("Correctly parsed encoding string", function(){
      var rule = new VirtualCharsetRule({
        type: 2,
        startOffset: 0,
        endOffset: 22,
        cssText: "@charset '\\\'\"test\"\\\'';"
      });

      expect(rule.encoding).toEqual("\\\'\"test\"\\\'");
    });

    it("Parsed nothing when had incorrect rule definition", function(){
      var rule = new VirtualCharsetRule({
        type: 2,
        startOffset: 0,
        endOffset: 15,
        cssText: "@charset UTF-8;"
      });

      expect(rule.encoding).toEqual(null);
    });

    it("Did nothing when PARSE_BODY was passed", function(){
      var rule = new VirtualCharsetRule({
        type: 2,
        startOffset: 0,
        endOffset: 22,
        cssText: "@charset '\\\'\"test\"\\\'';"
      });

      rule.parse(VirtualStyleSheet.PARSE_BODY);

      expect(rule.encoding).toEqual(null);
    });
  });

  describe("setEncoding()", function(){
    it("Successfully applied new encoding string", function(){
      var rule = new VirtualCharsetRule({
        type: 2,
        startOffset: 0,
        endOffset: 17,
        cssText: "@charset \"UTF-8\";"
      });

      rule.setEncoding("iso-8859-15");

      expect(rule.encoding).toEqual("iso-8859-15");
      expect(rule.cssText).toEqual("@charset \"iso-8859-15\";");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(23);
    });

    it("Threw a TypeError when encoding was not a string", function(){
      var rule = new VirtualCharsetRule({
        type: 2,
        startOffset: 0,
        endOffset: 17,
        cssText: "@charset \"UTF-8\";"
      });

      expect(function(){rule.setEncoding(123)}).toThrowError(TypeError);
    });
  });
});