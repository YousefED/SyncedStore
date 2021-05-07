import * as Y from "yjs";
import { Atom, createAtom } from "../observableProvider";

const xmlAtoms = new WeakMap<Y.XmlFragment | Y.XmlText, Atom>();

export function observeXml(value: Y.XmlFragment) {
  let atom = xmlAtoms.get(value);
  if (!atom) {
    const handler = (event: Y.YXmlEvent) => {
      if (
        event.changes.added.size ||
        event.changes.deleted.size ||
        event.changes.keys.size ||
        event.changes.delta.length
      ) {
        atom!.reportChanged();
      }
    };

    atom = createAtom(
      "xml",
      () => {
        value.observe(handler);
      },
      () => {
        value.unobserve(handler);
      },
      (this as any)._implicitObserver
    );
  }

  function patch(method: string) {
    const originalFunction = value[method];
    value[method] = function() {
      atom!.reportObserved(this._implicitObserver);
      const ret = Reflect.apply(originalFunction, this, arguments);
      return ret;
    };
  }

  function patchGetter(method: string) {
    let target = value;
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
    descriptor.get = function() {
      atom!.reportObserved(this._implicitObserver);
      const ret = Reflect.apply(originalFunction, this, arguments);
      return ret;
    };
    Object.defineProperty(target, method, descriptor);
  }

  patch("toString");
  patch("toDOM");
  patch("toArray");
  patchGetter("firstChild");

  return value;
}
