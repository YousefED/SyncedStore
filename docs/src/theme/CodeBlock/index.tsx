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
import { VUE_TEMPLATE } from "./templates/vue";

export default function CodeBlock(props: any) {
  if (!props.live) {
    return <InitialCodeBlock {...props} />;
  }
  // return <div>{JSON.stringify(props)}</div>;
  let template: "vue3" | "vanilla" = "vanilla" as "vanilla";
  let customTemplate: any;

  if (props.vue) {
    customTemplate = {
      ...VUE_TEMPLATE,
      files: {
        ...VUE_TEMPLATE.files,
        "/src/App.vue": props.children,
        "/src/store.ts": TODO_STORE_CODE,
      },
    };
    template = "vue3" as "vue3";
  } else {
    customTemplate = {
      ...REACT_TEMPLATE,
      files: {
        ...REACT_TEMPLATE.files,
        "/App.tsx": props.children,
        "/store.ts": TODO_STORE_CODE,
      },
    };
  }
  debugger;
  return (
    <SandpackProvider
      //   environment="create-react-app-typescript"
      //   entry="/App.ts"
      template={template}
      customSetup={
        {
          ...customTemplate,
          dependencies: {
            ...customTemplate.dependencies,
            "@syncedstore/core": "latest",
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
            ...customTemplate.files,
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
