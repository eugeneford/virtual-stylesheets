var VirtualViewportRule = VSM.VirtualViewportRule;

describe("VirtualViewportRule", function(){
  describe("constructor()", function(){
    it("Successfuly created VirtualViewportRule", function(){
      expect(function() {
        var rule = new VirtualViewportRule({
          type: 15,
          startOffset: 0,
          endOffset: 2,
          cssText: "@viewport { min-width: 640px; }"
        });
      }).not.toThrowError();
    });
  });
});