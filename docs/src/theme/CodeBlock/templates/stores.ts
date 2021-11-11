export const TODO_STORE_CODE = `import { syncedStore, getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

// (optional, define types for TypeScript)
type todo = { completed: boolean, title: string };

// Create your SyncedStore store
export const store = syncedStore({ todos: [] as Todo[], fragment: "xml" });

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsValue(store);
export const webrtcProvider = new WebrtcProvider("my-document-id", doc);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
`;
