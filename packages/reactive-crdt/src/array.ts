import { Type } from "typescript";
import * as Y from "yjs";
import { crdtValue, INTERNAL_SYMBOL, ObjectSchemaType } from ".";
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
  /* TODO: implements Array<T>  when we have complete implementation */
  constructor(private arr: Y.Array<T>) {}

  get length() {
    return this.arr.length;
  }
  forEach = this.arr.forEach.bind(this.arr) as Y.Array<T>["forEach"];
  map = this.arr.map.bind(this.arr) as Y.Array<T>["map"];
  slice = this.arr.slice.bind(this.arr) as Y.Array<T>["slice"];
  unshift = this.arr.unshift.bind(this.arr) as Y.Array<T>["unshift"];
  push = function (...items: T[]) {
    this.arr.push(items);
    return this.arr.length;
  };
  insert = this.arr.insert.bind(this.arr) as Y.Array<T>["insert"];

  toJSON = () => {
    return this.arr.slice();
  };
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
  const implementation = new ArrayImplementation<T>(arr);

  const proxy = new Proxy((implementation as any) as CRDTArray<T>, {
    set: (target, p, value) => {
      p = propertyToNumber(p);
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
      p = propertyToNumber(p);

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

      if (p === Symbol.toStringTag) {
        return "Array";
      }
      if (typeof p !== "string") {
        throw new Error("unknown");
      }

      // forward to arrayimplementation
      const ret = Reflect.get(target, p);
      return ret;
    },
    getOwnPropertyDescriptor: (target, p) => {
      p = propertyToNumber(p);
      if (typeof p === "number" && p < arr.length && p >= 0) {
        return { configurable: true, enumerable: true, value: arr.get(p) };
      } else {
        return undefined;
      }
    },
    deleteProperty: (target, p) => {
      p = propertyToNumber(p);
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
    has: (target, p) => {
      p = propertyToNumber(p);
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
  return proxy as CRDTArray<T>;
}
