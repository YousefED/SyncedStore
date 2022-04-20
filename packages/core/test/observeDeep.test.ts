import syncedStore, { observeDeep, SyncedText, Y } from "@syncedstore/core";

describe("observeDeep", () => {
    type StoreType = {
      arr: number[];
      object: {
        nested?: number;
        nestedText?: SyncedText;
      };
    };
  
    let fnSpy1: jest.Mock<void, []>;
    let fnSpy2: jest.Mock<void, []>;
    let doc1: Y.Doc;
    let store: StoreType;
    
    beforeEach(() => {
      fnSpy1 = jest.fn(() => {});
      fnSpy2 = jest.fn(() => {});
      store = syncedStore(
        {
          arr: [],
          object: {}
        },
        doc1
      );
    });

    it("observeDeep on store", () => {
        observeDeep(store, fnSpy1);
        observeDeep(store.object, fnSpy2);
        store.arr.push(5);
        expect(fnSpy1).toBeCalledTimes(1);
        expect(fnSpy2).toBeCalledTimes(0);
      });

      it("observeDeep on nested object", () => {
        observeDeep(store.object, fnSpy1);
    
        store.arr.push(5);
        expect(fnSpy1).toBeCalledTimes(0);

        store.object.nested = 4;
        expect(fnSpy1).toBeCalledTimes(1);
      });

      it("observeDeep on nested text", () => {
        store.object.nestedText = new SyncedText("hello");
        observeDeep(store.object.nestedText, fnSpy1);
    
        expect(fnSpy1).toBeCalledTimes(0);
        store.object.nestedText.insert(0, "hello");
        expect(fnSpy1).toBeCalledTimes(1);
      });
});