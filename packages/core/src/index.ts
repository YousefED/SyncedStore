import * as reactive from "@reactivedata/reactive";
import { markRaw } from "@reactivedata/reactive";
import { enableReactiveBindings, makeYDocObservable } from "@syncedstore/yjs-reactive-bindings";
import * as Y from "yjs";
import {
  Array as SyncedArray,
  Doc as SyncedDoc,
  Map as SyncedMap,
  Text as SyncedText,
  XmlFragment as SyncedXml,
} from "yjs";
import { crdtDoc, DocTypeDescription } from "./doc";

export { enableMobxBindings, enableVueBindings, enableSolidBindings } from "@syncedstore/yjs-reactive-bindings";
export { Box, boxed } from "./boxed";
export * from "./util";
/**
 * @ignore
 */
export { Y };
/**
 * @ignore
 */
export { SyncedDoc, SyncedArray, SyncedMap, SyncedXml, SyncedText };

// setup yjs-reactive-bindings

enableReactiveBindings(reactive); // use reactive bindings by default

/**
 * @ignore
 */
export const INTERNAL_SYMBOL = Symbol("INTERNAL_SYMBOL");

/**
 * Register a listener for when any changes to `object` or its nested objects occur.
 *
 * @param object the synced object (store, object, map, or Yjs value to observe)
 * @param handler the callback to be raised.
 * @returns a function to dispose (unregister) the handler
 */
export function observeDeep(object: any, handler: () => void): () => void {
  const internal = getYjsValue(object) || object;
  if (!internal) {
    throw new Error("not a valid synced object");
  }

  if (internal instanceof Y.Doc) {
    internal.on("update", handler);
    return () => {
      internal.off("update", handler);
    };
  } else {
    internal.observeDeep(handler);
    return () => {
      internal.unobserveDeep(handler);
    };
  }
}

/**
 * Access the internal Yjs Doc.
 *
 * @param store a store returned by
 * @returns the Yjs doc (Y.Doc) underneath.
 */
export function getYjsDoc<T>(store: T): Y.Doc {
  const ret = getYjsValue(store);
  if (!(ret instanceof Y.Doc)) {
    throw new Error("store is not a valid syncedStore that maps to a Y.Doc");
  }
  return ret;
}

/**
 * Access the internal Yjs value that backs the syncing of the passed in object.
 *
 * @param object a value retrieved from the store
 * @returns the Yjs value underneath. This can be a Y.Doc, Y.Array, Y.Map or other Y-type based on the value passed in
 */
export function getYjsValue(object: any): Y.Doc | Y.AbstractType<any> | undefined {
  if (typeof object !== "object" || object === null) {
    return undefined;
  }
  const ret = object[INTERNAL_SYMBOL];
  if (ret) {
    markRaw(ret);
    (ret as any).__v_skip = true; // for vue Reactive
  }
  return ret;
}

/**
 * Check whether two objects represent the same value.
 * A strict equality (===) check doesn't always work,
 * because SyncedStore can wrap the object with a Proxy depending on where you retrieved it.
 *
 * @param objectA Object to compare with objectB
 * @param objectB Object to compare with objectA
 * @returns true if they represent the same object, false otherwise
 */
export function areSame(objectA: any, objectB: any) {
  if (objectA === objectB) {
    return true;
  }
  if (typeof objectA === "object" && typeof objectB === "object") {
    const internalA = getYjsValue(objectA);
    const internalB = getYjsValue(objectB);
    if (!internalA || !internalB) {
      // one of them doesn't have an internal value
      return false;
    }
    return internalA === internalB;
  }
  return false;
}

/**
 * Create a SyncedStore store
 * @param shape an object that describes the root types of the store. e.g.:
 *  const shape = {
 *    exampleArrayData: [],
 *    exampleObjectData: {},
 *    exampleXMLData: "xml",
 *    exampleTextData: "text",
 * };
 * @param doc (optional) a Y.Doc to use as the backing system
 * @returns a SyncedStore store
 */
export function syncedStore<T extends DocTypeDescription>(shape: T, doc: Y.Doc = new Y.Doc()) {
  makeYDocObservable(doc);

  return crdtDoc<T>(doc, shape);
}

export default syncedStore;
