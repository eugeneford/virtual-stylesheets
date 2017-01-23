var VirtualStyleSheet = VSM.VirtualStyleSheet;

var example1 = "@media (min-width: 768px) {\n  .navbar-collapse {\n    width: auto;\n    border-top: 0;\n    box-shadow: none;\n  }\n  .navbar-collapse.collapse {\n    display: block !important;\n    height: auto !important;\n    padding-bottom: 0;\n    overflow: visible !important;\n  }\n  .navbar-collapse.in {\n    overflow-y: visible;\n  }\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-static-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}";

var example2 = "@media (min-width: 768px) {}\n\n@unknown {}";

describe("Virtual Style Sheet", function(){
  describe("parseFromString()", function(){
    it("Threw a TypeError when cssText was not a string", function(){
      var vss = new VirtualStyleSheet();
      expect(function(){ vss.parseFromString() }).toThrowError(TypeError);
    });

    it("Created a empty set of rules when cssText didnt contain any valid css rule", function(){
      var vss = new VirtualStyleSheet();

      vss.parseFromString('12345');

      expect(vss.rules.length).toEqual(0);
    });

    it("Created a set of rules from valid cssText string", function(){
      var vss = new VirtualStyleSheet();

      vss.parseFromString(example1);

      expect(vss.rules.length).toEqual(1);
    });

    it("Ingorned unknown rule types while parsing", function(){
      var vss = new VirtualStyleSheet();

      vss.parseFromString(example2);

      expect(vss.rules.length).toEqual(1);
    });
  });
});
