import * as reactive from "@reactivedata/reactive";
import { markRaw } from "@reactivedata/reactive";
import { makeYDocObservable, useReactiveBindings } from "@syncedstore/yjs-reactive-bindings";
import * as Y from "yjs";
import { crdtArray } from "./array";
import { Box, boxed } from "./boxed";
import { crdtDoc, DocTypeDescription } from "./doc";
import { crdtObject } from "./object";
import { JSONValue } from "./types";
export { useMobxBindings, useVueBindings } from "@syncedstore/yjs-reactive-bindings";
export * from "./util";

// setup yjs-reactive-bindings

useReactiveBindings(reactive); // use reactive bindings by default

export const INTERNAL_SYMBOL = Symbol("INTERNAL_SYMBOL");

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

export function crdtValue<T extends NestedSchemaType>(value: T | Y.Array<any> | Y.Map<any>) {
  value = (getYjsValue(value as any) as any) || value; // unwrap
  if (value instanceof Y.Array) {
    return crdtArray([], value);
  } else if (value instanceof Y.Map) {
    return crdtObject({}, value);
  } else if (typeof value === "string") {
    return value; // TODO
  } else if (Array.isArray(value)) {
    return crdtArray(value as any[]);
  } else if (
    value instanceof Y.XmlElement ||
    value instanceof Y.XmlFragment ||
    value instanceof Y.XmlText ||
    value instanceof Y.XmlHook
  ) {
    return value;
  } else if (value instanceof Y.Text) {
    return value;
  } else if (typeof value === "object") {
    if (value instanceof Box) {
      return value;
    } else {
      return crdtObject(value as any);
    }
  } else if (typeof value === "number" || typeof value === "boolean") {
    return value;
  } else {
    throw new Error("invalid");
  }
}

export function crdt<T extends DocTypeDescription>(doc: Y.Doc, shape: T) {
  makeYDocObservable(doc);

  return crdtDoc<T>(doc, shape);
}

export type NestedSchemaType = JSONValue | ObjectSchemaType | Box<any> | Y.AbstractType<any> | NestedSchemaType[];

export type ObjectSchemaType = {
  [key: string]: NestedSchemaType;
};

/**
 * @ignore
 */
export { Y };
export { boxed };
export const SyncedDoc = Y.Doc;
export const SyncedMap = Y.Map;
export const SyncedArray = Y.Array;
export const SyncedText = Y.Text;
export const SyncedXml = Y.XmlFragment;
