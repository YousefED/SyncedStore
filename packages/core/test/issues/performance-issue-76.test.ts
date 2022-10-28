import syncedStore from "@syncedstore/core";

// https://github.com/YousefED/SyncedStore/issues/76
describe("SyncedStore issue 76", () => {
  it("can run many times", () => {
    type StoreRoot = {
      foo: Foo;
    };

    type Foo = {
      bar?: number[];
    };

    const store = syncedStore<StoreRoot>({ foo: {} });

    const count = 100000;

    for (let i = 0; i < count; ++i) {
      if (i % 1000 === 0) {
        console.log(`${i} of ${count}`);
      }

      // Resulted in patchGetter('length') being called on the array, even though it's already been patched
      store.foo.bar = [42];

      // Once the loop has executed enough times, reading the length will result in stack overflow
      store.foo.bar.length;
    }
  });
});
