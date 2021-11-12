import { readable } from "svelte/store";
import { Observer, reactive } from "@reactivedata/reactive";

export function svelteSyncedStore(syncedStore: any) {
  let set: any;
  const observer = new Observer(() => {
    if (set) {
      set(store);
    }
  });
  const store = reactive(syncedStore, observer);

  return readable(store, (newSet) => {
    set = newSet;

    return () => {
      set = undefined;
    };
  });
}
