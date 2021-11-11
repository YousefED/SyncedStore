import { JSONValue } from "./types";

/**
 * @ignore
 */
export class Box<T extends Readonly<JSONValue>> {
  constructor(public readonly value: T) {}
}

export function boxed<T extends JSONValue>(value: T) {
  return new Box(Object.freeze(value) as T);
}
