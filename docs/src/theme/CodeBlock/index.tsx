import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";
import InitialCodeBlock from "@theme-original/CodeBlock";
import * as React from "react";
import { REACT_TEMPLATE } from "./templates/react";
import {
  PLAIN_STORE,
  TODO_STORE_CODE_BOXED_TS,
  TODO_STORE_CODE_SVELTE_JS,
  TODO_STORE_CODE_TS,
} from "./templates/stores";
import { SVELTE_TEMPLATE } from "./templates/svelte";
import { VUE_TEMPLATE } from "./templates/vue";

export default function CodeBlock(props: any) {
  if (!props.live) {
    return <InitialCodeBlock {...props} />;
  }
  // return <div>{JSON.stringify(props)}</div>;
  let template: "vue3" | "svelte" | "vanilla" = "vanilla" as "vanilla";
  let customTemplate: any;

  if (props.vue) {
    customTemplate = {
      ...VUE_TEMPLATE,
      files: {
        ...VUE_TEMPLATE.files,
        "/src/App.vue": props.children,
        "/src/store.ts": TODO_STORE_CODE_TS,
      },
    };
    template = "vue3" as "vue3";
  } else if (props.svelte) {
    customTemplate = {
      ...SVELTE_TEMPLATE,
      files: {
        ...SVELTE_TEMPLATE.files,
        "/App.svelte": props.children,
        "/store.js": TODO_STORE_CODE_SVELTE_JS,
      },
      main: "/App.svelte",
    };
    template = "svelte" as "svelte";
  } else if (props.plain) {
    customTemplate = {
      ...REACT_TEMPLATE,
      files: {
        ...REACT_TEMPLATE.files,
        "/main.js": props.children,
        "/App.tsx": {
          code: `import * as React from "react";
          
          const el = document.createElement("div");
          el.id = "app";

          export default function App() { 
            
            const cb = React.useCallback((ref) => {
              if (ref) {
                ref.appendChild(el);
                require("./main");
              }
            });
            return <div ref={cb} className="plainWrapper"></div>; 
          }
          `,
          hidden: true,
        },
        "/store.js": PLAIN_STORE,
      },
      main: "/main.js",
    };
  } else {
    customTemplate = {
      ...REACT_TEMPLATE,
      files: {
        ...REACT_TEMPLATE.files,
        "/App.tsx": props.children,
        "/store.ts": props.boxed ? TODO_STORE_CODE_BOXED_TS : TODO_STORE_CODE_TS,
      },
    };
  }

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
            "@syncedstore/svelte": "latest",
            "@syncedstore/react": "latest",
            yjs: "latest",
            "y-webrtc": "latest",
            "react-inspector": "latest",
            mobx: "latest",
            svelte: "^3.32.3",
            "mobx-react-lite": "latest",
            "y-prosemirror": "latest",
            "@tiptap/pm": "latest",
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
