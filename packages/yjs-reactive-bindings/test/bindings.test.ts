import * as bindings from "@syncedstore/yjs-reactive-bindings";
import * as Y from "yjs";
import * as mobx from "mobx";

describe("yjs-reactive-bindings", () => {
  it("Y.Text document binding mobx", () => {
    let doc = new Y.Doc();
    doc.getMap("root").set("key", new Y.Text("value"));

    bindings.enableMobxBindings(mobx);

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

    bindings.enableMobxBindings(mobx);

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

  it("array length", () => {
    let doc = new Y.Doc();

    bindings.enableMobxBindings(mobx);

    bindings.makeYDocObservable(doc);
    let length = 0;

    // using mobx, we now automatically update length as soon as rootArray has changed
    mobx.autorun(() => {
      length = doc.getArray("rootArray").length;
    });
    expect(length).toEqual(0);

    // update the yjs value
    doc.getArray("rootArray").insert(0, ["element"]);

    // did the autorun succesfully execute?
    expect(doc.getArray("rootArray").length).toEqual(1);
    expect(length).toEqual(1);
  });
});
