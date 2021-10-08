import * as Y from "yjs";
import { observeArray } from "./types/array";
import { observeDoc } from "./types/doc";
import { observeMap } from "./types/map";
import { observeText } from "./types/text";
import { observeXml } from "./types/xml";

export function isYType(element: any) {
  return element instanceof Y.AbstractType || Object.prototype.hasOwnProperty.call(element, "autoLoad"); // detect subdocs. Is there a better way for this?
}

export function observeYJS(element: Y.AbstractType<any> | Y.Doc) {
  if (element instanceof Y.XmlText) {
    return observeText(element);
  } else if (element instanceof Y.Text) {
    return observeText(element);
  } else if (element instanceof Y.Array) {
    return observeArray(element);
  } else if (element instanceof Y.Map) {
    return observeMap(element);
  } else if (element instanceof Y.Doc || Object.prototype.hasOwnProperty.call(element, "autoLoad")) {
    // subdoc. Ok way to detect this?
    return observeDoc((element as any) as Y.Doc);
  } else if (element instanceof Y.XmlFragment) {
    return observeXml(element);
  } else if (element instanceof Y.XmlElement) {
    return observeXml(element);
  } else {
    if (element._item === null && element._start === null) {
      // console.warn("edge case");
    } else {
      // throw new Error("not yet supported");
    }
  }
  return element;
}

export function makeYDocObservable(doc: Y.Doc) {
  // based on https://github.com/yjs/yjs/pull/298#issuecomment-937636849
  doc.on("beforeObserverCalls", tr => {
    tr.afterState.forEach((clock, client) => {
      const beforeClock = tr.beforeState.get(client) || 0;
      if (beforeClock !== clock) {
        const structs = /** @type {Array<GC|Item>} */ tr.doc.store.clients.get(client);
        const firstChangePos = Y.findIndexSS(structs, beforeClock);
        for (let i = structs.length - 1; i >= firstChangePos; i--) {
          structs[i].content?.getContent().forEach(content => {
            if (content instanceof Y.AbstractType) {
              observeYJS(content);
              // console.log(content, "is a created type type");
            }
          });
        }
      }
    });
  });
}

export { useMobxBindings, useReactiveBindings, useVueBindings } from "./observableProvider";
export { observeText, observeMap, observeDoc };
