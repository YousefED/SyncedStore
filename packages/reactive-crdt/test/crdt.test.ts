import { crdt, getInternal } from "@reactivedata/reactive-crdt";
import { Raw } from "../src/raw";

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
      arr: number[];
      outer: {
        nested: number;
      };
      raw: Raw<{
        outer: {
          nested: number;
        };
      }>;
    }>();

    let y = store.raw?.outer.nested;

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
