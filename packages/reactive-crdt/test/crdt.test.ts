import { crdt, getInternalMap } from "@reactivedata/reactive-crdt";
import { Raw } from "../src/raw";
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
      raw: Raw<{
        outer: {
          nested: number;
        };
      }>;
    }>(new Y.Doc());

    store.raw = { outer: { nested: 4 } };
    store.a = 4;
    expect(store.a).toBe(4);
    expect(store.outer?.nested).toBeUndefined();

    store.outer = {
      nested: 5,
    };
    expect(store.outer.nested).toBe(5);
    console.log(getInternalMap(store).toJSON());
  });

  it("syncs", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<{
      plain: number;
    }>(doc1);

    const doc2 = new Y.Doc();
    let store2 = crdt<{
      plain: number;
    }>(doc2);

    store1.plain = 5;

    const state1 = Y.encodeStateAsUpdate(doc1);
    Y.applyUpdate(doc2, state1);

    expect(store2.plain).toBe(5);
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

    expect([
      [3, 1, 2],
      [3, 2, 1],
    ]).toContainEqual(store1.arr);
    expect(store2.arr).toEqual(store1.arr);
  });
});
