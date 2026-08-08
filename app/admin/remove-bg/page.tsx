'use client';

import { useState } from 'react';
import { useToast } from '@/components/ToastProvider';

export default function RemoveBgTool() {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [images, setImages] = useState<{ id: string; original: string; processed?: string; name: string; file: File }[]>([]);

  const handleImageFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setProcessing(true);
    
    const newImages = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(7),
      original: URL.createObjectURL(file),
      name: file.name,
      file,
    }));
    
    setImages(prev => [...prev, ...newImages]);
    
    for (const item of newImages) {
      toast(`กำลังตัดพื้นหลัง ${item.name} (อาจใช้เวลาสักครู่)...`, 'success');
      try {
        // Use native browser import to bypass Webpack entirely and avoid Terser build errors
        const imglyPath = '/imgly/index.mjs';
        const imglyBackgroundRemoval = await import(/* webpackIgnore: true */ imglyPath);
        const removeBackground = imglyBackgroundRemoval.removeBackground || imglyBackgroundRemoval.default;
        
        const config = {
          publicPath: window.location.origin + '/api/imgly/', // Must be absolute URL for URL constructor
          model: 'small' as const, // Use small model for much faster processing on multiple files
        };
        
        const blob = await removeBackground(item.file, config);
        const processedUrl = URL.createObjectURL(blob);
        
        setImages(prev => prev.map(img => img.id === item.id ? { ...img, processed: processedUrl } : img));
        toast(`ตัดพื้นหลัง ${item.name} สำเร็จ!`, 'success');
      } catch (e: any) {
        toast(`ตัดพื้นหลังล้มเหลว: ${e.message}`, 'error');
      }
    }
    
    setProcessing(false);
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 8 }}>
        เครื่องมือตัดพื้นหลังภาพ (AI)
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14 }}>
        อัปโหลดรูปภาพเพื่อตัดพื้นหลังอัตโนมัติฟรี รองรับการทำทีละหลายรูป และสามารถกดดาวน์โหลดลงเครื่องได้ทันที
      </p>
      
      <div style={{ marginBottom: 32 }}>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed var(--border)',
            borderRadius: 12,
            padding: 40,
            cursor: processing ? 'wait' : 'pointer',
            backgroundColor: 'var(--bg-card)',
            opacity: processing ? 0.6 : 1,
            transition: 'border-color 0.2s',
          }}
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--gold)'; }}
          onDragLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = 'var(--border)';
            if (!processing && e.dataTransfer.files) handleImageFiles(e.dataTransfer.files);
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>📸</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--text)', marginBottom: 8 }}>
            {processing ? 'กำลังประมวลผล...' : 'คลิกเพื่อเลือกรูป หรือลากไฟล์มาวางที่นี่'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            รองรับ PNG, JPG, WEBP (ทำพร้อมกันหลายรูปได้)
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={processing}
            onChange={(e) => { handleImageFiles(e.target.files); e.target.value = ''; }}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {images.length > 0 && (
        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {images.map(img => (
            <div key={img.id} style={{ backgroundColor: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: 12, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 13, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {img.name}
                </div>
                <button 
                  onClick={() => removeImage(img.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16 }}
                >
                  ✕
                </button>
              </div>
              
              <div style={{ 
                position: 'relative', 
                aspectRatio: '1', 
                backgroundColor: '#e5e5f7',
                backgroundImage: 'repeating-linear-gradient(45deg, #c4c4cc 25%, transparent 25%, transparent 75%, #c4c4cc 75%, #c4c4cc), repeating-linear-gradient(45deg, #c4c4cc 25%, #e5e5f7 25%, #e5e5f7 75%, #c4c4cc 75%, #c4c4cc)',
                backgroundPosition: '0 0, 10px 10px',
                backgroundSize: '20px 20px'
              }}>
                <img 
                  src={img.processed || img.original} 
                  alt={img.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: img.processed ? 1 : 0.5 }} 
                />
                {!img.processed && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="spinner" style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  </div>
                )}
              </div>
              
              <div style={{ padding: 16, display: 'flex', gap: 12 }}>
                <a
                  href={img.processed || '#'}
                  download={img.processed ? img.name.replace(/\.[^/.]+$/, "") + "-nobg.png" : undefined}
                  style={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: '10px', 
                    backgroundColor: img.processed ? 'var(--gold-dark)' : 'var(--border)', 
                    color: img.processed ? '#000' : 'var(--text-muted)', 
                    borderRadius: 8, 
                    textDecoration: 'none', 
                    fontSize: 14, 
                    fontWeight: 600,
                    pointerEvents: img.processed ? 'auto' : 'none'
                  }}
                >
                  {img.processed ? '⬇ ดาวน์โหลด' : 'กำลังตัดพื้นหลัง...'}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
