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
        cssText: ".selector:before{display:inline-block}"
      });

      var list = new VirtualList();

      list.insert({
        startOffset: 0,
        endOffset: 20,
        property: "display",
        value: "inline-block",
        isImportant: false
      });

      expect(rule.style).toEqual(list);
    });

    it("Did nothing when parseType.PARSE_HEAD was passed", function(){
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before{display:inline-block}"
      });

      rule.parse(VirtualStyleSheet.PARSE_HEAD);

      expect(rule.style).toEqual(null);
    });
  });

  describe("getPropertyValue()", function(){
    it("Threw a TypeError when property was not a string", function(){
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before{display:inline-block}"
      });

      expect(function() { rule.getPropertyValue(1)} ).toThrowError(TypeError);
    });

    it("Successfully found target property and returned its value", function(){
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before{display:inline-block}"
      });

      expect(rule.getPropertyValue("display")).toEqual("inline-block");
    });

    it("Returned null if target property wasnt found", function(){
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before{display:inline-block}"
      });

      expect(rule.getPropertyValue("font")).toEqual(null);
    });

    it("Did nothing if body block is empty", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 13,
        cssText: ".selector { }"
      });

      var value = rule.getPropertyValue("font");

      expect(value).toEqual(null);
    });
  });


  describe("isImportant()", function() {
    it("Threw a TypeError when property was not a string", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before{display:inline-block}"
      });

      expect(function () {
        rule.isImportant(1)
      }).toThrowError(TypeError);
    });

    it("Returned false when property wasnt flagged as important", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before{display:inline-block}"
      });

      expect(rule.isImportant("display")).toEqual(false);
    });


    it("Returned false when property wasnt found is declarations list", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before{display:inline-block}"
      });

      expect(rule.isImportant("font")).toEqual(false);
    });

    it("Did nothing if body block is empty", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 13,
        cssText: ".selector { }"
      });

      var value = rule.isImportant("font");

      expect(value).toEqual(false);
    });

    it("Returned true when property was flagged as important", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before{display:inline-block!important}"
      });

      expect(rule.isImportant("display")).toEqual(true);
    });
  });

  describe("removeProperty()", function() {
    it("Threw a TypeError when property was not a string", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before{display:inline-block}"
      });

      expect(function () {
        rule.removeProperty(1)
      }).toThrowError(TypeError);
    });

    it("Successfully removed target style declaration", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 52,
        cssText: ".selector:before{display:inline-block;display:block}"
      });

      var value = rule.removeProperty("display");
      var style = new VirtualList();
      style.insert({
        startOffset:0,
        endOffset:21,
        property: "display",
        value: "inline-block",
        isImportant: false
      });

      expect(rule.cssText).toEqual(".selector:before{display:inline-block;}");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(39);
      expect(rule.style).toEqual(style);
      expect(value).toEqual("block");
    });

    it("Did nothing when target property wasnt found", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 52,
        cssText: ".selector:before{display:inline-block;display:block}"
      });

      var value = rule.removeProperty("font");
      var style = new VirtualList();
      style.insert({
        startOffset:0,
        endOffset:21,
        property: "display",
        value: "inline-block",
        isImportant: false
      });

      style.insert({
        startOffset:21,
        endOffset:34,
        property: "display",
        value: "block",
        isImportant: false
      });

      expect(rule.cssText).toEqual(".selector:before{display:inline-block;display:block}");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(52);
      expect(rule.style).toEqual(style);
      expect(value).toEqual(null);
    });

    it("Did nothing if body block is empty", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 13,
        cssText: ".selector { }"
      });

      var value = rule.removeProperty("font");

      expect(value).toEqual(null);
    });
  });

  describe("setProperty()", function() {
    it("Threw a TypeError when property was not a string", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before{display:inline-block}"
      });

      expect(function () {
        rule.setProperty(1, "value")
      }).toThrowError(TypeError);
    });

    it("Threw a TypeError when value was not a string", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before{display:inline-block}"
      });

      expect(function () {
        rule.setProperty("prop", 1)
      }).toThrowError(TypeError);
    });

    it("Threw an Error when new declaration is not complex", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 10,
        cssText: ".selector:before{display:inline-block}"
      });

      expect(function () {
        rule.setProperty("prop", "  ");
      }).toThrowError(Error);
    });

    it("Successfully changed existing style declaration", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 71,
        cssText: ".selector {\n   display:inline-block;\n   display:block\n}"
      });

      rule.setProperty("display", "none");

      var style = new VirtualList();
      style.insert({
        startOffset:4,
        endOffset:25,
        property: "display",
        value: "inline-block",
        isImportant: false
      });
      style.insert({
        startOffset:29,
        endOffset:43,
        property: "display",
        value: "none",
        isImportant: false
      });

      expect(rule.cssText).toEqual(".selector {\n   display:inline-block;\n   display: none\n}");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(71);
      expect(rule.style).toEqual(style);
    });

    it("Successfully appended new style declaration to empty body block", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 13,
        cssText: ".selector { }"
      });

      rule.setProperty("font", "400 14px/24px 'Lato', sans-serif");

      var style = new VirtualList();
      style.insert({
        startOffset:3,
        endOffset:42,
        property: "font",
        value: "400 14px/24px 'Lato', sans-serif",
        isImportant: false
      });

      expect(rule.cssText).toEqual(".selector {\n  font: 400 14px/24px 'Lato', sans-serif;\n}");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(55);
      expect(rule.style).toEqual(style);
    });

    it("Successfully appended new style declaration to unclosed declaration set", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 27,
        cssText: ".selector {\n  width: 24px\n}"
      });

      rule.setProperty("height", "24px");

      var style = new VirtualList();
      style.insert({
        startOffset:3,
        endOffset:15,
        property: "width",
        value: "24px",
        isImportant: false
      });
      style.insert({
        startOffset:18,
        endOffset:31,
        property: "height",
        value: "24px",
        isImportant: false
      });

      expect(rule.cssText).toEqual(".selector {\n  width: 24px;\n  height: 24px;\n}");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(44);
      expect(rule.style).toEqual(style);
    });

    it("Successfully appended new style declaration", function () {
      var rule = new VirtualStyleDeclarationRule({
        type: 1,
        startOffset: 0,
        endOffset: 26,
        cssText: ".selector { width: 24px; }"
      });

      rule.setProperty("height", "24px");

      var style = new VirtualList();
      style.insert({
        startOffset:1,
        endOffset:13,
        property: "width",
        value: "24px",
        isImportant: false
      });
      style.insert({
        startOffset:14,
        endOffset:27,
        property: "height",
        value: "24px",
        isImportant: false
      });

      expect(rule.cssText).toEqual(".selector { width: 24px; height: 24px; }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(40);
      expect(rule.style).toEqual(style);
    });
  });
});