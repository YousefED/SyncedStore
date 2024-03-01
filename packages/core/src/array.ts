import { $reactive, $reactiveproxy, reactive } from "@reactivedata/reactive";
import * as Y from "yjs";
import { areSame, getYjsValue, INTERNAL_SYMBOL } from ".";
import { Box } from "./boxed";
import { crdtValue, ObjectSchemaType, parseYjsReturnValue } from "./internal";
import { CRDTObject } from "./object";

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
    return items.map((item) => {
      const ret = parseYjsReturnValue(item, ic);
      if (ic && typeof ret === "object") {
        // when using Reactive, we should make sure the returned
        // object is made reactive with the implicit observer ic
        return reactive(ret, ic);
      } else {
        return ret;
      }
    });
  } as T[]["slice"];

  const wrapItems = function wrapItems(items) {
    return items.map((item) => {
      const wrapped = crdtValue(item as any); // TODO
      let valueToSet = getYjsValue(wrapped) || wrapped;
      if (valueToSet instanceof Box) {
        valueToSet = valueToSet.value;
      }
      if (valueToSet instanceof Y.AbstractType && valueToSet.parent) {
        throw new Error("Not supported: reassigning object that already occurs in the tree.");
      }
      return valueToSet;
    });
  };

  const findIndex = function findIndex() {
    return [].findIndex.apply(slice.apply(this), arguments);
  } as T[]["find"];

  const methods = {
    // get length() {
    //   return arr.length;
    // },
    // set length(val: number) {
    //   throw new Error("set length of yjs array is unsupported");
    // },
    slice,
    unshift: (...items: T[]) => {
      arr.unshift(wrapItems(items));
      return (arr as any).lengthUntracked;
    },

    push: (...items: T[]) => {
      arr.push(wrapItems(items));
      return (arr as any).lengthUntracked;
    },

    insert: arr.insert.bind(arr) as Y.Array<T>["insert"],
    toJSON: arr.toJSON.bind(arr) as Y.Array<T>["toJSON"],

    forEach: function () {
      return [].forEach.apply(slice.apply(this), arguments);
    } as T[]["forEach"],

    every: function () {
      return [].every.apply(slice.apply(this), arguments);
    },

    filter: function () {
      return [].filter.apply(slice.apply(this), arguments);
    } as T[]["filter"],

    find: function () {
      return [].find.apply(slice.apply(this), arguments);
    } as T[]["find"],

    findIndex,

    some: function () {
      return [].some.apply(slice.apply(this), arguments);
    } as T[]["some"],

    includes: function () {
      return [].includes.apply(slice.apply(this), arguments);
    } as T[]["includes"],

    map: function () {
      return [].map.apply(slice.apply(this), arguments);
    } as T[]["map"],

    indexOf: function () {
      const arg = arguments[0];
      return findIndex.call(this, (el) => areSame(el, arg));
    } as T[]["indexOf"],

    splice: function () {
      let start = arguments[0] < 0 ? arr.length - Math.abs(arguments[0]) : arguments[0];
      let deleteCount = arguments[1];
      let items = Array.from(Array.from(arguments).slice(2));
      let deleted = slice.apply(this, [start, Number.isInteger(deleteCount) ? start + deleteCount : undefined]);
      if (arr.doc) {
        arr.doc.transact(() => {
          arr.delete(start, deleteCount);
          arr.insert(start, wrapItems(items));
        });
      } else {
        arr.delete(start, deleteCount);
        arr.insert(start, wrapItems(items));
      }
      return deleted;
    } as T[]["splice"],
    // toJSON = () => {
    //   return this.arr.toJSON() slice();
    // };
    // delete = this.arr.delete.bind(this.arr) as (Y.Array<T>)["delete"];
  };

  const ret = [];
  for (let method in methods) {
    ret[method] = methods[method];
  }

  // this is necessary to prevent errors like "trap reported non-configurability for property 'length' which is either non-existent or configurable in the proxy target" when adding support for ownKeys and Reflect.keysx
  // (not necessary anymore now we changed ret from object to array)

  // Object.defineProperty(ret, "length", {
  //   enumerable: false,
  //   configurable: false,
  //   writable: true,
  //   value: (arr as any).lengthUntracked,
  // });

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

  const proxy = new Proxy(implementation as any as CRDTArray<T>, {
    set: (target, pArg, value) => {
      const p = propertyToNumber(pArg);
      if (typeof p !== "number") {
        throw new Error();
      }

      if (arr.doc) {
        arr.doc.transact(() => {
          arr.delete(p, 1);
          arr.insert(p, [value]);
        });
      } else {
        arr.delete(p, 1);
        arr.insert(p, [value]);
      }
      return true;
      // // TODO map.set(p, smartValue(value));
      // throw new Error("array assignment is not implemented / supported");
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
      if (p < (arr as any).lengthUntracked && p >= 0) {
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
      if (p < (arr as any).lengthUntracked && p >= 0) {
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
          writable: true,
        };
      }
      if (typeof p === "number" && p >= 0 && p < (arr as any).lengthUntracked) {
        return {
          enumerable: true,
          configurable: true,
          writable: true,
        };
      }
      return undefined;
    },
    ownKeys: (target) => {
      const keys: string[] = [];
      for (let i = 0; i < arr.length; i++) {
        keys.push(i + "");
      }
      keys.push("length");
      return keys;
    },
  });

  implementation.push.apply(proxy, initializer);
  return proxy;
}
