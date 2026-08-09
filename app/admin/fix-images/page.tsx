'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ToastProvider';

type Product = {
  id: number;
  name: string;
  images: string[];
  created_at: string;
};

export default function FixImagesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const { toast } = useToast();

  const [dragItem, setDragItem] = useState<{ productId: number; imageIndex: number } | null>(null);

  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts('');
  }, []);

  async function fetchProducts(q: string = '') {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/fix-images${q ? `?q=${encodeURIComponent(q)}` : ''}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to fetch products');
      setProducts(json.products || []);
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchProducts(search);
  }

  async function handleSave(product: Product) {
    setSavingId(product.id);
    try {
      const res = await fetch('/api/admin/fix-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, images: product.images || [] }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save');
      toast(`บันทึกรูปของ ${product.name} แล้ว!`, 'success');
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setSavingId(null);
    }
  }

  function handleDragStart(productId: number, imageIndex: number) {
    setDragItem({ productId, imageIndex });
  }

  function handleDrop(targetProductId: number, targetImageIndex: number | null = null) {
    if (!dragItem) return;
    
    setProducts(prevProducts => {
      const newProducts = [...prevProducts];
      
      const sourceProductIdx = newProducts.findIndex(p => p.id === dragItem.productId);
      const targetProductIdx = newProducts.findIndex(p => p.id === targetProductId);
      
      if (sourceProductIdx === -1 || targetProductIdx === -1) return prevProducts;
      
      // Clone the products being modified
      const sourceProduct = { ...newProducts[sourceProductIdx], images: [...(newProducts[sourceProductIdx].images || [])] };
      const targetProduct = sourceProductIdx === targetProductIdx 
        ? sourceProduct 
        : { ...newProducts[targetProductIdx], images: [...(newProducts[targetProductIdx].images || [])] };

      // Remove from source
      const [movedImage] = sourceProduct.images.splice(dragItem.imageIndex, 1);
      
      // Insert into target
      if (targetImageIndex !== null) {
        targetProduct.images.splice(targetImageIndex, 0, movedImage);
      } else {
        targetProduct.images.push(movedImage);
      }

      // Update the array
      newProducts[sourceProductIdx] = sourceProduct;
      newProducts[targetProductIdx] = targetProduct;
      
      return newProducts;
    });
    
    setDragItem(null);
  }

  function removeImage(productId: number, imageIndex: number) {
    if (!confirm('ลบรูปนี้ออกจากรายการเลยใช่ไหม? (หากลบผิดสามารถรีเฟรชหน้าเว็บเพื่อคืนค่าได้)')) return;
    setProducts(prev => {
      const newProducts = [...prev];
      const idx = newProducts.findIndex(p => p.id === productId);
      if (idx !== -1) {
        const prod = { ...newProducts[idx], images: [...(newProducts[idx].images || [])] };
        prod.images.splice(imageIndex, 1);
        newProducts[idx] = prod;
      }
      return newProducts;
    });
  }

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>กำลังโหลดข้อมูลสินค้า...</div>;
  }

  return (
    <div style={{ padding: '20px 40px', maxWidth: 1400, margin: '0 auto' }}>
      <h1 className="serif" style={{ fontSize: 24, marginBottom: 10, color: 'var(--gold-dark)' }}>
        กระดานสลับรูปภาพ (Cross-Product Image Swap)
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: 14 }}>
        สามารถคลิกค้างที่รูปภาพ แล้วลากไปใส่ในช่องของสินค้าชิ้นอื่นได้เลย 
        เมื่อจัดเรียงเสร็จแล้วให้กดปุ่ม "บันทึก" ที่สินค้านั้นๆ (ไม่ต้องรีเฟรชหน้าเว็บ)
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="ค้นหาชื่อสินค้า หรือ ID... (เว้นว่างเพื่อดู 200 รายการล่าสุด)"
          style={{ padding: '10px 16px', borderRadius: 'var(--radius)', border: '1px solid var(--cream-dark)', width: 400, fontSize: 14 }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: 'var(--burgundy)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', cursor: 'pointer', fontWeight: 600 }}>
          ค้นหา
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {products.map(product => (
          <div 
            key={product.id} 
            className="card" 
            style={{ 
              display: 'flex', 
              padding: 20, 
              gap: 20, 
              alignItems: 'stretch',
              background: '#fff'
            }}
          >
            {/* Left: Product Info */}
            <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid var(--cream-dark)', paddingRight: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>ID: {product.id}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, margin: 0 }}>
                  {product.name}
                </h3>
              </div>
              <button
                onClick={() => handleSave(product)}
                disabled={savingId === product.id}
                style={{
                  marginTop: 16,
                  padding: '8px 16px',
                  background: 'var(--gold-dark)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  cursor: savingId === product.id ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: 13,
                  opacity: savingId === product.id ? 0.7 : 1
                }}
              >
                {savingId === product.id ? 'กำลังบันทึก...' : '💾 บันทึกรูปของสินค้านี้'}
              </button>
            </div>

            {/* Right: Images Dropzone */}
            <div 
              style={{ flexGrow: 1, minHeight: 120, display: 'flex', gap: 12, flexWrap: 'wrap', alignContent: 'flex-start', padding: 10, borderRadius: 8, background: 'var(--cream-light)', border: '2px dashed transparent', transition: 'all 0.2s' }}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.style.borderColor = 'var(--gold-dark)';
                e.currentTarget.style.background = '#fefdfa';
              }}
              onDragLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.background = 'var(--cream-light)';
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.background = 'var(--cream-light)';
                // If dropped directly on the container (not on a specific image)
                handleDrop(product.id, null);
              }}
            >
              {(!product.images || product.images.length === 0) && (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13, pointerEvents: 'none' }}>
                  ไม่มีรูปภาพ - ลากรูปมาปล่อยที่นี่ได้เลย
                </div>
              )}
              
              {product.images?.map((img, idx) => (
                <div
                  key={img + idx}
                  draggable
                  onDragStart={(e) => {
                    e.stopPropagation();
                    handleDragStart(product.id, idx);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDrop(product.id, idx);
                  }}
                  style={{
                    position: 'relative',
                    width: 100,
                    height: 100,
                    cursor: 'grab',
                    opacity: dragItem?.productId === product.id && dragItem?.imageIndex === idx ? 0.5 : 1,
                    transform: dragItem?.productId === product.id && dragItem?.imageIndex === idx ? 'scale(0.95)' : 'none',
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: '1px solid rgba(0,0,0,0.1)',
                      pointerEvents: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(product.id, idx)}
                    title="ลบรูป"
                    style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: 'var(--burgundy)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, lineHeight: 1, zIndex: 10 }}
                  >
                    ×
                  </button>
                  {idx === 0 && (
                    <span style={{ position: 'absolute', bottom: 4, left: 4, background: 'var(--gold-dark)', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4, letterSpacing: 0.5 }}>
                      รูปหลัก
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
