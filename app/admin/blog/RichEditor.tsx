'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function RichEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder: placeholder || 'เขียนเนื้อหาที่นี่...' }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: 'outline:none; min-height:320px; padding:16px 20px; font-size:14px; line-height:1.85; color:var(--text);',
      },
    },
    immediatelyRender: false,
  });

  // Sync external value changes (e.g. when post loads)
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn = (active: boolean) => ({
    padding: '3px 9px', fontSize: 12, fontWeight: 600,
    background: active ? 'var(--gold-dark)' : 'var(--cream)',
    color: active ? '#fff' : 'var(--text)',
    border: '1px solid ' + (active ? 'var(--gold-dark)' : '#ddd'),
    borderRadius: 4, cursor: 'pointer', minWidth: 28, textAlign: 'center' as const,
  });

  const div = <span style={{ width: 1, background: '#ccc', margin: '2px 4px', alignSelf: 'stretch' }} />;

  return (
    <div style={{ border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', padding: '6px 8px', background: 'var(--cream-dark)', borderBottom: '1px solid #ddd' }}>
        {/* Text style */}
        <button type="button" title="ตัวหนา" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} style={btn(editor.isActive('bold'))}>B</button>
        <button type="button" title="ตัวเอียง" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} style={{ ...btn(editor.isActive('italic')), fontStyle: 'italic' }}>I</button>
        <button type="button" title="ขีดทับ" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleStrike().run(); }} style={{ ...btn(editor.isActive('strike')), textDecoration: 'line-through' }}>S</button>
        {div}

        {/* Headings */}
        <button type="button" title="หัวข้อ H2" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }} style={btn(editor.isActive('heading', { level: 2 }))}>H2</button>
        <button type="button" title="หัวข้อ H3" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run(); }} style={btn(editor.isActive('heading', { level: 3 }))}>H3</button>
        {div}

        {/* Lists */}
        <button type="button" title="รายการ (bullet)" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }} style={btn(editor.isActive('bulletList'))}>• list</button>
        <button type="button" title="รายการลำดับ" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }} style={btn(editor.isActive('orderedList'))}>1. list</button>
        {div}

        {/* Block */}
        <button type="button" title="คำอ้างอิง" onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run(); }} style={btn(editor.isActive('blockquote'))}>❝</button>
        <button type="button" title="เส้นแบ่ง" onMouseDown={e => { e.preventDefault(); editor.chain().focus().setHorizontalRule().run(); }} style={btn(false)}>—</button>
        {div}

        {/* Table */}
        <button type="button" title="แทรกตาราง 3×3" onMouseDown={e => { e.preventDefault(); editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); }} style={btn(editor.isActive('table'))}>⊞ ตาราง</button>
        {editor.isActive('table') && <>
          <button type="button" title="เพิ่มคอลัมน์" onMouseDown={e => { e.preventDefault(); editor.chain().focus().addColumnAfter().run(); }} style={btn(false)}>+col</button>
          <button type="button" title="เพิ่มแถว" onMouseDown={e => { e.preventDefault(); editor.chain().focus().addRowAfter().run(); }} style={btn(false)}>+row</button>
          <button type="button" title="ลบตาราง" onMouseDown={e => { e.preventDefault(); editor.chain().focus().deleteTable().run(); }} style={{ ...btn(false), color: 'var(--burgundy)' }}>✕ table</button>
        </>}
        {div}

        {/* Undo/Redo */}
        <button type="button" title="ย้อนกลับ" onMouseDown={e => { e.preventDefault(); editor.chain().focus().undo().run(); }} style={btn(false)}>↩</button>
        <button type="button" title="ทำซ้ำ" onMouseDown={e => { e.preventDefault(); editor.chain().focus().redo().run(); }} style={btn(false)}>↪</button>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />

      <style>{`
        .ProseMirror h2 { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:600; margin:20px 0 10px; }
        .ProseMirror h3 { font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:600; margin:16px 0 8px; }
        .ProseMirror p  { margin-bottom:12px; }
        .ProseMirror ul,.ProseMirror ol { padding-left:20px; margin-bottom:12px; }
        .ProseMirror li { margin-bottom:4px; }
        .ProseMirror blockquote { border-left:3px solid var(--gold); padding-left:12px; color:var(--text-muted); margin:14px 0; }
        .ProseMirror hr { border:none; border-top:1px solid var(--cream-dark); margin:20px 0; }
        .ProseMirror table { border-collapse:collapse; width:100%; margin:16px 0; }
        .ProseMirror th,.ProseMirror td { border:1px solid var(--cream-dark); padding:8px 12px; font-size:13px; }
        .ProseMirror th { background:var(--cream-dark); font-weight:600; }
        .ProseMirror .is-editor-empty:first-child::before { content:attr(data-placeholder); color:var(--text-faint); pointer-events:none; float:left; height:0; }
        .ProseMirror:focus { outline:none; }
      `}</style>
    </div>
  );
}
