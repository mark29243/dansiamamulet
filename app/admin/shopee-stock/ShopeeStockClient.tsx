'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';

export default function ShopeeStockClient({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  
  // Stats
  const total = products.length;
  const inStock = products.filter(p => p.stock > 0).length;
  const outOfStock = products.filter(p => p.stock <= 0).length;
  const noLocation = products.filter(p => !p.mark_location || p.mark_location.trim() === '').length;
  
  const countIG = products.filter(p => p.mark_ig).length;
  const countFB = products.filter(p => p.mark_fb).length;
  const countTT = products.filter(p => p.mark_tt).length;
  const countShopee2 = products.filter(p => p.mark_shopee2).length;
  const countShopee = products.filter(p => p.name_shopee && p.name_shopee.trim() !== '').length;

  // Filtered Products
  const filteredProducts = useMemo(() => {
    let list = products;
    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(p => 
        (p.name && p.name.toLowerCase().includes(s)) || 
        (p.name_th && p.name_th.toLowerCase().includes(s))
      );
    }
    
    if (activeFilter !== 'ALL') {
      if (activeFilter === 'IG') list = list.filter(p => p.mark_ig);
      if (activeFilter === 'FB') list = list.filter(p => p.mark_fb);
      if (activeFilter === 'TT') list = list.filter(p => p.mark_tt);
      if (activeFilter === 'SHOPEE') list = list.filter(p => p.name_shopee && p.name_shopee.trim() !== '');
      if (activeFilter === 'SHOPEE2') list = list.filter(p => p.mark_shopee2);
      if (activeFilter === 'NOLOC') list = list.filter(p => !p.mark_location || p.mark_location.trim() === '');
    }
    
    return list;
  }, [products, search, activeFilter]);

  const handleUpdate = async (id: number, field: string, value: any) => {
    // Optimistic update
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    
    // Save to DB
    try {
      const res = await fetch('/api/admin/mark-stock/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, [field]: value })
      });
      if (!res.ok) {
        console.error('Failed to update');
        alert('บันทึกไม่สำเร็จ กรุณาลองใหม่');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleMigrate = async () => {
    if (!confirm('ดึงข้อมูลจาก Google Sheets (MARK) มาอัปเดตลงฐานข้อมูลใช่ไหม?')) return;
    try {
      const res = await fetch('/api/admin/mark-stock/migrate', { method: 'POST' });
      const data = await res.json();
      if (data.ok) {
        alert(`ดึงข้อมูลสำเร็จ! อัปเดตไป ${data.updated} รายการ รบกวนรีเฟรชหน้าเว็บครับ`);
      } else {
        alert(`เกิดข้อผิดพลาด: ${data.error}`);
      }
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0, color: '#111' }}>📦 ศูนย์รวมสต็อก (Shopee & Mark)</h1>
        <p style={{ fontSize: 13, color: '#666', margin: '4px 0 0 0' }}>นำเข้า Shopee และจดที่จัดเก็บส่วนตัวในหน้าเดียวจบ</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <button onClick={handleMigrate} style={{ flex: 1, padding: '12px', background: '#92400e', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>
          📥 ดึงข้อมูลสถานที่เก็บ (Google Sheets)
        </button>
        <button onClick={() => window.location.href='/admin/import-shopee'} style={{ flex: 1, padding: '12px', background: '#ea580c', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>
          🛒 นำเข้าไฟล์ Excel (Shopee)
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
        <StatBox label="สินค้าทั้งหมด" value={total} onClick={() => setActiveFilter('ALL')} active={activeFilter==='ALL'} />
        <StatBox label="มีสต็อก" value={inStock} />
        <StatBox label="ขายแล้ว/หมด" value={outOfStock} />
        <StatBox label="ยังไม่มีที่เก็บ" value={noLocation} color="#ef4444" onClick={() => setActiveFilter('NOLOC')} active={activeFilter==='NOLOC'} />
        
        <StatBox label="SHOPEE" value={countShopee} onClick={() => setActiveFilter('SHOPEE')} active={activeFilter==='SHOPEE'} />
        <StatBox label="SHOPEE 2" value={countShopee2} onClick={() => setActiveFilter('SHOPEE2')} active={activeFilter==='SHOPEE2'} />
        <StatBox label="FACEBOOK" value={countFB} onClick={() => setActiveFilter('FB')} active={activeFilter==='FB'} />
        <StatBox label="TIKTOK" value={countTT} onClick={() => setActiveFilter('TT')} active={activeFilter==='TT'} />
        <StatBox label="INSTAGRAM" value={countIG} onClick={() => setActiveFilter('IG')} active={activeFilter==='IG'} />
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input 
          type="text" 
          placeholder="ค้นชื่อสินค้า เช่น เต่า, หลวงพ่อหลิว" 
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14 }}
        />
        <button style={{ background: '#92400e', color: 'white', border: 'none', borderRadius: 8, width: 48, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          🔍
        </button>
      </div>

      {/* Products List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filteredProducts.map(p => {
          const imgUrl = (p.images && p.images[0]) ? p.images[0] : '/placeholder.png';
          
          return (
            <div key={p.id} style={{ background: 'white', borderRadius: 12, padding: 12, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', gap: 12 }}>
              
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden', position: 'relative', flexShrink: 0, border: '1px solid #f0f0f0', background: '#fafafa' }}>
                  <Image src={imgUrl} alt={p.name} fill style={{ objectFit: 'cover' }} unoptimized />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 'bold', margin: '0 0 6px 0', color: '#111', lineHeight: 1.4 }}>{p.name}</h3>
                    <span style={{ fontSize: 13, fontWeight: 'bold', color: '#ea580c' }}>฿{p.price?.toLocaleString() || '0'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                    {p.name_shopee && <span style={{ fontSize: 10, background: '#fef08a', color: '#854d0e', padding: '2px 6px', borderRadius: 4, fontWeight: 'bold' }}>✓ SHOPEE</span>}
                    {p.mark_shopee2 && <span style={{ fontSize: 10, background: '#fef08a', color: '#854d0e', padding: '2px 6px', borderRadius: 4, fontWeight: 'bold' }}>✓ SHOPEE 2</span>}
                    {p.mark_fb && <span style={{ fontSize: 10, background: '#dbeafe', color: '#1e40af', padding: '2px 6px', borderRadius: 4, fontWeight: 'bold' }}>✓ FACEBOOK</span>}
                    {p.mark_tt && <span style={{ fontSize: 10, background: '#f3f4f6', color: '#111827', padding: '2px 6px', borderRadius: 4, fontWeight: 'bold' }}>✓ TIKTOK</span>}
                    {p.mark_ig && <span style={{ fontSize: 10, background: '#fce7f3', color: '#be185d', padding: '2px 6px', borderRadius: 4, fontWeight: 'bold' }}>✓ INSTAGRAM</span>}
                  </div>
                  {p.stock <= 0 && <div style={{ color: '#dc2626', fontSize: 12, fontWeight: 'bold' }}>❌ ขายแล้ว / หมด</div>}
                </div>
              </div>

              {/* Edit Controls */}
              <div style={{ borderTop: '1px dashed #eaeaea', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                
                {/* Location Input */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#666', whiteSpace: 'nowrap' }}>📍 ที่จัดเก็บ:</span>
                  <input 
                    type="text" 
                    value={p.mark_location || ''}
                    onChange={e => setProducts(prev => prev.map(x => x.id === p.id ? { ...x, mark_location: e.target.value } : x))}
                    onBlur={e => handleUpdate(p.id, 'mark_location', e.target.value)}
                    placeholder="ใส่ตำแหน่งที่เก็บ..."
                    style={{ flex: 1, padding: '6px 10px', fontSize: 13, border: '1px solid #ddd', borderRadius: 6 }}
                  />
                </div>

                {/* Platform Checkboxes */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginTop: 4 }}>
                  <span style={{ fontSize: 12, color: '#666', whiteSpace: 'nowrap' }}>ลงขายที่:</span>
                  <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="checkbox" checked={!!p.mark_fb} onChange={e => handleUpdate(p.id, 'mark_fb', e.target.checked)} />
                    FB
                  </label>
                  <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="checkbox" checked={!!p.mark_ig} onChange={e => handleUpdate(p.id, 'mark_ig', e.target.checked)} />
                    IG
                  </label>
                  <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="checkbox" checked={!!p.mark_tt} onChange={e => handleUpdate(p.id, 'mark_tt', e.target.checked)} />
                    Tiktok
                  </label>
                  <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="checkbox" checked={!!p.mark_shopee2} onChange={e => handleUpdate(p.id, 'mark_shopee2', e.target.checked)} />
                    Shopee 2
                  </label>
                </div>

              </div>
            </div>
          );
        })}
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>ไม่พบสินค้าที่ค้นหา</div>
        )}
      </div>

    </div>
  );
}

function StatBox({ label, value, color = '#111', onClick, active = false }: any) {
  return (
    <div 
      onClick={onClick}
      style={{ 
        background: active ? '#fef3c7' : 'white', 
        border: `1px solid ${active ? '#f59e0b' : '#eaeaea'}`, 
        borderRadius: 8, 
        padding: '10px 4px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s'
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 'bold', color }}>{value}</div>
      <div style={{ fontSize: 9, color: '#666', textTransform: 'uppercase', marginTop: 2, textAlign: 'center' }}>{label}</div>
    </div>
  );
}
