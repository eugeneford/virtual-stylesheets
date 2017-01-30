var VirtualImportRule = VSM.VirtualImportRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;

describe("VirtualImportRule", function(){
  describe("constructor()", function(){
    it("Successfully created new VirtualImportRule", function(){
      expect(function(){
        var rule = new VirtualImportRule({
          type: 3,
          startOffset: 0,
          endOffset: 10,
          cssText: "@import url('landscape.css') screen and (orientation:landscape);"
        });
      }).not.toThrowError();
    });
  });

  describe("parse()", function(){
    it("Correctly parsed location within 2 quotes", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 10,
        cssText: "@import \"landscape.css\";"
      });

      expect(rule.href).toEqual("landscape.css");
      expect(rule.media).toEqual(null);
    });

    it("Correctly parsed location within url() term", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 10,
        cssText: "@import url(chrome://communicator/skin/);"
      });

      expect(rule.href).toEqual("chrome://communicator/skin/");
      expect(rule.media).toEqual(null);
    });

    it("Correctly parsed location within url('') term", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 10,
        cssText: "@import url('print.css');"
      });

      expect(rule.href).toEqual("print.css");
      expect(rule.media).toEqual(null);
    });

    it("Correctly parsed location within very difficult term", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 10,
        cssText: "@import url('url(\"priurl(n)t.css\")');"
      });

      expect(rule.href).toEqual("url(\"priurl(n)t.css\")");
      expect(rule.media).toEqual(null);
    });

    it("Correctly parsed media from rule", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 10,
        cssText: "@import url('print.css') print;"
      });

      expect(rule.href).toEqual("print.css");
      expect(rule.media).toEqual("print");
    });

    it("Correctly parsed complex media from rule", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 10,
        cssText: "@import url('print.css') screen and (orientation:landscape), projection;"
      });

      expect(rule.href).toEqual("print.css");
      expect(rule.media).toEqual("screen and (orientation:landscape), projection");
    });

    it("Ignored bad input from the rule", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 10,
        cssText: "@import url print.css;"
      });

      expect(rule.href).toEqual(null);
      expect(rule.media).toEqual(null);
    });

    it("Did nothing when parseType.PARSE_BODY was passed", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 10,
        cssText: "@import url print.css;"
      });

      rule.parse(VirtualStyleSheet.PARSE_BODY);

      expect(rule.href).toEqual(null);
      expect(rule.media).toEqual(null);
    });
  });

  describe("setLocation()", function(){
    it("Threw a TypeError when href was not a string", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 10,
        cssText: "@import 'UTF-8';"
      });

      expect(function(){
        rule.setLocation(111);
      }).toThrowError(TypeError);
    });

    it("Correctly applied new href to bad @import rule", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 10,
        cssText: "@import print;"
      });

      expect(rule.href).toEqual(null);
      expect(rule.media).toEqual(null);

      rule.setLocation("print.css");

      expect(rule.href).toEqual("print.css");
      expect(rule.media).toEqual(null);
    });

    it("Correctly changed href of @import rule", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 29,
        cssText: "@import url(print.css) print;"
      });

      expect(rule.href).toEqual("print.css");
      expect(rule.media).toEqual("print");

      rule.setLocation("test.css");

      expect(rule.href).toEqual("test.css");
      expect(rule.media).toEqual("print");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(28);
      expect(rule.cssText).toEqual("@import url(test.css) print;");
    })
  });

  describe("setMedia()", function(){
    it("Threw a TypeError when media was not a string", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 10,
        cssText: "@import print;"
      });

      expect(function(){
        rule.setMedia(1);
      }).toThrowError(TypeError);
    });

    it("Did nothing when href wasnt specified", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 10,
        cssText: "@import print;"
      });

      expect(rule.href).toEqual(null);
      expect(rule.media).toEqual(null);

      rule.setMedia("screen");

      expect(rule.href).toEqual(null);
      expect(rule.media).toEqual(null);
    });

    it("Correctly replaced existing media string", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 29,
        cssText: "@import url(print.css) print;"
      });

      expect(rule.href).toEqual('print.css');
      expect(rule.media).toEqual('print');

      rule.setMedia("screen");

      expect(rule.href).toEqual('print.css');
      expect(rule.media).toEqual("screen");
    });

    it("Correctly applied new media string", function(){
      var rule = new VirtualImportRule({
        type: 3,
        startOffset: 0,
        endOffset: 29,
        cssText: "@import url(print.css);"
      });

      rule.setMedia("print");

      expect(rule.href).toEqual('print.css');
      expect(rule.media).toEqual("print");
    })
  });
});