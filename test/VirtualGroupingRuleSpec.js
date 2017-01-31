var VirtualGroupingRule = VSM.VirtualGroupingRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;

var example1 = "@media (min-width: 768px) {\n  .navbar-collapse {\n    width: auto;\n    border-top: 0;\n    box-shadow: none;\n  }\n  .navbar-collapse.collapse {\n    display: block !important;\n    height: auto !important;\n    padding-bottom: 0;\n    overflow: visible !important;\n  }\n  .navbar-collapse.in {\n    overflow-y: visible;\n  }\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-static-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}";

var example2 = "@media (min-width: 768px) {\n\n}\n}";

var example3 = "@media (min-width: 768px) {\n  .navbar-collapse {\n    width: auto;\n    border-top: 0;\n    box-shadow: none;\n  } 1class {}}\n}";

var example4 = "@media (min-width: 768px) {\n  .container {\n    width: 640px;\n  }\n  .row {\n    margin-left: -30px;\n  }\n  .column {\n    width: 50%;\n  }\n}";

var example5 = "@media (min-width: 768px) {\n  .container {\n    width: 640px;\n  }\n  .row, .row-fluid {\n    margin-left: -30px;\n  }\n  .column {\n    width: 50%;\n  }\n}";

var example6 = "@supports (animation-name: test) { body { font-size: 16px; } @keyframes scale { 0% { transform: scale(0); } 100% { transform: scale(1); } } .section { padding: 80px 0;} }";

var example7 = "@supports (animation-name: test) { .heading-1 { font-size: 16px; } @keyframes scale { 0% { transform: scale(0); } 100% { transform: scale(1); } } .section { padding: 80px 0;} }";

var example8 = "@supports (animation-name: test) { body { font-size: 16px; } @keyframes scale { 0% { transform: scale(0.5); } 100% { transform: scale(1); } } .section { padding: 80px 0;} }";

describe("VirtualGroupingRule", function(){
  describe("parse()", function(){
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

  describe("patch()", function(){
    it("Successfully patched parent rule of target child rule and all its childs following after target one", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: example4.length,
        cssText: example4
      }, null);

      var childs = {
        0: {
          type: rule.rules.get(0).type,
          startOffset: rule.rules.get(0).startOffset,
          endOffset: rule.rules.get(0).endOffset,
          cssText: rule.rules.get(0).cssText,
          selectorText: rule.rules.get(0).selectorText
        },

        1: {
          type: rule.rules.get(1).type,
          startOffset: rule.rules.get(1).startOffset,
          endOffset: rule.rules.get(1).startOffset + ".row, .row-fluid {\n    margin-left: -30px;\n  }".length,
          cssText: ".row, .row-fluid {\n    margin-left: -30px;\n  }",
          selectorText: ".row, .row-fluid"
        },

        2: {
          type: rule.rules.get(2).type,
          startOffset: rule.rules.get(2).startOffset + 12,
          endOffset: rule.rules.get(2).endOffset + 12,
          cssText: rule.rules.get(2).cssText,
          selectorText: rule.rules.get(2).selectorText
        }
      };

      var child = rule.rules.get(1);
      child.setSelector(".row, .row-fluid ");

      expect(rule.type).toEqual(4);
      expect(rule.cssText).toEqual(example5);
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(example5.length);

      expect(rule.rules.get(0).type).toEqual(childs[0].type);
      expect(rule.rules.get(0).startOffset).toEqual(childs[0].startOffset);
      expect(rule.rules.get(0).endOffset).toEqual(childs[0].endOffset);
      expect(rule.rules.get(0).cssText).toEqual(childs[0].cssText);
      expect(rule.rules.get(0).selectorText).toEqual(childs[0].selectorText);

      expect(rule.rules.get(1).type).toEqual(childs[1].type);
      expect(rule.rules.get(1).startOffset).toEqual(childs[1].startOffset);
      expect(rule.rules.get(1).endOffset).toEqual(childs[1].endOffset);
      expect(rule.rules.get(1).cssText).toEqual(childs[1].cssText);
      expect(rule.rules.get(1).selectorText).toEqual(childs[1].selectorText);

      expect(rule.rules.get(2).type).toEqual(childs[2].type);
      expect(rule.rules.get(2).startOffset).toEqual(childs[2].startOffset);
      expect(rule.rules.get(2).endOffset).toEqual(childs[2].endOffset);
      expect(rule.rules.get(2).cssText).toEqual(childs[2].cssText);
      expect(rule.rules.get(2).selectorText).toEqual(childs[2].selectorText);
    });

    it("Successfully patched parent rule of target child rule and ignored patching of its childs following after target one, because of patchDelta was 0", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: example4.length,
        cssText: example4
      }, null);

      var childs = {
        0: {
          type: rule.rules.get(0).type,
          startOffset: rule.rules.get(0).startOffset,
          endOffset: rule.rules.get(0).endOffset,
          cssText: rule.rules.get(0).cssText,
          selectorText: rule.rules.get(0).selectorText
        },

        1: {
          type: rule.rules.get(1).type,
          startOffset: rule.rules.get(1).startOffset,
          endOffset: rule.rules.get(1).endOffset,
          cssText: "body {\n    margin-left: -30px;\n  }",
          selectorText: "body"
        },

        2: {
          type: rule.rules.get(2).type,
          startOffset: rule.rules.get(2).startOffset,
          endOffset: rule.rules.get(2).endOffset,
          cssText: rule.rules.get(2).cssText,
          selectorText: rule.rules.get(2).selectorText
        }
      };

      var child = rule.rules.get(1);
      child.setSelector("body ");

      expect(rule.type).toEqual(4);
      expect(rule.cssText).toEqual("@media (min-width: 768px) {\n  .container {\n    width: 640px;\n  }\n  body {\n    margin-left: -30px;\n  }\n  .column {\n    width: 50%;\n  }\n}");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(example4.length);

      expect(rule.rules.get(0).type).toEqual(childs[0].type);
      expect(rule.rules.get(0).startOffset).toEqual(childs[0].startOffset);
      expect(rule.rules.get(0).endOffset).toEqual(childs[0].endOffset);
      expect(rule.rules.get(0).cssText).toEqual(childs[0].cssText);
      expect(rule.rules.get(0).selectorText).toEqual(childs[0].selectorText);

      expect(rule.rules.get(1).type).toEqual(childs[1].type);
      expect(rule.rules.get(1).startOffset).toEqual(childs[1].startOffset);
      expect(rule.rules.get(1).endOffset).toEqual(childs[1].endOffset);
      expect(rule.rules.get(1).cssText).toEqual(childs[1].cssText);
      expect(rule.rules.get(1).selectorText).toEqual(childs[1].selectorText);

      expect(rule.rules.get(2).type).toEqual(childs[2].type);
      expect(rule.rules.get(2).startOffset).toEqual(childs[2].startOffset);
      expect(rule.rules.get(2).endOffset).toEqual(childs[2].endOffset);
      expect(rule.rules.get(2).cssText).toEqual(childs[2].cssText);
      expect(rule.rules.get(2).selectorText).toEqual(childs[2].selectorText);
    });

    it("Correctly updated all child rules when patching was triggered by its previous siblings", function(){
      var rule = new VirtualGroupingRule({
        type: 12,
        startOffset: 0,
        endOffset: example6.length,
        cssText: example6
      }, null);

      var exp = {
        0: {
          type: 12,
          startOffset: 0,
          endOffset: example7.length,
          cssText: example7
        },

        1: {
          type: 1,
          startOffset: 1,
          endOffset: 32,
          cssText: ".heading-1 { font-size: 16px; }",
          selectorText: ".heading-1"
        },

        2: {
          type: 7,
          startOffset: 33,
          endOffset: 111,
          cssText: "@keyframes scale { 0% { transform: scale(0); } 100% { transform: scale(1); } }"
        },

        3: {
          type: 8,
          startOffset: 1,
          endOffset: 28,
          cssText: "0% { transform: scale(0); }"
        },

        4: {
          type: 8,
          startOffset: 29,
          endOffset: 58,
          cssText: "100% { transform: scale(1); }"
        },

        5: {
          type: 1,
          startOffset: 112,
          endOffset: 140,
          cssText: ".section { padding: 80px 0;}",
          selectorText: ".section"
        }
      };

      rule.rules.get(0).setSelector(".heading-1 ");

      expect(rule.type).toEqual(exp[0].type);
      expect(rule.startOffset).toEqual(exp[0].startOffset);
      expect(rule.endOffset).toEqual(exp[0].endOffset);
      expect(rule.cssText).toEqual(exp[0].cssText);

      expect(rule.rules.get(0).type).toEqual(exp[1].type);
      expect(rule.rules.get(0).startOffset).toEqual(exp[1].startOffset);
      expect(rule.rules.get(0).endOffset).toEqual(exp[1].endOffset);
      expect(rule.rules.get(0).cssText).toEqual(exp[1].cssText);
      expect(rule.rules.get(0).selectorText).toEqual(exp[1].selectorText);

      expect(rule.rules.get(1).type).toEqual(exp[2].type);
      expect(rule.rules.get(1).startOffset).toEqual(exp[2].startOffset);
      expect(rule.rules.get(1).endOffset).toEqual(exp[2].endOffset);
      expect(rule.rules.get(1).cssText).toEqual(exp[2].cssText);

      expect(rule.rules.get(1).rules.get(0).type).toEqual(exp[3].type);
      expect(rule.rules.get(1).rules.get(0).startOffset).toEqual(exp[3].startOffset);
      expect(rule.rules.get(1).rules.get(0).endOffset).toEqual(exp[3].endOffset);
      expect(rule.rules.get(1).rules.get(0).cssText).toEqual(exp[3].cssText);

      expect(rule.rules.get(1).rules.get(1).type).toEqual(exp[4].type);
      expect(rule.rules.get(1).rules.get(1).startOffset).toEqual(exp[4].startOffset);
      expect(rule.rules.get(1).rules.get(1).endOffset).toEqual(exp[4].endOffset);
      expect(rule.rules.get(1).rules.get(1).cssText).toEqual(exp[4].cssText);

      expect(rule.rules.get(2).type).toEqual(exp[5].type);
      expect(rule.rules.get(2).startOffset).toEqual(exp[5].startOffset);
      expect(rule.rules.get(2).endOffset).toEqual(exp[5].endOffset);
      expect(rule.rules.get(2).cssText).toEqual(exp[5].cssText);
      expect(rule.rules.get(2).selectorText).toEqual(exp[5].selectorText);
    });


    it("Correctly updated 2-level group hierarchy", function(){
      var rule = new VirtualGroupingRule({
        type: 12,
        startOffset: 0,
        endOffset: example6.length,
        cssText: example6
      }, null);

      var exp = {
        0: {
          type: 12,
          startOffset: 0,
          endOffset: example8.length,
          cssText: example8
        },

        1: {
          type: 1,
          startOffset: 1,
          endOffset: 26,
          cssText: "body { font-size: 16px; }",
          selectorText: "body"
        },

        2: {
          type: 7,
          startOffset: 27,
          endOffset: 107,
          cssText: "@keyframes scale { 0% { transform: scale(0.5); } 100% { transform: scale(1); } }"
        },

        3: {
          type: 8,
          startOffset: 1,
          endOffset: 30,
          cssText: "0% { transform: scale(0.5); }"
        },

        4: {
          type: 8,
          startOffset: 31,
          endOffset: 60,
          cssText: "100% { transform: scale(1); }"
        },

        5: {
          type: 1,
          startOffset: 108,
          endOffset: 136,
          cssText: ".section { padding: 80px 0;}",
          selectorText: ".section"
        }
      };

      rule.rules.get(1).rules.get(0).patch({
        action: VirtualStyleSheet.PATCH_INSERT,
        start: 23,
        value: ".5",
        patchDelta: 2
      });

      expect(rule.type).toEqual(exp[0].type);
      expect(rule.startOffset).toEqual(exp[0].startOffset);
      expect(rule.endOffset).toEqual(exp[0].endOffset);
      expect(rule.cssText).toEqual(exp[0].cssText);

      expect(rule.rules.get(0).type).toEqual(exp[1].type);
      expect(rule.rules.get(0).startOffset).toEqual(exp[1].startOffset);
      expect(rule.rules.get(0).endOffset).toEqual(exp[1].endOffset);
      expect(rule.rules.get(0).cssText).toEqual(exp[1].cssText);
      expect(rule.rules.get(0).selectorText).toEqual(exp[1].selectorText);

      expect(rule.rules.get(1).type).toEqual(exp[2].type);
      expect(rule.rules.get(1).startOffset).toEqual(exp[2].startOffset);
      expect(rule.rules.get(1).endOffset).toEqual(exp[2].endOffset);
      expect(rule.rules.get(1).cssText).toEqual(exp[2].cssText);

      expect(rule.rules.get(1).rules.get(0).type).toEqual(exp[3].type);
      expect(rule.rules.get(1).rules.get(0).startOffset).toEqual(exp[3].startOffset);
      expect(rule.rules.get(1).rules.get(0).endOffset).toEqual(exp[3].endOffset);
      expect(rule.rules.get(1).rules.get(0).cssText).toEqual(exp[3].cssText);

      expect(rule.rules.get(1).rules.get(1).type).toEqual(exp[4].type);
      expect(rule.rules.get(1).rules.get(1).startOffset).toEqual(exp[4].startOffset);
      expect(rule.rules.get(1).rules.get(1).endOffset).toEqual(exp[4].endOffset);
      expect(rule.rules.get(1).rules.get(1).cssText).toEqual(exp[4].cssText);

      expect(rule.rules.get(2).type).toEqual(exp[5].type);
      expect(rule.rules.get(2).startOffset).toEqual(exp[5].startOffset);
      expect(rule.rules.get(2).endOffset).toEqual(exp[5].endOffset);
      expect(rule.rules.get(2).cssText).toEqual(exp[5].cssText);
      expect(rule.rules.get(2).selectorText).toEqual(exp[5].selectorText);
    });
  });
});
