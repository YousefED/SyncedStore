import { crdtValue, getInternal, INTERNAL_SYMBOL } from ".";
import * as Y from "yjs";
import { isYType } from "./types";
import { yToWrappedCache } from "./internal";

export type CRDTObject<T> = Partial<T> & {
  [INTERNAL_SYMBOL]: Y.Map<T>;
};

export function crdtObject<T extends object>(initializer: T, map = new Y.Map<any>()) {
  const proxy = new Proxy(({} as any) as T, {
    set: (target, p, value) => {
      if (typeof p !== "string") {
        throw new Error();
      }
      const wrapped = crdtValue(value);
      const internal = getInternal(wrapped) || wrapped;
      map.set(p, internal);
      return true;
    },
    get: (target, p) => {
      if (p === INTERNAL_SYMBOL) {
        return map;
      }
      if (typeof p !== "string") {
        throw new Error();
      }
      const ret = map.get(p);
      if (isYType(ret)) {
        // todo: array / ytext
        if (!yToWrappedCache.has(ret)) {
          const wrapped = crdtValue(ret);
          yToWrappedCache.set(ret, wrapped);
        }
        return yToWrappedCache.get(ret);
      }
      return ret;
    },
    deleteProperty: (target, p) => {
      if (typeof p !== "string") {
        throw new Error();
      }
      if (map.has(p)) {
        map.delete(p);
        return true;
      } else {
        return false;
      }
    },
    has: (target, p) => {
      if (typeof p === "string" && map.has(p)) {
        return true;
      }
      return false;
    },
    ownKeys: (target) => {
      return Array.from(map.keys());
    },
  });

  yToWrappedCache.set(map, proxy);

  for (let key in initializer) {
    proxy[key] = initializer[key];
  }

  return proxy as CRDTObject<T>;
}
