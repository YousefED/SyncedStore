import { $reactive, $reactiveproxy, reactive } from "@reactivedata/reactive";
import * as Y from "yjs";
import { crdtValue, getInternalAny, INTERNAL_SYMBOL, ObjectSchemaType } from ".";
import { CRDTArray } from "./array";
import { yToWrappedCache } from "./internal";
import { Raw } from "./raw";
import { isYType } from "./types";

export type CRDTObject<T extends ObjectSchemaType> = {
  [P in keyof T]?: T[P] extends Raw<infer A>
    ? A
    : T[P] extends Array<infer A>
    ? CRDTArray<A>
    : T[P] extends ObjectSchemaType
    ? CRDTObject<T[P]>
    : T[P];
} & {
  [INTERNAL_SYMBOL]?: Y.Map<T>;
};

export function crdtObject<T extends ObjectSchemaType>(initializer: T, map = new Y.Map<any>()) {
  if (map[$reactive]) {
    throw new Error("unexpected");
    // map = map[$reactive].raw;
  }

  const proxy = new Proxy(({} as any) as CRDTObject<T>, {
    set: (target, p, value) => {
      if (typeof p !== "string") {
        throw new Error();
      }
      const wrapped = crdtValue(value); // TODO: maybe set cache
      const internal = getInternalAny(wrapped) || wrapped;
      map.set(p, internal);
      return true;
    },
    get: (target, p, receiver) => {
      if (p === INTERNAL_SYMBOL) {
        return map;
      }
      if (typeof p !== "string") {
        return Reflect.get(target, p);
        // throw new Error("get non string parameter");
      }
      if (receiver && receiver[$reactiveproxy]) {
        let ic = receiver[$reactiveproxy]?.implicitObserver;
        (map as any)._implicitObserver = ic;
      } else {
        // console.warn("no receiver getting property", p);
      }
      let ret = map.get(p);

      if (isYType(ret)) {
        if (!yToWrappedCache.has(ret)) {
          const wrapped = crdtValue(ret);
          yToWrappedCache.set(ret, wrapped);
        }
        ret = yToWrappedCache.get(ret);

        return ret;
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
    ownKeys: target => {
      return Array.from(map.keys());
    }
  });

  yToWrappedCache.set(map, proxy);

  for (let key in initializer) {
    proxy[key] = initializer[key] as any;
  }

  return proxy;
}
