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

function makeYDocRootLevelTypesObservable(doc: Y.Doc) {
  doc.share.forEach(type => {
    // the explicit check is necessary because we sometimes initialize "anonymous" types that the user can't (and shouldn't) access.
    if (type.constructor !== Y.AbstractType) {
      // console.log("root", type)
      observeYJS(type);
    }
  });
}

function makeStructsObservable(structs: (Y.Item | Y.GC)[], startPos: number) {
  for (let i = structs.length - 1; i >= startPos; i--) {
    let struct = structs[i];
    if (!struct.deleted) {
      if (struct instanceof Y.GC) {
        continue;
      }
      struct.content?.getContent().forEach(content => {
        if (content instanceof Y.AbstractType) {
          // console.log("struct", content)
          observeYJS(content);
          // console.log(content, "is a created type type");
        }
      });
    }
  }
}

export function makeYDocObservable(doc: Y.Doc) {
  // based on https://github.com/yjs/yjs/pull/298#issuecomment-937636849

  // observe all structs already in the document
  doc.store.clients.forEach(entry => {
    if (entry) {
      makeStructsObservable(entry, 0);
    }
  });

  // observe all root-types
  makeYDocRootLevelTypesObservable(doc);

  // observe newly created types from now on
  doc.on("beforeObserverCalls", (tr: Y.Transaction) => {
    // observe new root types
    makeYDocRootLevelTypesObservable(doc);

    // observe new structs
    tr.afterState.forEach((clock, client) => {
      const beforeClock = tr.beforeState.get(client) || 0;
      if (beforeClock !== clock) {
        const structs = tr.doc.store.clients.get(client);
        if (!structs) {
          return;
        }
        const firstChangePos = Y.findIndexSS(structs, beforeClock);
        makeStructsObservable(structs, firstChangePos);
      }
    });
  });
}

export { useMobxBindings, useReactiveBindings, useVueBindings } from "./observableProvider";
export { observeText, observeMap, observeDoc };
