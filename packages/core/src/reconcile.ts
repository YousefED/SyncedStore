import * as Y from "yjs";
import { wrapItems } from "./array";

export default function reconcile(target: any, parent: any, property: PropertyKey) {
  const diffs: {
    [key: string]: {
      target: any;
      parent: any;
      property: PropertyKey;
    };
  } = {};

  const compare = (target: any, parent: any, property: PropertyKey, path: (string | number)[]) => {
    if (typeof parent !== "object" || typeof parent.get !== "function") {
      console.error("unexpected");
      return;
    }

    const yPrevious = parent.get(property);

    const previous = typeof yPrevious === "object" ? yPrevious.toJSON() : yPrevious;

    if (previous === undefined) {
      if (typeof property === "number") {
        const delta = property - parent.length;
        const nulls = new Array(delta).fill(null);
        parent.insert(parent.length, wrapItems([...nulls, target]));
      }
      return;
    }

    if (target !== previous && typeof target !== "object") {
      const key = path.join(":");
      diffs[key] = { target, parent, property };
    }

    if (Array.isArray(target)) {
      target.forEach((value, index) => {
        compare(value, yPrevious, index, [...path, index]);
      });
    } else if (typeof target === "object") {
      Object.entries(target).forEach(([key, value]) => {
        compare(value, yPrevious, key, [...path, key]);
      });
    }
  };

  compare(target, parent, property, []);

  Object.values(diffs).forEach(({ target, parent, property }) => {
    if (Array.isArray(parent.toJSON())) {
      (parent as Y.Array<any>).delete(property as number);
      (parent as Y.Array<any>).insert(property as number, [target]);
    } else {
      if (typeof parent.set !== "function") {
        console.error("unexpected", target, parent, property);
      } else {
        (parent as Y.Map<any>).set(property as string, target);
      }
    }
  });
}
