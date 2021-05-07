import { Atom, createAtom } from "../observableProvider";
import * as Y from "yjs";

const textAtoms = new WeakMap<Y.Text, Atom>();

export function observeText(value: Y.Text) {
  let atom = textAtoms.get(value);
  if (!atom) {
    const handler = (_changes: Y.YTextEvent) => {
      atom!.reportChanged();
    };
    atom = createAtom(
      "text",
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

  patch("toString");
  patch("toJSON");
  return value;
}
