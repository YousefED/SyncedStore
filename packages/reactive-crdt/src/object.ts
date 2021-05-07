import { $reactive, $reactiveproxy, reactive } from "@reactivedata/reactive";
import * as Y from "yjs";
import { crdtValue, getInternalAny, INTERNAL_SYMBOL, ObjectSchemaType } from ".";
import { CRDTArray } from "./array";
import { parseYjsReturnValue, yToWrappedCache } from "./internal";
import { Box } from "./boxed";
import { isYType } from "./types";

export type CRDTObject<T extends ObjectSchemaType> = {
  [P in keyof T]?: T[P] extends Box<infer A>
    ? Box<A>
    : T[P] extends Array<infer A>
    ? CRDTArray<A>
    : T[P] extends ObjectSchemaType
    ? CRDTObject<T[P]>
    : T[P];
} & {
  [INTERNAL_SYMBOL]?: Y.Map<T>;
};

let called = 0;
export function crdtObject<T extends ObjectSchemaType>(initializer: T, map = new Y.Map<any>(), receiver?: any) {
  if (map[$reactive]) {
    throw new Error("unexpected");
    // map = map[$reactive].raw;
  }

  const handlers = {
    set: (target, p, value) => {
      if (typeof p === "string" && p.startsWith("__atom")) {
        return true;
      }

      if (typeof p !== "string") {
        throw new Error();
      }
      const wrapped = crdtValue(value); // TODO: maybe set cache
      const internal = getInternalAny(wrapped) || wrapped;
      if (internal instanceof Box) {
        map.set(p, internal.value);
      } else {
        map.set(p, internal);
      }
      return true;
    },
    get: (target, p, receiver) => {
      if (p === INTERNAL_SYMBOL) {
        return map;
      }

      if (typeof p === "string" && p.startsWith("__atom")) {
        return true;
      }

      if (typeof p !== "string") {
        return Reflect.get(target, p);
        // throw new Error("get non string parameter");
      }
      let val: any = undefined;
      if (receiver !== this.proxy) {
        // TODO: doesn't work
        val = receiver;
      }
      (map as any)._implicitObserver = val;
      let ret = map.get(p);
      ret = parseYjsReturnValue(ret, val); // this should pass context
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
      (map as any)._implicitObserver = target;
      const x = map.toJSON();
      if (typeof p === "string" && map.has(p)) {
        return true;
      }
      return false;
    },
    ownKeys: target => {
      return Array.from(map.keys());
    }
  };
  const proxy = new Proxy(receiver || {}, handlers);
  (handlers as any).proxy = proxy;
  for (let key in initializer) {
    proxy[key] = initializer[key] as any;
  }

  return proxy;

  // } else {
  // called++;

  // yToWrappedCache.set(map, proxy);

  // for (let key in initializer) {
  //   proxy[key] = initializer[key] as any;
  // }

  // return proxy;
  // }
}
