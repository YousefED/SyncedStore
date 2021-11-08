import { crdt } from "@reactivedata/reactive-crdt";
import * as Y from "yjs";

describe("initializers", () => {
  it("initializing nested breaks", () => {
    let timesHaveValue = 0;
    for (let i = 0; i < 10; i++) {
      const doc1 = new Y.Doc();
      let store1 = crdt(doc1, { map: {} as any }).map;
      store1.myarr = [];
      store1.myarr.push({ foo: "bar" });

      const doc2 = new Y.Doc();
      let store2 = crdt(doc1, { map: {} as any }).map;
      store2.myarr = [];

      const state1 = Y.encodeStateAsUpdate(doc1);
      Y.applyUpdate(doc2, state1);

      const state2 = Y.encodeStateAsUpdate(doc2);
      Y.applyUpdate(doc1, state2);

      if (JSON.stringify(store1.myarr) === JSON.stringify([{ foo: "bar" }])) {
        timesHaveValue++;
      }
    }
    // the second array will overwrite the initial one
    expect(timesHaveValue).toBe(0);
  });

  it("initializing with initializer", () => {
    let timesHaveValue = 0;
    for (let i = 0; i < 10; i++) {
      const doc1 = new Y.Doc();
      let store1 = crdt(doc1, { myarr: [] as any[] });
      store1.myarr.push({ foo: "bar" });

      const doc2 = new Y.Doc();
      let store2 = crdt(doc2, { myarr: [] as any[] });

      const state1 = Y.encodeStateAsUpdate(doc1);
      Y.applyUpdate(doc2, state1);

      const state2 = Y.encodeStateAsUpdate(doc2);
      Y.applyUpdate(doc1, state2);

      if (JSON.stringify(store1.myarr) === JSON.stringify([{ foo: "bar" }])) {
        timesHaveValue++;
      }
    }
    // initializing works fine
    expect(timesHaveValue).toBe(10);
  });
});
