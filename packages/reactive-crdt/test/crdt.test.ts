import { crdt, getInternal } from "@reactivedata/reactive-crdt";

describe("reactive-crdt", () => {
  it("undefined", () => {
    let store = crdt<{
      a: number;
    }>();

    expect(store.a).toBeUndefined;
  });

  it("set", () => {
    let store = crdt<{
      a: number;
      outer: {
        nested: number;
      };
    }>();

    store.a = 4;
    expect(store.a).toBe(4);
    expect(store.outer?.nested).toBeUndefined();

    store.outer = {
      nested: 5,
    };
    expect(store.outer.nested).toBe(5);
    console.log(getInternal(store).toJSON());
  });
});
