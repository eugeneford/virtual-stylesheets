var VirtualTokenizer = VSM.VirtualTokenizer;

describe("Virtual Tokenizer", function() {
  describe("constructor()", function() {
    it(`Threw an error when was trying create a new one`, function() {
      expect(function(){new VirtualTokenizer()}).toThrowError(Error);
    });
  });

  describe("getCommentToken()", function() {
    it(`Returned a COMMENT_TOKEN when /* Example Comment */ was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `/* Example Comment */`;
      var token = tokenizer.getCommentToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.COMMENT_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned null when something else was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `.example {}`;
      var token = tokenizer.getCommentToken(cssText, 0);

      expect(token).toEqual(null);
    });

    it(`Returned a COMMENT_TOKEN when /* Exam was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `/* Examp`;
      var token = tokenizer.getCommentToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.COMMENT_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned a COMMENT_TOKEN with correct length when /* Example Comment */ .test{} was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `/* Example Comment */ .test{}`;
      var token = tokenizer.getCommentToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.COMMENT_TOKEN,
        startOffset: 0,
        length: 21
      });
    });
  });

  describe("getWhitespaceToken()", function() {
    it(`Returned a WHITESPACE_TOKEN when "     \n    " was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `     \n    `;
      var token = tokenizer.getWhitespaceToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.WHITESPACE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned null when something else was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `/* Example Comment */`;
      var token = tokenizer.getWhitespaceToken(cssText, 0);
      expect(token).toEqual(null);
      cssText = `.test{}`;
      token = tokenizer.getWhitespaceToken(cssText, 0);
      expect(token).toEqual(null);
      cssText = `@test{}`;
      token = tokenizer.getWhitespaceToken(cssText, 0);
      expect(token).toEqual(null);
    });

  });

  describe("getQualifiedRuleToken()", function() {
    it("Correctly created a QUALIFIED_RULE_TOKEN from rule started with >", function(){
      var tokenizer = VirtualTokenizer;
      var cssText = `> .container { }`;
      var token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.QUALIFIED_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it("Correctly created a QUALIFIED_RULE_TOKEN with comments within", function(){
      var tokenizer = VirtualTokenizer;
      var cssText = `.pswp__preloader--active .pswp__preloader__icn {\n        /* We use .gif in browsers that don't support CSS animation */\n        background: url(images/preloader.gif) 0 0 no-repeat;\n      }\n\n.pswp--css_animation .pswp__preloader--active {\n  opacity: 1;\n}`;
      var token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.QUALIFIED_RULE_TOKEN,
        startOffset: 0,
        length: 188
      });
    });

    it(`Returned QUALIFIED_RULE_TOKEN when 100% {} was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `100% {}`;
      var token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.QUALIFIED_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned QUALIFIED_RULE_TOKEN when .test {} was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `.test {}`;
      var token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.QUALIFIED_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned QUALIFIED_RULE_TOKEN when #ident {} was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `#ident {}`;
      var token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.QUALIFIED_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned QUALIFIED_RULE_TOKEN when body {} was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `body {}`;
      var token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.QUALIFIED_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned QUALIFIED_RULE_TOKEN when :first-child {} was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `:first-child {}`;
      var token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.QUALIFIED_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned QUALIFIED_RULE_TOKEN when [attr] {} was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `[attr] {}`;
      var token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.QUALIFIED_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned QUALIFIED_RULE_TOKEN when [attr="{}"] {} was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `[attr="{'}"] {}`;
      var token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.QUALIFIED_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned null when something else was pased`, function() {
      var tokenizer = VirtualTokenizer;

      expect(tokenizer.getQualifiedRuleToken("@media print {}", 0)).toEqual(null);
      expect(tokenizer.getQualifiedRuleToken("/* */", 0)).toEqual(null);
      expect(tokenizer.getQualifiedRuleToken("  ", 0)).toEqual(null);
    });

    it(`Returned UNKNOWN_TOKEN when .selector; .test {} was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `.selector; .test {} `;
      var token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: 10
      });
    });

    it(`Returned UNKNOWN_TOKEN when .outer { .inner {} } was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `.outer { .inner {} }`;
      var token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: 17
      });
    });
  });

  describe("getAtRuleToken()()", function() {
    it(`Returned AT_RULE_TOKEN when @media print {} was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `@media print {}`;
      var token = tokenizer.getAtRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.AT_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned null when something else was passed`, function() {
      var tokenizer = VirtualTokenizer;
      expect(tokenizer.getAtRuleToken(".test {}", 0)).toEqual(null);
      expect(tokenizer.getAtRuleToken(" ", 0)).toEqual(null);
      expect(tokenizer.getAtRuleToken("/* Test */", 0)).toEqual(null);
    });

    it(`Returned AT_RULE_TOKEN when @media print {} was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `@media print { .test { content: "'\}'" } }`;
      var token = tokenizer.getAtRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.AT_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned AT_RULE_TOKEN when @charset "UTF;8"; was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `@charset "UTF-8";`;
      var token = tokenizer.getAtRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.AT_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`Returned UNKNOWN_TOKEN when @charset "UTF;8" was passed`, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `@charset "UTF;8"`;
      var token = tokenizer.getAtRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });
  });

  describe("getUnknownToken()", function() {
    it(`Returned UNKNOWN_TOKEN when \" {} was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `\" {}`;
      var token = tokenizer.getUnknownToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: 1
      });
    });

    it(`Returned UNKNOWN_TOKEN with correct length when !blabla\\n was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `!blabla\n`;
      var token = tokenizer.getUnknownToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: 7
      });
    });

    it(`Returned UNKNOWN_TOKEN when !bla/bla was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `!bla/bla`;
      var token = tokenizer.getUnknownToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: 8
      });
    });

    it(`Returned UNKNOWN_TOKEN with correct length when !bla/* bla */ was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `!bla/* bla */`;
      var token = tokenizer.getUnknownToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: 4
      });
    });

    it(`Returned UNKNOWN_TOKEN with correct length when !bla@media print {} was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `!bla@media print {}`;
      var token = tokenizer.getUnknownToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: 4
      });
    });

    it(`Returned UNKNOWN_TOKEN with correct length when !bla@media was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `!bla@media`;
      var token = tokenizer.getUnknownToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: 10
      });
    });

    it(`Returned null when body {} was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `body {}`;
      var token = tokenizer.getUnknownToken(cssText, 0);

      expect(token).toEqual(null);
    });
  });

  describe("getToken()", function() {
    it(`Has called getRuleToken when @media print {} was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `@media print {}`;
      var token = tokenizer.getToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.AT_RULE_TOKEN,
        startOffset: 0,
        length: 15
      });
    });

    it(`Has called getWhitespaceToken when "  test{}" was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `  test{}`;
      var token = tokenizer.getToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.WHITESPACE_TOKEN,
        startOffset: 0,
        length: 2
      });
    });

    it(`Has called getCommentToken when /* comment */ was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `/* comment */`;
      var token = tokenizer.getToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.COMMENT_TOKEN,
        startOffset: 0,
        length: 13
      });
    });

    it(`Has called getUnknownToken when /test was passed `, function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `/test`;
      var token = tokenizer.getToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: 5
      });
    });
  });

  describe("tokenize()", function() {
    it("2 was accepted as default level", function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `/test`;
      var tokens = tokenizer.tokenize(cssText);

      expect(tokens).toEqual([]);
    });
  });


  describe("tokenize()", function() {
    it("Returned [UNKNOWN_TOKEN] when /test and level = 5 was passed", function() {
      var tokenizer = VirtualTokenizer;
      var cssText = `/test`;
      var tokens = tokenizer.tokenize(cssText, 5);

      expect(tokens).toEqual([{
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: 5,
        value: "/test"
      }]);
    });
  });
});