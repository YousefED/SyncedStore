import * as Y from "yjs";
import { CRDTArray, crdtArray } from "./array";
import { observeYJS, setObservableFunctions } from "./moby";
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

setObservableFunctions(function (name, obo, obu) {
  // TMP
  const atom = createAtom(name);
  if (obo) {
    obo();
  }
  return atom;
}, untracked);
export function crdt<T extends ObjectSchemaType>(doc: Y.Doc) {
  observeYJS(doc);
  return reactive(crdtObject({} as T, doc.getMap()), new Observer(() => {}));
}

export type NestedSchemaType = JSONValue | ObjectSchemaType | Raw<any> | NestedSchemaType[];

export type ObjectSchemaType = {
  [key: string]: NestedSchemaType;
};

// crdt<{a: Raw<any>[]}>();

// type crdtObjectType<T> = T extends object ? (T extends crdtType<T> ? T : never) : never;

// type crdtObjectType<T> = { [k: string]: crdtType<void> }

// type crdtObjectType<T> = {
//     [P in keyof T]: P extends string ? T[P] : never;
//  }

// // type crdtObjectType<T> = T extends Array<any> ? never : object;

// type crdtType<T> = {
//   [P in keyof T]: T[P] extends Raw<T[P]>
//     ? T[P]
//     // : T[P] extends Primitive
//     // ? T[P]
//     // : T[P] extends Array<crdtType<infer A>>
//     // ? T[P]
//     // : T[P] extends crdtType<infer O>
//     // ? T[P]
//     : never;
// };
// crdt<[]>();
// crdt<{a: docu}>();
// const store = shared({
//   x: {
//     playersRaw: raw([
//       {
//         name: "yousef", // might not be possible
//         age: 23,
//       },
//     ]),
//     players: [
//       {
//         name: "yousef",
//         age: 23,
//       },
//     ],
//     documents: new Map<string, { title: string }>(), // can't determine type
//   },
// });

export * as Y from "yjs";
