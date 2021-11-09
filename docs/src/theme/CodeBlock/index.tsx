import * as React from "react";
import {
  Sandpack,
  SandpackProvider,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import styles from "./styles2.module.css";
import InitialCodeBlock from "@theme-init/CodeBlock";
import { REACT_TEMPLATE } from "./templates/react";
import { TODO_STORE_CODE } from "./templates/stores";

export default function CodeBlock(props: any) {
  if (!props.live) {
    return <InitialCodeBlock {...props} />;
  }
  // return <div>{JSON.stringify(props)}</div>;
  return (
    <SandpackProvider
      //   environment="create-react-app-typescript"
      //   entry="/App.ts"
      template={"vanilla"}
      customSetup={
        {
          ...REACT_TEMPLATE,
          dependencies: {
            ...REACT_TEMPLATE.dependencies,
            "@reactivedata/reactive-crdt": "latest",
            "@reactivedata/react": "latest",
            yjs: "latest",
            "y-webrtc": "latest",
            "react-inspector": "latest",
            "@tiptap/react": "latest",
            "@tiptap/starter-kit": "latest",
            "@tiptap/extension-collaboration": "latest",
            "@tiptap/extension-collaboration-cursor": "latest",
            "@tiptap/extension-placeholder": "latest",
          },
          files: {
            ...REACT_TEMPLATE.files,
            "/App.tsx": props.children,
            "/store.tsx": TODO_STORE_CODE,
          },
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
