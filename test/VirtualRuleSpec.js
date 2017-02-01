var VirtualRule = VSM.VirtualRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;

describe("Virtual Rule", function() {
  describe("constructor()", function() {
    it("Threw an Error when ruleInfo was not passed", function() {
      expect(function() { new VirtualRule()}).toThrowError(Error);
    });

    it("Threw an Error when one of props of ruleInfo was missing", function() {
      expect(function() { new VirtualRule({})}).toThrowError(Error);
    });

    it(`Successfuly created new VirtualRule with passed ruleInfo`, function() {
      var rule = new VirtualRule({type: 1, startOffset:0, endOffset:11, cssText: ".example {}"});
      expect(rule instanceof VirtualRule).toEqual(true);
      expect(rule.parentRule).toEqual(null);
      expect(rule._opts).toEqual({});
      expect(rule.lazyParsing).toEqual(0);
    });
  });

  describe("getHead()", function() {
    it("Threw a SyntaxError with not valid rule", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:15,
        cssText: "{ prop: value }"
      });

      expect(function() { rule.getHead() }).toThrowError(SyntaxError);
    });

    it("Returned correct head block properties from valid rule {}", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:25,
        cssText: ".selector { prop: value }"
      });

      var head = rule.getHead();

      expect(head).toEqual({
        startOffset: 0,
        endOffset: 10
      });
    });

    it("Returned correct head block properties with escaped { and } chars", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:36,
        cssText: "[class=\"'{'\"]:after { content: \"}\" }"
      });

      var head = rule.getHead();

      expect(head).toEqual({
        startOffset: 0,
        endOffset: 20
      });
    });

    it(`Returned correct head block properties from valid @rule;`, function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:17,
        cssText: `@charset "UTF-8";`
      });

      expect(rule.getHead()).toEqual({
        startOffset: 0,
        endOffset: 16
      });
    });
  });

  describe("getBody()", function() {
    it("Threw a SyntaxError with not valid rule", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:14,
        cssText: "@media print {"
      });

      expect(function() { rule.getBody() }).toThrowError(SyntaxError);
    });

    it("Returned correct body block props with rule {}", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:25,
        cssText: ".selector { prop: value }"
      });

      var body = rule.getBody();

      expect(body).toEqual({
        startOffset: 11,
        endOffset: 24
      });
    });

    it("Returned correct body block props with @rule {}", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:38,
        cssText: "@media print { .test { prop: value } }"
      });

      var body = rule.getBody();

      expect(body).toEqual({
        startOffset: 14,
        endOffset: 37
      });
    });

    it("Returned null with @rule;", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:19,
        cssText: "@charset \"UTF-8\";"
      });

      var body = rule.getBody();

      expect(body).toEqual(null);
    });

    it("Returned correct body block props with escaped { and } chars", function() {
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:41,
        cssText: "[class=\"'{'\"]:before { content: \"}\" }"
      });

      var body = rule.getBody();

      expect(body).toEqual({
        startOffset: 22,
        endOffset: 36
      });
    });
  });

  describe("patch()", function(){
    it("Successfully applied PATCH_APPEND", function(){
      var rule = new VirtualRule({
        type: 1,
        startOffset:10,
        endOffset:36,
        cssText: ".selector { width: 30px; }"
      });

      rule.patch({
        action: VirtualStyleSheet.PATCH_APPEND,
        value: "test",
        patchDelta: 4
      });

      expect(rule.cssText).toEqual(".selector { width: 30px; }test");
      expect(rule.startOffset).toEqual(10);
      expect(rule.endOffset).toEqual(40);
    });

    it("Successfully applied PATCH_PREPEND", function(){
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:26,
        cssText: ".selector { width: 30px; }"
      });

      rule.patch({
        action: VirtualStyleSheet.PATCH_PREPEND,
        value: "test",
        patchDelta: 4
      });

      expect(rule.cssText).toEqual("test.selector { width: 30px; }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(30);
    });

    it("Successfully applied PATCH_INSERT", function(){
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:26,
        cssText: ".selector { width: 30px; }"
      });

      rule.patch({
        action: VirtualStyleSheet.PATCH_INSERT,
        start: 25,
        value: "height: 30px;",
        patchDelta: 13
      });

      expect(rule.cssText).toEqual(".selector { width: 30px; height: 30px;}");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(39);
    });

    it("Successfully applied PATCH_REPLACE", function(){
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:26,
        cssText: ".selector { width: 30px; }"
      });

      rule.patch({
        action: VirtualStyleSheet.PATCH_REPLACE,
        start: 12,
        end: 24,
        value: "width: 270px;",
        patchDelta: 13
      });

      expect(rule.cssText).toEqual(".selector { width: 270px; }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(27);
    });


    it("Successfully applied PATCH_DELETE", function(){
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:26,
        cssText: ".selector { width: 30px; }"
      });

      rule.patch({
        action: VirtualStyleSheet.PATCH_DELETE,
        start: 12,
        end: 24,
        patchDelta: -13
      });

      expect(rule.cssText).toEqual(".selector {  }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(14);
    });

    it("Successfully applied PATCH_UPDATE", function(){
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:26,
        cssText: ".selector { width: 30px; }"
      });

      rule.patch({
        action: VirtualStyleSheet.PATCH_UPDATE,
        patchDelta: 10
      });

      expect(rule.cssText).toEqual(".selector { width: 30px; }");
      expect(rule.startOffset).toEqual(10);
      expect(rule.endOffset).toEqual(36);
    });

    it("Ignored applied PATCH_UPDATE if patchDelta was not passed", function(){
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:26,
        cssText: ".selector { width: 30px; }"
      });

      rule.patch({
        action: VirtualStyleSheet.PATCH_UPDATE
      });

      expect(rule.cssText).toEqual(".selector { width: 30px; }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(26);
    });

    it("Successfully ignored target patch if prePatchApply hook returned PATH_REJECT flag", function(){
      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:26,
        cssText: ".selector { width: 30px; }"
      }, null, {
        prePatchApply: function (){
          return VirtualStyleSheet.PATCH_REJECT
        }
      });

      rule.patch({
        action: VirtualStyleSheet.PATCH_DELETE,
        start: 12,
        end: 24,
        patchDelta: 13
      });

      expect(rule.cssText).toEqual(".selector { width: 30px; }");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(26);
    });

    it("Successfully applied postPatchApply hook", function(){
      var hookRule;

      var rule = new VirtualRule({
        type: 1,
        startOffset:0,
        endOffset:26,
        cssText: ".selector { width: 30px; }"
      }, null, {
        postPatchApply: function (rule, patchInfo){
          hookRule = rule;
        }
      });

      var patch = {
        action: VirtualStyleSheet.PATCH_DELETE,
        start: 12,
        end: 24,
        patchDelta: 13
      };

      rule.patch(patch);

      expect(rule).toEqual(hookRule);
    });
  });
});