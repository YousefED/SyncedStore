import { Atom, createAtom } from "./observableProvider";
import * as Y from "yjs";

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
    return ret;
  };

  function patch(method: string) {
    const originalFunction = map[method];
    map[method] = function () {
      reportSelfAtom();
      const ret = Reflect.apply(originalFunction, this, arguments);
      return ret;
    };
  }

  patch("values");
  patch("entries");
  patch("keys");
  patch("forEach");
  patch("toJSON");

  // TODO: has, iterator
  return map;
}
