import * as reactive from "@reactivedata/reactive";
import { makeYJSObservable, useReactiveBindings } from "@reactivedata/yjs-reactive-bindings";
import * as Y from "yjs";
import { CRDTArray, crdtArray } from "./array";
import { CRDTObject, crdtObject } from "./object";
import { Raw } from "./raw";
import { JSONValue } from "./types";
export { useMobxBindings, useVueBindings } from "@reactivedata/yjs-reactive-bindings";

// setup yjs-reactive-bindings
makeYJSObservable();
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
  value = getInternalAny(value as any) || value; // unwrap
  if (value instanceof Y.Array) {
    return crdtArray([], value);
  } else if (value instanceof Y.Map) {
    return crdtObject({}, value);
  } else if (typeof value === "string") {
    return value; // TODO
  } else if (Array.isArray(value)) {
    return crdtArray(value as any[]);
  } else if (typeof value === "object") {
    if (value instanceof Raw) {
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

export function crdt<T extends ObjectSchemaType>(doc: Y.Doc) {
  return crdtObject({} as T, doc.getMap());
}

export type NestedSchemaType = JSONValue | ObjectSchemaType | Raw<any> | NestedSchemaType[];

export type ObjectSchemaType = {
  [key: string]: NestedSchemaType;
};

export { Y };
