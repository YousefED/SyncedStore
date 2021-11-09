import * as Y from "yjs";
import { observeYJS } from "..";
import { Atom, createAtom, reaction } from "../observableProvider";

const docsObserved = new WeakSet<Y.Doc>();

// TODO: add atoms, etc
export function observeDoc(doc: Y.Doc) {
  if (docsObserved.has(doc)) {
    // already patched
    return doc;
  }
  docsObserved.add(doc);
  let selfAtom: Atom | undefined;

  function reportSelfAtom() {
    if (!selfAtom) {
      let oldKeys = Array.from(doc.share.keys());
      const handler = (tr: any) => {
        const newKeys = Array.from(doc.share.keys());
        if (JSON.stringify(oldKeys) !== JSON.stringify(newKeys)) {
          oldKeys = newKeys;
          selfAtom!.reportChanged();
        }
      };
      selfAtom = createAtom(
        "map",
        () => {
          doc.on("beforeObserverCalls", handler);
        },
        () => {
          doc.off("beforeObserverCalls", handler);
        }
      );
    }
    selfAtom.reportObserved((doc as any)._implicitObserver);
  }

  const originalGet = doc.get;

  doc.get = function (key: string) {
    if (typeof key !== "string") {
      throw new Error("unexpected");
    }
    const ret = Reflect.apply(originalGet, this, arguments);
    observeYJS(ret);
    return ret;
  };

  function patch(method: string) {
    const originalFunction = doc[method];
    let previous: any | undefined;

    doc[method] = function () {
      let ret: any;
      let args = arguments;
      reportSelfAtom();

      if (previous) {
        previous.removeObservers(); // dispose
      }

      // we run this in a reaction, because the originalfunction might also trigger
      // observers in nested functions. In particular, if toJSON is called.
      previous = reaction(
        () => {
          ret = Reflect.apply(originalFunction, doc, args);
          return ret;
        },
        () => selfAtom!.reportChanged()
      );

      return ret;
    };
  }

  patch("toJSON");

  Object.defineProperty(doc, "keys", {
    get: () => {
      reportSelfAtom();
      return Object.keys(doc.share);
    },
  });

  return doc;
}
