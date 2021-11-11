import * as reactive from "@reactivedata/react";
import * as syncedstore from "@syncedstore/core";
import type * as React from "react";

/**
 * React hook to enable smart Reactive rerendering of your functional component.
 *
 * The usage of the return value is automatically tracked.
 * The component where you use this hook is then rerendered automatically if any of the
 * used values change.
 *
 * e.g.:
 *
 * // Store setup:
 * const globalStore = SyncedStore({ people: [] });
 * globalStore.items.push({ name: "Alice" });
 * globalStore.items.push({ name: "Bob" });
 *
 * // In your component:
 * const store = useSyncedStore(globalStore);
 * <div>{store.items[1].name}</div>
 *
 * Now, your component only rerenders when Bob's name changes
 *  (or if the second element of the array changes)
 */
export function useSyncedStore<T>(syncedObject: T, deps?: React.DependencyList) {
  if (!syncedstore.getYjsValue(syncedObject)) {
    throw new Error("syncedObject passed to useSyncedStore is not a SyncedStore Store or internal data type.");
  }
  // useSyncedStore is just a wrapper for useReactive
  return reactive.useReactive(syncedObject, deps);
}

export function useSyncedStores<T extends any[]>(syncedObjects: T, deps?: React.DependencyList) {
  return reactive.useReactives(syncedObjects, deps);
}
