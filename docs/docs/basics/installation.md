---
sidebar_position: 1
sidebar_label: Installation
---

# Installation

Install `SyncedStore` and required dependencies:

```bash
npm install --save @syncedstore/core

# SyncedStore builds on top of yjs, install that too:
npm install --save yjs
```

## Optional dependencies

Also install the following helper libraries to get started:

```bash
# For syncing over webrtc:
npm install --save y-webrtc

# If you use React, install the helper library:
npm install --save @syncedstore/react
```

`y-webrtc` is optional, but great during development. Later, you might want to use a different [sync provider](/docs/sync-providers) instead of `y-webrtc`.

## Creating a store

Now, let's set up a `store` which contains and describes the data that should be synced across users and devices.

```typescript
import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

// (optional, define types for TypeScript)
type Vehicle = { color: string; brand: string };

// Create your SyncedStore store
export const store = syncedStore({ vehicles: [] as Vehicle[] });

// Get the Yjs document and sync automatically using y-webrtc
const doc = getYjsDoc(store);
const webrtcProvider = new WebrtcProvider("my-document-id", doc);
```

You can now add objects to the `store.vehicles` array, and they will be synced automatically with other users. Even if you change properties (e.g.: `store.vehicles[0].color = "red";`), this will be synced with other users.

More about the main `syncedStore` method below, or [continue to the interactive example](example).

## `syncedStore` method

The function `syncedStore` creates a store and takes two parameters:

- `shape`: an object that describes the data you want to keep in the store. Use the `shape` to define the names of objects, arrays, etc. you want to make collaborative and share across users.
- `doc` (optional): a Y.Doc instance. This will be the backing yjs document that contains the data in the store. Defaults to creating a new Y.Doc.

### Shape

Use the shape object to define the types ("shape") of the data you want to keep in the store. You can define as many properties as you like, and there are four different data types you can use; these are explained below.

```javascript
const shape = {
  exampleArrayData: [],
  exampleObjectData: {},
  exampleXMLData: "xml",
  exampleTextData: "text",
};
const store = syncedStore(shape);
```

#### Arrays

`exampleArrayData` in the code snippet above. Arrays must always be initialized as an empty array `[]`. You'll now be able to operate on the array `store.exampleArrayData` like you're used to (e.g.: _push_, _filter_, etc), and changes will be synced across the users of your app.

#### Objects

`exampleObjectData` in the code snippet above. Objects must always be initialized as an empty object `{}`. Objects in SyncedStore resemble Maps or plain javascript objects. You'll be able to set and get properties like you're used to with regular Javascript plain objects (e.g. `store.exampleObjectData.day = "Monday";`).

#### XML (advanced)

`exampleXMLData` in the code snippet above. `store.exampleXMLData` will now return a `SyncedXml` instance.

#### Text (advanced)

`exampleTextData` in the code snippet above. `store.exampleTextData` will now return a `SyncedText` instance, see [Working with text](../advanced/text).
