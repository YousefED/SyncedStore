import { $reactive, $reactiveproxy } from "@reactivedata/reactive";
import * as Y from "yjs";
import { INTERNAL_SYMBOL } from ".";
import { parseYjsReturnValue, yToWrappedCache } from "./internal";

export type docElementTypeDescription = "xml" | "text" | Array<any> | object;
export type DocTypeDescription = {
  [key: string]: docElementTypeDescription;
};

export type MappedTypeDescription<T extends DocTypeDescription> = {
  readonly [P in keyof T]: T[P] extends "xml"
    ? Y.XmlFragment
    : T[P] extends "text"
    ? Y.Text
    : T[P] extends Array<any>
    ? T[P]
    : T[P] extends object
    ? Partial<T[P]>
    : never;
};

// export type rootTypeDescription<T extends rootTypeDescriptionParent> = {
//   [P in keyof T]?: T[P];
// };

function validateRootTypeDescription<T extends DocTypeDescription>(typeDescription: T) {
  for (let [key, val] of Object.entries(typeDescription)) {
    if (Array.isArray(val)) {
      if (val.length !== 0) {
        throw new Error("Root Array initializer must always be empty array");
      }
    } else if (val && typeof val === "object") {
      if (Object.keys(val).length !== 0 || Object.getPrototypeOf(val) !== Object.prototype) {
        throw new Error("Root Object initializer must always be {}");
      }
    } else if (val !== "xml" && val !== "text") {
      throw new Error("unknown Root initializer");
    }
  }
}

function getYjsByTypeDescription<T extends DocTypeDescription>(doc: Y.Doc, typeDescription: T, p: string) {
  let description = typeDescription[p];
  if (!description) {
    // exclude expected Vue Reactive checks from logging a warning
    if (p !== "__v_raw" && p !== "__v_isRef" && p !== "__v_isReadonly" && p != "$$typeof") {
      console.warn("property not found on root doc", p);
    }
    return undefined;
  }

  return description === "xml"
    ? doc.getXmlFragment(p)
    : description === "text"
    ? doc.getText(p)
    : Array.isArray(description)
    ? doc.getArray(p)
    : doc.getMap(p);
}
export function crdtDoc<T extends DocTypeDescription>(doc: Y.Doc, typeDescription: T) {
  if (doc[$reactive]) {
    throw new Error("unexpected");
  }

  validateRootTypeDescription(typeDescription);

  const proxy = new Proxy({} as MappedTypeDescription<T>, {
    set: (target, p, value) => {
      if (typeof p !== "string") {
        throw new Error();
      }
      throw new Error("cannot set new elements on root doc");
    },
    get: (target, p, receiver) => {
      if (p === INTERNAL_SYMBOL) {
        return doc;
      }

      if (typeof p !== "string") {
        return Reflect.get(target, p);
        // throw new Error("get non string parameter");
      }
      let ic: any;
      if (receiver && receiver[$reactiveproxy]) {
        ic = receiver[$reactiveproxy]?.implicitObserver;
        (doc as any)._implicitObserver = ic;
      } else {
        // console.warn("no receiver getting property", p);
      }

      if (p === "toJSON") {
        for (let key of Object.keys(typeDescription)) {
          // initialize all values
          getYjsByTypeDescription(doc, typeDescription, key);
        }
        const ret = Reflect.get(doc, p);
        return ret;
      }

      let ret = getYjsByTypeDescription(doc, typeDescription, p);
      ret = parseYjsReturnValue(ret, ic);

      return ret;
    },
    deleteProperty: (target, p) => {
      throw new Error("deleteProperty not available for doc");
    },
    has: (target, p) => {
      if (typeof p === "string" && doc.share.has(p)) {
        return true;
      }
      return false;
    },
    getOwnPropertyDescriptor(target, p) {
      if ((typeof p === "string" && doc.share.has(p)) || p === "toJSON") {
        return {
          enumerable: true,
          configurable: true,
        };
      }
      return undefined;
    },
    ownKeys: (target) => {
      return Array.from(doc.share.keys());
    },
  });

  yToWrappedCache.set(doc, proxy);

  return proxy;
}
