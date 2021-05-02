import * as Y from "yjs";
import { crdtValue, INTERNAL_SYMBOL } from ".";
import { yToWrappedCache } from "./internal";
import { isYType } from "./types";

export type CRDTArray<T> = T[] & {
  [INTERNAL_SYMBOL]: Y.Array<T>;
};

export function crdtArray<T>(initializer: T[]) {
  const arr = new Y.Array();
  const proxy = new Proxy([] as T[], {
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

      if (p === "forEach") {
        return arr.forEach.bind(arr);
      } else if (p === "map") {
        return arr.map.bind(arr);
      } else if (p === "slice") {
        return arr.slice.bind(arr);
      } else if (p === "unshift") {
        return arr.unshift.bind(arr);
      } else if (p === "push") {
        // TODO
        return arr.push.bind(arr);
      } else if (p === "insert") {
        // TODO
        return arr.insert.bind(arr);
      } else if (p === "delete") {
        return arr.delete.bind(arr);
      }
    },
  });

  proxy.push.apply(proxy, initializer);
  return proxy as CRDTArray<T>;
}
