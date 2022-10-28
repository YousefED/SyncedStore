import { JSONValue } from "./types";

/**
 * @ignore
 */
export class Box<T extends Readonly<JSONValue>> {
  constructor(public readonly value: T) {}
}

export function boxed<T extends JSONValue>(value: T) {
  if (ArrayBuffer.isView(value)) {
    // can't freeze arraybuffer
    return new Box(value as T);
  } else {
    return new Box(Object.freeze(value) as T);
  }
}
