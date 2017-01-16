import VirtualList from "../../../src/VirtualList.es6";

describe("Virtual List", () => {
  describe("constructor()", () => {
    it("new VirtualList() instanceof VirtualList", () => {
      let list = new VirtualList();
      expect(list instanceof VirtualList).toEqual(true);
    });
  });

  describe("append()", () => {
    it("\"example text\" => void", () => {
      let list = new VirtualList();
      list.append("example text");
      expect(list.items[0]).toEqual("example text");
    });

    it("{ value: \"example text\"} => TypeError", () => {
      let list = new VirtualList();
      expect(list.append).toThrowError(TypeError);
    });
  });

  describe("remove()", () => {
    it("\"value\" => \"value\"", () => {
      let list = new VirtualList();
      list.append("example text");
      list.append("value");
      expect(list.remove("value")).toEqual("value");
    });

    it("\"Value That is not in list\" => Error", () => {
      let list = new VirtualList();
      expect(list.remove).toThrowError(Error);
    });
  });

  describe("get()", () => {
    it("1 => \"value\"", () => {
      let list = new VirtualList();
      list.append("example text");
      list.append("value");
      expect(list.get(1)).toEqual("value");
    });

    it("5 => undefined", () => {
      let list = new VirtualList();
      list.append("example text");
      list.append("value");
      expect(list.get(5)).toEqual(undefined);
    });
  });
});