import * as Y from "yjs";
import { Atom, createAtom } from "../observableProvider";

const arraysObserved = new WeakSet<Y.Array<any>>();

export function observeArray(array: Y.Array<any>) {
  if (arraysObserved.has(array)) {
    // already patched
    return array;
  }
  arraysObserved.add(array);

  let selfAtom: Atom | undefined;
  const atoms = new Map<number, Atom>();

  function reportSelfAtom() {
    if (!selfAtom) {
      const handler = (event: Y.YArrayEvent<any>) => {
        if (
          event.changes.added.size ||
          event.changes.deleted.size ||
          event.changes.keys.size ||
          event.changes.delta.length
        ) {
          selfAtom!.reportChanged();
        }
      };
      selfAtom = createAtom(
        "map",
        () => {
          array.observe(handler);
        },
        () => {
          array.unobserve(handler);
        }
      );
    }
    selfAtom.reportObserved((array as any)._implicitObserver);
  }

  function reportArrayElementAtom(key: number) {
    let atom = atoms.get(key);

    // possible optimization: only register a single handler for all keys
    if (!atom) {
      const handler = (event: Y.YArrayEvent<any>) => {
        if (event.keys.has(key + "")) {
          if (
            event.changes.added.size ||
            event.changes.deleted.size ||
            event.changes.keys.size ||
            event.changes.delta.length
          ) {
            atom!.reportChanged();
          }
        }
      };
      atom = createAtom(
        key + "",
        () => {
          array.observe(handler);
        },
        () => {
          array.unobserve(handler);
        }
      );
      atoms.set(key, atom);
    }

    atom.reportObserved((array as any)._implicitObserver);
  }

  const originalGet = array.get;

  array.get = function (key: number) {
    if (typeof key !== "number") {
      throw new Error("unexpected");
    }
    reportArrayElementAtom(key);
    const ret = Reflect.apply(originalGet, this, arguments);
    return ret;
  };

  function patch(method: string) {
    const originalFunction = array[method];
    array[method] = function () {
      reportSelfAtom();
      const ret = Reflect.apply(originalFunction, this, arguments);
      return ret;
    };
  }

  patch("forEach");
  patch("toJSON");
  patch("toArray");
  patch("slice");
  patch("map");

  // TODO: length, iterator
  return array;
}
