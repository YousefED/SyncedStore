import { Observer, reactive } from "@reactivedata/reactive";
import { Y, crdt, getInternalAny, getInternalMap } from "@reactivedata/reactive-crdt";

describe("test implicit observer", () => {
  type StoreType = {
    arr: number[];
    object: {
      nested: number;
    };
    xml: Y.XmlFragment;
  };

  let fnSpy1: jest.Mock<void, []>;
  let fnSpy2: jest.Mock<void, []>;
  let implicitStore1: StoreType;
  let implicitStore2: StoreType;

  beforeEach(() => {
    fnSpy1 = jest.fn(() => {});
    fnSpy2 = jest.fn(() => {});

    const doc1 = new Y.Doc();

    let store = crdt<StoreType>(doc1);
    store.arr = [3];
    store.object = { nested: 0 };

    implicitStore1 = reactive(store, new Observer(fnSpy1)) as StoreType;
    implicitStore2 = reactive(store, new Observer(fnSpy2)) as StoreType;
  });

  it("implicit works with push and filter", () => {
    let x = implicitStore1.arr!.filter(v => v);
    implicitStore1.arr!.push(1);

    expect(fnSpy1).toBeCalledTimes(1);
    expect(fnSpy2).toBeCalledTimes(0);

    implicitStore2.arr!.filter(v => v);
    implicitStore1.arr!.push(1);

    expect(fnSpy1).toBeCalledTimes(2);
    expect(fnSpy2).toBeCalledTimes(1);
  });

  it("implicit works with get and push", () => {
    let x = implicitStore1.arr![1];
    implicitStore1.arr!.push(1);

    expect(fnSpy1).toBeCalledTimes(1);
    expect(fnSpy2).toBeCalledTimes(0);

    x = implicitStore2.arr![1];
    implicitStore1.arr!.push(1);

    expect(fnSpy1).toBeCalledTimes(2);
    expect(fnSpy2).toBeCalledTimes(1);
  });

  it("implicit works with get and set", () => {
    let x = implicitStore1.arr![0];
    implicitStore1.arr![0] = 9;

    expect(fnSpy1).toBeCalledTimes(1);
    expect(fnSpy2).toBeCalledTimes(0);

    x = implicitStore2.arr![0];
    implicitStore1.arr![0] = 10;

    expect(fnSpy1).toBeCalledTimes(2);
    expect(fnSpy2).toBeCalledTimes(1);
  });

  // TODO: This test has known (non-breaking) issues demonstrating observers are called twice
  it("implicit works with nested objects", () => {
    let x = implicitStore1.object.nested;
    implicitStore1.object.nested = 10;

    expect(fnSpy1).toBeCalledTimes(1); // TODO: should be "1"
    expect(fnSpy2).toBeCalledTimes(0);

    x = implicitStore2.object.nested;
    implicitStore1.object.nested = 11;

    expect(fnSpy1).toBeCalledTimes(2); // TODO: should be "2"
    expect(fnSpy2).toBeCalledTimes(1); // TODO: should be "1"
  });

  it("implicit works with xml", () => {
    let x = implicitStore1.xml;
    implicitStore1.xml = new Y.XmlFragment();

    expect(fnSpy1).toBeCalledTimes(2); // TODO: should be "1"
    expect(fnSpy2).toBeCalledTimes(0);

    let child = implicitStore2.xml.firstChild?.toDOM;
    const newEl = new Y.XmlElement("p");
    newEl.push([new Y.XmlText("text")]);
    implicitStore1.xml.push([newEl]);

    expect(fnSpy1).toBeCalledTimes(2);
    expect(fnSpy2).toBeCalledTimes(1);

    expect(implicitStore2.xml.toString()).toBe("<p>text</p>");
  });

  it("works with has", () => {
    let bool = "nested" in implicitStore2.object;
    getInternalMap(implicitStore1.object).set("nested", 10);

    expect(fnSpy2).toBeCalledTimes(1);
  });
});
