var VirtualKeyframesRule = VSM.VirtualKeyframesRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;

describe("VirtualKeyframesRule", function(){
  describe("constructor()", function(){
    it("Successfully created new rule", function(){
      expect(function(){
        var rule = new VirtualKeyframesRule({
          type: 7,
          startOffset: 0,
          endOffset: 18,
          cssText: "@keyframes anim {}"
        });
      }).not.toThrowError();
    });
  });

  describe("parse()", function(){
    it ("Correctly parsed @keyframes", function(){
      var rule = new VirtualKeyframesRule({
        type: 7,
        startOffset: 0,
        endOffset: 18,
        cssText: "@keyframes anim {}"
      });

      expect(rule.name).toEqual("anim");
    });

    it ("Correctly parsed @-webkit-keyframes", function(){
      var rule = new VirtualKeyframesRule({
        type: 7,
        startOffset: 0,
        endOffset: 26,
        cssText: "@-webkit-keyframes anim {}"
      });

      expect(rule.name).toEqual("anim");
    });

    it ("Correctly parsed @-moz-keyframes", function(){
      var rule = new VirtualKeyframesRule({
        type: 7,
        startOffset: 0,
        endOffset: 23,
        cssText: "@-moz-keyframes anim {}"
      });

      expect(rule.name).toEqual("anim");
    });

    it ("Correctly parsed @-o-keyframes", function(){
      var rule = new VirtualKeyframesRule({
        type: 7,
        startOffset: 0,
        endOffset: 21,
        cssText: "@-o-keyframes anim {}"
      });

      expect(rule.name).toEqual("anim");
    });

    it ("Correctly parsed @-ms-keyframes", function(){
      var rule = new VirtualKeyframesRule({
        type: 7,
        startOffset: 0,
        endOffset: 22,
        cssText: "@-ms-keyframes anim {}"
      });

      expect(rule.name).toEqual("anim");
    });

    it ("Did nothing when parseType.PARSE_BODY was passed", function(){
      var rule = new VirtualKeyframesRule({
        type: 7,
        startOffset: 0,
        endOffset: 22,
        cssText: "@-ms-keyframes anim {}"
      });

      rule.parse(VirtualStyleSheet.PARSE_BODY);

      expect(rule.name).toEqual(null);
    });
  });

  describe("setCondition()", function(){
    it ("Correctly changed name of VirtualKeyframesRule", function(){
      var rule = new VirtualKeyframesRule({
        type: 7,
        startOffset: 0,
        endOffset: 22,
        cssText: "@-ms-keyframes anim {}"
      });

      rule.setName("test");

      expect(rule.name).toEqual("test");
    });

    it ("Threw a TypeError if name was not a string", function(){
      var rule = new VirtualKeyframesRule({
        type: 7,
        startOffset: 0,
        endOffset: 22,
        cssText: "@-ms-keyframes anim {}"
      });

      expect(function(){
        rule.setName(123);
      }).toThrowError(TypeError);
    });
  });
});