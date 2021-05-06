import { crdt, getInternalMap } from "@reactivedata/reactive-crdt";
import { Box, boxed } from "../src/boxed";
import * as Y from "yjs";

describe("reactive-crdt", () => {
  it("undefined", () => {
    let store = crdt<{
      a: number;
    }>(new Y.Doc());
    expect(store.a).toBeUndefined;
  });

  it("set", () => {
    let store = crdt<{
      a: number;
      arr: number[];
      outer: {
        nested: number;
      };
      raw: Box<{
        outer: {
          nested: number;
        };
      }>;
    }>(new Y.Doc());

    store.raw = boxed({ outer: { nested: 99 } });
    store.a = 4;
    expect(store.a).toBe(4);
    expect(store.outer?.nested).toBeUndefined();
    expect(store.raw?.value.outer.nested).toBe(99);
    store.outer = {
      nested: 5
    };
    expect(store.outer.nested).toBe(5);
    console.log(getInternalMap(store).toJSON());
  });

  it("syncs", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<{
      plain: number;
      text: Y.Text;
      boxed: Box<{ inner: number }>;
    }>(doc1);

    const doc2 = new Y.Doc();
    let store2 = crdt<{
      plain: number;
      text: Y.Text;
      boxed: Box<{ inner: number }>;
    }>(doc2);

    store1.plain = 5;
    store1.text = new Y.Text("test");
    store1.boxed = boxed({ inner: 4 });
    const state1 = Y.encodeStateAsUpdate(doc1);
    Y.applyUpdate(doc2, state1);

    expect(store2.plain).toBe(5);
    expect(store2.text?.toString()).toBe("test");
    expect(store2.boxed?.value.inner).toBe(4);
  });

  it("syncs text", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<{
      text: Y.Text;
    }>(doc1);

    const doc2 = new Y.Doc();
    let store2 = crdt<{
      text: Y.Text;
    }>(doc2);

    store1.text = new Y.Text("hello");

    const state1 = Y.encodeStateAsUpdate(doc1);
    Y.applyUpdate(doc2, state1);

    expect(store2.text!.toString()).toEqual("hello");
  });

  it("syncs independent pushes", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<{
      arr: number[];
    }>(doc1);

    const doc2 = new Y.Doc();
    let store2 = crdt<{
      arr: number[];
    }>(doc2);
    store1.arr = [3];

    let state1 = Y.encodeStateAsUpdate(doc1);
    Y.applyUpdate(doc2, state1);

    const ret = store2.arr;
    expect(store2.arr).toEqual([3]);

    store1.arr.push(1);

    store2.arr!.push(2);

    expect(store1.arr).toEqual([3, 1]);
    expect(store2.arr).toEqual([3, 2]);

    state1 = Y.encodeStateAsUpdate(doc1);
    let state2 = Y.encodeStateAsUpdate(doc2);
    Y.applyUpdate(doc2, state1);
    Y.applyUpdate(doc1, state2);
    // let x = JSON.stringify(store1.arr);
    expect([
      [3, 1, 2],
      [3, 2, 1]
    ]).toContainEqual(store1.arr);
    expect(store2.arr).toEqual(store1.arr);
  });
});
