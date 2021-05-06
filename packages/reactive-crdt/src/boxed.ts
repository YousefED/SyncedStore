import { JSONValue } from "./types";
import * as Y from "yjs";

// const RAW_SYMBOL = Symbol("bo");
export class Box<T extends Readonly<JSONValue>> {
  // public RAW_SYMBOL;
  constructor(public readonly value: T) {}
}

export function boxed<T extends JSONValue>(value: T) {
  return new Box(Object.freeze(value) as T);
}
