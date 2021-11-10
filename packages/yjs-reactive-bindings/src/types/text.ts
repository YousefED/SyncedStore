import { Atom, createAtom } from "../observableProvider";
import * as Y from "yjs";

const textsObserved = new WeakSet<Y.Text>();

export function observeText(value: Y.Text) {
  if (textsObserved.has(value)) {
    // already patched
    return value;
  }
  textsObserved.add(value);

  let atom: Atom | undefined;

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
    }
  );

  function patch(method: string) {
    const originalFunction = value[method];
    value[method] = function () {
      atom!.reportObserved(this._implicitObserver);
      const ret = Reflect.apply(originalFunction, this, arguments);
      return ret;
    };
  }

  patch("toString");
  patch("toJSON");
  return value;
}
