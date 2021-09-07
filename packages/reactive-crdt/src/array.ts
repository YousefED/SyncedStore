import { $reactive, $reactiveproxy } from "@reactivedata/reactive";
import * as Y from "yjs";
import { crdtValue, getInternalAny, INTERNAL_SYMBOL, ObjectSchemaType } from ".";
import { parseYjsReturnValue, yToWrappedCache } from "./internal";
import { CRDTObject } from "./object";
import { Box } from "./boxed";
import { isYType } from "./types";

export type CRDTArray<T> = {
  [INTERNAL_SYMBOL]?: Y.Array<T>;
  [n: number]: T extends Box<infer A>
    ? A
    : T extends Array<infer A>
    ? CRDTArray<A>
    : T extends ObjectSchemaType
    ? CRDTObject<T>
    : T;
} & T[]; // TODO: should return ArrayImplementation<T> on getter

function arrayImplementation<T>(arr: Y.Array<T>) {
  const slice = function slice() {
    let ic = this[$reactiveproxy]?.implicitObserver;
    (arr as any)._implicitObserver = ic;
    const items = arr.slice.bind(arr).apply(arr, arguments);
    return items.map(item => {
      const ret = parseYjsReturnValue(item, ic);
      return ret;
    });
  } as T[]["slice"];
  const wrapItems = function wrapItems(items) {
    return items.map(item => {
      const wrapped = crdtValue(item as any); // TODO
      const internal = getInternalAny(wrapped) || wrapped;
      if (internal instanceof Box) {
        return internal.value;
      } else {
        return internal;
      }
    });
  };

  const ret = {
    // get length() {
    //   return arr.length;
    // },
    // set length(val: number) {
    //   throw new Error("set length of yjs array is unsupported");
    // },
    slice,
    unshift: arr.unshift.bind(arr) as Y.Array<T>["unshift"],
    push: (...items: T[]) => {
      arr.push(wrapItems(items));
      return arr.length;
    },

    insert: arr.insert.bind(arr) as Y.Array<T>["insert"],
    toJSON: arr.toJSON.bind(arr) as Y.Array<T>["toJSON"],

    forEach: function() {
      return [].forEach.apply(slice.apply(this), arguments);
    } as T[]["forEach"],

    filter: function() {
      return [].filter.apply(slice.apply(this), arguments);
    } as T[]["filter"],

    find: function() {
      return [].find.apply(slice.apply(this), arguments);
    } as T[]["find"],

    map: function() {
      return [].map.apply(slice.apply(this), arguments);
    } as T[]["map"],

    indexOf: function() {
      return [].indexOf.apply(slice.apply(this), arguments);
    } as T[]["indexOf"],

    splice: function() {
      let start = arguments[0] < 0 ? arr.length - Math.abs(arguments[0]) : arguments[0];
      let deleteCount = arguments[1];
      let items = Array.from(Array.from(arguments).slice(2));
      let deleted = slice.apply(this, [start, Number.isInteger(deleteCount) ? start + deleteCount : undefined]);
      arr.delete(start, deleteCount);
      arr.insert(start, wrapItems(items));
      return deleted;
    } as T[]["splice"]
    // toJSON = () => {
    //   return this.arr.toJSON() slice();
    // };
    // delete = this.arr.delete.bind(this.arr) as (Y.Array<T>)["delete"];
  };

  // this is necessary to prevent errors like "trap reported non-configurability for property 'length' which is either non-existent or configurable in the proxy target" when adding support for ownKeys and Reflect.keysx
  Object.defineProperty(ret, "length", {
    enumerable: false,
    configurable: false,
    writable: true,
    value: arr.length
  });

  return ret;
}

function propertyToNumber(p: string | number | symbol) {
  if (typeof p === "string" && p.trim().length) {
    const asNum = Number(p);
    // https://stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
    if (Number.isInteger(asNum)) {
      return asNum;
    }
  }
  return p;
}

export function crdtArray<T>(initializer: T[], arr = new Y.Array<T>()) {
  if (arr[$reactive]) {
    throw new Error("unexpected");
    // arr = arr[$reactive].raw;
  }
  const implementation = arrayImplementation(arr);

  const proxy = new Proxy((implementation as any) as CRDTArray<T>, {
    set: (target, pArg, value) => {
      const p = propertyToNumber(pArg);
      if (typeof p !== "number") {
        throw new Error();
      }
      // TODO map.set(p, smartValue(value));
      return true;
    },
    get: (target, pArg, receiver) => {
      const p = propertyToNumber(pArg);

      if (p === INTERNAL_SYMBOL) {
        return arr;
      }

      if (typeof p === "number") {
        let ic: any;
        if (receiver && receiver[$reactiveproxy]) {
          ic = receiver[$reactiveproxy]?.implicitObserver;
          (arr as any)._implicitObserver = ic;
        } else {
          // console.warn("no receiver getting property", p);
        }
        let ret = arr.get(p) as any;
        ret = parseYjsReturnValue(ret, ic);
        return ret;
      }

      if (p === Symbol.toStringTag) {
        return "Array";
      }

      if (p === Symbol.iterator) {
        const values = arr.slice();
        return Reflect.get(values, p);
      }

      if (p === "length") {
        return arr.length;
      }
      // forward to arrayimplementation
      const ret = Reflect.get(target, p, receiver);
      return ret;
    },
    // getOwnPropertyDescriptor: (target, pArg) => {
    //   const p = propertyToNumber(pArg);
    //   if (typeof p === "number" && p < arr.length && p >= 0) {
    //     return { configurable: true, enumerable: true, value: arr.get(p) };
    //   } else {
    //     return undefined;
    //   }
    // },
    deleteProperty: (target, pArg) => {
      const p = propertyToNumber(pArg);
      if (typeof p !== "number") {
        throw new Error();
      }
      if (p < arr.length && p >= 0) {
        arr.delete(p);
        return true;
      } else {
        return false;
      }
    },
    has: (target, pArg) => {
      const p = propertyToNumber(pArg);
      if (typeof p !== "number") {
        // forward to arrayimplementation
        return Reflect.has(target, p);
      }
      if (p < arr.length && p >= 0) {
        return true;
      } else {
        return false;
      }
    },
    getOwnPropertyDescriptor(target, pArg) {
      const p = propertyToNumber(pArg);
      if (p === "length") {
        return {
          enumerable: false,
          configurable: false,
          writable: true
        };
      }
      if (typeof p === "number" && p >= 0 && p < arr.length) {
        return {
          enumerable: true,
          configurable: true,
          writable: true
        };
      }
      return undefined;
    },
    ownKeys: target => {
      const keys: string[] = [];
      for (let i = 0; i < arr.length; i++) {
        keys.push(i + "");
      }
      keys.push("length");
      return keys;
    }
  });

  implementation.push.apply(proxy, initializer);
  return proxy;
}
