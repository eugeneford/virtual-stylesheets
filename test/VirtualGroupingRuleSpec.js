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
          startOffset: rule.rules.get(0).startOffset,
          endOffset: rule.rules.get(0).endOffset,
          cssText: rule.rules.get(0).cssText,
          selectorText: rule.rules.get(0).selectorText
        },

        1: {
          startOffset: rule.rules.get(1).startOffset,
          endOffset: rule.rules.get(1).startOffset + ".row, .row-fluid {\n    margin-left: -30px;\n  }".length,
          cssText: ".row, .row-fluid {\n    margin-left: -30px;\n  }",
          selectorText: ".row, .row-fluid"
        },

        2: {
          startOffset: rule.rules.get(2).startOffset + 12,
          endOffset: rule.rules.get(2).endOffset + 12,
          cssText: rule.rules.get(2).cssText,
          selectorText: rule.rules.get(2).selectorText
        }
      };

      var child = rule.rules.get(1);
      child.setSelector(".row, .row-fluid ");

      expect(rule.cssText).toEqual(example5);
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(example5.length);

      expect(rule.rules.get(0).startOffset).toEqual(childs[0].startOffset);
      expect(rule.rules.get(0).endOffset).toEqual(childs[0].endOffset);
      expect(rule.rules.get(0).cssText).toEqual(childs[0].cssText);
      expect(rule.rules.get(0).selectorText).toEqual(childs[0].selectorText);

      expect(rule.rules.get(1).startOffset).toEqual(childs[1].startOffset);
      expect(rule.rules.get(1).endOffset).toEqual(childs[1].endOffset);
      expect(rule.rules.get(1).cssText).toEqual(childs[1].cssText);
      expect(rule.rules.get(1).selectorText).toEqual(childs[1].selectorText);

      expect(rule.rules.get(2).startOffset).toEqual(childs[2].startOffset);
      expect(rule.rules.get(2).endOffset).toEqual(childs[2].endOffset);
      expect(rule.rules.get(2).cssText).toEqual(childs[2].cssText);
      expect(rule.rules.get(2).selectorText).toEqual(childs[2].selectorText);
    });

    it("Successfully patched parent rule of target child rule and ignored patching of its childs following after target one, because of patchDelta was 0", function(){
      var rule = new VirtualGroupingRule({
        startOffset: 0,
        endOffset: example4.length,
        cssText: example4
      }, null);

      var childs = {
        0: {
          startOffset: rule.rules.get(0).startOffset,
          endOffset: rule.rules.get(0).endOffset,
          cssText: rule.rules.get(0).cssText,
          selectorText: rule.rules.get(0).selectorText
        },

        1: {
          startOffset: rule.rules.get(1).startOffset,
          endOffset: rule.rules.get(1).endOffset,
          cssText: "body {\n    margin-left: -30px;\n  }",
          selectorText: "body"
        },

        2: {
          startOffset: rule.rules.get(2).startOffset,
          endOffset: rule.rules.get(2).endOffset,
          cssText: rule.rules.get(2).cssText,
          selectorText: rule.rules.get(2).selectorText
        }
      };

      var child = rule.rules.get(1);
      child.setSelector("body ");

      expect(rule.cssText).toEqual("@media (min-width: 768px) {\n  .container {\n    width: 640px;\n  }\n  body {\n    margin-left: -30px;\n  }\n  .column {\n    width: 50%;\n  }\n}");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(example4.length);

      expect(rule.rules.get(0).startOffset).toEqual(childs[0].startOffset);
      expect(rule.rules.get(0).endOffset).toEqual(childs[0].endOffset);
      expect(rule.rules.get(0).cssText).toEqual(childs[0].cssText);
      expect(rule.rules.get(0).selectorText).toEqual(childs[0].selectorText);

      expect(rule.rules.get(1).startOffset).toEqual(childs[1].startOffset);
      expect(rule.rules.get(1).endOffset).toEqual(childs[1].endOffset);
      expect(rule.rules.get(1).cssText).toEqual(childs[1].cssText);
      expect(rule.rules.get(1).selectorText).toEqual(childs[1].selectorText);

      expect(rule.rules.get(2).startOffset).toEqual(childs[2].startOffset);
      expect(rule.rules.get(2).endOffset).toEqual(childs[2].endOffset);
      expect(rule.rules.get(2).cssText).toEqual(childs[2].cssText);
      expect(rule.rules.get(2).selectorText).toEqual(childs[2].selectorText);
    });

    it("Correctly updated all child rules when patching was triggered by its previous siblings", function(){
      var rule = new VirtualGroupingRule({
        startOffset: 0,
        endOffset: example6.length,
        cssText: example6
      }, null);

      var exp = {
        0: {
          startOffset: 0,
          endOffset: example7.length,
          cssText: example7
        },

        1: {
          startOffset: 1,
          endOffset: 32,
          cssText: ".heading-1 { font-size: 16px; }",
          selectorText: ".heading-1"
        },

        2: {
          startOffset: 33,
          endOffset: 111,
          cssText: "@keyframes scale { 0% { transform: scale(0); } 100% { transform: scale(1); } }"
        },

        3: {
          startOffset: 1,
          endOffset: 28,
          cssText: "0% { transform: scale(0); }"
        },

        4: {
          startOffset: 29,
          endOffset: 58,
          cssText: "100% { transform: scale(1); }"
        },

        5: {
          startOffset: 112,
          endOffset: 140,
          cssText: ".section { padding: 80px 0;}",
          selectorText: ".section"
        }
      };

      rule.rules.get(0).setSelector(".heading-1 ");

      expect(rule.startOffset).toEqual(exp[0].startOffset);
      expect(rule.endOffset).toEqual(exp[0].endOffset);
      expect(rule.cssText).toEqual(exp[0].cssText);

      expect(rule.rules.get(0).startOffset).toEqual(exp[1].startOffset);
      expect(rule.rules.get(0).endOffset).toEqual(exp[1].endOffset);
      expect(rule.rules.get(0).cssText).toEqual(exp[1].cssText);
      expect(rule.rules.get(0).selectorText).toEqual(exp[1].selectorText);

      expect(rule.rules.get(1).startOffset).toEqual(exp[2].startOffset);
      expect(rule.rules.get(1).endOffset).toEqual(exp[2].endOffset);
      expect(rule.rules.get(1).cssText).toEqual(exp[2].cssText);

      expect(rule.rules.get(1).rules.get(0).startOffset).toEqual(exp[3].startOffset);
      expect(rule.rules.get(1).rules.get(0).endOffset).toEqual(exp[3].endOffset);
      expect(rule.rules.get(1).rules.get(0).cssText).toEqual(exp[3].cssText);

      expect(rule.rules.get(1).rules.get(1).startOffset).toEqual(exp[4].startOffset);
      expect(rule.rules.get(1).rules.get(1).endOffset).toEqual(exp[4].endOffset);
      expect(rule.rules.get(1).rules.get(1).cssText).toEqual(exp[4].cssText);

      expect(rule.rules.get(2).startOffset).toEqual(exp[5].startOffset);
      expect(rule.rules.get(2).endOffset).toEqual(exp[5].endOffset);
      expect(rule.rules.get(2).cssText).toEqual(exp[5].cssText);
      expect(rule.rules.get(2).selectorText).toEqual(exp[5].selectorText);
    });


    it("Correctly updated 2-level group hierarchy", function(){
      var rule = new VirtualGroupingRule({
        startOffset: 0,
        endOffset: example6.length,
        cssText: example6
      }, null);

      var exp = {
        0: {
          startOffset: 0,
          endOffset: example8.length,
          cssText: example8
        },

        1: {
          startOffset: 1,
          endOffset: 26,
          cssText: "body { font-size: 16px; }",
          selectorText: "body"
        },

        2: {
          startOffset: 27,
          endOffset: 107,
          cssText: "@keyframes scale { 0% { transform: scale(0.5); } 100% { transform: scale(1); } }"
        },

        3: {
          startOffset: 1,
          endOffset: 30,
          cssText: "0% { transform: scale(0.5); }"
        },

        4: {
          startOffset: 31,
          endOffset: 60,
          cssText: "100% { transform: scale(1); }"
        },

        5: {
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

      expect(rule.startOffset).toEqual(exp[0].startOffset);
      expect(rule.endOffset).toEqual(exp[0].endOffset);
      expect(rule.cssText).toEqual(exp[0].cssText);

      expect(rule.rules.get(0).startOffset).toEqual(exp[1].startOffset);
      expect(rule.rules.get(0).endOffset).toEqual(exp[1].endOffset);
      expect(rule.rules.get(0).cssText).toEqual(exp[1].cssText);
      expect(rule.rules.get(0).selectorText).toEqual(exp[1].selectorText);

      expect(rule.rules.get(1).startOffset).toEqual(exp[2].startOffset);
      expect(rule.rules.get(1).endOffset).toEqual(exp[2].endOffset);
      expect(rule.rules.get(1).cssText).toEqual(exp[2].cssText);

      expect(rule.rules.get(1).rules.get(0).startOffset).toEqual(exp[3].startOffset);
      expect(rule.rules.get(1).rules.get(0).endOffset).toEqual(exp[3].endOffset);
      expect(rule.rules.get(1).rules.get(0).cssText).toEqual(exp[3].cssText);

      expect(rule.rules.get(1).rules.get(1).startOffset).toEqual(exp[4].startOffset);
      expect(rule.rules.get(1).rules.get(1).endOffset).toEqual(exp[4].endOffset);
      expect(rule.rules.get(1).rules.get(1).cssText).toEqual(exp[4].cssText);

      expect(rule.rules.get(2).startOffset).toEqual(exp[5].startOffset);
      expect(rule.rules.get(2).endOffset).toEqual(exp[5].endOffset);
      expect(rule.rules.get(2).cssText).toEqual(exp[5].cssText);
      expect(rule.rules.get(2).selectorText).toEqual(exp[5].selectorText);
    });
  });

  describe("insertRule()", function(){
    it("Threw a TypeError when ruleText was not a string", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 0,
        cssText: "@media print { }"
      });

      expect(function(){
        rule.insertRule(1,1);
      }).toThrowError(TypeError);
    });

    it("Threw a TypeError when index was not a number", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 0,
        cssText: "@media print { }"
      });

      expect(function(){
        rule.insertRule("body { width: 24px; }", "1");
      }).toThrowError(TypeError);
    });

    it("Threw an Error when index was a negative number", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 0,
        cssText: "@media print { }"
      });

      expect(function(){
        rule.insertRule("body { width: 24px; }", -10);
      }).toThrowError(Error);
    });

    it("Threw an Error when ruleText was not a css rule", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 0,
        cssText: "@media print { }"
      });

      expect(function(){
        rule.insertRule("body", 0);
      }).toThrowError(SyntaxError);
    });

    it("Successfully inserted new CSS rule into empty VirtualGroupingRule", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 16,
        cssText: "@media print { }"
      });

      rule.insertRule("body { width: 24px }", 0);

      expect(rule.cssText).toEqual("@media print {\nbody { width: 24px }\n}");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(37);
      expect(rule.rules.length).toEqual(1);

      expect(rule.rules.get(0).startOffset).toEqual(1);
      expect(rule.rules.get(0).endOffset).toEqual(21);
      expect(rule.rules.get(0).cssText).toEqual("body { width: 24px }");
    });

    it("Successfully appended new CSS rule at the trail of VirtualGroupingRule", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 39,
        cssText: "@media print { .test { width: 10px; } }"
      });

      rule.insertRule("body { width: 24px }", 10);

      expect(rule.cssText).toEqual("@media print { .test { width: 10px; }\nbody { width: 24px } }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(60);
      expect(rule.rules.length).toEqual(2);

      expect(rule.rules.get(0).startOffset).toEqual(1);
      expect(rule.rules.get(0).endOffset).toEqual(23);
      expect(rule.rules.get(0).cssText).toEqual(".test { width: 10px; }");

      expect(rule.rules.get(1).startOffset).toEqual(24);
      expect(rule.rules.get(1).endOffset).toEqual(44);
      expect(rule.rules.get(1).cssText).toEqual("body { width: 24px }");
    });

    it("Successfully inserted new CSS rule into the middle of VirtualGroupingRule", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 70,
        cssText: "@media print { .rule-1 { display: block; } .rule-2{ display: none; } }"
      });

      rule.insertRule("body { width: 24px }", 1);

      expect(rule.cssText).toEqual("@media print { .rule-1 { display: block; } body { width: 24px }\n.rule-2{ display: none; } }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(91);
      expect(rule.rules.length).toEqual(3);

      expect(rule.rules.get(0).startOffset).toEqual(1);
      expect(rule.rules.get(0).endOffset).toEqual(28);
      expect(rule.rules.get(0).cssText).toEqual(".rule-1 { display: block; }");

      expect(rule.rules.get(1).startOffset).toEqual(29);
      expect(rule.rules.get(1).endOffset).toEqual(49);
      expect(rule.rules.get(1).cssText).toEqual("body { width: 24px }");

      expect(rule.rules.get(2).startOffset).toEqual(50);
      expect(rule.rules.get(2).endOffset).toEqual(75);
      expect(rule.rules.get(2).cssText).toEqual(".rule-2{ display: none; }");
    });

    it("Successfully changed parent rule from inserted child rule", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 70,
        cssText: "@media print { .rule-1 { display: block; } .rule-2{ display: none; } }"
      });

      rule.insertRule("body { width: 24px }", 1);
      rule.rules.get(1).setSelector(".test ");

      expect(rule.cssText).toEqual("@media print { .rule-1 { display: block; } .test { width: 24px }\n.rule-2{ display: none; } }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(92);
      expect(rule.rules.length).toEqual(3);

      expect(rule.rules.get(0).startOffset).toEqual(1);
      expect(rule.rules.get(0).endOffset).toEqual(28);
      expect(rule.rules.get(0).cssText).toEqual(".rule-1 { display: block; }");

      expect(rule.rules.get(1).startOffset).toEqual(29);
      expect(rule.rules.get(1).endOffset).toEqual(50);
      expect(rule.rules.get(1).cssText).toEqual(".test { width: 24px }");

      expect(rule.rules.get(2).startOffset).toEqual(51);
      expect(rule.rules.get(2).endOffset).toEqual(76);
      expect(rule.rules.get(2).cssText).toEqual(".rule-2{ display: none; }");
    });

    it("Successfully inserted new CSS rule into 2 Level rule's hierarchy", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 84,
        cssText: "@supports { @media print { .rule-1 { display: block; } .rule-2{ display: none; } } }"
      });

      rule.rules.get(0).insertRule("body { width: 24px }", 1);

      expect(rule.cssText).toEqual("@supports { @media print { .rule-1 { display: block; } body { width: 24px }\n.rule-2{ display: none; } } }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(105);
      expect(rule.rules.length).toEqual(1);

      expect(rule.rules.get(0).cssText).toEqual("@media print { .rule-1 { display: block; } body { width: 24px }\n.rule-2{ display: none; } }");
      expect(rule.rules.get(0).startOffset).toEqual(1);
      expect(rule.rules.get(0).endOffset).toEqual(92);
      expect(rule.rules.get(0).rules.length).toEqual(3);

      expect(rule.rules.get(0).rules.get(0).startOffset).toEqual(1);
      expect(rule.rules.get(0).rules.get(0).endOffset).toEqual(28);
      expect(rule.rules.get(0).rules.get(0).cssText).toEqual(".rule-1 { display: block; }");

      expect(rule.rules.get(0).rules.get(1).startOffset).toEqual(29);
      expect(rule.rules.get(0).rules.get(1).endOffset).toEqual(49);
      expect(rule.rules.get(0).rules.get(1).cssText).toEqual("body { width: 24px }");

      expect(rule.rules.get(0).rules.get(2).startOffset).toEqual(50);
      expect(rule.rules.get(0).rules.get(2).endOffset).toEqual(75);
      expect(rule.rules.get(0).rules.get(2).cssText).toEqual(".rule-2{ display: none; }");
    });

    it("Successfully passed reference rule to patch function", function(){
      var refer;
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 70,
        cssText: "@media print { .rule-1 { display: block; } .rule-2{ display: none; } }"
      }, null, {
        prePatchApply: function(rule, patchInfo, ref) {
          if (patchInfo.action === VirtualStyleSheet.PATCH_INSERT) {
            refer = ref;
          }
        }
      });

      rule.insertRule("body { width: 24px }", 1);

      expect(".rule-2{ display: none; }").toEqual(refer.cssText);
    });

    it("Successfully passed undefined to patch function as the reference, if index was too large", function(){
      var refer;
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 70,
        cssText: "@media print { .rule-1 { display: block; } .rule-2{ display: none; } }"
      }, null, {
        prePatchApply: function(rule, patchInfo, ref) {
          if (patchInfo.action === VirtualStyleSheet.PATCH_REPLACE) {
            refer = ref;
          }
        }
      });

      rule.insertRule("body { width: 24px }", 10);

      expect(undefined).toEqual(refer);
    });
  });

  describe("replaceRule()", function(){
    it("Threw a TypeError when ruleText was not a string", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 0,
        cssText: "@media print { }"
      });

      expect(function(){
        rule.replaceRule(1,1);
      }).toThrowError(TypeError);
    });

    it("Threw a TypeError when index was not a number", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 0,
        cssText: "@media print { }"
      });

      expect(function(){
        rule.replaceRule("body { width: 24px; }", "1");
      }).toThrowError(TypeError);
    });

    it("Threw an Error when index was a negative number", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 0,
        cssText: "@media print { }"
      });

      expect(function(){
        rule.replaceRule("body { width: 24px; }", -10);
      }).toThrowError(Error);
    });

    it("Threw an Error when ruleText was not a css rule", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 0,
        cssText: "@media print { }"
      });

      expect(function(){
        rule.replaceRule("body", 0);
      }).toThrowError(SyntaxError);
    });

    it("Threw a Error when index was larger then child rules length", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 91,
        cssText: "@media print { .rule-1 { display: block; } body { width: 24px } .rule-2{ display: none; } }"
      });

      expect(function(){
        rule.replaceRule("body { width: 24px; }", 10);
      }).toThrowError(Error);
    });

    it("Successfuly replaced existing rule by target one", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 91,
        cssText: "@media print { .rule-1 { display: block; } body { width: 24px } .rule-2{ display: none; } }"
      });

      rule.replaceRule("h1 { font-size: 24px; }", 1);

      expect(rule.cssText).toEqual("@media print { .rule-1 { display: block; } h1 { font-size: 24px; } .rule-2{ display: none; } }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(94);
      expect(rule.rules.length).toEqual(3);

      expect(rule.rules.get(0).cssText).toEqual(".rule-1 { display: block; }");
      expect(rule.rules.get(0).startOffset).toEqual(1);
      expect(rule.rules.get(0).endOffset).toEqual(28);
      expect(rule.rules.get(0).selectorText).toEqual(".rule-1");

      expect(rule.rules.get(1).cssText).toEqual("h1 { font-size: 24px; }");
      expect(rule.rules.get(1).startOffset).toEqual(29);
      expect(rule.rules.get(1).endOffset).toEqual(52);
      expect(rule.rules.get(1).selectorText).toEqual("h1");

      expect(rule.rules.get(2).cssText).toEqual(".rule-2{ display: none; }");
      expect(rule.rules.get(2).startOffset).toEqual(53);
      expect(rule.rules.get(2).endOffset).toEqual(78);
      expect(rule.rules.get(2).selectorText).toEqual(".rule-2");
    });

    it("Successfully passed reference rule to patch function", function(){
      var refer;
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 70,
        cssText: "@media print { .rule-1 { display: block; } .rule-2{ display: none; } }"
      }, null, {
        prePatchApply: function(rule, patchInfo, ref) {
          if (patchInfo.action === VirtualStyleSheet.PATCH_REPLACE) {
            refer = ref;
          }
        }
      });

      rule.replaceRule("body { width: 24px }", 1);

      expect(".rule-2{ display: none; }").toEqual(refer.cssText);
    });

    it("Has correct child rules set on prePatchApply", function(){
      var refer;
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 70,
        cssText: "@media print { .rule-1 { display: block; } .rule-2{ display: none; } }"
      }, null, {
        prePatchApply: function(rule, patchInfo, ref) {
          if (patchInfo.action === VirtualStyleSheet.PATCH_REPLACE) {
            refer = rule.rules.get(1);
          }
        }
      });

      rule.replaceRule("body { width: 24px }", 1);

      expect(".rule-2{ display: none; }").toEqual(refer.cssText);
    });

    it("Has correct child rules set on postPatchApply", function(){
      var refer;
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 70,
        cssText: "@media print { .rule-1 { display: block; } .rule-2{ display: none; } }"
      }, null, {
        postPatchApply: function(rule, patchInfo, ref) {
          if (patchInfo.action === VirtualStyleSheet.PATCH_REPLACE) {
            refer = rule.rules.get(1);
          }
        }
      });

      rule.replaceRule("body { width: 24px }", 1);

      expect("body { width: 24px }").toEqual(refer.cssText);
    });

    it("Successfully changed parent rule from replaced child rule", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 70,
        cssText: "@media print { .rule-1 { display: block; } .rule-2{ display: none; } }"
      });

      rule.replaceRule("body { width: 24px }", 1);
      rule.rules.get(1).setSelector(".test ");

      expect(rule.cssText).toEqual("@media print { .rule-1 { display: block; } .test { width: 24px } }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(66);
      expect(rule.rules.length).toEqual(2);

      expect(rule.rules.get(0).startOffset).toEqual(1);
      expect(rule.rules.get(0).endOffset).toEqual(28);
      expect(rule.rules.get(0).cssText).toEqual(".rule-1 { display: block; }");

      expect(rule.rules.get(1).startOffset).toEqual(29);
      expect(rule.rules.get(1).endOffset).toEqual(50);
      expect(rule.rules.get(1).cssText).toEqual(".test { width: 24px }");
    });
  });

  describe("deleteRule()", function(){
    it("Threw a TypeError when index was not a number", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 91,
        cssText: "@media print { .rule-1 { display: block; } body { width: 24px } .rule-2{ display: none; } }"
      });

      expect(function(){
        rule.deleteRule("1");
      }).toThrowError(TypeError);
    });

    it("Threw a Error when index was a negative number", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 91,
        cssText: "@media print { .rule-1 { display: block; } body { width: 24px } .rule-2{ display: none; } }"
      });

      expect(function(){
        rule.deleteRule(-1);
      }).toThrowError(Error);
    });

    it("Threw a Error when index was larger then child rules length", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 91,
        cssText: "@media print { .rule-1 { display: block; } body { width: 24px } .rule-2{ display: none; } }"
      });

      expect(function(){
        rule.deleteRule(10);
      }).toThrowError(Error);
    });

    it("Successfully deleted a child rule at the middle of the VirtualGroupingRule", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 92,
        cssText: "@media print { .rule-1 { display: block; } body { width: 24px } .rule-2 { display: none; } }"
      });

      rule.deleteRule(1);

      expect(rule.cssText).toEqual("@media print { .rule-1 { display: block; } .rule-2 { display: none; } }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(71);
      expect(rule.rules.length).toEqual(2);

      expect(rule.rules.get(0).cssText).toEqual(".rule-1 { display: block; }");
      expect(rule.rules.get(0).startOffset).toEqual(1);
      expect(rule.rules.get(0).endOffset).toEqual(28);

      expect(rule.rules.get(1).cssText).toEqual(".rule-2 { display: none; }");
      expect(rule.rules.get(1).startOffset).toEqual(29);
      expect(rule.rules.get(1).endOffset).toEqual(55);
    });

    it("Successfully deleted a child rule at the trail of the VirtualGroupingRule", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 92,
        cssText: "@media print { .rule-1 { display: block; } body { width: 24px } .rule-2 { display: none; } }"
      });

      rule.deleteRule(2);

      expect(rule.cssText).toEqual("@media print { .rule-1 { display: block; } body { width: 24px } }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(65);
      expect(rule.rules.length).toEqual(2);

      expect(rule.rules.get(0).cssText).toEqual(".rule-1 { display: block; }");
      expect(rule.rules.get(0).startOffset).toEqual(1);
      expect(rule.rules.get(0).endOffset).toEqual(28);

      expect(rule.rules.get(1).cssText).toEqual("body { width: 24px }");
      expect(rule.rules.get(1).startOffset).toEqual(29);
      expect(rule.rules.get(1).endOffset).toEqual(49);
    });

    it("Successfully deleted a child rule at the head of the VirtualGroupingRule", function(){
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 92,
        cssText: "@media print { .rule-1 { display: block; } body { width: 24px } .rule-2 { display: none; } }"
      });

      rule.deleteRule(0);

      expect(rule.cssText).toEqual("@media print { body { width: 24px } .rule-2 { display: none; } }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(64);
      expect(rule.rules.length).toEqual(2);

      expect(rule.rules.get(0).cssText).toEqual("body { width: 24px }");
      expect(rule.rules.get(0).startOffset).toEqual(1);
      expect(rule.rules.get(0).endOffset).toEqual(21);

      expect(rule.rules.get(1).cssText).toEqual(".rule-2 { display: none; }");
      expect(rule.rules.get(1).startOffset).toEqual(22);
      expect(rule.rules.get(1).endOffset).toEqual(48);
    });

    it("Successfully passed refference rule to patch function", function(){
      var refer;
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 92,
        cssText: "@media print { .rule-1 { display: block; } body { width: 24px } .rule-2 { display: none; } }"
      }, null, {
        prePatchApply: function(rule, patchInfo, ref){
          if (patchInfo.action === VirtualStyleSheet.PATCH_DELETE) {
            refer = ref;
          }
        }
      });

      rule.deleteRule(1);

      expect("body { width: 24px }").toEqual(refer.cssText);
    });

    it("Has correct child rules set on prePatchApply", function(){
      var length;
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 70,
        cssText: "@media print { .rule-1 { display: block; } .rule-2{ display: none; } }"
      }, null, {
        prePatchApply: function(rule, patchInfo, ref) {
          if (patchInfo.action === VirtualStyleSheet.PATCH_DELETE) {
            length = rule.rules.length;
          }
        }
      });

      rule.deleteRule(1);

      expect(2).toEqual(length);
    });

    it("Has correct child rules set on postPatchApply", function(){
      var length;
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 70,
        cssText: "@media print { .rule-1 { display: block; } .rule-2{ display: none; } }"
      }, null, {
        postPatchApply: function(rule, patchInfo, ref) {
          if (patchInfo.action === VirtualStyleSheet.PATCH_DELETE) {
            length = rule.rules.length;
          }
        }
      });

      rule.deleteRule(1);

      expect(1).toEqual(length);
    });

    it("Didnt delete child rule if patch was rejected", function(){
      var length;
      var rule = new VirtualGroupingRule({
        type: 4,
        startOffset: 0,
        endOffset: 70,
        cssText: "@media print { .rule-1 { display: block; } .rule-2{ display: none; } }"
      }, null, {
        prePatchApply: function(rule, patchInfo, ref) {
          if (patchInfo.action === VirtualStyleSheet.PATCH_DELETE) {
            return VirtualStyleSheet.PATCH_REJECT;
          }
        }
      });

      rule.deleteRule(1);

      expect(rule.rules.length).toEqual(2);
    });
  });
});

