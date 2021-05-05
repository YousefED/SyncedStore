import * as Y from "yjs";
import { Atom, createAtom } from "./observableProvider";

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
      }
    );

    const originalToString = value.toString;
    value.toString = function () {
      atom!.reportObserved(this._implicitObserver);
      const ret = Reflect.apply(originalToString, this, arguments);
      return ret;
    };
    xmlAtoms.set(value, atom);
  }

  return value;
}
