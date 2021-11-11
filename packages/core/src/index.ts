import * as reactive from "@reactivedata/reactive";
import { markRaw } from "@reactivedata/reactive";
import { enableReactiveBindings, makeYDocObservable } from "@syncedstore/yjs-reactive-bindings";
import * as Y from "yjs";
import { Box } from "./boxed";
import { crdtDoc, DocTypeDescription } from "./doc";
import { JSONValue } from "./types";

export { enableMobxBindings, enableVueBindings } from "@syncedstore/yjs-reactive-bindings";
export { Box, boxed } from "./boxed";
export * from "./util";
export { syncedStore };
/**
 * @ignore
 */
export { Y };

// setup yjs-reactive-bindings

enableReactiveBindings(reactive); // use reactive bindings by default

export const INTERNAL_SYMBOL = Symbol("INTERNAL_SYMBOL");

/**
 * Register a listener for when any changes to `object` or its nested objects occur.
 *
 * @param object the synced object (store, object, map, or Yjs value to observe)
 * @param handler the callback to be raised.
 * @returns a function to dispose (unregister) the handler
 */
export function observeDeep(object: any, handler: () => void): () => void {
  const internal = getYjsValue(object);
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

export function getYjsValue(object: any): Y.Doc | Y.AbstractType<any> | undefined {
  const ret = object[INTERNAL_SYMBOL];
  if (ret) {
    markRaw(ret);
    (ret as any).__v_skip = true; // for vue Reactive
  }
  return ret;
}

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

export default function syncedStore<T extends DocTypeDescription>(shape: T, doc: Y.Doc = new Y.Doc()) {
  makeYDocObservable(doc);

  return crdtDoc<T>(doc, shape);
}

export type NestedSchemaType = JSONValue | ObjectSchemaType | Box<any> | Y.AbstractType<any> | NestedSchemaType[];

export type ObjectSchemaType = {
  [key: string]: NestedSchemaType;
};

// export { boxed };
export const SyncedDoc = Y.Doc;
export const SyncedMap = Y.Map;
export const SyncedArray = Y.Array;
export const SyncedText = Y.Text;
export const SyncedXml = Y.XmlFragment;
