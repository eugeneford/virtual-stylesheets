var StyleDeclarationParser = VSM.VirtualStyleDeclarationParser;

describe("VirtualStyleDeclarationParser", function(){
  describe("constructor()", function(){
    it("Threw an Error", function(){
      expect(function(){
        new StyleDeclarationParser();
      }).toThrowError(Error);
    })
  });

  describe("parse()", function(){
    it("Correctly parsed declaration list from rule body", function(){
      var body = "\n   content: \"\\f001\";\n   width : 40px;\n   height : 40px;\n   color: #000;\n   /* comment */\n   box-shadow : 0 3px 6px rgba(0,0,0,0.19);\n   font : 400 14px/24px \'FontAwesome\';\n   -webkit-appearance : none\n";

      var list = StyleDeclarationParser.parse(body);

      var expected = [
        {
          startOffset: 4,
          endOffset: 21,
          property: "content",
          value: "\"\\f001\"",
          isImportant: false
        },
        {
          startOffset: 25,
          endOffset: 38,
          property: "width",
          value: "40px",
          isImportant: false
        },
        {
          startOffset: 42,
          endOffset: 56,
          property: "height",
          value: "40px",
          isImportant: false
        },
        {
          startOffset: 60,
          endOffset: 72,
          property: "color",
          value: "#000",
          isImportant: false
        },
        {
          startOffset: 93,
          endOffset: 133,
          property: "box-shadow",
          value: "0 3px 6px rgba(0,0,0,0.19)",
          isImportant: false
        },
        {
          startOffset: 137,
          endOffset: 172,
          property: "font",
          value: "400 14px/24px \'FontAwesome\'",
          isImportant: false
        },
        {
          startOffset: 176,
          endOffset: 202,
          property: "-webkit-appearance",
          value: "none",
          isImportant: false
        }
      ];

      expect(list).toEqual(expected);
    });

    it("Correctly parsed declaration that starts with whitespace", function(){
      var body = " width: 14px;";

      var list = StyleDeclarationParser.parse(body);

      var expected = [
        {
          startOffset: 1,
          endOffset: 13,
          property: "width",
          value: "14px",
          isImportant: false
        }
      ];

      expect(list).toEqual(expected);
    });

    it("Correctly parsed declaration that starts with new line", function(){
      var body = "\nwidth: 14px;";

      var list = StyleDeclarationParser.parse(body);

      var expected = [
        {
          startOffset: 1,
          endOffset: 13,
          property: "width",
          value: "14px",
          isImportant: false
        }
      ];

      expect(list).toEqual(expected);
    });

    it("Correctly parsed declaration that starts with a comment", function(){
      var body = "/*test*/width: 14px;";

      var list = StyleDeclarationParser.parse(body);

      var expected = [
        {
          startOffset: 8,
          endOffset: 20,
          property: "width",
          value: "14px",
          isImportant: false
        }
      ];

      expect(list).toEqual(expected);
    });

    it("Correctly parsed escaped quotes", function(){
      var body = "content: \"'\\\"'\";";

      var list = StyleDeclarationParser.parse(body);

      var expected = [
        {
          startOffset: 0,
          endOffset: 16,
          property: "content",
          value: "\"'\\\"'\"",
          isImportant: false
        }
      ];

      expect(list).toEqual(expected);
    });

    it("Ignored incorrect declaration", function(){
      var body = "content: ;";

      var list = StyleDeclarationParser.parse(body);

      expect(list).toEqual([]);
    });

    it("Correctly parsed !important flag", function(){
      var body = "display:none!important;";

      var list = StyleDeclarationParser.parse(body);

      expect(list).toEqual([{
        startOffset:0,
        endOffset: 23,
        property: "display",
        value: "none!important",
        isImportant: true
      }]);
    });

    it("Threw a SyntaxError when { was passed", function(){
      var body = "{\n   content: \"\\f001\";\n   width : 40px;\n   height : 40px;\n   color: #000;\n   /* comment */\n   box-shadow : 0 3px 6px rgba(0,0,0,0.19);\n   font : 400 14px/24px \'FontAwesome\';\n   -webkit-appearance : none\n}";

      expect(function(){
        var list = StyleDeclarationParser.parse(body);
      }).toThrowError(SyntaxError);
    });
  });
});