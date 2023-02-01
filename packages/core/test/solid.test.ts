import { createEffect, createRoot } from "solid-js";
import * as solid from "solid-js/store";
import { createMutable } from "solid-js/store";

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
      createEffect(() => {
        renderCount++;
        // should first log undefined then 'text'
        console.log(store.todosNotBoxed[0]);
      });
      queueMicrotask(() => {
        store.todosNotBoxed.push({
          text: "text",
          completed: false,
        });
      });
    });

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
    expect(renderCount).toBe(2);
  });
});
