'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';

const CATEGORIES = ['ความรู้พระเครื่อง', 'ประวัติวัดและหลวงพ่อ', 'วิธีบูชา', 'ข่าวสารร้าน', 'สะสมพระ', 'อื่น ๆ'];

type Post = {
  id: number;
  slug: string;
  title: string;
  title_th: string | null;
  title_zh: string | null;
  excerpt: string | null;
  excerpt_th: string | null;
  excerpt_zh: string | null;
  content: string;
  content_th: string | null;
  content_zh: string | null;
  cover_image: string | null;
  category: string | null;
  published: boolean;
};

// ── HTML toolbar ─────────────────────────────────────────────────────────────
type ToolbarAction =
  | { type: 'wrap'; tag: string; label: string; title: string }
  | { type: 'block'; open: string; close: string; label: string; title: string }
  | { type: 'insert'; text: string; label: string; title: string }
  | { type: 'divider' };

const TOOLBAR: ToolbarAction[] = [
  { type: 'wrap',  tag: 'strong',       label: 'B',   title: 'ตัวหนา <strong>' },
  { type: 'wrap',  tag: 'em',           label: 'I',   title: 'ตัวเอียง <em>' },
  { type: 'wrap',  tag: 'u',            label: 'U',   title: 'ขีดเส้นใต้ <u>' },
  { type: 'divider' },
  { type: 'block', open: '<h2>',  close: '</h2>', label: 'H2', title: 'หัวข้อใหญ่ <h2>' },
  { type: 'block', open: '<h3>',  close: '</h3>', label: 'H3', title: 'หัวข้อเล็ก <h3>' },
  { type: 'block', open: '<p>',   close: '</p>',  label: '¶',  title: 'ย่อหน้า <p>' },
  { type: 'divider' },
  { type: 'block', open: '<ul>\n  <li>', close: '</li>\n</ul>', label: '• list', title: 'รายการ <ul>' },
  { type: 'block', open: '<li>',  close: '</li>', label: '• item', title: 'รายการย่อย <li>' },
  { type: 'divider' },
  { type: 'block', open: '<blockquote>', close: '</blockquote>', label: '❝', title: 'คำอ้างอิง <blockquote>' },
  { type: 'insert', text: '<hr>', label: '—', title: 'เส้นแบ่ง <hr>' },
];

function HtmlToolbar({ textareaRef, value, onChange }: {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (v: string) => void;
}) {
  function apply(action: ToolbarAction) {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const sel   = value.slice(start, end);
    let insert = '';
    let cursorOffset = 0;

    if (action.type === 'wrap') {
      insert = sel ? `<${action.tag}>${sel}</${action.tag}>` : `<${action.tag}></${action.tag}>`;
      cursorOffset = sel ? insert.length : insert.length - action.tag.length - 3;
    } else if (action.type === 'block') {
      insert = sel ? `${action.open}${sel}${action.close}` : `${action.open}${action.close}`;
      cursorOffset = sel ? insert.length : action.open.length;
    } else if (action.type === 'insert') {
      insert = action.text;
      cursorOffset = insert.length;
    } else {
      return;
    }

    const newVal = value.slice(0, start) + insert + value.slice(end);
    onChange(newVal);
    // Restore focus + cursor after React re-render
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + cursorOffset;
      ta.setSelectionRange(pos, pos);
    });
  }

  return (
    <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', padding: '6px 8px', background: 'var(--cream-dark)', borderRadius: 'var(--radius) var(--radius) 0 0', borderBottom: '1px solid var(--cream-dark)' }}>
      {TOOLBAR.map((action, i) => {
        if (action.type === 'divider') {
          return <span key={i} style={{ width: 1, background: '#ccc', margin: '2px 4px', alignSelf: 'stretch' }} />;
        }
        return (
          <button
            key={i}
            type="button"
            title={action.title}
            onMouseDown={e => { e.preventDefault(); apply(action); }}
            style={{
              padding: '3px 8px', fontSize: 12, fontWeight: 600,
              background: 'var(--cream)', border: '1px solid #ddd',
              borderRadius: 4, cursor: 'pointer', color: 'var(--text)',
              fontFamily: action.label === 'B' ? 'sans-serif' : action.label === 'I' ? 'serif' : 'inherit',
              fontStyle: action.label === 'I' ? 'italic' : 'normal',
              minWidth: 28, textAlign: 'center',
            }}
          >
            {action.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────
export default function BlogForm({ post }: { post?: Post }) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = !!post;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [busy, setBusy]               = useState(false);
  const [uploading, setUploading]     = useState(false);
  const [deleting, setDeleting]       = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [preview, setPreview]         = useState(false);

  const [title_th, setTitleTh]     = useState(post?.title_th   || '');
  const [content_th, setContentTh] = useState(post?.content_th || '');
  const [category, setCategory]    = useState(post?.category   || '');
  const [cover_image, setCover]    = useState(post?.cover_image || '');

  async function handleCoverUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', files[0]);
    try {
      const res  = await fetch('/api/admin/upload-image', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      setCover(json.url);
      toast('อัพโหลดรูปสำเร็จ', 'success');
    } catch (e: any) {
      toast(`อัพโหลดล้มเหลว: ${e.message}`, 'error');
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(publish: boolean) {
    if (!title_th.trim()) { toast('ใส่หัวข้อก่อนนะครับ', 'error'); return; }
    setBusy(true);
    try {
      toast('Claude กำลังแปลและสร้าง slug...', 'success');

      const genRes = await fetch('/api/admin/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title_th, content_th, category }),
      });
      const genData = await genRes.json();
      if (!genRes.ok) throw new Error(genData.error || 'Translation failed');

      const body = {
        title_th,
        title:      genData.title,
        title_zh:   genData.title_zh,
        slug:       genData.slug,
        excerpt_th: genData.excerpt_th,
        excerpt:    genData.excerpt,
        excerpt_zh: genData.excerpt_zh,
        content_th,
        content:    genData.content,
        content_zh: genData.content_zh,
        cover_image: cover_image || null,
        category:   category || null,
        published:  publish,
      };

      const url    = isEdit ? `/api/admin/blog/${post!.id}` : '/api/admin/blog';
      const method = isEdit ? 'PATCH' : 'POST';
      const saveRes  = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const saveData = await saveRes.json();
      if (!saveRes.ok) throw new Error(saveData.error || 'Save failed');

      toast(publish ? '🚀 เผยแพร่บทความแล้ว!' : 'บันทึกฉบับร่างแล้ว', 'success');
      setTimeout(() => router.push('/admin/blog'), 800);
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res  = await fetch(`/api/admin/blog/${post!.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast('ลบบทความแล้ว', 'success');
      setTimeout(() => { window.location.href = '/admin/blog'; }, 600);
    } catch (e: any) {
      toast(e.message, 'error');
      setDeleting(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 800 }}>

      {/* Title */}
      <div className="card" style={{ padding: 20 }}>
        <label style={labelStyle}>หัวข้อบทความ (ภาษาไทย) *</label>
        <input
          className="input"
          value={title_th}
          onChange={e => setTitleTh(e.target.value)}
          placeholder="เช่น พระสมเด็จวัดระฆัง ประวัติและความศักดิ์สิทธิ์"
          style={{ marginTop: 8, fontSize: 15 }}
        />
        <p style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 6 }}>
          ✨ Claude จะแปลเป็นอังกฤษ–จีน และสร้าง slug URL ให้อัตโนมัติตอนบันทึก
        </p>
      </div>

      {/* Category + Cover */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <label style={labelStyle}>หมวดหมู่</label>
          <select className="input" value={category} onChange={e => setCategory(e.target.value)} style={{ marginTop: 8 }}>
            <option value="">-- เลือกหมวดหมู่ --</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <label style={labelStyle}>รูปภาพหน้าปก (ไม่บังคับ)</label>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            {cover_image && (
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={cover_image} alt="" style={{ width: 80, height: 54, objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                <button type="button" onClick={() => setCover('')}
                  style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%', background: 'var(--burgundy)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11 }}>
                  ×
                </button>
              </div>
            )}
            <label className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', cursor: uploading ? 'wait' : 'pointer', fontSize: 12, opacity: uploading ? 0.6 : 1 }}>
              {uploading ? 'กำลังอัพโหลด...' : cover_image ? '🔄 เปลี่ยน' : '+ อัพโหลด'}
              <input type="file" accept="image/*" disabled={uploading} onChange={e => handleCoverUpload(e.target.files)} style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      </div>

      {/* Content editor */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--cream-dark)' }}>
          <label style={labelStyle}>เนื้อหา (ภาษาไทย)</label>
          <button
            type="button"
            onClick={() => setPreview(p => !p)}
            style={{ fontSize: 12, background: preview ? 'var(--gold-dark)' : 'transparent', color: preview ? '#fff' : 'var(--text-muted)', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius)', padding: '4px 12px', cursor: 'pointer' }}
          >
            {preview ? '✏️ แก้ไข' : '👁 Preview'}
          </button>
        </div>

        {preview ? (
          /* Preview panel */
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: content_th || '<p style="color:var(--text-faint);padding:20px">ยังไม่มีเนื้อหา...</p>' }}
            style={{ padding: '20px 24px', minHeight: 300, fontSize: 15, lineHeight: 1.85, color: 'var(--text)' }}
          />
        ) : (
          /* Editor with toolbar */
          <div>
            <HtmlToolbar textareaRef={textareaRef} value={content_th} onChange={setContentTh} />
            <textarea
              ref={textareaRef}
              className="input"
              rows={18}
              value={content_th}
              onChange={e => setContentTh(e.target.value)}
              placeholder="เขียนเนื้อหาบทความที่นี่...&#10;&#10;ใช้ปุ่ม toolbar ด้านบนเพื่อจัดรูปแบบ หรือพิมพ์ HTML ตรงๆ ได้เลย&#10;เช่น <h2>หัวข้อ</h2> <p>ย่อหน้า</p> <strong>ตัวหนา</strong>"
              style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.7, borderRadius: '0 0 var(--radius) var(--radius)', borderTop: 'none' }}
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => router.back()} className="btn-outline" style={{ padding: '10px 18px', fontSize: 13 }}>
            ยกเลิก
          </button>
          {isEdit && !confirmDelete && (
            <button onClick={() => setConfirmDelete(true)} style={{ background: 'var(--burgundy)', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 'var(--radius)', cursor: 'pointer', fontSize: 13 }}>
              ลบ
            </button>
          )}
          {isEdit && confirmDelete && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--burgundy)', fontWeight: 600 }}>ยืนยันลบ?</span>
              <button onClick={handleDelete} disabled={deleting} style={{ background: 'var(--burgundy)', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 'var(--radius)', cursor: 'pointer', fontSize: 13 }}>
                {deleting ? '...' : 'ลบเลย'}
              </button>
              <button onClick={() => setConfirmDelete(false)} style={{ background: 'transparent', border: '1px solid var(--cream-dark)', padding: '8px 14px', borderRadius: 'var(--radius)', cursor: 'pointer', fontSize: 13 }}>
                ยกเลิก
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => handleSave(false)} disabled={busy} className="btn-outline" style={{ padding: '10px 20px', fontSize: 13, opacity: busy ? 0.6 : 1 }}>
            {busy ? '⏳ กำลังแปล...' : 'บันทึกฉบับร่าง'}
          </button>
          <button onClick={() => handleSave(true)} disabled={busy} className="btn-primary" style={{ padding: '10px 24px', fontSize: 13, opacity: busy ? 0.6 : 1 }}>
            {busy ? '⏳ กำลังแปล...' : '🚀 แปลและเผยแพร่'}
          </button>
        </div>
      </div>

      <style>{`
        .blog-content h2 { font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:600; color:var(--text); margin:24px 0 12px; }
        .blog-content h3 { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:600; color:var(--text); margin:20px 0 8px; }
        .blog-content p  { margin-bottom:16px; }
        .blog-content ul,.blog-content ol { padding-left:22px; margin-bottom:16px; }
        .blog-content li { margin-bottom:6px; }
        .blog-content strong { color:var(--text); font-weight:600; }
        .blog-content blockquote { border-left:3px solid var(--gold); padding-left:14px; color:var(--text-muted); font-style:italic; margin:18px 0; }
      `}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
  color: 'var(--text-muted)', fontFamily: "'Cormorant Garamond', serif",
};
