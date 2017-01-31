var VirtualStyleDeclarationRule = VSM.VirtualStyleDeclarationRule;
var VirtualList = VSM.VirtualList;
var VirtualStyleSheet = VirtualStyleSheet;

describe("VirtualStyleDeclarationRule", function(){
  describe("constructor()", function(){
    it("Successfully created new VirtualStyleDeclarationRule", function(){
      expect(function(){
        var rule = new VirtualStyleDeclarationRule({
          type: 1,
          startOffset: 0,
          endOffset: 10,
          cssText: ".selector:before { content: \"\\f001\"; width: 40px; height: 40px; color: #000; /* comment */ box-shadow: 0 3px 6px rgba(0,0,0,0.19); font: 400 14px/24px \'FontAwesome\'}"
        });
      }).not.toThrowError();
    });
  });

  describe("parse()", function(){
    it("Correctly parsed declarations list inside of rule", function(){
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before { content: \"\\f001\"; width: 40px; height: 40px; color: #000; /* comment */ box-shadow: 0 3px 6px rgba(0,0,0,0.19); font: 400 14px/24px \'FontAwesome\'}"
      });

      var list = new VirtualList();

      //list.insert()

      expect(rule.style).toEqual(list);
    });
  });
});