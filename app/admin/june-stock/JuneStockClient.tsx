'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import * as XLSX from 'xlsx';

export default function JuneStockClient({ initialProducts, isStaffRoute = false }: { initialProducts: any[], isStaffRoute?: boolean }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hideSoldOut, setHideSoldOut] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shopeeUrl, setShopeeUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  // Manual entry states
  const [manualName, setManualName] = useState('');
  const [manualPrice, setManualPrice] = useState('');
  const [manualStock, setManualStock] = useState('1');
  const [manualImages, setManualImages] = useState<string[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isManualImporting, setIsManualImporting] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[] | null>(null);

  const handleClearEmpty = async () => {
    if (!confirm('ยืนยันที่จะลบสินค้าที่ยอดสต็อกเป็น 0 ออกจากระบบทั้งหมดหรือไม่? (ข้อมูลที่จัดเก็บจะหายไปด้วย)')) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/admin/june-stock/clear-empty');
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      
      alert('ล้างสินค้าเรียบร้อยแล้ว!');
      window.location.reload();
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Stats
  const total = products.length;
  const outOfStock = products.filter(p => p.stock <= 0 || p.mark_location?.toLowerCase() === 'sold').length;
  const inStock = total - outOfStock;
  const noLocation = products.filter(p => !p.mark_location || p.mark_location.trim() === '').length;
  
  const countFB = products.filter(p => p.mark_fb).length;
  const countNexGen = products.filter(p => p.mark_nexgen).length;
  const countTT = products.filter(p => p.mark_tt).length;
  const countEnnxo = products.filter(p => p.mark_ennxo).length;
  const countShopee = products.filter(p => p.name_shopee && p.name_shopee.trim() !== '').length;

  // Filtered Products
  const filteredProducts = useMemo(() => {
    let list = products;
    
    if (activeFilter === 'SOLD') {
      // Show ONLY sold items (overrides hideSoldOut)
      list = list.filter(p => p.stock <= 0 || p.mark_location?.toLowerCase() === 'sold');
    } else {
      if (hideSoldOut) {
        list = list.filter(p => p.stock > 0 && p.mark_location?.toLowerCase() !== 'sold');
      }

      if (activeFilter === 'FB') list = list.filter(p => p.mark_fb);
      if (activeFilter === 'NEXGEN') list = list.filter(p => p.mark_nexgen);
      if (activeFilter === 'TT') list = list.filter(p => p.mark_tt);
      if (activeFilter === 'ENNXO') list = list.filter(p => p.mark_ennxo);
      if (activeFilter === 'SHOPEE') list = list.filter(p => p.name_shopee && p.name_shopee.trim() !== '');
      if (activeFilter === 'NOLOC') list = list.filter(p => !p.mark_location || p.mark_location.trim() === '');
    }

    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(p => 
        (p.name && p.name.toLowerCase().includes(s)) || 
        (p.name_th && p.name_th.toLowerCase().includes(s))
      );
    }
    
    return list;
  }, [products, search, activeFilter, hideSoldOut]);

  const handleUpdate = async (id: number, field: string, value: any) => {
    // Optimistic update
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    
    // Save to DB
    try {
      const res = await fetch('/api/admin/june-stock/update', {
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
    if (!confirm('ดึงข้อมูลจาก Google Sheets (JUNE) มาอัปเดตลงฐานข้อมูลใช่ไหม?')) return;
    try {
      const res = await fetch('/api/admin/june-stock/migrate', { method: 'POST' });
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

  const handleSingleImport = async () => {
    if (!shopeeUrl) return;
    setIsImporting(true);
    try {
      // 1. Scrape Shopee URL
      const scrapeRes = await fetch('/api/import-shopee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: shopeeUrl })
      });
      const scraped = await scrapeRes.json();
      if (!scrapeRes.ok) throw new Error(scraped.error || 'Failed to fetch Shopee data');
      
      // 2. Process & Save to june_products table
      const processRes = await fetch('/api/admin/import-shopee/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: [{
            name: scraped.name_th || scraped.name,
            price: scraped.price ? (scraped.price / 100).toString() : '0',
            stock: scraped.stock || 1,
            shopee_images: scraped.images || []
          }],
          targetStore: 'june'
        })
      });
      const processed = await processRes.json();
      if (!processRes.ok) throw new Error(processed.error || 'Failed to save product');
      
      alert('ดึงข้อมูลและบันทึกลงสต็อกสำเร็จ!');
      window.location.reload();
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsImporting(false);
      setShopeeUrl('');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploadingImage(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        
        const res = await fetch('/api/admin/upload-image', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        uploadedUrls.push(data.url);
      }
      setManualImages(prev => [...prev, ...uploadedUrls]);
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleManualImport = async () => {
    if (!manualName.trim()) return alert('กรุณากรอกชื่อสินค้า');
    setIsManualImporting(true);
    try {
      const processRes = await fetch('/api/admin/import-shopee/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: [{
            name: manualName.trim(),
            price: manualPrice || '0',
            stock: parseInt(manualStock) || 1,
            shopee_images: manualImages
          }],
          targetStore: 'june'
        })
      });
      const processed = await processRes.json();
      if (!processRes.ok) throw new Error(processed.error || 'Failed to save product');
      
      alert('เพิ่มข้อมูลลงสต็อกสำเร็จ!');
      window.location.reload();
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsManualImporting(false);
      setManualName('');
      setManualPrice('');
      setManualImages([]);
    }
  };

  const handleExportExcel = () => {
    if (filteredProducts.length === 0) return alert('ไม่มีข้อมูลให้ Export');
    const data = filteredProducts.map(p => ({
      'รหัสสินค้า': p.name_shopee || '',
      'ชื่อสินค้า': p.name,
      'ราคา': p.price || 0,
      'สต็อก': p.stock || 0,
      'สถานที่จัดเก็บ': p.mark_location || '',
      'Shopee': (p.name_shopee && p.name_shopee.trim() !== '') ? '✓' : '',
      'Facebook': p.mark_fb ? '✓' : '',
      'NexGen': p.mark_nexgen ? '✓' : '',
      'Tiktok': p.mark_tt ? '✓' : '',
      'Ennxo': p.mark_ennxo ? '✓' : '',
      'สถานะ': (p.stock <= 0 || p.mark_location?.toLowerCase() === 'sold') ? 'ขายแล้ว' : 'มีสต็อก'
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Stock");
    XLSX.writeFile(workbook, `June_Stock_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleExportShopeeTemplate = async () => {
    if (filteredProducts.length === 0) return alert('ไม่มีข้อมูลให้ Export');
    setIsImporting(true);
    try {
      const truncateThaiText = (text: string, maxLength: number) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        try {
          const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
          let result = '';
          for (const segment of segmenter.segment(text)) {
            if (result.length + segment.segment.length + 3 > maxLength) break;
            result += segment.segment;
          }
          return (result || text.substring(0, maxLength - 3)) + '...';
        } catch (e) {
          const truncated = text.substring(0, maxLength - 3);
          const lastSpace = truncated.lastIndexOf(' ');
          if (lastSpace > 0) return truncated.substring(0, lastSpace) + '...';
          return truncated + '...';
        }
      };

      const response = await fetch('/shopee_template.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const wb = XLSX.read(arrayBuffer);
      
      const wsName = 'แบบฟอร์มการลงสินค้า'; 
      const ws = wb.Sheets[wsName];
      if (!ws) throw new Error("ไม่พบชีต 'แบบฟอร์มการลงสินค้า' ในแบบฟอร์มต้นฉบับ");

      const rows: any[][] = [];
      for (const p of filteredProducts) {
        const row = new Array(38).fill('');
        row[0] = '101394';
        
        let shopeeName = p.name_th || p.name || '';
        if (shopeeName.length > 120) shopeeName = truncateThaiText(shopeeName, 120);
        else if (shopeeName.length < 20) shopeeName = shopeeName + ' (แท้ 100% พร้อมส่ง)';
        row[1] = shopeeName;
        
        row[2] = p.description_th || p.description || shopeeName;
        row[15] = (p.price || 0).toString();
        row[16] = (p.stock || 0).toString();
        
        let sku = p.name_shopee || p.id.toString();
        if (sku.length > 100) sku = sku.substring(0, 100);
        row[17] = sku;
        
        if (p.images && p.images.length > 0) row[21] = p.images[0];
        for (let i = 1; i <= 8; i++) {
          if (p.images && p.images.length > i) row[21 + i] = p.images[i];
        }

        row[30] = '0.30'; row[31] = '16'; row[32] = '10'; row[33] = '7'; row[34] = 'เปิด';
        rows.push(row);
      }

      XLSX.utils.sheet_add_aoa(ws, rows, { origin: 6 });
      XLSX.writeFile(wb, `June_Shopee_MassUpload_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error: any) {
      alert('เกิดข้อผิดพลาดในการสร้างไฟล์ Excel: ' + error.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0, color: '#111' }}>📦 ศูนย์รวมสต็อกของ June</h1>
        <p style={{ fontSize: 13, color: '#666', margin: '4px 0 0 0' }}>นำเข้า Shopee และจัดการสต็อก (แยกข้อมูลเฉพาะตัว)</p>
      </div>

      {/* Shopee Import Quick Add */}
      <div style={{ background: '#FFF3E0', padding: 16, borderRadius: 10, border: '1px solid #FFCC80', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#E65100' }}>
            ⚡ ทางลัด: ดึงข้อมูลจาก Shopee (ลงทีละชิ้น)
          </div>
          <button 
            onClick={() => setShowManual(!showManual)}
            style={{ 
              background: 'none', border: 'none', color: '#D97706', fontSize: 11, cursor: 'pointer',
              textDecoration: 'underline', padding: 0
            }}
          >
            {showManual ? 'ซ่อนการเพิ่มเอง' : 'ดึงไม่ผ่าน? เพิ่มข้อมูลเอง (Manual)'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            placeholder="วางลิ้งก์ Shopee ที่นี่ (เช่น https://shopee.co.th/product/123/456)"
            value={shopeeUrl}
            onChange={e => setShopeeUrl(e.target.value)}
            disabled={isImporting || showManual}
            style={{ flex: 1, padding: '10px 12px', fontSize: 13, border: '1px solid #FFCC80', borderRadius: 6, minWidth: 0, opacity: showManual ? 0.5 : 1 }}
          />
          <button
            onClick={handleSingleImport}
            disabled={isImporting || !shopeeUrl || showManual}
            style={{ 
              padding: '10px 16px', background: '#F97316', border: 'none', color: '#fff', 
              borderRadius: 6, fontSize: 13, fontWeight: 'bold', cursor: (isImporting || !shopeeUrl || showManual) ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap', opacity: showManual ? 0.5 : 1
            }}
          >
            {isImporting ? 'กำลังดึง...' : 'ดึงข้อมูล'}
          </button>
        </div>
        {!showManual && (
          <div style={{ fontSize: 11, color: '#F97316', marginTop: 6 }}>
            * ระบบจะดึงรูปภาพ, ชื่อ, ราคา และบันทึกลงในรายการสต็อกให้อัตโนมัติ (และจะปรากฎในตารางด้านล่างทันที)
          </div>
        )}

        {/* Manual Entry Block */}
        {showManual && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed #FCD34D', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#B45309' }}>✍️ เพิ่มข้อมูลเอง (กรณีดึงจากลิ้งก์ไม่ผ่าน)</div>
            
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {/* Image Upload Area */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {manualImages.map((imgUrl, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ 
                      width: 60, height: 60, borderRadius: 8, border: '1px solid #E5E7EB', 
                      position: 'relative', overflow: 'hidden'
                    }}>
                      <Image src={imgUrl} alt={`preview-${idx}`} fill style={{ objectFit: 'cover' }} unoptimized />
                    </div>
                    <button onClick={() => setManualImages(prev => prev.filter((_, i) => i !== idx))} style={{ fontSize: 10, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer' }}>ลบ</button>
                  </div>
                ))}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ 
                    width: 60, height: 60, borderRadius: 8, border: '1px dashed #D97706', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    background: '#FFFBEB', cursor: 'pointer', overflow: 'hidden'
                  }}>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={isUploadingImage} style={{ display: 'none' }} />
                    <span style={{ fontSize: 11, color: '#D97706', textAlign: 'center', padding: 4 }}>
                      {isUploadingImage ? '...' : '+ รูป'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 250 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <input 
                    type="text" 
                    placeholder="ชื่อสินค้า..." 
                    value={manualName}
                    onChange={e => setManualName(e.target.value)}
                    style={{ flex: 2, padding: '8px 10px', fontSize: 13, border: '1px solid #FDE68A', borderRadius: 6, minWidth: 150 }}
                  />
                  <input 
                    type="number" 
                    placeholder="ราคา (฿)" 
                    value={manualPrice}
                    onChange={e => setManualPrice(e.target.value)}
                    style={{ flex: 1, padding: '8px 10px', fontSize: 13, border: '1px solid #FDE68A', borderRadius: 6, minWidth: 80 }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'white', padding: '0 8px', borderRadius: 6, border: '1px solid #FDE68A' }}>
                    <span style={{ fontSize: 12, color: '#666' }}>จำนวน:</span>
                    <input 
                      type="number" 
                      value={manualStock}
                      onChange={e => setManualStock(e.target.value)}
                      style={{ width: 40, padding: '8px 0', fontSize: 13, border: 'none', outline: 'none', textAlign: 'center' }}
                    />
                  </div>
                </div>
                <button
                  onClick={handleManualImport}
                  disabled={isManualImporting || !manualName.trim() || isUploadingImage}
                  style={{ 
                    padding: '8px 16px', background: '#D97706', border: 'none', color: '#fff', 
                    borderRadius: 6, fontSize: 13, fontWeight: 'bold', cursor: (isManualImporting || !manualName.trim() || isUploadingImage) ? 'not-allowed' : 'pointer',
                    alignSelf: 'flex-end', width: 'fit-content'
                  }}
                >
                  {isManualImporting ? 'กำลังบันทึก...' : 'บันทึกเข้าสต็อก'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <button onClick={handleMigrate} style={{ flex: 1, padding: '12px', background: '#92400e', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>
          📥 ดึงพิกัด (Google Sheets)
        </button>
        <button onClick={() => window.location.href='/staff/import-shopee'} style={{ flex: 1, padding: '12px', background: '#15803d', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>
          📊 อัปโหลด (Excel)
        </button>
        <button onClick={handleExportExcel} style={{ flex: 1, padding: '12px', background: '#059669', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', fontSize: 13 }}>
          📥 โหลด Excel (เช็คสต็อก)
        </button>
        <button onClick={handleExportShopeeTemplate} style={{ flex: 1, padding: '12px', background: '#ea580c', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', fontSize: 13 }}>
          📥 โหลด Excel (ลง Shopee)
        </button>
        <button onClick={handleClearEmpty} style={{ padding: '12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }} title="ลบสินค้าที่สต็อกเหลือ 0 ทิ้งทั้งหมด">
          🗑️ ล้างของหมด
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
        <StatBox label="สินค้าทั้งหมด" value={total} onClick={() => setActiveFilter('ALL')} active={activeFilter==='ALL'} />
        <StatBox label="มีสต็อก" value={inStock} />
        <StatBox label="ขายแล้ว/หมด" value={outOfStock} color="#dc2626" onClick={() => setActiveFilter('SOLD')} active={activeFilter==='SOLD'} />
        <StatBox label="ยังไม่มีที่เก็บ" value={noLocation} color="#ef4444" onClick={() => setActiveFilter('NOLOC')} active={activeFilter==='NOLOC'} />
        
        <StatBox label="SHOPEE" value={countShopee} onClick={() => setActiveFilter('SHOPEE')} active={activeFilter==='SHOPEE'} />
        <StatBox label="FACEBOOK" value={countFB} onClick={() => setActiveFilter('FB')} active={activeFilter==='FB'} />
        <StatBox label="NEXGEN" value={countNexGen} onClick={() => setActiveFilter('NEXGEN')} active={activeFilter==='NEXGEN'} />
        <StatBox label="TIKTOK" value={countTT} onClick={() => setActiveFilter('TT')} active={activeFilter==='TT'} />
        <StatBox label="ENNXO" value={countEnnxo} onClick={() => setActiveFilter('ENNXO')} active={activeFilter==='ENNXO'} />
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="ค้นชื่อสินค้า..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: '12px 16px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14 }}
        />
        
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#444', cursor: 'pointer', background: 'white', padding: '10px 16px', borderRadius: 8, border: '1px solid #ddd' }}>
          <input 
            type="checkbox" 
            checked={hideSoldOut} 
            onChange={e => setHideSoldOut(e.target.checked)} 
            style={{ width: 16, height: 16, accentColor: '#ea580c' }}
          />
          ซ่อนสินค้าที่ขายหมดแล้ว
        </label>
      </div>

      {/* Products List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filteredProducts.map(p => {
          const imgUrl = (p.images && p.images[0]) ? p.images[0] : '/placeholder.png';
          
          return (
            <div key={p.id} style={{ background: 'white', borderRadius: 12, padding: 12, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', gap: 12 }}>
              
              <div style={{ display: 'flex', gap: 12 }}>
                <div 
                  onClick={() => {
                    if (p.images && p.images.length > 0) {
                      setPreviewImages(p.images);
                    } else if (p.shopee_images && p.shopee_images.length > 0) {
                      // fallback for June which uses shopee_images sometimes
                      setPreviewImages(p.shopee_images);
                    }
                  }}
                  style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden', position: 'relative', flexShrink: 0, border: '1px solid #f0f0f0', background: '#fafafa', cursor: 'pointer' }}
                >
                  <Image src={imgUrl} alt={p.name} fill style={{ objectFit: 'cover' }} unoptimized />
                  {((p.images && p.images.length > 1) || (p.shopee_images && p.shopee_images.length > 1)) && (
                    <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 10, padding: '2px 4px', borderTopLeftRadius: 4 }}>
                      +{(p.images ? p.images.length : (p.shopee_images ? p.shopee_images.length : 1)) - 1}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 'bold', margin: '0 0 6px 0', color: '#111', lineHeight: 1.4 }}>{p.name}</h3>
                    <span style={{ fontSize: 13, fontWeight: 'bold', color: '#ea580c', whiteSpace: 'nowrap', marginLeft: 8 }}>฿{p.price?.toLocaleString() || '0'}</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (p.images && p.images.length > 0) {
                        setPreviewImages(p.images);
                      } else if (p.shopee_images && p.shopee_images.length > 0) {
                        setPreviewImages(p.shopee_images);
                      }
                    }}
                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: 6, fontSize: 11, color: '#475569', cursor: 'pointer', marginBottom: 8, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  >
                    🔍 ดูรูปภาพทั้งหมด
                  </button>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                    {p.name_shopee && <span style={{ fontSize: 10, background: '#fef08a', color: '#854d0e', padding: '2px 6px', borderRadius: 4, fontWeight: 'bold' }}>✓ SHOPEE</span>}
                    {p.mark_fb && <span style={{ fontSize: 10, background: '#dbeafe', color: '#1e40af', padding: '2px 6px', borderRadius: 4, fontWeight: 'bold' }}>✓ FACEBOOK</span>}
                    {p.mark_nexgen && <span style={{ fontSize: 10, background: '#fce7f3', color: '#9d174d', padding: '2px 6px', borderRadius: 4, fontWeight: 'bold' }}>✓ NEXGEN</span>}
                    {p.mark_tt && <span style={{ fontSize: 10, background: '#f3f4f6', color: '#111827', padding: '2px 6px', borderRadius: 4, fontWeight: 'bold' }}>✓ TIKTOK</span>}
                    {p.mark_ennxo && <span style={{ fontSize: 10, background: '#e0e7ff', color: '#3730a3', padding: '2px 6px', borderRadius: 4, fontWeight: 'bold' }}>✓ ENNXO</span>}
                  </div>
                  {(p.stock <= 0 || p.mark_location?.toLowerCase() === 'sold') && <div style={{ color: '#dc2626', fontSize: 12, fontWeight: 'bold' }}>❌ ขายแล้ว / หมด</div>}
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
                  <button 
                    onClick={() => {
                      setProducts(prev => prev.map(x => x.id === p.id ? { ...x, mark_location: 'Sold' } : x));
                      handleUpdate(p.id, 'mark_location', 'Sold');
                    }}
                    style={{ 
                      padding: '6px 12px', 
                      fontSize: 12, 
                      fontWeight: 'bold', 
                      background: p.mark_location === 'Sold' ? '#ef4444' : '#f1f5f9', 
                      color: p.mark_location === 'Sold' ? 'white' : '#64748b', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: 6, 
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Sold
                  </button>
                </div>

                {/* Platform Checkboxes */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginTop: 4 }}>
                  <span style={{ fontSize: 12, color: '#666', whiteSpace: 'nowrap' }}>ลงขายที่:</span>
                  <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="checkbox" checked={!!p.mark_fb} onChange={e => handleUpdate(p.id, 'mark_fb', e.target.checked)} />
                    FB
                  </label>
                  <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="checkbox" checked={!!p.mark_nexgen} onChange={e => handleUpdate(p.id, 'mark_nexgen', e.target.checked)} />
                    NEXGEN
                  </label>
                  <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="checkbox" checked={!!p.mark_tt} onChange={e => handleUpdate(p.id, 'mark_tt', e.target.checked)} />
                    TIKTOK
                  </label>
                  <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="checkbox" checked={!!p.mark_ennxo} onChange={e => handleUpdate(p.id, 'mark_ennxo', e.target.checked)} />
                    ENNXO
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

      {/* Image Preview Modal */}
      {previewImages && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20, overflowY: 'auto' }}
          onClick={() => setPreviewImages(null)}
        >
          <div style={{ width: '100%', maxWidth: 600, display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
            <button onClick={() => setPreviewImages(null)} style={{ background: 'none', border: 'none', color: 'white', fontSize: 24, cursor: 'pointer', fontWeight: 'bold' }}>✕ ปิด</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 600 }} onClick={e => e.stopPropagation()}>
            {previewImages.map((src, i) => (
              <img key={i} src={src} alt={`preview ${i}`} style={{ width: '100%', height: 'auto', borderRadius: 8, objectFit: 'contain', background: 'white' }} />
            ))}
          </div>
        </div>
      )}
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
