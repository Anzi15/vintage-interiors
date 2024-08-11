import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CharacterCount from '@tiptap/extension-character-count';

import MenuBar from "./MenuBar";

export default function Tiptap() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Enable the desired features from StarterKit
        heading: {
          levels: [1, 2, 3],
        },
        bold: true,
        italic: true,
        strike: true,
        code: true,
        paragraph: true,
        bulletList: true,
        orderedList: true,
        blockquote: true,
        horizontalRule: true,
        hardBreak: true,
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 100000,
      }),
    ],
  });

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
    </div>
  );
}
