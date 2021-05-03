import { Atom, createAtom } from "./observableProvider";
import * as Y from "yjs";
import { isYType, observeYJS } from ".";

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
      const handler = (_changes: Y.YArrayEvent<any>) => {
        selfAtom!.reportChanged();
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
      const handler = (changes: Y.YArrayEvent<any>) => {
        // TODO
        // if (changes.keys.has(key)) {
        atom!.reportChanged();
        // }
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
    if (!ret) {
      return ret;
    }
    if (isYType(ret)) {
      return observeYJS(ret);
    }
    return ret;
  };

  const originalForEach = array.forEach;
  array.forEach = function () {
    reportSelfAtom();
    const ret = Reflect.apply(originalForEach, this, arguments);
    return ret;
  };

  const originalValues = array.toArray;
  array.toArray = function () {
    reportSelfAtom();
    const ret = Reflect.apply(originalValues, this, arguments);
    return ret;
  };

  const originalSlice = array.slice;
  array.slice = function () {
    reportSelfAtom();
    const ret = Reflect.apply(originalSlice, this, arguments);

    for (let i = 0; i < ret.length; i++) {
      if (isYType(ret[i])) {
        observeYJS(ret[i]);
      }
    }

    return ret;
  };

  return array;
}
