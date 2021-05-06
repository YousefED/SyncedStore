import * as Y from "yjs";
import { crdtValue } from ".";
import { boxed } from "./boxed";
import { isYType } from "./types";
export const yToWrappedCache = new WeakMap<Y.AbstractType<any>, any>();

export function parseYjsReturnValue(value: any, implicitObserver?: any) {
  if (isYType(value)) {
    value._implicitObserver = implicitObserver;
    if (!yToWrappedCache.has(value)) {
      const wrapped = crdtValue(value);
      yToWrappedCache.set(value, wrapped);
    }
    value = yToWrappedCache.get(value);

    return value;
  } else if (typeof value === "object") {
    return boxed(value);
  }
  return value;
}
