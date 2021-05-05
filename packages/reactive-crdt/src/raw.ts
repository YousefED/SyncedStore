import { JSONValue } from "./types";

const RAW_SYMBOL = Symbol("raw");

export class Raw<T> {
  // public RAW_SYMBOL;
  constructor(public readonly value: JSONValue) {}
}
