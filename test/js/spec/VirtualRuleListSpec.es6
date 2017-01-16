import VirtualRuleList from "../../../src/VirtualRuleList.es6";

describe("Virtual Rule List", () => {
  describe("constructor()", () => {
    it("new VirtualRuleList() instanceof VirtualRuleList", () => {
      let list = new VirtualRuleList();
      expect(list instanceof VirtualRuleList).toEqual(true);
    });
  });
});