// components/PostEditor.tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import * as ToolbarRadix from '@radix-ui/react-toolbar';
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
  QuoteIcon,
  ListBulletIcon,
  Link1Icon,   // ✅ Gunakan Link1Icon, bukan LinkIcon
  ImageIcon,
} from '@radix-ui/react-icons';
import { ListOrdered } from "lucide-react";

type PostEditorProps = {
  content: string;
  onChange: (content: string) => void;
};

export function PostEditor({ content, onChange }: PostEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5] },
        codeBlock: { defaultLanguage: null },
      }),
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg shadow-sm flex flex-col h-[600px]">
      {/* Toolbar Radix UI */}
      <ToolbarRadix.Root
        className="flex flex-wrap items-center gap-0.5 p-1 border-b bg-background sticky top-15 z-10"
        aria-label="Editor toolbar"
      >
        {/* Heading */}
        <ToolbarRadix.Button
          className="p-2 rounded-sm hover:bg-accent data-[state=on]:bg-accent outline-none"
          onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
          data-state={editor.isActive('heading', { level: 1 }) ? 'on' : 'off'}
          aria-label="Heading 1"
        >
          H1
        </ToolbarRadix.Button>
        <ToolbarRadix.Button
          className="p-2 rounded-sm hover:bg-accent data-[state=on]:bg-accent outline-none"
          onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
          data-state={editor.isActive('heading', { level: 2 }) ? 'on' : 'off'}
          aria-label="Heading 2"
        >
          H2
        </ToolbarRadix.Button>
        <ToolbarRadix.Button
          className="p-2 rounded-sm hover:bg-accent data-[state=on]:bg-accent outline-none"
          onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
          data-state={editor.isActive('heading', { level: 3 }) ? 'on' : 'off'}
          aria-label="Heading 3"
        >
          H3
        </ToolbarRadix.Button>

        <ToolbarRadix.Separator className="w-px bg-border mx-1 h-6" />

        {/* Format */}
        <ToolbarRadix.Button
          className="p-1.5 rounded-sm hover:bg-accent data-[state=on]:bg-accent outline-none"
          onClick={() => editor.chain().focus().toggleBold().run()}
          data-state={editor.isActive('bold') ? 'on' : 'off'}
          aria-label="Bold"
        >
          <FontBoldIcon />
        </ToolbarRadix.Button>
        <ToolbarRadix.Button
          className="p-1.5 rounded-sm hover:bg-accent data-[state=on]:bg-accent outline-none"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          data-state={editor.isActive('italic') ? 'on' : 'off'}
          aria-label="Italic"
        >
          <FontItalicIcon />
        </ToolbarRadix.Button>
        <ToolbarRadix.Button
          className="p-1.5 rounded-sm hover:bg-accent data-[state=on]:bg-accent outline-none"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          data-state={editor.isActive('underline') ? 'on' : 'off'}
          aria-label="Underline"
        >
          <UnderlineIcon />
        </ToolbarRadix.Button>
        <ToolbarRadix.Button
          className="p-1.5 rounded-sm hover:bg-accent data-[state=on]:bg-accent outline-none"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          data-state={editor.isActive('strike') ? 'on' : 'off'}
          aria-label="Strikethrough"
        >
          <StrikethroughIcon />
        </ToolbarRadix.Button>

        <ToolbarRadix.Separator className="w-px bg-border mx-1 h-6" />

        {/* Blocks */}
        <ToolbarRadix.Button
          className="p-2 rounded-sm hover:bg-accent data-[state=on]:bg-accent outline-none"
          onClick={() => editor.chain().focus().setParagraph().run()}
          data-state={editor.isActive('paragraph') ? 'on' : 'off'}
          aria-label="Paragraph"
        >
          P
        </ToolbarRadix.Button>
        <ToolbarRadix.Button
          className="p-2 rounded-sm hover:bg-accent data-[state=on]:bg-accent outline-none"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          data-state={editor.isActive('blockquote') ? 'on' : 'off'}
          aria-label="Blockquote"
        >
          <QuoteIcon />
        </ToolbarRadix.Button>
        <ToolbarRadix.Button
          className="p-2 rounded-sm hover:bg-accent data-[state=on]:bg-accent outline-none"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          data-state={editor.isActive('codeBlock') ? 'on' : 'off'}
          aria-label="Code block"
        >
          <CodeIcon />
        </ToolbarRadix.Button>

        <ToolbarRadix.Separator className="w-px bg-border mx-1 h-6" />

        {/* Lists */}
        <ToolbarRadix.Button
          className="p-2 rounded-sm hover:bg-accent data-[state=on]:bg-accent outline-none"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          data-state={editor.isActive('bulletList') ? 'on' : 'off'}
          aria-label="Bullet list"
        >
          <ListBulletIcon />
        </ToolbarRadix.Button>
        <ToolbarRadix.Button
          className="p-2 rounded-sm hover:bg-accent data-[state=on]:bg-accent outline-none"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          data-state={editor.isActive('orderedList') ? 'on' : 'off'}
          aria-label="Ordered list"
        >
          <ListOrdered />
        </ToolbarRadix.Button>

        <ToolbarRadix.Separator className="w-px bg-border mx-1 h-6" />

        {/* Media */}
        <ToolbarRadix.Button
          className="p-2 rounded-sm hover:bg-accent outline-none"
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          aria-label="Link"
        >
          <Link1Icon /> {/* ✅ Diperbaiki */}
        </ToolbarRadix.Button>
        <ToolbarRadix.Button
          className="p-2 rounded-sm hover:bg-accent outline-none"
          onClick={() => {
            const src = prompt('Enter image URL:');
            if (src) editor.chain().focus().setImage({ src }).run();
          }}
          aria-label="Image"
        >
          <ImageIcon />
        </ToolbarRadix.Button>

        <ToolbarRadix.Separator className="w-px bg-border mx-1 h-6" />

        <ToolbarRadix.Button
          className="p-2 rounded-sm hover:bg-accent outline-none"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          aria-label="Clear formatting"
        >
          ✕
        </ToolbarRadix.Button>
      </ToolbarRadix.Root>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto">
        <EditorContent
          editor={editor}
          className="p-4 min-h-full prose prose-sm dark:prose-invert"
        />
      </div>
    </div>
  );
}