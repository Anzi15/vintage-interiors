import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CharacterCount from '@tiptap/extension-character-count';
import Image from '@tiptap/extension-image';
import Iframe from '../IframeExtensionTipTap';
import Heading from '@tiptap/extension-heading'

import MenuBar from "../MenuBar";
import "./tiptapStylings.scss"
import { useEffect, useRef } from 'react';

export default function TiptapEditor({updateHtml}) {
  const editorRef = useRef(null);
  let tiptapEditorElement = null;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
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
        Iframe: true
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 100000,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'editor__image',
        },
      }),
      Iframe.configure({
        allowFullscreen: true,
        HTMLAttributes: {
          class: 'editor__iframe',
        },
      }),
    ],
    content: '<p>Your description goes here...</p>',  // Optional: Set initial content
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      if (updateHtml) {
        updateHtml(htmlContent);
      }
    },
  });

  useEffect(() => {
    if (editorRef.current) {
      tiptapEditorElement = editorRef.current.querySelector('.ProseMirror');
      
      if (tiptapEditorElement) {
        tiptapEditorElement.addEventListener('click', () => {
          handleClick()
        });
      }
    }
  }, [editor]);

  const handleClick = () => {
    if (editor) {
      editor.commands.focus();  // Use Tiptap's focus command to refocus the editor
    }
  };

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent
        className="editor__content w-full min-h-[20rem]"
        editor={editor}
        ref={editorRef}
        onClick={handleClick}
      />
    </div>
  );
}
