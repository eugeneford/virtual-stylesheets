import * as VSM from "../../../dist/virtual-stylesheets";

describe("VSM Export", () => {
  it ("VirtualStyleSheet ==> success", () => {
    expect(VSM.VirtualStyleSheet).toBeDefined();
  });

  it ("VirtualGrammar ==> success", () => {
    expect(VSM.VirtualGrammar).toBeDefined();
  });

  it ("VirtualRuleFactory ==> success", () => {
    expect(VSM.VirtualRuleFactory).toBeDefined();
  });
});