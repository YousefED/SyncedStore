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

    const state1 = Y.encodeStateAsUpdate(doc1);
    Y.applyUpdate(doc2, state1);

    const ret = store2.arr;
    const item = ret![0];
    const json = JSON.stringify(ret);
    expect(ret).toEqual([3]);
  });
});
