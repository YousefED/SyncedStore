import { createEffect, createRoot } from "solid-js";
import * as solid from "solid-js/store";
import { enableSolidBindings, syncedStore, Y } from "../src";

describe("solid", () => {
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
    enableSolidBindings(solid);
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
  });

  it("indexOf works on store", async () => {
    let renderCount = 0;

    createRoot(() => {
      const implicitStore1 = solid.createMutable(store);
      implicitStore1.todosNotBoxed.push({
        text: "title",
        completed: false,
      });

      // renderCount++;
      createEffect(() => {
        renderCount++;
        console.log(implicitStore1.todosNotBoxed[0].text);
      });
    });

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
    // await Promise.resolve();
    expect(renderCount).toBe(1);
  });
});
