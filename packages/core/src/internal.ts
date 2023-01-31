import { markRaw } from "@reactivedata/reactive";
import * as Y from "yjs";
import { getYjsValue } from ".";
import { crdtArray } from "./array";
import { Box, boxed } from "./boxed";
import { crdtObject } from "./object";
import { isYType, JSONValue } from "./types";

type NestedSchemaType = JSONValue | ObjectSchemaType | Box<any> | Y.AbstractType<any> | NestedSchemaType[];

export type ObjectSchemaType = {
  [key: string]: NestedSchemaType;
};

export const yToWrappedCache = new WeakMap<Y.AbstractType<any> | Y.Doc, any>();

export function parseYjsReturnValue(value: any, implicitObserver?: any) {
  if (isYType(value)) {
    value._implicitObserver = implicitObserver;

    if (value instanceof Y.Array || value instanceof Y.Map) {
      if (!yToWrappedCache.has(value)) {
        const wrapped = crdtValue(value);
        yToWrappedCache.set(value, wrapped);
      }
      value = yToWrappedCache.get(value);
    } else if (
      value instanceof Y.XmlElement ||
      value instanceof Y.XmlFragment ||
      value instanceof Y.XmlText ||
      value instanceof Y.XmlHook ||
      value instanceof Y.Text
    ) {
      markRaw(value);
      (value as any).__v_skip = true; // for vue Reactive
    } else {
      throw new Error("unknown YType");
    }
    return value;
  } else if (value === null) {
    return null;
  } else if (typeof value === "object") {
    return boxed(value); // TODO: how do we recognize a boxed "null" value?
  }
  return value;
}

export function crdtValue<T extends NestedSchemaType>(value: T | Y.Array<any> | Y.Map<any>) {
  if (value === null || value === undefined) {
    return value;
  }
  value = (getYjsValue(value as any) as any) || value; // unwrap
  if (value instanceof Y.Array) {
    return crdtArray([], value);
  } else if (value instanceof Y.Map) {
    return crdtObject({}, value);
  } else if (typeof value === "string") {
    return value; // TODO
  } else if (Array.isArray(value)) {
    return crdtArray(value as any[]);
  } else if (
    value instanceof Y.XmlElement ||
    value instanceof Y.XmlFragment ||
    value instanceof Y.XmlText ||
    value instanceof Y.XmlHook
  ) {
    return value;
  } else if (value instanceof Y.Text) {
    return value;
  } else if (typeof value === "object") {
    if (value instanceof Box) {
      return value;
    } else {
      return crdtObject(value as any);
    }
  } else if (typeof value === "number" || typeof value === "boolean") {
    return value;
  } else {
    throw new Error("invalid");
  }
}
