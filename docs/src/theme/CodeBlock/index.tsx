import * as React from "react";
import {
  Sandpack,
  SandpackProvider,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview
} from "@codesandbox/sandpack-react";
import styles from "./styles2.module.css";

const AppCode = `import React from "react";
import { useReactive } from "@reactivedata/react";
import { store } from "./store"; // the store we defined above

export default function App() {
  const state = useReactive(store);

  return (
    <div>
      <p>Vehicles:</p>
      <ul>
        {state.vehicles
          .map((v) => {
            return <li>{v.type}</li>;
          })}
      </ul>
      <input type="text" onKeyPress={(event) => {
        if (event.key === "Enter") {
            const target = event.target as HTMLInputElement;
            // Add a yellow vehicle using the type added in the textfield
            state.vehicles.push({ color: "yellow", type: target.value });
            target.value = "";
        }
      }} />
    </div>
  );
}`;

const storeCode = `import { crdt, Y } from "@reactivedata/reactive-crdt";
import { WebrtcProvider } from "y-webrtc";

// Create a document that syncs automatically using Y-WebRTC
const doc = new Y.Doc();
const webrtcProvider = new WebrtcProvider("my-document-id", doc);

// (optional, define types for TypeScript)
type Vehicle = { color: string; type: string };

type StoreType = {
  vehicles: Vehicle[];
};

// Create your reactive-crdt store
export const store = crdt<StoreType>(doc);

// initialize vehicles as an empty array:
store.vehicles = [];`;

var REACT_TEMPLATE = {
  files: {
    "/App.tsx": {
      code: `import React from "react";
      
export default function App() {
    return <h1>Hello World</h1>
  }
  `
    },
    "/index.tsx": {
      code: `import React, { StrictMode } from "react";
  import ReactDOM from "react-dom";
  import "./styles.css";
  
  import App from "./App";
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    rootElement
  );`
    },
    "/styles.css": {
      code: `body {
    font-family: sans-serif;
    -webkit-font-smoothing: auto;
    -moz-font-smoothing: auto;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: auto;
    text-rendering: optimizeLegibility;
    font-smooth: always;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }
  
  h1 {
    font-size: 1.5rem;
  }`
    },
    "/public/index.html": {
      code: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>`
    }
  },
  dependencies: {
    react: "^17.0.0",
    "react-dom": "^17.0.0",
    "react-scripts": "^4.0.0"
  },
  entry: "/index.tsx",
  main: "/App.tsx",
  environment: "create-react-app-typescript"
};

export default function CodeBlock({ children, className: blockClassName, metastring, title }: any) {
  return (
    <SandpackProvider
      //   environment="create-react-app-typescript"
      //   entry="/App.ts"
      template={"vanilla"}
      files={{
        "/App.tsx": AppCode,
        "/store.tsx": storeCode
      }}
      customSetup={
        {
          ...REACT_TEMPLATE,
          dependencies: {
            ...REACT_TEMPLATE.dependencies,
            "@reactivedata/reactive-crdt": "latest",
            "@reactivedata/react": "latest",
            yjs: "latest",
            "y-webrtc": "latest"
          },
          files: {
            ...REACT_TEMPLATE.files,
            "/App.tsx": AppCode,
            "/store.tsx": storeCode
          }
        } as any
      }
    >
      <SandpackLayout>
        <SandpackCodeEditor />
      </SandpackLayout>
      <div style={{ height: 10 }}></div>
      <SandpackLayout>
        <SandpackPreview />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
}
