import { Observer, reactive } from "@reactivedata/reactive";
import { crdt, ObjectSchemaType, Y } from "@reactivedata/reactive-crdt";
import { proxy, ref, subscribe, snapshot } from "valtio";
import { createDeepProxy } from "proxy-compare";

const reactiveByValtioContext = new Map<any, any>();

function valtioCrdt<T extends ObjectSchemaType>(doc: Y.Doc) {
  let crdtstore = crdt<T>(doc);

  let valtioStore = proxy({
    get __atom() {
      return 0;
    },
    set __atom(value: any) {},

    store: function() {
      const valtioContext = this;
      valtioContext.atom; // trigger a valtio read
      let reactiveStore = reactiveByValtioContext.get(valtioContext) as T;
      if (!reactiveStore) {
        reactiveStore = reactive(
          crdtstore,
          new Observer(() => {
            valtioContext.atom = 1; // trigger a valtio write;
          })
        );
        reactiveByValtioContext.set(valtioContext, reactiveStore);
      }
      return reactiveStore;
    }
  });
  return valtioStore;
}

describe("valtio", () => {
  it("undefined", async () => {
    const yDoc = new Y.Doc();
    const valtioStore = valtioCrdt<{
      property: number;
    }>(yDoc);
    const fnSpy = jest.fn();
    subscribe(valtioStore, fnSpy);

    // simulate useSnapshot. Not sure this is a good simulation, but no time to set up React test with actual useSnapshot
    let snap = proxy(snapshot(valtioStore));

    const fnSpySnap = jest.fn();
    subscribe(snap, fnSpySnap);

    let value = valtioStore.store().property; // trigger a read
    yDoc.getMap().set("property", 4); // trigger a write

    await Promise.resolve(); // because valtio calls fnSpy async
    expect(fnSpy).toBeCalledTimes(1);
    expect(fnSpySnap).toBeCalledTimes(0);

    snap.store().property; // trigger a read (from snapshot)
    yDoc.getMap().set("property", 5); // trigger a write

    await Promise.resolve(); // because valtio calls fnSpy async
    expect(fnSpy).toBeCalledTimes(2);
    expect(fnSpySnap).toBeCalledTimes(1);
  });
});
