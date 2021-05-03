import { Atom, createAtom, untracked } from "./observableProvider";
import * as Y from "yjs";
import { observeYJS } from ".";

const xmlAtoms = new WeakMap<Y.XmlFragment | Y.XmlText, Atom>();

export function observeXml(value: Y.XmlFragment) {
  let atom = xmlAtoms.get(value);
  if (!atom) {
    const handler = (event: Y.YXmlEvent) => {
      event.changes.added.forEach((added) => {
        if (added.content instanceof Y.ContentType) {
          const addedType = added.content.type;
          untracked(() => {
            observeYJS(addedType);
          });
        }
      });
      atom!.reportChanged();
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

  untracked(() => {
    value.toArray().forEach((val) => {
      observeYJS(val);
    });
  });

  atom!.reportObserved(this._implicitObserver);
  return value;
}
