var VirtualMediaRule = VSM.VirtualMediaRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;

describe("VirtualMediaRule", function(){
  describe("constructor()", function(){
    it("Successfully created new rule", function(){
      expect(function(){
        var rule = new VirtualMediaRule({
          type: 4,
          startOffset: 0,
          endOffset: 64,
          cssText: "@media (min-width: 768px), print { .container { width: 640px; }}"
        });
      }).not.toThrowError();
    });
  });

  describe("parse()", function(){
    it ("Correctly parsed media of VirtualMediaRule", function(){
      var rule = new VirtualMediaRule({
        type: 4,
        startOffset: 0,
        endOffset: 64,
        cssText: "@media (min-width: 768px), print { .container { width: 640px; }}"
      });

      expect(rule.media).toEqual("(min-width: 768px), print");
    });

    it ("Didnt parse media when parseType.PARSE_BODY was passed", function(){
      var rule = new VirtualMediaRule({
        type: 4,
        startOffset: 0,
        endOffset: 64,
        cssText: "@media (min-width: 768px), print { .container { width: 640px; }}"
      });

      rule.parse(VirtualStyleSheet.PARSE_BODY);

      expect(rule.media).toEqual(null);
    });
  });

  describe("setMedia()", function(){
    it ("Correctly changed media string of VirtualMediaRule", function(){
      var rule = new VirtualMediaRule({
        type: 4,
        startOffset: 0,
        endOffset: 64,
        cssText: "@media (min-width: 768px), print { .container { width: 640px; }}"
      });


      rule.setMedia("(min-width: 768px) and (max-width: 991px)");

      expect(rule.media).toEqual("(min-width: 768px) and (max-width: 991px)");
    });

    it ("Threw a TypeError if media was not a string", function(){
      var rule = new VirtualMediaRule({
        type: 4,
        startOffset: 0,
        endOffset: 64,
        cssText: "@media (min-width: 768px), print { .container { width: 640px; }}"
      });

      expect(function(){
        rule.setMedia(123);
      }).toThrowError(TypeError);
    });
  });
});