---
sidebar_position: 1
sidebar_label: Working with text
---

# Working with text

There are several ways to work with text / strings in _SyncedStore_, depending on your needs for collaboration.

## Plain strings on the store

You can store strings in SyncedStore objects and arrays. E.g.:

```javascript
export const store = syncedStore({ myArray: [], myObject: {} });
store.myArray.push("first string");
store.myObject.property = "string value";
```

This way, strings will be shared with other users. However, users cannot modify the same string simultaneously.

## `SyncedText` objects

To enable collaborative editing of strings, use a `SyncedText` instance.

### Nested

For example, if we want to add a collaborative `SyncedText` property to `myObject`:

```javascript
import { SyncedText } from "@syncedstore/core";

export const store = syncedStore({ myObject: {} });
store.myObject.myText = new SyncedText("hello");

// now, other users can simultaneously edit text by calling `insert` and `delete` methods

store.myObject.myText.insert(0, "My name is Bob, ");
```

### On the root of a store

If you want to immediately have access to a `SyncedText` instance, without having to instantiate one and add it to an object or array, you can define one in the shape of a store.

```javascript
import { SyncedText } from "@syncedstore/core";

export const store = syncedStore({ myText: "text" });

// now, other users can simultaneously edit text by calling `insert` and `delete` methods

store.myText.insert(0, "Hello world");
```

The `SyncedText` instance (`myText` in the example above) is initialized empty, untill users add text to it.

### Reference

SyncedText objects are similar to Yjs `Y.Text` instances and support the [same methods](https://github.com/yjs/yjs#shared-types).

## Rich text

If you want to build a true, Google Docs style collaborative text editing experience, continue to the [rich text documentation and example](richtext).
