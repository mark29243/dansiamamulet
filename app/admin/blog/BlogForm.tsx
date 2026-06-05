'use client';

import { useState } from 'react';
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

function toSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 80);
}

export default function BlogForm({ post }: { post?: Post }) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = !!post;

  const [busy, setBusy] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [activeLang, setActiveLang] = useState<'en' | 'th' | 'zh'>('th');

  const [form, setForm] = useState({
    title:      post?.title      || '',
    title_th:   post?.title_th   || '',
    title_zh:   post?.title_zh   || '',
    slug:       post?.slug       || '',
    excerpt:    post?.excerpt    || '',
    excerpt_th: post?.excerpt_th || '',
    excerpt_zh: post?.excerpt_zh || '',
    content:    post?.content    || '',
    content_th: post?.content_th || '',
    content_zh: post?.content_zh || '',
    cover_image: post?.cover_image || '',
    category:   post?.category   || '',
    published:  post?.published  ?? false,
  });

  function set(key: string, value: any) {
    setForm(f => ({ ...f, [key]: value }));
    // auto-generate slug from English title
    if (key === 'title' && !isEdit) {
      setForm(f => ({ ...f, title: value, slug: toSlug(value) }));
    }
  }

  async function handleCoverUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', files[0]);
    try {
      const res = await fetch('/api/admin/upload-image', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      set('cover_image', json.url);
      toast('อัพโหลดรูปสำเร็จ', 'success');
    } catch (e: any) {
      toast(`อัพโหลดล้มเหลว: ${e.message}`, 'error');
    } finally {
      setUploading(false);
    }
  }

  async function handleGenerate() {
    const topic = form.title_th || form.title;
    if (!topic) { toast('ใส่ชื่อบทความก่อนนะครับ', 'error'); return; }
    setGenerating(true);
    try {
      const res = await fetch('/api/admin/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category: form.category }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setForm(f => ({
        ...f,
        title:      data.title      || f.title,
        title_th:   data.title_th   || f.title_th,
        title_zh:   data.title_zh   || f.title_zh,
        slug:       isEdit ? f.slug : (data.slug || f.slug),
        excerpt:    data.excerpt    || f.excerpt,
        excerpt_th: data.excerpt_th || f.excerpt_th,
        excerpt_zh: data.excerpt_zh || f.excerpt_zh,
        content:    data.content    || f.content,
        content_th: data.content_th || f.content_th,
        content_zh: data.content_zh || f.content_zh,
      }));
      toast('Claude เขียนบทความให้แล้ว ✓', 'success');
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave(publish?: boolean) {
    if (!form.title.trim() && !form.title_th.trim()) {
      toast('ใส่ชื่อบทความก่อนนะครับ', 'error'); return;
    }
    if (!form.slug.trim()) {
      toast('ใส่ slug ก่อนนะครับ', 'error'); return;
    }
    setBusy(true);
    try {
      const body = {
        ...form,
        published: publish !== undefined ? publish : form.published,
        title: form.title || form.title_th || '',
      };
      const url  = isEdit ? `/api/admin/blog/${post!.id}` : '/api/admin/blog';
      const method = isEdit ? 'PATCH' : 'POST';
      const res  = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast(isEdit ? 'บันทึกแล้ว' : 'สร้างบทความแล้ว', 'success');
      setTimeout(() => router.push('/admin/blog'), 600);
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${post!.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast('ลบบทความแล้ว', 'success');
      setTimeout(() => { window.location.href = '/admin/blog'; }, 600);
    } catch (e: any) {
      toast(e.message, 'error');
      setDeleting(false);
    }
  }

  const tabStyle = (lang: string) => ({
    padding: '8px 18px', fontSize: 12, border: 'none', cursor: 'pointer',
    borderBottom: activeLang === lang ? '2px solid var(--gold-dark)' : '2px solid transparent',
    background: 'transparent', color: activeLang === lang ? 'var(--gold-dark)' : 'var(--text-muted)',
    fontWeight: activeLang === lang ? 600 : 400,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>

      {/* AI Generate */}
      <div className="card" style={{ padding: 16, background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
              ✨ ให้ Claude เขียนให้ — ใส่หัวข้อ (ไทย/อังกฤษ)
            </label>
            <input
              className="input"
              placeholder="เช่น พระสมเด็จวัดระฆัง ประวัติและความศักดิ์สิทธิ์"
              value={form.title_th || form.title}
              onChange={e => set(form.title_th !== undefined ? 'title_th' : 'title', e.target.value)}
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="btn-gold"
            style={{ padding: '10px 20px', fontSize: 13, opacity: generating ? 0.7 : 1, whiteSpace: 'nowrap' }}
          >
            {generating ? '⏳ กำลังเขียน...' : '✨ Generate ด้วย AI'}
          </button>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 8 }}>
          Claude จะเขียนชื่อ, excerpt, และเนื้อหาทั้ง 3 ภาษาให้อัตโนมัติ — แก้ไขได้ภายหลัง
        </p>
      </div>

      {/* Cover image */}
      <div className="card" style={{ padding: 16 }}>
        <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 10 }}>
          รูปภาพหน้าปก
        </label>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {form.cover_image && (
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={form.cover_image} alt="" style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 'var(--radius)' }} />
              <button
                type="button" onClick={() => set('cover_image', '')}
                style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', background: 'var(--burgundy)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12 }}
              >×</button>
            </div>
          )}
          <label className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', cursor: uploading ? 'wait' : 'pointer', fontSize: 13, opacity: uploading ? 0.6 : 1 }}>
            {uploading ? 'กำลังอัพโหลด...' : '+ อัพโหลดรูป'}
            <input type="file" accept="image/*" disabled={uploading} onChange={e => handleCoverUpload(e.target.files)} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Basic fields */}
      <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={labelStyle}>Slug (URL)</label>
            <input className="input" value={form.slug} onChange={e => set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} placeholder="thai-amulet-guide" style={{ fontFamily: 'monospace' }} />
          </div>
          <div>
            <label style={labelStyle}>หมวดหมู่</label>
            <select className="input" value={form.category} onChange={e => set('category', e.target.value)}>
              <option value="">-- เลือก --</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Multilingual content */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Lang tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--cream-dark)', paddingLeft: 8 }}>
          <button style={tabStyle('th')} onClick={() => setActiveLang('th')}>🇹🇭 ไทย</button>
          <button style={tabStyle('en')} onClick={() => setActiveLang('en')}>🇬🇧 English</button>
          <button style={tabStyle('zh')} onClick={() => setActiveLang('zh')}>🇨🇳 中文</button>
        </div>

        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {activeLang === 'th' && (
            <>
              <Field label="ชื่อบทความ (ไทย)">
                <input className="input" value={form.title_th} onChange={e => set('title_th', e.target.value)} placeholder="เช่น พระสมเด็จวัดระฆัง ประวัติและความศักดิ์สิทธิ์" />
              </Field>
              <Field label="คำอธิบายย่อ (ไทย)">
                <textarea className="input" rows={2} value={form.excerpt_th} onChange={e => set('excerpt_th', e.target.value)} placeholder="สรุปสั้นๆ ไม่เกิน 160 ตัวอักษร สำหรับ SEO" style={{ resize: 'vertical' }} />
              </Field>
              <Field label="เนื้อหา (ไทย)">
                <textarea className="input" rows={14} value={form.content_th} onChange={e => set('content_th', e.target.value)} placeholder="เนื้อหาบทความภาษาไทย รองรับ HTML เช่น <h2>, <p>, <strong>" style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} />
              </Field>
            </>
          )}
          {activeLang === 'en' && (
            <>
              <Field label="Title (English)">
                <input className="input" value={form.title} onChange={e => { set('title', e.target.value); if (!isEdit) setForm(f => ({ ...f, title: e.target.value, slug: toSlug(e.target.value) })); }} placeholder="e.g. Phra Somdej Wat Rakhang — History and Sacred Powers" />
              </Field>
              <Field label="Excerpt (English)">
                <textarea className="input" rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="Short description, max 160 chars, for SEO meta description" style={{ resize: 'vertical' }} />
              </Field>
              <Field label="Content (English)">
                <textarea className="input" rows={14} value={form.content} onChange={e => set('content', e.target.value)} placeholder="Blog content. Supports HTML e.g. <h2>, <p>, <strong>, <ul>" style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} />
              </Field>
            </>
          )}
          {activeLang === 'zh' && (
            <>
              <Field label="标题 (中文)">
                <input className="input" value={form.title_zh} onChange={e => set('title_zh', e.target.value)} placeholder="例如：Wat Rakhang Phra Somdej 历史与灵力" />
              </Field>
              <Field label="摘要 (中文)">
                <textarea className="input" rows={2} value={form.excerpt_zh} onChange={e => set('excerpt_zh', e.target.value)} placeholder="简短描述，不超过160字，用于SEO" style={{ resize: 'vertical' }} />
              </Field>
              <Field label="内容 (中文)">
                <textarea className="input" rows={14} value={form.content_zh} onChange={e => set('content_zh', e.target.value)} placeholder="博客内容，支持 HTML 标签" style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} />
              </Field>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
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
              <button onClick={handleDelete} disabled={deleting} style={{ background: 'var(--burgundy)', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 'var(--radius)', cursor: 'pointer', fontSize: 13 }}>{deleting ? '...' : 'ลบเลย'}</button>
              <button onClick={() => setConfirmDelete(false)} style={{ background: 'transparent', border: '1px solid var(--cream-dark)', padding: '8px 14px', borderRadius: 'var(--radius)', cursor: 'pointer', fontSize: 13 }}>ยกเลิก</button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {!form.published && (
            <button onClick={() => handleSave(false)} disabled={busy} className="btn-outline" style={{ padding: '10px 18px', fontSize: 13 }}>
              บันทึกฉบับร่าง
            </button>
          )}
          <button onClick={() => handleSave(true)} disabled={busy} className="btn-primary" style={{ padding: '10px 22px', fontSize: 13, opacity: busy ? 0.7 : 1 }}>
            {busy ? 'กำลังบันทึก...' : form.published ? 'บันทึก' : '🚀 เผยแพร่'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-muted)',
};
