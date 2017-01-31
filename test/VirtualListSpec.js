var VirtualList = VSM.VirtualList;
var VirtualRule = VSM.VirtualRule;

describe("Virtual List", function() {
  describe("constructor()", function() {
    it("created a rule list", function() {
      var list = new VirtualList();
      expect(list instanceof VirtualList).toEqual(true);
      expect(list.length).toEqual(0);
      expect(list._items).toEqual([]);
    });
  });

  describe("insert()", function() {
    it(`Threw an Error when rule wasnt specified`, function() {
      var list = new VirtualList();
      expect(function() { list.insert() }).toThrowError(Error);
    });

    it(`Added a new rule to list`, function() {
      var list = new VirtualList();
      var rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(rule, 0);
      expect(list._items[0]).toEqual(rule);
    });

    it(`Added a new rule to list's trail when index wasnt specified`, function() {
      var list = new VirtualList();
      var rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}), 0);
      list.insert(rule);
      expect(list._items[1]).toEqual(rule);
    });

    it(`Added a new rule to list's trail when index was larger than list length`, function() {
      var list = new VirtualList();
      var rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(rule, 10);
      expect(list._items[0].id).toEqual(0);
    });

    it(`Threw an error when was trying to add a rule to negative position`, function() {
      var list = new VirtualList();
      expect(function() { list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}), -5) }).toThrowError(Error);
    });

    it(`Added a new rule to the middle of the list`, function() {
      var list = new VirtualList();
      var rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      list.insert(rule, 1);

      expect(list._items[0].id).toEqual(0);
      expect(list._items[1].id).toEqual(1);
      expect(list._items[2].id).toEqual(2);
    });
  });

  describe("remove()", function() {
    it(`Threw an error when rule's id wasnt passed`, () => {
      var list = new VirtualList();
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      expect(() => list.remove()).toThrowError(Error);
    });

    it(`Threw an error when was passed a negative rule's id`, () => {
      var list = new VirtualList();
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      expect(() => list.remove(-1)).toThrowError(Error);
    });

    it(`Threw an error when was passed a an id greater than list length`, () => {
      var list = new VirtualList();
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      expect(() => list.remove(10)).toThrowError(Error);
    });

    it(`Successfully removed a rule`, () => {
      var list = new VirtualList();
      var rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(rule);
      expect(list.remove(0)).toEqual(rule);
    });

    it(`Successfully removed a rule from the middle of the list`, () => {
      var list = new VirtualList();
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      list.insert(new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""}));
      list.remove(1);
      expect(list._items[0].id).toEqual(0);
      expect(list._items[1].id).toEqual(1);
    });
  });

  describe("get()", () => {
    it(`Returned a right rule`, () => {
      var list = new VirtualList();
      var rule = new VirtualRule({type: 1, startOffset: 0, endOffset: 0, cssText: ""});
      list.insert(rule);
      expect(list.get(0)).toEqual(rule);
    });
  });

  describe("filter()", () => {
    it(`Returned a correctly filtered set of rules`, () => {
      var list = new VirtualList(), filt;
      list.insert(new VirtualRule({type: 1, startOffset:0, endOffset:11, cssText: ".example {}"}));
      list.insert(new VirtualRule({type: 1, startOffset:12, endOffset:20, cssText: ".test {}"}));

      filt = list.filter(() => 0);

      expect(filt).toEqual([]);
    });
  });
});