'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';

const RichEditor = dynamic(() => import('./RichEditor'), { ssr: false });

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

// ── Main form ─────────────────────────────────────────────────────────────────
export default function BlogForm({ post }: { post?: Post }) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = !!post;

  const [busy, setBusy]               = useState(false);
  const [uploading, setUploading]     = useState(false);
  const [deleting, setDeleting]       = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
      <div className="card" style={{ padding: 16 }}>
        <label style={{ ...labelStyle, display: 'block', marginBottom: 10 }}>เนื้อหา (ภาษาไทย)</label>
        <p style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 10 }}>
          วางข้อความจาก Word / Google Docs / เว็บไซต์ได้เลย — ตาราง ย่อหน้า รายการ จะคงอยู่ทั้งหมด
        </p>
        <RichEditor
          value={content_th}
          onChange={setContentTh}
          placeholder="เขียนหรือวางเนื้อหาที่นี่..."
        />
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

    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
  color: 'var(--text-muted)', fontFamily: "'Cormorant Garamond', serif",
};
