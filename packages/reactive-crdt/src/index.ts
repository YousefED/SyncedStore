import * as reactive from "@reactivedata/reactive";
import { makeYDocObservable, useReactiveBindings } from "@reactivedata/yjs-reactive-bindings";
import * as Y from "yjs";
import { CRDTArray, crdtArray } from "./array";
import { CRDTObject, crdtObject } from "./object";
import { Box } from "./boxed";
import { JSONValue } from "./types";
import { crdtDoc, DocTypeDescription } from "./doc";
export { useMobxBindings, useVueBindings } from "@reactivedata/yjs-reactive-bindings";
export * from "./util";

// setup yjs-reactive-bindings

useReactiveBindings(reactive); // use reactive bindings by default

export const INTERNAL_SYMBOL = Symbol("INTERNAL_SYMBOL");

export function getInternalMap<T extends ObjectSchemaType>(object: CRDTObject<T>) {
  return object[INTERNAL_SYMBOL] as Y.Map<T>;
}

export function getInternalArray<T>(object: CRDTArray<T>) {
  return object[INTERNAL_SYMBOL] as Y.Array<T>;
}

export function getInternalAny(
  object: any /*CRDTArray<any> | CRDTObject<any>*/
): CRDTArray<any> | CRDTObject<any> | undefined {
  return object[INTERNAL_SYMBOL];
}

export function crdtValue<T extends NestedSchemaType>(value: T | Y.Array<any> | Y.Map<any>) {
  value = (getInternalAny(value as any) as any) || value; // unwrap
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

export function crdt<T extends DocTypeDescription>(doc: Y.Doc, initialValue: T) {
  makeYDocObservable(doc);

  return crdtDoc(doc, initialValue);
}

export type NestedSchemaType = JSONValue | ObjectSchemaType | Box<any> | Y.AbstractType<any> | NestedSchemaType[];

export type ObjectSchemaType = {
  [key: string]: NestedSchemaType;
};

export { Y };
