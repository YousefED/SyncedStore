import { Type } from "typescript";
import * as Y from "yjs";
import { crdtValue, INTERNAL_SYMBOL } from ".";
import { yToWrappedCache } from "./internal";
import { isYType } from "./types";

export type CRDTArray<T> = {
  [INTERNAL_SYMBOL]: Y.Array<T>;
  [n: number]: T;
} & ArrayImplementation<T>;
class ArrayImplementation<T> {
  /* TODO: implements Array<T>  when we have complete implementation */
  constructor(private arr: Y.Array<T>) {}

  forEach = this.arr.forEach.bind(this.arr) as Y.Array<T>["forEach"];
  map = this.arr.map.bind(this.arr) as Y.Array<T>["map"];
  slice = this.arr.slice.bind(this.arr) as Y.Array<T>["slice"];
  unshift = this.arr.unshift.bind(this.arr) as Y.Array<T>["unshift"];
  push = this.arr.push.bind(this.arr) as Y.Array<T>["push"]; // TODO: replace
  insert = this.arr.insert.bind(this.arr) as Y.Array<T>["insert"];
  // delete = this.arr.delete.bind(this.arr) as (Y.Array<T>)["delete"];
}

export function crdtArray<T>(initializer: T[]) {
  const arr = new Y.Array<T>();
  const implementation = new ArrayImplementation<T>(arr);

  const proxy = new Proxy((implementation as any) as CRDTArray<T>, {
    set: (target, p, value) => {
      if (typeof p !== "number") {
        throw new Error();
      }
      // TODO map.set(p, smartValue(value));
      return true;
    },
    get: (target, p) => {
      if (p === INTERNAL_SYMBOL) {
        return arr;
      }

      if (typeof p === "number") {
        const ret = arr.get(p) as any;
        if (isYType(ret)) {
          // todo: array / ytext
          if (!yToWrappedCache.has(ret)) {
            const wrapped = crdtValue(ret);
            yToWrappedCache.set(ret, wrapped);
          }
          return yToWrappedCache.get(ret);
        }
        return ret;
      }
      if (typeof p !== "string") {
        throw new Error();
      }

      // forward to arrayimplementation
      return Reflect.get(target, p);
    },
    deleteProperty: (target, p) => {
      if (typeof p !== "number") {
        throw new Error();
      }
      if (p < Array.length && p >= 0) {
        arr.delete(p);
        return true;
      } else {
        return false;
      }
    },
    has: (target, p) => {
      if (typeof p !== "number") {
        // forward to arrayimplementation
        return Reflect.has(target, p);
      }
      if (p < Array.length && p >= 0) {
        return true;
      } else {
        return false;
      }
    },
    ownKeys: (target) => {
      return Array(arr.length).map((_v, i) => i + "");
    },
  });

  proxy.push.apply(proxy, initializer);
  return proxy as CRDTArray<T>;
}
