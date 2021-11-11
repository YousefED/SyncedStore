---
sidebar_position: 1
sidebar_label: Working with text
---

# Collaborative rich text editing

Instead of sharing plain strings or Text instances, what if you want to create a collaborative, (google docs style) rich text editing experience?

You can bind SyncedStore to the rich text editor of your choice. In most cases, you'll need to bind it to a `XmlFragment` on your store. Here's is an example using [TipTap](https://tiptap.dev) and SyncedStore:

## TipTap example

```typescript live
import React, { useState, useCallback, useEffect } from "react";
import { store, webrtcProvider } from "./store";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

const colors = ["#958DF1", "#F98181", "#FBBC88", "#FAF594", "#70CFF8", "#94FADB", "#B9F18D"];
const names = ["Lea Thompson", "Cyndi Lauper", "Tom Cruise", "Madonna"];

const getRandomElement = (list) => list[Math.floor(Math.random() * list.length)];
const getRandomColor = () => getRandomElement(colors);
const getRandomName = () => getRandomElement(names);

export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Collaboration.configure({
        fragment: store.fragment,
      }),
      CollaborationCursor.configure({
        provider: webrtcProvider,
        user: { name: getRandomName(), color: getRandomColor() },
      }),
    ],
  });

  return (
    <div className="editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>horizontal rule</button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>hard break</button>
      <button onClick={() => editor.chain().focus().undo().run()}>undo</button>
      <button onClick={() => editor.chain().focus().redo().run()}>redo</button>
    </>
  );
};
```

## Libraries for different editors

The above example uses TipTap, which is a Prosemirror-based editor, but you might be interested in one of the other editors and bindings as well:

| Library                                              | Binding                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------- |
| [TipTap](https://tiptap.dev/) (prosemirror based)    | [built in](https://tiptap.dev/examples/collaborative-editing) |
| [ProseMirror](https://prosemirror.net/)              | [y-prosemirror](https://github.com/yjs/y-prosemirror)         |
| [Quill](https://quilljs.com/)                        | [y-quill](https://github.com/yjs/y-quill)                     |
| [CodeMirror](https://codemirror.net/)                | [y-codemirror](https://github.com/yjs/y-codemirror)           |
| [Monaco](https://microsoft.github.io/monaco-editor/) | [y-monaco](https://github.com/yjs/y-monaco)                   |
| [Slate](https://github.com/ianstormtaylor/slate)     | [slate-yjs](https://github.com/bitphinix/slate-yjs)           |

<details><summary>View example setup for Prosemirror</summary>
<p>

```typescript
import syncedStore from "@syncedstore/core";
import { ySyncPlugin } from "y-prosemirror";

const doc = new Y.Doc();
export const store = syncedStore({ fragment: "xml" });

// When you set up your ProseMirror instance,
// hook up store.fragment to the y-prosemirror plugin
EditorState.create({
  plugins: [
    ySyncPlugin(store.fragment),
    // ... other plugins
  ],
  // ... remaining prosemirror setup
});
```

_(The rest is similar to the documentation of [y-prosemirror](https://github.com/yjs/y-prosemirror) )_

</p></details>
