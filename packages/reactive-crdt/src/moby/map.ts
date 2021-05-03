import { Atom, createAtom } from "./observableProvider";
import * as Y from "yjs";
import { isYType, observeYJS } from ".";

const mapsObserved = new WeakSet<Y.Map<any>>();

export function observeMap(map: Y.Map<any>) {
  if (mapsObserved.has(map)) {
    // already patched
    return map;
  }
  mapsObserved.add(map);
  let selfAtom: Atom | undefined;
  const atoms = new Map<string, Atom>();

  function reportSelfAtom() {
    if (!selfAtom) {
      const handler = (event: Y.YMapEvent<any>) => {
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
          map.observe(handler);
        },
        () => {
          map.unobserve(handler);
        }
      );
    }
    selfAtom.reportObserved((map as any)._implicitObserver);
  }

  function reportMapKeyAtom(key: string) {
    let atom = atoms.get(key);

    // possible optimization: only register a single handler for all keys
    if (!atom) {
      const handler = (event: Y.YMapEvent<any>) => {
        if (event.keysChanged.has(key)) {
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
        key,
        () => {
          map.observe(handler);
        },
        () => {
          map.unobserve(handler);
        }
      );
      atoms.set(key, atom);
    }

    atom.reportObserved((map as any)._implicitObserver);
  }

  const originalGet = map.get;

  map.get = function (key: string) {
    if (typeof key !== "string") {
      throw new Error("unexpected");
    }
    reportMapKeyAtom(key);
    const ret = Reflect.apply(originalGet, this, arguments);
    if (!ret) {
      return ret;
    }
    if (isYType(ret)) {
      return observeYJS(ret);
    }
    return ret;
  };

  const originalValues = map.values;
  map.values = function () {
    reportSelfAtom();
    const ret = Reflect.apply(originalValues, this, arguments);
    return ret;
  };

  const originalForEach = map.forEach;
  map.forEach = function () {
    reportSelfAtom();
    const ret = Reflect.apply(originalForEach, this, arguments);
    return ret;
  };

  const originalToJSON = map.toJSON;
  map.toJSON = function () {
    reportSelfAtom();
    const ret = Reflect.apply(originalToJSON, this, arguments);
    return ret;
  };

  return map;
}
