'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import CodeBlock from '@tiptap/extension-code-block';
import Code from '@tiptap/extension-code';
import Blockquote from '@tiptap/extension-blockquote';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import HardBreak from '@tiptap/extension-hard-break';
import * as Toolbar from '@radix-ui/react-toolbar';
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  ListBulletIcon,
  Link1Icon,
  ImageIcon,
  CodeIcon,
  QuoteIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons';
import { 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3, 
  Heading4, 
  Heading5, 
  Type,
  Highlighter,
  Palette,
  Undo,
  Redo,
  Space
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createAuthClient } from '@/lib/supabase/auth-client';
import { cn } from '@/lib/utils';

type Props = {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export function PostEditor({ content, onChange, placeholder = "Write your post here..." }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isReadyRef = useRef(false);
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state untuk client-side only
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      // Use StarterKit with custom heading levels
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4 my-2',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4 my-2',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'leading-relaxed',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'mb-4 leading-relaxed',
          },
        },
      }),
      
      // Other extensions
      Underline,
      HardBreak,
      Link.configure({ 
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: false,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm my-4',
        },
      }),
      Code.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 text-gray-800 px-1 py-0.5 rounded font-mono text-sm',
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: 'px-1 rounded',
        },
      }),
    ],
    content: content || '',
    // PERBAIKAN: Set immediatelyRender ke false untuk SSR
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (!isReadyRef.current) return;
      onChange(editor.getHTML());
    },
    onCreate: ({ editor }) => {
      console.log('Editor created successfully');
      isReadyRef.current = true;
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4',
        spellcheck: 'true',
      },
      handleKeyDown: (view, event) => {
        // Ctrl+Enter untuk hard break (spasi paragraph)
        if (event.ctrlKey && event.key === 'Enter') {
          editor?.chain().focus().setHardBreak().run();
          return true;
        }
        // Shift+Enter untuk line break biasa
        if (event.shiftKey && event.key === 'Enter') {
          editor?.chain().focus().setHardBreak().run();
          return true;
        }
        return false;
      },
    },
  });

  // Load initial content setelah editor ready
  useEffect(() => {
    if (!editor || isReadyRef.current || !content) return;
    
    // Delay sedikit untuk memastikan editor benar-benar ready
    const timer = setTimeout(() => {
      if (content && content !== editor.getHTML()) {
        console.log('Setting initial content');
        editor.commands.setContent(content);
        isReadyRef.current = true;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [editor, content]);

  // Handle heading
  const handleHeading = (level: 1 | 2 | 3 | 4 | 5) => {
    if (editor?.isActive('heading', { level })) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor?.chain().focus().toggleHeading({ level }).run();
    }
  };

  // Handle link insertion
  const handleInsertLink = () => {
    if (linkUrl) {
      if (editor?.state.selection.empty) {
        // Insert link with text
        editor?.chain().focus().setLink({ href: linkUrl }).insertContent(linkText || 'link').run();
      } else {
        // Wrap selected text with link
        editor?.chain().focus().setLink({ href: linkUrl }).run();
      }
    }
    setShowLinkPopup(false);
    setLinkUrl('');
    setLinkText('');
  };

  // Handle image upload
  const uploadImage = async (file: File) => {
    try {
      const supabase = createAuthClient();
      const fileExt = file.name.split('.').pop();
      const filePath = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert(`Failed to upload image: ${uploadError.message}`);
        return;
      }

      const { data } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath);

      // Insert image at current position
      editor?.chain().focus().setImage({ 
        src: data.publicUrl,
        alt: file.name,
        title: file.name 
      }).run();

      console.log('Image uploaded successfully:', data.publicUrl);
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload image');
    }
  };

  // Color palette options
  const colorOptions = [
    '#000000', '#FFFFFF', '#EF4444', '#F97316', '#F59E0B', 
    '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#6B7280'
  ];

  // Button styling
  const btn = (active = false, disabled = false) =>
    cn(
      'h-8 w-8 rounded-md flex items-center justify-center transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      active ? 'bg-accent text-accent-foreground' : 'bg-transparent',
      disabled && 'opacity-50 cursor-not-allowed'
    );

  // Render loading state selama belum mounted
  if (!isMounted) {
    return (
      <div className="border rounded-lg p-6 min-h-[400px] bg-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (!editor) {
    return (
      <div className="border rounded-lg p-6 min-h-[400px] bg-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Initializing editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <Toolbar.Root className="flex flex-wrap gap-1 p-2 border-b bg-muted/40">
        {/* Headings */}
        <button 
          className={btn(editor.isActive('heading', { level: 1 }))}
          onClick={() => handleHeading(1)}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>
        <button 
          className={btn(editor.isActive('heading', { level: 2 }))}
          onClick={() => handleHeading(2)}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>
        <button 
          className={btn(editor.isActive('heading', { level: 3 }))}
          onClick={() => handleHeading(3)}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </button>
        <button 
          className={btn(editor.isActive('heading', { level: 4 }))}
          onClick={() => handleHeading(4)}
          title="Heading 4"
        >
          <Heading4 size={16} />
        </button>
        <button 
          className={btn(editor.isActive('heading', { level: 5 }))}
          onClick={() => handleHeading(5)}
          title="Heading 5"
        >
          <Heading5 size={16} />
        </button>
        
        {/* Paragraph */}
        <button 
          className={btn(editor.isActive('paragraph'))}
          onClick={() => editor.chain().focus().setParagraph().run()}
          title="Normal Text"
        >
          <Type size={16} />
        </button>

        {/* Paragraph Spacing */}
        <button 
          className={btn()}
          onClick={() => editor.chain().focus().setHardBreak().run()}
          title="Add Paragraph Spacing (Ctrl+Enter)"
        >
          <Space size={16} />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Text Formatting */}
        <button 
          className={btn(editor.isActive('bold'))} 
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold (Ctrl+B)"
        >
          <FontBoldIcon />
        </button>
        <button 
          className={btn(editor.isActive('italic'))} 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic (Ctrl+I)"
        >
          <FontItalicIcon />
        </button>
        <button 
          className={btn(editor.isActive('underline'))} 
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon />
        </button>
        <button 
          className={btn(editor.isActive('strike'))} 
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <StrikethroughIcon />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Color & Highlight */}
        <div className="relative">
          <button 
            className={btn(editor.isActive('highlight') || selectedColor !== '#000000')}
            onClick={() => setShowColorPicker(!showColorPicker)}
            title="Text Color"
          >
            <Palette size={16} />
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white border rounded-lg shadow-lg z-50 grid grid-cols-5 gap-1 w-40">
              {colorOptions.map(color => (
                <button
                  key={color}
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    editor.chain().focus().setColor(color).run();
                    setSelectedColor(color);
                    setShowColorPicker(false);
                  }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>

        <button 
          className={btn(editor.isActive('highlight'))}
          onClick={() => editor.chain().focus().toggleHighlight({ color: '#FEF3C7' }).run()}
          title="Highlight"
        >
          <Highlighter size={16} />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Lists */}
        <button 
          className={btn(editor.isActive('bulletList'))} 
          onClick={() => {
            console.log('Toggle bullet list');
            editor.chain().focus().toggleBulletList().run();
          }}
          title="Bullet List"
        >
          <ListBulletIcon />
        </button>
        <button 
          className={btn(editor.isActive('orderedList'))} 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Alignment */}
        <button 
          className={btn(editor.isActive({ textAlign: 'left' }))}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title="Align Left"
        >
          <TextAlignLeftIcon />
        </button>
        <button 
          className={btn(editor.isActive({ textAlign: 'center' }))}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title="Align Center"
        >
          <TextAlignCenterIcon />
        </button>
        <button 
          className={btn(editor.isActive({ textAlign: 'right' }))}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title="Align Right"
        >
          <TextAlignRightIcon />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Code */}
        <button 
          className={btn(editor.isActive('code'))}
          onClick={() => editor.chain().focus().toggleCode().run()}
          title="Inline Code"
        >
          <CodeIcon />
        </button>
        <button 
          className={btn(editor.isActive('codeBlock'))}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          title="Code Block"
        >
          <div className="flex items-center">
            <CodeIcon />
            <DotFilledIcon className="w-2 h-2" />
          </div>
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Blockquote */}
        <button 
          className={btn(editor.isActive('blockquote'))}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
        >
          <QuoteIcon />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Link */}
        <div className="relative">
          <button 
            className={btn(editor.isActive('link'))}
            onClick={() => {
              if (editor.isActive('link')) {
                editor.chain().focus().unsetLink().run();
              } else {
                setShowLinkPopup(true);
              }
            }}
            title="Insert Link"
          >
            <Link1Icon />
          </button>
          
          {showLinkPopup && (
            <div className="absolute top-full left-0 mt-1 p-3 bg-white border rounded-lg shadow-lg z-50 w-64">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="URL"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  autoFocus
                />
                <input
                  type="text"
                  placeholder="Link text (optional)"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleInsertLink}
                    className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Insert
                  </button>
                  <button
                    onClick={() => {
                      setShowLinkPopup(false);
                      setLinkUrl('');
                      setLinkText('');
                    }}
                    className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Image */}
        <button 
          className={btn()} 
          onClick={() => fileInputRef.current?.click()}
          title="Insert Image"
        >
          <ImageIcon />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Clear Formatting */}
        <button 
          className={btn()} 
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          title="Clear Formatting"
        >
          ✕
        </button>

        {/* Undo/Redo */}
        <div className="w-px h-6 bg-border mx-1" />
        <button 
          className={btn(false, !editor.can().undo())}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <Undo size={16} />
        </button>
        <button 
          className={btn(false, !editor.can().redo())}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <Redo size={16} />
        </button>
      </Toolbar.Root>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            uploadImage(e.target.files[0]);
          }
          e.target.value = '';
        }}
      />

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="min-h-[400px] focus:outline-none prose prose-lg max-w-none p-4"
      />

      {/* Character Count */}
      <div className="border-t px-4 py-2 text-xs text-muted-foreground bg-muted/20 flex justify-between">
        <span>
          {editor.storage.characterCount?.characters() || 0} characters
        </span>
        <span>
          {editor.storage.characterCount?.words() || 0} words
        </span>
        <span className="text-xs text-gray-500">
          Tip: Ctrl+Enter for paragraph spacing
        </span>
      </div>
    </div>
  );
}