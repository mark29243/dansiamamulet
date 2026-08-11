'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const CATEGORIES = [
  'พระสมเด็จ',
  'หลวงพ่อทวด',
  'เหรียญ',
  'พระเกจิอาจารย์',
];

export default function HomepageSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingCat, setUploadingCat] = useState<string | null>(null);

  useEffect(() => {
    // Fetch current settings from R2
    fetch('https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/homepage-settings.json?t=' + Date.now())
      .then(res => res.ok ? res.json() : {})
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFileChange = async (cat: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCat(cat);
    
    // 1. Upload image to R2 using the existing upload API
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      
      const newSettings = { ...settings, [cat]: data.url };
      setSettings(newSettings);
      
      // 2. Save settings to R2
      setSaving(true);
      await fetch('/api/admin/homepage-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      alert('บันทึกรูปภาพสำเร็จ');
    } catch (err: any) {
      alert(err.message || 'Error saving settings');
    } finally {
      setUploadingCat(null);
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>กำลังโหลด...</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>จัดการรูปภาพหน้าแรก (Popular Categories)</h1>
        <p style={{ color: '#666' }}>อัปโหลดรูปภาพที่ต้องการให้แสดงในหมวดหมู่ยอดนิยมหน้าแรก</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {CATEGORIES.map(cat => (
          <div key={cat} style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #eee' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1a1a1a' }}>หมวดหมู่: {cat}</h3>
            
            <div style={{ 
              aspectRatio: '1', 
              background: '#f9f9f9', 
              borderRadius: 8, 
              border: '1px dashed #ccc',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {settings[cat] ? (
                <Image src={settings[cat]} alt={cat} fill style={{ objectFit: 'cover' }} unoptimized />
              ) : (
                <span style={{ color: '#999', fontSize: 14 }}>ยังไม่ได้ตั้งค่ารูปภาพ<br/><small>(จะใช้รูปอัตโนมัติ)</small></span>
              )}
              
              {uploadingCat === cat && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontWeight: 600 }}>กำลังอัปโหลด...</span>
                </div>
              )}
            </div>

            <label style={{ 
              display: 'block', 
              textAlign: 'center', 
              padding: '10px 16px', 
              background: '#1A1208', 
              color: 'white', 
              borderRadius: 6, 
              cursor: uploadingCat ? 'not-allowed' : 'pointer',
              opacity: uploadingCat ? 0.7 : 1
            }}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileChange(cat, e)} 
                style={{ display: 'none' }} 
                disabled={!!uploadingCat}
              />
              เปลี่ยนรูปภาพ
            </label>
            {saving && uploadingCat === cat && <div style={{ fontSize: 12, color: '#666', marginTop: 8, textAlign: 'center' }}>กำลังบันทึกการตั้งค่า...</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
