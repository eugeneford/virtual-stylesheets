import VirtualRuleList from "../../../src/VirtualRuleList.es6";
import VirtualRule from "../../../src/VirtualRule.es6";

describe("Virtual Rule List", () => {
  describe("constructor()", () => {
    it("instanceof VirtualRuleList", () => {
      let list = new VirtualRuleList();
      expect(list instanceof VirtualRuleList).toEqual(true);
    });

    it("length ==> 0", () => {
      let list = new VirtualRuleList();
      expect(list.length).toEqual(0);
    });

    it("_rules ==> []", () => {
      let list = new VirtualRuleList();
      expect(list._rules).toEqual([]);
    });
  });

  describe("insert()", () => {
    it(`insert() ==> Error`, () => {
      let list = new VirtualRuleList();
      expect(() => list.insert()).toThrowError(Error);
    });

    it(`insert(".rule{}", 0) ==> Error`, () => {
      let list = new VirtualRuleList();
      expect(() => list.insert(".rule{}", 0)).toThrowError(Error);
    });

    it(`insert(VirtualRule, 0)`, () => {
      let list = new VirtualRuleList();
      let rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(rule, 0);
      expect(list._rules[0]).toEqual(rule);
    });

    it(`[VirtualRule], insert(VirtualRule) => [VirtualRule, VirtualRule]`, () => {
      let list = new VirtualRuleList();
      let rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}), 0);
      list.insert(rule);
      expect(list._rules[1]).toEqual(rule);
    });

    it(`insert(VirtualRule, 10) => [VirtualRule], [0].id === 0`, () => {
      let list = new VirtualRuleList();
      let rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(rule, 10);
      expect(list._rules[0].id).toEqual(0);
    });

    it(`insert(VirtualRule, -5) => Error`, () => {
      let list = new VirtualRuleList();
      expect(() => list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}), -5)).toThrowError(Error);
    });

    it(`insert(VirtualRule, 0) ==> list.length === 1`, () => {
      let list = new VirtualRuleList();
      let rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(rule, 0);
      expect(list.length).toEqual(1);
    });

    it(`[VirtualRule, VirtualRule], insert(VirtualRule, 1) ==> [0].id === 0, [1].id === 1, [2].id === 2`, () => {
      let list = new VirtualRuleList();
      let rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      list.insert(rule, 1);

      expect(list._rules[0].id).toEqual(0);
      expect(list._rules[1].id).toEqual(1);
      expect(list._rules[2].id).toEqual(2);
    });
  });

  describe("remove()", () => {
    it(`[VirtualRule], remove() ==> Error`, () => {
      let list = new VirtualRuleList();
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      expect(() => list.remove()).toThrowError(Error);
    });

    it(`[VirtualRule], remove(-1) ==> Error`, () => {
      let list = new VirtualRuleList();
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      expect(() => list.remove(-1)).toThrowError(Error);
    });

    it(`[VirtualRule], remove(10) ==> Error`, () => {
      let list = new VirtualRuleList();
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      expect(() => list.remove(10)).toThrowError(Error);
    });

    it(`[VirtualRule], remove(0) ==> VirtualRule`, () => {
      let list = new VirtualRuleList();
      let rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(rule);
      expect(list.remove(0)).toEqual(rule);
    });

    it(`[], remove(0) ==> Error`, () => {
      let list = new VirtualRuleList();
      expect(() => list.remove(0)).toThrowError(Error);
    });

    it(`[VirtualRule,VirtualRule,VirtualRule], remove(1) ==> [0].id === 0, [1].id === 1`, () => {
      let list = new VirtualRuleList();
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      list.remove(1);
      expect(list._rules[0].id).toEqual(0);
      expect(list._rules[1].id).toEqual(1);
    });
  });

  describe("get()", () => {
    it(`[VirtualRule], get(0) ==> VirtualRule`, () => {
      let list = new VirtualRuleList();
      let rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(rule);
      expect(list.get(0)).toEqual(rule);
    });

    it(`[VirtualRule], get(-1) ==> undefined`, () => {
      let list = new VirtualRuleList();
      let rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(rule);
      expect(list.get(-1)).toBeUndefined();
    });

    it(`[VirtualRule], get(10) ==> undefined`, () => {
      let list = new VirtualRuleList();
      let rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(rule);
      expect(list.get(10)).toBeUndefined();
    });

    it(`[], get(0) ==> undefined`, () => {
      let list = new VirtualRuleList();
      expect(list.get(0)).toBeUndefined();
    });
  });

  describe("filter()", () => {
    it(`[VirtualRule,VirtualRule], filter(() => 0) ==> []`, () => {
      let list = new VirtualRuleList(), filt;
      list.insert(new VirtualRule({type: 1, startOffset:0, endOffset:11, cssText: ".example {}"}));
      list.insert(new VirtualRule({type: 1, startOffset:12, endOffset:20, cssText: ".test {}"}));

      filt = list.filter(() => 0);

      expect(filt).toEqual([]);
    });

    it(`[VirtualRule,VirtualRule], filter(() => 1) ==> [VirtualRule,VirtualRule]`, () => {
      let list = new VirtualRuleList(), filt;
      list.insert(new VirtualRule({type: 1, startOffset:0, endOffset:11, cssText: ".example {}"}));
      list.insert(new VirtualRule({type: 1, startOffset:12, endOffset:20, cssText: ".test {}"}));

      filt = list.filter(() => 1);

      expect(filt).toEqual([list._rules[0], list._rules[1]]);
    });

    it(`[VirtualRule,VirtualRule], filter((rule) => rule.id === 1) ==> [VirtualRule]`, () => {
      let list = new VirtualRuleList(), filt;
      list.insert(new VirtualRule({type: 1, startOffset:0, endOffset:11, cssText: ".example {}"}));
      list.insert(new VirtualRule({type: 1, startOffset:12, endOffset:20, cssText: ".test {}"}));

      filt = list.filter((rule) => rule.id === 1);

      expect(filt).toEqual([list._rules[1]]);
    });
  });
});