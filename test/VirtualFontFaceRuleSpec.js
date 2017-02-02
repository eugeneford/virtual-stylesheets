var VirtualFontFaceRule = VSM.VirtualFontFaceRule;

describe("VirtualFontFaceRule", function(){
  describe("constructor()", function(){
    it("Successfuly created VirtualFontFaceRule", function(){
      expect(function() {
        var rule = new VirtualFontFaceRule({
          type: 5,
          startOffset: 0,
          endOffset: 122,
          cssText: "@font-face { font-family: \"Bitstream Vera Serif Bold\"; src: url(\"https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf\"); }"
        });
      }).not.toThrowError();
    });
  });
});