---
sidebar_position: 7
sidebar_label: Sync providers
---

# Sync providers

So far, we've focused mostly on how to change to state on a synced store, and how to listen (react to) changes and display them in your application.

**How to share changes between users of your application?**

When you update data on the store, an _incremental_ change, or _update_ is captured and can be shared between users.
These updates can be shared between users of your application with different _Sync Providers_. So far, we've used `y-webrtc` that shares updates over WebRTC (and BroadcastChannel), but you might be interested in different providers for production-ready use cases.

## [y-webrtc](https://github.com/yjs/y-webrtc)

Propagates document updates peer-to-peer using WebRTC. The peers exchange signaling data over signaling servers. Publically available signaling servers are available. Communication over the signaling servers can be encrypted by providing a shared secret, keeping the connection information and the shared document private.

```javascript
import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

export const store = syncedStore({ arrayData: [] });

const doc = getYjsDoc(store);
const webrtcProvider = new WebrtcProvider("my-document-id", doc);
```

## [y-indexeddb](https://github.com/yjs/y-indexeddb) for offline storage

Efficiently persists document updates to the browsers indexeddb database. The document is immediately available and only diffs need to be synced through the network provider.

You can use _y-indexeddb_ along side other providers, to store an offline copy of the document in the browser, but also share updates with other users. For example, to use both _y-indexeddb_ and _y-webrtc_:

```javascript
import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";
import { IndexeddbPersistence } from "y-indexeddb";

export const store = syncedStore({ arrayData: [] });

const doc = getYjsDoc(store);
const webrtcProvider = new WebrtcProvider("my-document-id", doc);
const provider = new IndexeddbPersistence("my-document-id", doc);
```

## [y-websocket](https://github.com/yjs/y-websocket)

A module that contains a simple websocket backend and a websocket client that connects to that backend. The backend can be extended to persist updates in a leveldb database.

```javascript
import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebsocketProvider } from "y-websocket";

export const store = syncedStore({ arrayData: [] });

const doc = getYjsDoc(store);

// Start a y-websocket server, e.g.: HOST=localhost PORT=1234 npx y-websocket-server

const wsProvider = new WebsocketProvider("ws://localhost:1234", "my-roomname", doc);
```

## [Matrix-CRDT](https://github.com/yousefED/matrix-crdt)

Use [Matrix](https://www.matrix.org) as a backend for SyncedStore by using the `MatrixProvider` from [Matrix-CRDT](https://github.com/yousefED/matrix-crdt). Matrix.org is an open network for secure, decentralized communication. By using Matrix as a Sync Provider, you can focus building your client app and Matrix can provide powerful features like Authentication, Authorization, Federation, hosting (self-hosting or SaaS) and even End-to-End Encryption (E2EE).

## [Hocuspocus](https://www.hocuspocus.dev/)

Hocuspocus is the open source backend to bring real-time syncing, collaborative text editing and true collaboration to your application today. Get started in minutes, scale to millions.
