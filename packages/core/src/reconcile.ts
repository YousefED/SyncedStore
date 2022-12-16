import * as Y from "yjs";
import { wrapItems } from "./array";

export default function reconcile(target: any, parent: any, property: PropertyKey) {
  const adjust = (target, parent, property) => {
    if (parent instanceof Y.Array && typeof property === "number") {
      if (parent.length > property) (parent as Y.Array<any>).delete(property as number);
      parent.insert(property, wrapItems([target]));
    } else if ((parent instanceof Y.Map || parent instanceof Y.Doc) && typeof property === "string") {
      parent.set(property, target);
    } else {
      console.error("unexpected", target, parent, property);
    }
  };

  const compare = (
    target: any,
    parent: Y.Map<any> | Y.Array<any> | Y.Doc,
    property: PropertyKey,
    path: (string | number)[]
  ) => {
    if (!(parent instanceof Y.Map || parent instanceof Y.Array || parent instanceof Y.Doc)) {
      console.error("unexpected", target, parent, property, path);
      return;
    }

    if (!(property in parent.toJSON())) {
      if (parent instanceof Y.Array && typeof property === "number") {
        // insert undefineds in case an index is being set which is larger then the length of the array
        const delta = property - parent.length;
        const nulls = new Array(delta).fill(null);

        parent.insert(parent.length, wrapItems([...nulls, target]));
      } else {
        adjust(target, parent, property);
      }
      return;
    }

    let yPrevious;

    if ((parent instanceof Y.Map || parent instanceof Y.Doc) && typeof property === "string") {
      yPrevious = parent.get(property);
    } else if (parent instanceof Y.Array && typeof property === "number") {
      yPrevious = parent.get(property);
    } else {
      console.error("unexpected", target, parent, property);
    }

    const previous = yPrevious instanceof Y.AbstractType ? yPrevious.toJSON() : yPrevious;

    /* if (previous === undefined) {
      if (parent instanceof Y.Array && typeof property === "number") {
        // insert undefineds in case an index is being set which is larger then the length of the array
        const delta = property - parent.length;
        const nulls = new Array(delta).fill(null);

        parent.insert(parent.length, wrapItems([...nulls, target]));
      }
      return;
    } */

    if (Array.isArray(target)) {
      // remove excess elements
      if (previous.length > target.length) yPrevious.delete(target.length, previous.length - target.length);

      target.forEach((value, index) => {
        compare(value, yPrevious, index, [...path, index]);
      });
    } else if (typeof target === "object") {
      const targetKeys = Object.keys(target);
      // remove excess keys
      Object.keys(previous)
        .filter((key) => targetKeys.indexOf(key) === -1)
        .forEach((key) => {
          yPrevious.delete(key);
        });

      Object.entries(target).forEach(([key, value]) => {
        compare(value, yPrevious, key, [...path, key]);
      });
    } else if (target !== previous) {
      adjust(target, parent, property);
    }
    return;
  };
  compare(target, parent, property, []);
}
