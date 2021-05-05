import * as Y from "yjs";
import { CRDTArray, crdtArray } from "./array";
import { makeYJSObservable, setObservableFunctions } from "./moby";
import { CRDTObject, crdtObject } from "./object";
import { Raw } from "./raw";
import { JSONValue } from "./types";
import { createAtom, Observer, reactive, untracked } from "@reactivedata/reactive";
export const INTERNAL_SYMBOL = Symbol("INTERNAL_SYMBOL");

export function getInternalMap<T extends ObjectSchemaType>(object: CRDTObject<T>) {
  return object[INTERNAL_SYMBOL] as Y.Map<T>;
}

export function getInternalArray<T>(object: CRDTArray<T>) {
  return object[INTERNAL_SYMBOL] as Y.Array<T>;
}

export function getInternalAny(object: CRDTArray<any> | CRDTObject<any>) {
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

makeYJSObservable();
setObservableFunctions(function (name, obo, obu) {
  // TMP
  const atom = createAtom(name);
  if (obo) {
    obo();
  }
  return atom;
}, untracked);
export function crdt<T extends ObjectSchemaType>(doc: Y.Doc) {
  return reactive(crdtObject({} as T, doc.getMap()), new Observer(() => {}));
}

export type NestedSchemaType = JSONValue | ObjectSchemaType | Raw<any> | NestedSchemaType[];

export type ObjectSchemaType = {
  [key: string]: NestedSchemaType;
};

export * as Y from "yjs";
