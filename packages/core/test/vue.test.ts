import { syncedStore, enableVueBindings, Y } from "../src";
import * as Vue from "@vue/reactivity";
describe("vue3", () => {
  type StoreType = {
    arr: number[];
    object: {
      nested?: number;
    };
    todosNotBoxed: { text: string; completed: boolean }[];
  };

  let fnSpy1: jest.Mock<void, []>;
  let fnSpy2: jest.Mock<void, []>;
  let implicitStore1: StoreType;
  let doc1: Y.Doc;
  let doc2: Y.Doc;
  let store: StoreType;

  beforeEach(() => {
    enableVueBindings(Vue);
    fnSpy1 = jest.fn(() => {});
    fnSpy2 = jest.fn(() => {});

    doc1 = new Y.Doc();

    store = syncedStore(
      {
        arr: [],
        object: {} as { nested?: number },
        todos: [],
        todosNotBoxed: [],
        xml: "xml" as "xml",
      },
      doc1
    );

    implicitStore1 = Vue.reactive(store);
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
    expect(implicitStore1.todosNotBoxed.indexOf(item)).toBe(1);
    expect(store.todosNotBoxed.indexOf(item)).toBe(1);

    const item2 = implicitStore1.todosNotBoxed[1];
    expect(implicitStore1.todosNotBoxed.indexOf(item2)).toBe(1);
    expect(store.todosNotBoxed.indexOf(item2)).toBe(1);
  });
});
