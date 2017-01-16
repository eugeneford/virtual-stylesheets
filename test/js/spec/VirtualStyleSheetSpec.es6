import VirtualStyleSheet from "../../../src/VirtualStyleSheet.es6";

describe("Virtual StyleSheet", () => {
  describe("parseFromString", () => {
    it("test", () => {
      let cssText;

      cssText = `@charset "UTF-8";\n\n/** [Table of contents] */\n\n@document url(http://www.w3.org/), url-prefix(http://www.w3.org/Style/), domain(mozilla.org), regexp("https:.*;") {\n  body {\n    color: purple;\n    background: yellow;\n  }\n}\n\n@import url("print.css") print;\n\n@font-face {\n  font-family: MyHelvetica;\n  src: local("Helvetica Neue }Bold"), local("HelveticaNeue-Bold"), url(MgOpenModernaBold.ttf);\n  font-weight: bold;\n}\n\n@page :first {\n  margin-top: 10cm /* Top margin on first page 10cm */\n}\n\n#example h1 {\n  font-size: 40px;\n  line-height: 1.3;\n}\n\n`;

      let t1 = performance.now();
      let vss = new VirtualStyleSheet(cssText, {});
      let t2 = performance.now();

      console.log(`TIME: ${t2-t1}`);
      console.log(vss.rules);

      expect(true).toEqual(true);
    });
  });
});