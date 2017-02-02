var VirtualNamespaceRule = VSM.VirtualNamespaceRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;

describe("VirtualNamespaceRule", function(){
  describe("constructor()", function(){
    it("Successfully created new VirtualNamespaceRule", function(){
      expect(function(){
        var rule = new VirtualNamespaceRule({
          type: 10,
          startOffset: 0,
          endOffset: 47,
          cssText: "@namespace svg url(http://www.w3.org/2000/svg);"
        });
      }).not.toThrowError();
    })
  });

  describe("parse()", function(){
    it("Did nothing when parseType.PARSE_BODY was passed", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 47,
        cssText: "@namespace svg url(http://www.w3.org/2000/svg);"
      });

      rule.parse(VirtualStyleSheet.PARSE_BODY);

      expect(rule.uri).toEqual(null);
      expect(rule.prefix).toEqual(null);
    });

    it("Successfully parsed namespace props from the rule", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 47,
        cssText: "@namespace svg url(http://www.w3.org/2000/svg);"
      });

      expect(rule.uri).toEqual("http://www.w3.org/2000/svg");
      expect(rule.prefix).toEqual("svg");
    });

    it("Successfully parsed uri within url() declaration", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 43,
        cssText: "@namespace url(http://www.w3.org/2000/svg);"
      });

      expect(rule.uri).toEqual("http://www.w3.org/2000/svg");
      expect(rule.prefix).toEqual(null);
    });

    it("Successfully parsed 'url' prefix from the rule", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 43,
        cssText: "@namespace url url(http://www.w3.org/2000/svg);"
      });

      expect(rule.uri).toEqual("http://www.w3.org/2000/svg");
      expect(rule.prefix).toEqual("url");
    });

    it("Ignore namespace prefix if uri was not passed", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 15,
        cssText: "@namespace url;"
      });

      expect(rule.uri).toEqual(null);
      expect(rule.prefix).toEqual(null);
    });

    it("Successfully parsed uri within quotes declaration", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 42,
        cssText: "@namespace \"'http://www.w3.org/2000/svg'\";"
      });

      expect(rule.uri).toEqual("'http://www.w3.org/2000/svg'");
      expect(rule.prefix).toEqual(null);
    });
  });

  describe("setURI()", function(){
    it("Threw a TypeError when uri was not a string", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 40,
        cssText: "@namespace \"http://www.w3.org/2000/svg\";"
      });

      expect(function(){
        rule.setURI(1);
      }).toThrowError(TypeError);
    });

    it("Successfully changed existing uri", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 40,
        cssText: "@namespace \"http://www.w3.org/2000/svg\";"
      });

      rule.setURI("http://www.w3.org/1999/xhtml");

      expect(rule.cssText).toEqual("@namespace \"http://www.w3.org/1999/xhtml\";");
      expect(rule.uri).toEqual("http://www.w3.org/1999/xhtml");
      expect(rule.prefix).toEqual(null);
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(42);
    });

    it("Successfully created new uri", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 15,
        cssText: "@namespace svg;"
      });

      rule.setURI("http://www.w3.org/2000/svg");

      expect(rule.cssText).toEqual("@namespace url(\"http://www.w3.org/2000/svg\");");
      expect(rule.uri).toEqual("http://www.w3.org/2000/svg");
      expect(rule.prefix).toEqual(null);
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(45);
    });
  });

  describe("setPrefix()", function(){
    it("Threw a TypeError when prefix was not a string", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 40,
        cssText: "@namespace \"http://www.w3.org/2000/svg\";"
      });

      expect(function(){
        rule.setPrefix(1);
      }).toThrowError(TypeError);
    });

    it("Successfully changed existing prefix", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 44,
        cssText: "@namespace svg \"http://www.w3.org/2000/svg\";"
      });

      rule.setPrefix("default");

      expect(rule.cssText).toEqual("@namespace default \"http://www.w3.org/2000/svg\";");
      expect(rule.uri).toEqual("http://www.w3.org/2000/svg");
      expect(rule.prefix).toEqual("default");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(48);
    });

    it("Successfully created new prefix", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 40,
        cssText: "@namespace \"http://www.w3.org/2000/svg\";"
      });

      rule.setPrefix("svg");

      expect(rule.cssText).toEqual("@namespace svg \"http://www.w3.org/2000/svg\";");
      expect(rule.uri).toEqual("http://www.w3.org/2000/svg");
      expect(rule.prefix).toEqual("svg");
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(44);
    });

    it("Did nothing when uri is not exist", function(){
      var rule = new VirtualNamespaceRule({
        type: 10,
        startOffset: 0,
        endOffset: 15, 
        cssText: "@namespace svg;"
      });

      rule.setPrefix("html");

      expect(rule.cssText).toEqual("@namespace svg;");
      expect(rule.uri).toEqual(null);
      expect(rule.prefix).toEqual(null);
      expect(rule.startOffset).toEqual(0);
      expect(rule.endOffset).toEqual(15);
    });
  });
});