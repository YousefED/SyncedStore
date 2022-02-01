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
        // TODO: detect key of changed element
        // if (event.keys.has(key + "")) {
        //   if (
        //     event.changes.added.size ||
        //     event.changes.deleted.size ||
        //     event.changes.keys.size ||
        //     event.changes.delta.length
        //   ) {
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

  function patchGetter(method: string) {
    let target = array;
    let descriptor = Object.getOwnPropertyDescriptor(target, method)!;

    // properties might be defined down the prototype chain (e.g., properties on XmlFragment when working on an XmlElement)
    if (!descriptor) {
      target = Object.getPrototypeOf(target);
      descriptor = Object.getOwnPropertyDescriptor(target, method)!;
    }

    if (!descriptor) {
      target = Object.getPrototypeOf(target);
      descriptor = Object.getOwnPropertyDescriptor(target, method)!;
    }

    if (!descriptor) {
      throw new Error("property not found");
    }

    const originalFunction = descriptor.get!;
    descriptor.get = function () {
      if (!this._disableTracking) {
        reportSelfAtom();
      }
      const ret = Reflect.apply(originalFunction, this, arguments);
      return ret;
    };
    Object.defineProperty(target, method, descriptor);
  }

  function copyGetter(method: string, newMethodName: string) {
    let target = array;
    let descriptor = Object.getOwnPropertyDescriptor(target, method)!;

    // properties might be defined down the prototype chain (e.g., properties on XmlFragment when working on an XmlElement)
    if (!descriptor) {
      target = Object.getPrototypeOf(target);
      descriptor = Object.getOwnPropertyDescriptor(target, method)!;
    }

    if (!descriptor) {
      target = Object.getPrototypeOf(target);
      descriptor = Object.getOwnPropertyDescriptor(target, method)!;
    }

    if (!descriptor) {
      throw new Error("property not found");
    }

    Object.defineProperty(target, newMethodName, descriptor);
  }

  patch("forEach");
  patch("toJSON");
  patch("toArray");
  patch("slice");
  patch("map");
  copyGetter("length", "lengthUntracked");
  patchGetter("length");

  // make push and slice use _disableTracking so calls to .length don't get observed
  const originalPush = array.push;
  array.push = function (this: any, content: any) {
    this._disableTracking = true;
    const ret = originalPush.call(this, content);
    this._disableTracking = false;
    return ret;
  };

  const originalSlice = array.slice;
  array.slice = function (this: any, start: any, end: any) {
    this._disableTracking = true;
    const ret = originalSlice.call(this, start, end);
    this._disableTracking = false;
    return ret;
  };
  // TODO: iterator
  return array;
}
