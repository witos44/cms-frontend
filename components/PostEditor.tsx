'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import * as Toolbar from '@radix-ui/react-toolbar';
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  ListBulletIcon,
  Link1Icon,
  ImageIcon,
} from '@radix-ui/react-icons';
import { ListOrdered } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createAuthClient } from '@/lib/supabase/auth-client';
import { cn } from '@/lib/utils';

type Props = {
  content: string;
  onChange: (html: string) => void;
};

export function PostEditor({ content, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isReadyRef = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5] as const },
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (!isReadyRef.current) return;
      onChange(editor.getHTML());
    },
  });

  /* ===== LOAD CONTENT SAAT RE-EDIT (TIDAK RESET IMAGE) ===== */
  useEffect(() => {
    if (!editor) return;
    if (!content) return;
    if (isReadyRef.current) return;

    editor.commands.setContent(content);
    isReadyRef.current = true;
  }, [editor, content]);

  if (!editor) return null;

  /* ===== IMAGE UPLOAD ===== */
  const uploadImage = async (file: File) => {
    const supabase = createAuthClient();
    const fileName = `editor-${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from('post-images')
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const { data } = supabase.storage
      .from('post-images')
      .getPublicUrl(fileName);

    editor.chain().focus().setImage({ src: data.publicUrl }).run();
  };

  const btn = (active = false) =>
    cn(
      'h-8 px-2 rounded-md flex items-center justify-center',
      'hover:bg-accent hover:text-accent-foreground',
      active && 'bg-accent text-accent-foreground'
    );

  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      <Toolbar.Root className="flex flex-wrap gap-1 p-2 border-b bg-muted/40">
        <button className={btn(editor.isActive('heading', { level: 1 }))} onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}>H1</button>
        <button className={btn(editor.isActive('heading', { level: 2 }))} onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}>H2</button>
        <button className={btn(editor.isActive('heading', { level: 3 }))} onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}>H3</button>

        <div className="w-px h-6 bg-border mx-1" />

        <button className={btn(editor.isActive('bold'))} onClick={() => editor.chain().focus().toggleBold().run()}><FontBoldIcon /></button>
        <button className={btn(editor.isActive('italic'))} onClick={() => editor.chain().focus().toggleItalic().run()}><FontItalicIcon /></button>
        <button className={btn(editor.isActive('underline'))} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon /></button>
        <button className={btn(editor.isActive('strike'))} onClick={() => editor.chain().focus().toggleStrike().run()}><StrikethroughIcon /></button>

        <div className="w-px h-6 bg-border mx-1" />

        <button className={btn(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()}><ListBulletIcon /></button>
        <button className={btn(editor.isActive('orderedList'))} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></button>

        <div className="w-px h-6 bg-border mx-1" />

        <button
          className={btn()}
          onClick={() => {
            const url = prompt('URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <Link1Icon />
        </button>

        <button className={btn()} onClick={() => fileInputRef.current?.click()}>
          <ImageIcon />
        </button>

        <button className={btn()} onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          ✕
        </button>
      </Toolbar.Root>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
      />

      <EditorContent
        editor={editor}
        className="p-4 min-h-[400px] prose prose-sm max-w-none dark:prose-invert"
      />
    </div>
  );
}
