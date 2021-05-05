import * as Y from "yjs";

const docsObserved = new WeakSet<Y.Doc>();

export function observeDoc(doc: Y.Doc) {
  if (docsObserved.has(doc)) {
    // already patched
    return doc;
  }
  docsObserved.add(doc);

  const originalGet = doc.get;

  doc.get = function (key: string) {
    if (typeof key !== "string") {
      throw new Error("unexpected");
    }
    const ret = Reflect.apply(originalGet, this, arguments);
    return ret;
  };

  return doc;
}
