import { markRaw } from "@reactivedata/reactive";
import * as Y from "yjs";
import { crdtValue } from ".";
import { boxed } from "./boxed";
import { isYType } from "./types";
export const yToWrappedCache = new WeakMap<Y.AbstractType<any>, any>();

export function parseYjsReturnValue(value: any, implicitObserver?: any) {
  if (isYType(value)) {
    // value._implicitObserver = implicitObserver;

    if (value instanceof Y.Array || value instanceof Y.Map) {
      // if (!yToWrappedCache.has(value)) {
      const wrapped = crdtValue(value, implicitObserver);
      return wrapped;
      // yToWrappedCache.set(value, wrapped);
      // }
      // value = yToWrappedCache.get(value);
    } else if (
      value instanceof Y.XmlElement ||
      value instanceof Y.XmlFragment ||
      value instanceof Y.XmlText ||
      value instanceof Y.XmlHook ||
      value instanceof Y.Text
    ) {
      markRaw(value);
      (value as any)._implicitObserver = implicitObserver;
      (value as any).__v_skip = true; // for vue Reactive
    } else {
      throw new Error("unknown YType");
    }
    return value;
  } else if (typeof value === "object") {
    return boxed(value);
  }
  return value;
}
