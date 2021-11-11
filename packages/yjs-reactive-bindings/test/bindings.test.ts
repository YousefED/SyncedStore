import * as bindings from "@syncedstore/yjs-reactive-bindings";
import * as Y from "yjs";
import * as mobx from "mobx";

describe("yjs-reactive-bindings", () => {
  it("Y.Text document binding mobx", () => {
    let doc = new Y.Doc();
    doc.getMap("root").set("key", new Y.Text("value"));

    bindings.useMobxBindings(mobx);

    bindings.makeYDocObservable(doc);
    let stringValue = "";

    // using mobx, we now automatically update stringValue as soon as root.key has changed
    mobx.autorun(() => {
      stringValue = (doc.getMap("root").get("key") as any).toString();
    });
    expect(stringValue).toEqual("value");

    // update the yjs value
    (doc.getMap("root").get("key") as Y.Text).insert(0, "new");

    // did the autorun succesfully execute?
    expect(stringValue).toEqual("newvalue");
  });

  it("Y.Text on root", () => {
    let doc = new Y.Doc();

    bindings.useMobxBindings(mobx);

    bindings.makeYDocObservable(doc);
    let stringValue = "";

    // using mobx, we now automatically update stringValue as soon as root.key has changed
    mobx.autorun(() => {
      stringValue = doc.getText("roottext").toString();
    });
    expect(stringValue).toEqual("");

    // update the yjs value
    doc.getText("roottext").insert(0, "new");

    // did the autorun succesfully execute?
    expect(stringValue).toEqual("new");
  });
});
