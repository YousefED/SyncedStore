import { autorun, Observer, reactive } from "@reactivedata/reactive";
import { Box, boxed, syncedStore, Y } from "../src";

type Todo = { text: string; completed: boolean };
describe("test implicit observer", () => {
  type StoreType = {
    arr: number[];
    sectionArray: Array<{ section: string; todos: Todo[] }>;
    object: {
      nested?: number;
    };
    todos: Box<Todo>[];
    todosNotBoxed: Todo[];
    xml: Y.XmlFragment;
  };

  let fnSpy1: jest.Mock<void, []>;
  let fnSpy2: jest.Mock<void, []>;
  let implicitStore1: StoreType;
  let implicitStore2: StoreType;
  let doc1: Y.Doc;
  let doc2: Y.Doc;
  let storeDoc2: StoreType;
  let store: StoreType;
  beforeEach(() => {
    fnSpy1 = jest.fn(() => {});
    fnSpy2 = jest.fn(() => {});

    doc1 = new Y.Doc();
    doc2 = new Y.Doc();

    store = syncedStore(
      {
        arr: [],
        sectionArray: [],
        object: {} as { nested?: number },
        todos: [],
        todosNotBoxed: [],
        xml: "xml" as "xml",
      },
      doc1
    );

    implicitStore1 = reactive(store, new Observer(fnSpy1));
    implicitStore2 = reactive(store, new Observer(fnSpy2));

    storeDoc2 = syncedStore(
      {
        arr: [],
        sectionArray: [],
        object: {} as { nested?: number },
        todos: [],
        todosNotBoxed: [],
        xml: "xml" as "xml",
      },
      doc2
    );
  });

  it("indexOf works on store", () => {
    implicitStore1.todosNotBoxed.push({
      text: "title",
      completed: false,
    });

    implicitStore1.todosNotBoxed.push({
      text: "title2",
      completed: false,
    });

    const item = store.todosNotBoxed[1];
    expect(implicitStore2.todosNotBoxed.indexOf(item)).toBe(1);
    expect(store.todosNotBoxed.indexOf(item)).toBe(1);

    const item2 = implicitStore1.todosNotBoxed[1];
    expect(implicitStore2.todosNotBoxed.indexOf(item)).toBe(1);
    expect(implicitStore1.todosNotBoxed.indexOf(item2)).toBe(1);
    expect(store.todosNotBoxed.indexOf(item2)).toBe(1);
  });

  it("implicit works with push and filter", () => {
    let x = implicitStore1.arr!.filter((v) => v);
    implicitStore1.arr.push(1);

    expect(fnSpy1).toBeCalledTimes(1);
    expect(fnSpy2).toBeCalledTimes(0);

    implicitStore2.arr.filter((v) => v);
    implicitStore1.arr.push(1);

    expect(fnSpy1).toBeCalledTimes(2);
    expect(fnSpy2).toBeCalledTimes(1);
  });

  it("implicit works with get and push", () => {
    let x = implicitStore1.arr[1];
    implicitStore1.arr.push(1);

    expect(fnSpy1).toBeCalledTimes(1);
    expect(fnSpy2).toBeCalledTimes(0);

    x = implicitStore2.arr[1];
    implicitStore1.arr.push(1);

    expect(fnSpy1).toBeCalledTimes(2);
    expect(fnSpy2).toBeCalledTimes(1);
  });

  it("implicit works with splice", () => {
    let x = implicitStore1.arr[1];
    implicitStore1.arr.push(1);

    expect(fnSpy1).toBeCalledTimes(1);
    expect(fnSpy2).toBeCalledTimes(0);

    implicitStore2.arr.splice(0, 1, 5);

    expect(fnSpy1).toBeCalledTimes(2);
    expect(fnSpy2).toBeCalledTimes(1);
  });

  // issue https://github.com/YousefED/SyncedStore/issues/42
  it("implicit works with nested sections and map", () => {
    store.sectionArray.push({ section: "s1", todos: [] });
    let resultCache = store.sectionArray[0].todos.map((element) => element);
    expect(resultCache).toEqual([]);

    const sections = implicitStore1.sectionArray.map((s) => s);

    // const other1 = implicitStore1.sectionArray[0]; // this always works
    // const mapped1 = sections[0]; // this only works with the new fix
    sections[0].todos.push({ text: "todo", completed: false });
    sections[0].todos.map((element) => element);

    // expect(resultCache).toEqual([]);
    expect(fnSpy1).toBeCalledTimes(0);
    expect(fnSpy2).toBeCalledTimes(0);

    sections[0].todos.push({ text: "todo1", completed: false });

    expect(fnSpy1).toBeCalledTimes(1);
  });

  it.skip("implicit works with get and set", () => {
    let x = implicitStore1.arr[0];
    implicitStore1.arr[0] = 9;

    expect(fnSpy1).toBeCalledTimes(1);
    expect(fnSpy2).toBeCalledTimes(0);

    x = implicitStore2.arr[0];
    implicitStore1.arr[0] = 10;

    expect(fnSpy1).toBeCalledTimes(2);
    expect(fnSpy2).toBeCalledTimes(1);
  });

  // TODO: This test has known (non-breaking) issues demonstrating observers are called twice
  it("implicit works with nested objects", () => {
    let x = implicitStore1.object.nested;
    implicitStore1.object.nested = 10;

    expect(fnSpy1).toBeCalledTimes(1);
    expect(fnSpy2).toBeCalledTimes(0);

    x = implicitStore2.object.nested;
    implicitStore1.object.nested = 11;

    expect(fnSpy1).toBeCalledTimes(2);
    expect(fnSpy2).toBeCalledTimes(1);
  });

  it("implicit works with xml", () => {
    let x = implicitStore1.xml;

    expect(fnSpy1).toBeCalledTimes(0);
    expect(fnSpy2).toBeCalledTimes(0);

    let child = implicitStore2.xml.firstChild?.toDOM;
    const newEl = new Y.XmlElement("p");
    newEl.push([new Y.XmlText("text")]);
    implicitStore1.xml.push([newEl]);

    expect(fnSpy1).toBeCalledTimes(0);
    expect(fnSpy2).toBeCalledTimes(1);

    expect(implicitStore2.xml.toString()).toBe("<p>text</p>");
  });

  it("implicit works with json stringify", () => {
    const fn = jest.fn();
    autorun(() => {
      let x = JSON.stringify(implicitStore1);
      fn();
    });

    expect(fn).toBeCalledTimes(1);

    implicitStore1.arr.push(9);

    expect(fn).toBeCalledTimes(2);
  });

  it("implicit works with json nested stringify", () => {
    const fn = jest.fn();
    autorun(() => {
      let x = JSON.stringify(implicitStore1);
      fn();
    });

    expect(fn).toBeCalledTimes(1);

    implicitStore1.object.nested = 3;

    expect(fn).toBeCalledTimes(2);

    implicitStore1.object.nested = 4;

    expect(fn).toBeCalledTimes(3);
  });

  it("implicit works with boxed values", () => {
    implicitStore1.todos.push(boxed({ text: "t", completed: false }));
    let x = implicitStore1.todos[0].value;
    expect(fnSpy1).toBeCalledTimes(0);

    store.todos.splice(0, 1, boxed({ text: store.todos[0].value.text, completed: true }));

    expect(fnSpy1).toBeCalledTimes(1);
  });

  it("autorun works with json stringify and remote document", () => {
    const fn = jest.fn();
    autorun(() => {
      let x = JSON.stringify(implicitStore1);
      fn();
    });

    expect(fn).toBeCalledTimes(1);

    const todos = store.todos;

    expect(fn).toBeCalledTimes(1);

    todos.push(boxed({ text: "hello", completed: false }));

    expect(fn).toBeCalledTimes(2);

    storeDoc2.todos.push(boxed({ text: "hello2", completed: false }));

    expect(fn).toBeCalledTimes(2);

    const update = Y.encodeStateAsUpdate(doc2);
    Y.applyUpdate(doc1, update);

    expect(fn).toBeCalledTimes(3);

    implicitStore2.object.nested = 4;

    expect(fn).toBeCalledTimes(4);
  });

  it("autorun works with json stringify and remote document and nested change", () => {
    const fn = jest.fn();
    autorun(() => {
      let x = JSON.stringify(implicitStore1);
      fn();
    });

    expect(fn).toBeCalledTimes(1);

    const todos = store.todosNotBoxed;

    expect(fn).toBeCalledTimes(1);

    todos.push({ text: "hello", completed: false });

    expect(fn).toBeCalledTimes(2);

    const update = Y.encodeStateAsUpdate(doc1);
    Y.applyUpdate(doc2, update);

    expect(fn).toBeCalledTimes(2);

    storeDoc2.todosNotBoxed[0].completed = true;

    expect(fn).toBeCalledTimes(2);

    const update2 = Y.encodeStateAsUpdate(doc2);
    Y.applyUpdate(doc1, update2);

    expect(fn).toBeCalledTimes(3);

    implicitStore2.object.nested = 4;

    expect(fn).toBeCalledTimes(4);
  });
});
