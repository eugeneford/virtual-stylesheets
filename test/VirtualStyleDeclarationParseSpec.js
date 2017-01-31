var StyleDeclarationParser = VSM.VirtualStyleDeclarationParser;

describe("VirtualStyleDeclarationParser", function(){
  describe("parse()", function(){
    it("Correctly parsed declaration list from rule body", function(){
      var body = "\n   content: \"\\f001\";\n   width : 40px;\n   height : 40px;\n   color: #000;\n   /* comment */\n   box-shadow : 0 3px 6px rgba(0,0,0,0.19);\n   font : 400 14px/24px \'FontAwesome\'; -webkit-appearance : none\n";

      var list = StyleDeclarationParser.parse(body);

      console.warn(list);
    });
  });
});