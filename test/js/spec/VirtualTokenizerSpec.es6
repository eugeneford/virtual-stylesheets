import VirtualTokenizer from "../../../src/VirtualTokenizer.es6";

describe("Virtual Tokenizer", () => {
  describe("constructor()", () => {
    it("instanceof VirtualTokenizer", () => {
      let list = new VirtualTokenizer();
      expect(list instanceof VirtualTokenizer).toEqual(true);
    });
  });

  describe("getCommentToken()", () => {
    it(`/* Example Comment */ ==> COMMENT_TOKEN`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `/* Example Comment */`;
      let token = tokenizer.getCommentToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.COMMENT_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`.example {} ==> null`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `.example {}`;
      let token = tokenizer.getCommentToken(cssText, 0);

      expect(token).toEqual(null);
    });

    it(`/* Exam ==> COMMENT_TOKEN`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `/* Examp`;
      let token = tokenizer.getCommentToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.COMMENT_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`/* Example Comment */ .test{} ==> COMMENT_TOKEN[startOffset: 0, length: 21]`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `/* Example Comment */ .test{}`;
      let token = tokenizer.getCommentToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.COMMENT_TOKEN,
        startOffset: 0,
        length: 21
      });
    });
  });

  describe("getWhitespaceToken()", () => {
    it(`"     \n    " ==> WHITESPACE_TOKEN`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `     \n    `;
      let token = tokenizer.getWhitespaceToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.WHITESPACE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`"/* Example Comment */" ==> null`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `/* Example Comment */`;
      let token = tokenizer.getWhitespaceToken(cssText, 0);

      expect(token).toEqual(null);
    });

    it(`".test{}" ==> null`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `.test{}`;
      let token = tokenizer.getWhitespaceToken(cssText, 0);

      expect(token).toEqual(null);
    });

    it(`"@test{}" ==> null`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `@test{}`;
      let token = tokenizer.getWhitespaceToken(cssText, 0);

      expect(token).toEqual(null);
    });
  });

  describe("getQualifiedRuleToken()()", () => {
    it(`"100% {}" ==> QUALIFIED_RULE_TOKEN`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `100% {}`;
      let token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.QUALIFIED_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`".test {}" ==> QUALIFIED_RULE_TOKEN`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `.test {}`;
      let token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.QUALIFIED_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`".selector; .test {} " ==> UNKNOWN_TOKEN`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `.selector; .test {} `;
      let token = tokenizer.getQualifiedRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: 10
      });
    });
  });

  describe("getAtRuleToken()()", () => {
    it(`"@media print {}" ==> AT_RULE_TOKEN`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `@media print {}`;
      let token = tokenizer.getAtRuleToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.AT_RULE_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });

    it(`".test {}" ==> null`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `.test {}`;
      let token = tokenizer.getAtRuleToken(cssText, 0);

      expect(token).toEqual(null);
    });

    it(`" " ==> null`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = ` `;
      let token = tokenizer.getAtRuleToken(cssText, 0);

      expect(token).toEqual(null);
    });

    it(`"/* Test */" ==> null`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `/* Test */`;
      let token = tokenizer.getAtRuleToken(cssText, 0);

      expect(token).toEqual(null);
    });
  });

  describe("getUnknownToken()()()", () => {
    it(`"\" {}" ==> UNKNOWN_TOKEN`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `\" {}`;
      let token = tokenizer.getUnknownToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: 1
      });
    });

    it(`"{}" ==> UNKNOWN_TOKEN`, () => {
      let tokenizer = new VirtualTokenizer();
      let cssText = `{}`;
      let token = tokenizer.getUnknownToken(cssText, 0);

      expect(token).toEqual({
        type: VirtualTokenizer.UNKNOWN_TOKEN,
        startOffset: 0,
        length: cssText.length
      });
    });
  });
});