import { $reactive, $reactiveproxy, reactive } from "@reactivedata/reactive";
import * as Y from "yjs";
import { crdtValue, getInternalAny, INTERNAL_SYMBOL, ObjectSchemaType } from ".";
import { yToWrappedCache } from "./internal";
import { CRDTObject } from "./object";
import { Raw } from "./raw";
import { isYType } from "./types";

export type CRDTArray<T> = {
  [INTERNAL_SYMBOL]?: Y.Array<T>;
  [n: number]: T extends Raw<infer A>
    ? A
    : T extends Array<infer A>
    ? CRDTArray<A>
    : T extends ObjectSchemaType
    ? CRDTObject<T>
    : T;
} & T[]; // TODO: should return ArrayImplementation<T> on getter

class ArrayImplementation<T> {
  /* TODO: add "implements Array<T>""  when we have complete implementation */
  constructor(private arr: Y.Array<T>) {}

  get length() {
    return this.arr.length;
  }

  slice = function () {
    let ic = this[$reactiveproxy].implicitObserver;
    this.arr._implicitObserver = ic;
    const items = this.arr.slice.bind(this.arr).apply(this.arr, arguments);
    return items.map((item) => {
      if (!isYType(item)) {
        return item;
      }

      item._implicitObserver = ic;
      // force shallow
      // item = reactive(item, ic, true);

      // todo: array / ytext
      if (!yToWrappedCache.has(item)) {
        const wrapped = crdtValue(item);
        yToWrappedCache.set(item, wrapped);
      }
      return reactive(yToWrappedCache.get(item), ic);
    });
  } as T[]["slice"];

  unshift = this.arr.unshift.bind(this.arr) as Y.Array<T>["unshift"];
  push = function (...items: T[]) {
    const wrappedItems = items.map((item) => {
      const wrapped = crdtValue(item);
      const internal = getInternalAny(wrapped);
      return internal || wrapped;
    });
    this.arr.push(wrappedItems);
    return this.arr.length;
  };

  insert = this.arr.insert.bind(this.arr) as Y.Array<T>["insert"];
  toJSON = this.arr.toJSON.bind(this.arr) as Y.Array<T>["toJSON"];

  forEach = function () {
    return [].forEach.apply(this.slice(), arguments);
  } as T[]["forEach"];

  filter = function () {
    return [].filter.apply(this.slice(), arguments);
  } as T[]["filter"];

  find = function () {
    return [].find.apply(this.slice(), arguments);
  } as T[]["find"];

  map = function () {
    return [].map.apply(this.slice(), arguments);
  } as T[]["map"];
  // toJSON = () => {
  //   return this.arr.toJSON() slice();
  // };
  // delete = this.arr.delete.bind(this.arr) as (Y.Array<T>)["delete"];
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
  const implementation = new ArrayImplementation<T>(arr);

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
        if (receiver && receiver[$reactiveproxy]) {
          let ic = receiver[$reactiveproxy].implicitObserver;
          arr._implicitObserver = ic;
        } else {
          console.warn("no receiver getting property", p);
        }
        let ret = arr.get(p) as any;

        if (isYType(ret)) {
          if (!yToWrappedCache.has(ret)) {
            const wrapped = crdtValue(ret);
            yToWrappedCache.set(ret, wrapped);
          }
          return yToWrappedCache.get(ret);
        }
        return ret;
      }

      if (p === Symbol.toStringTag) {
        return "Array";
      }

      if (p === Symbol.iterator) {
        const values = arr.slice();
        return Reflect.get(values, p);
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
    ownKeys: (target) => {
      const keys: string[] = [];
      for (let i = 0; i < arr.length; i++) {
        keys.push(i + "");
      }
      return keys;
    },
  });

  proxy.push.apply(proxy, initializer);
  return reactive(proxy as CRDTArray<T>, undefined, true);
}
