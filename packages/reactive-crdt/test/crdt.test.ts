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

  it("Object.keys() for object", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<any>(doc1);
    store1["obj"] = 4;
    let keys = Object.keys(store1);
    expect(keys).toStrictEqual(Object.keys({ obj: 4 }));
  });

  it("Object.keys() for array", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<any>(doc1);
    store1.arr = [0, 1];
    let keys = Object.keys(store1.arr);
    expect(keys).toStrictEqual(Object.keys([0, 1]));
  });

  it("Reflect.ownKeys() for array", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<any>(doc1);
    store1.arr = [0, 1];
    let keys = Reflect.ownKeys(store1.arr);
    expect(keys).toStrictEqual(Reflect.ownKeys([0, 1]));
  });

  it("Array.from() for array", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<any>(doc1);
    store1.arr = [0, 1];
    let copy = Array.from(store1.arr);
    expect(copy).toStrictEqual([0, 1]);
  });

  it("indexOf() for array", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<any>(doc1);
    store1.arr = [0, 1];
    let index = store1.arr.indexOf(1);
    expect(index).toEqual(1);
  });

  it("splice() for array", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<any>(doc1);
    store1.arr = [0, 1];
    let deleted = store1.arr.splice(1);
    expect(deleted).toEqual([1]);
    expect(store1.arr).toEqual([0]);
    deleted = store1.arr.splice(1, 0, 3, 4);
    expect(deleted).toEqual([]);
    expect(store1.arr).toEqual([0, 3, 4]);
    store1.arr.splice(1, 0, 1, 2);
    expect(store1.arr).toEqual([0, 1, 2, 3, 4]);
    deleted = store1.arr.splice(2, 2);
    expect(deleted).toEqual([2, 3]);
    expect(store1.arr).toEqual([0, 1, 4]);
    deleted = store1.arr.splice(-1, 1);
    expect(deleted).toEqual([4]);
    expect(store1.arr).toEqual([0, 1]);
  });

  it("move already inserted object to different location in document (nested)", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<any>(doc1);
    store1.mymap = {};

    expect(() => (store1.myothermap = { test: store1.mymap })).toThrow(
      "Not supported: reassigning object that already occurs in the tree."
    );
  });

  it("move already inserted object to different location in document (root)", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<any>(doc1);
    store1.mymap = {};
    expect(() => (store1.myothermap = store1.mymap)).toThrow(
      "Not supported: reassigning object that already occurs in the tree."
    );
  });

  it("move already inserted array to different location in document", () => {
    const doc1 = new Y.Doc();
    let store1 = crdt<any>(doc1);
    store1.myarr = [{ foo: "bar" }];
    expect(() => store1.myarr.push(store1.myarr[0])).toThrow(
      "Not supported: reassigning object that already occurs in the tree."
    );
  });
});
