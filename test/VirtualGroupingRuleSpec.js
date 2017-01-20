var VirtualGroupingRule = VSM.VirtualGroupingRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;

var example1 = "@media (min-width: 768px) {\n  .navbar-collapse {\n    width: auto;\n    border-top: 0;\n    box-shadow: none;\n  }\n  .navbar-collapse.collapse {\n    display: block !important;\n    height: auto !important;\n    padding-bottom: 0;\n    overflow: visible !important;\n  }\n  .navbar-collapse.in {\n    overflow-y: visible;\n  }\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-static-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}";

var example2 = "@media (min-width: 768px) {\n\n}\n}";

var example3 = "@media (min-width: 768px) {\n  .navbar-collapse {\n    width: auto;\n    border-top: 0;\n    box-shadow: none;\n  } 1class {}}\n}";

describe("VirtualGroupingRule", function(){
  describe("parse(parseType)", function(){
    it("Parsed body correctly", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: example1.length,
        cssText: example1
      });

      expect(rule.rules.length).toEqual(4);
    });

    it("Did nothing because of LAZY_BODY_ACCEPT", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: example1.length,
        cssText: example1
      }, null, {
        lazyParsing: VirtualStyleSheet.LAZY_BODY_ACCEPT
      });

      expect(rule.rules).toEqual(null);
    });

    it("Did nothing because body is empty", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: example2.length,
        cssText: example2
      });

      expect(rule.rules).toEqual(null);
    });

    it("Ignored 1 Unknown rule while parsing", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: example3.length,
        cssText: example3
      }, null);

      expect(rule.rules.length).toEqual(1);
    });
  });
});

