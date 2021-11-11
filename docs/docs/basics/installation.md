---
sidebar_position: 1
sidebar_label: Installation
---

# Installation

Install `SyncedStore` and required dependencies

```bash
npm install --save @syncedstore/core

# Reactive-CRDT builds on top of yjs, install that too:
npm install --save yjs
```

## Optional dependencies

Also install the following helper libraries to get started:

```bash
# For syncing over webrtc:
npm install --save y-webrtc
```

`y-webrtc` is optional, but great during development. Later, you might want to use a different [sync provider](sync%20providers/introduction) instead of `y-webrtc`.

## Creating a store

Now, let's set up a `store` which contains and describes the data that should be synced across users and devices.

```typescript
import { syncedStore, getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

// (optional, define types for TypeScript)
type Vehicle = { color: string; brand: string };

// Create your SyncedStore store
export const store = syncedStore({ vehicles: [] as Vehicle[] });

// Get the Yjs document and sync automatically using y-webrtc
const doc = getYjsValue(store);
const webrtcProvider = new WebrtcProvider("my-document-id", doc);
```

## `syncedStore

The function `syncedStore` takes two parameters:

- `shape`: an object that describes the root types of the store.
- `doc` (optional): a Y.Doc instance. This will be the backing yjs document that contains the data in the store. Defaults to creating a new Y.Doc.

### Shape

The shape object can contain 4 different data types to store in the root. You can define as many properties as you like on the shape.

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

#### XML

TODO

#### Text

TODO
