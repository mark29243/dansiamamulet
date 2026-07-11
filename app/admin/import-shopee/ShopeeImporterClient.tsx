'use client';

import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

export default function ShopeeImporterClient() {
  const [productsMap, setProductsMap] = useState<Record<string, any>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [targetStore, setTargetStore] = useState<'shopee1' | 'shopee2' | 'june'>('shopee1');
  const [isClearing, setIsClearing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsProcessing(true);
    const newMap = { ...productsMap };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      if (json.length < 2) continue; // skip empty

      // Find headers (usually row 0 or 1, let's assume row 0 for basic info, maybe row 1 or 2 for images? Shopee has multiple header rows)
      // Shopee often has 1 or 2 header rows. We need to find the row that has 'รหัสสินค้า' or 'ชื่อสินค้า'
      let headerRowIndex = 0;
      for (let r = 0; r < Math.min(5, json.length); r++) {
        const row = json[r];
        if (row.includes('รหัสสินค้า') || row.includes('ชื่อสินค้า')) {
          headerRowIndex = r;
          break;
        }
      }

      const headers = json[headerRowIndex] || [];
      const idIdx = headers.indexOf('รหัสสินค้า');
      const nameIdx = headers.indexOf('ชื่อสินค้า');
      const priceIdx = headers.indexOf('ราคา');
      const stockIdx = headers.indexOf('คลัง');
      const getHeaderIdx = (thPattern: string, enPattern: string, altThPattern = '') => headers.findIndex((h: any) => {
        if (typeof h !== 'string') return false;
        const lower = h.toLowerCase();
        return lower.includes(thPattern) || lower.includes(enPattern) || (altThPattern && lower.includes(altThPattern));
      });

      const coverIdx = getHeaderIdx('ภาพปก', 'cover image', 'รูปภาพหน้าปก');
      const img1Idx = getHeaderIdx('รูปภาพ 1', 'image 1');
      const img2Idx = getHeaderIdx('รูปภาพ 2', 'image 2');
      const img3Idx = getHeaderIdx('รูปภาพ 3', 'image 3');
      const img4Idx = getHeaderIdx('รูปภาพ 4', 'image 4');
      const img5Idx = getHeaderIdx('รูปภาพ 5', 'image 5');
      const img6Idx = getHeaderIdx('รูปภาพ 6', 'image 6');
      const img7Idx = getHeaderIdx('รูปภาพ 7', 'image 7');
      const img8Idx = getHeaderIdx('รูปภาพ 8', 'image 8');

      // Process rows below headers
      for (let r = headerRowIndex + 1; r < json.length; r++) {
        const row = json[r];
        if (!row || row.length === 0) continue;
        
        let id = idIdx >= 0 ? String(row[idIdx] || '').trim() : '';
        let name = nameIdx >= 0 ? String(row[nameIdx] || '').trim() : '';
        
        // If we don't have name, we can't really do much unless we have ID and map is already populated
        if (!name && !id) continue;
        const key = id || name; // Use ID as primary key, or name if ID is missing

        if (!newMap[key]) {
          newMap[key] = { shopee_id: id, name: name, images: [] };
        }

        if (name) newMap[key].name = name;
        if (priceIdx >= 0 && row[priceIdx]) newMap[key].price = row[priceIdx];
        if (stockIdx >= 0 && row[stockIdx]) newMap[key].stock = row[stockIdx];
        
        // Collect Images
        const imgUrls = [];
        if (coverIdx >= 0 && row[coverIdx]) imgUrls.push(row[coverIdx]);
        if (img1Idx >= 0 && row[img1Idx]) imgUrls.push(row[img1Idx]);
        if (img2Idx >= 0 && row[img2Idx]) imgUrls.push(row[img2Idx]);
        if (img3Idx >= 0 && row[img3Idx]) imgUrls.push(row[img3Idx]);
        if (img4Idx >= 0 && row[img4Idx]) imgUrls.push(row[img4Idx]);
        if (img5Idx >= 0 && row[img5Idx]) imgUrls.push(row[img5Idx]);
        if (img6Idx >= 0 && row[img6Idx]) imgUrls.push(row[img6Idx]);
        if (img7Idx >= 0 && row[img7Idx]) imgUrls.push(row[img7Idx]);
        if (img8Idx >= 0 && row[img8Idx]) imgUrls.push(row[img8Idx]);

        if (imgUrls.length > 0) {
          // Merge images (some URLs might be comma separated or multiline, but Shopee usually puts 1 URL per column)
          newMap[key].shopee_images = imgUrls;
        }
      }
    }

    setProductsMap(newMap);
    setIsProcessing(false);
    
    // Reset file input so user can upload more
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const productsList = Object.values(productsMap);

  const handleClearAll = async () => {
    if (!confirm('⚠️ คำเตือน: คุณต้องการล้าง "สินค้าทั้งหมด" ออกจากระบบใช่หรือไม่?\n\n(ทำเพื่อรีเซ็ตระบบแก้ปัญหาข้อมูลเพี้ยน หลังจากล้างเสร็จแล้ว ให้นำเข้า Shopee 1 และ Shopee 2 ใหม่อีกครั้ง)')) return;
    
    setIsClearing(true);
    try {
      const res = await fetch('/api/admin/clear-products', { method: 'POST' });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      alert('ล้างข้อมูลทั้งหมดเรียบร้อยแล้ว! กรุณานำเข้าไฟล์ Excel ใหม่ครับ');
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsClearing(false);
    }
  };

  const handleStartImport = async () => {
    const storeName = targetStore === 'shopee1' ? 'Shopee 1' : targetStore === 'shopee2' ? 'Shopee 2' : 'ร้าน June';
    if (!confirm(`ต้องการนำเข้าข้อมูล ${productsList.length} รายการเข้า ${storeName} ใช่ไหม?\nขั้นตอนนี้อาจใช้เวลาหลายนาที`)) return;

    setIsProcessing(true);
    setTotal(productsList.length);
    setProgress(0);
    setSuccessCount(0);
    setErrorCount(0);

    const BATCH_SIZE = 5; // process 5 products per request
    
    let currentSuccess = 0;
    let currentError = 0;

    for (let i = 0; i < productsList.length; i += BATCH_SIZE) {
      const batch = productsList.slice(i, i + BATCH_SIZE);
      
      try {
        const res = await fetch('/api/admin/import-shopee/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ products: batch, targetStore })
        });
        
        const data = await res.json();
        if (data.ok) {
          currentSuccess += data.results.success;
          currentError += data.results.error;
        } else {
          currentError += batch.length;
          console.error(data.error);
        }
      } catch (e) {
        console.error(e);
        currentError += batch.length;
      }
      
      setSuccessCount(currentSuccess);
      setErrorCount(currentError);
      setProgress(Math.min(i + BATCH_SIZE, productsList.length));
    }

    setIsProcessing(false);
    alert('นำเข้าข้อมูลเสร็จสิ้น!');
  };

  const hasProducts = productsList.length > 0;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>อัปโหลดข้อมูลจาก Shopee (Shopee Importer)</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>โยนไฟล์ Excel ที่โหลดจาก Shopee (.xls, .xlsx) มาใส่ที่นี่ ระบบจะดึงรูปลง Cloudflare R2 ให้ และอัปเดตราคา/สต็อกในเว็บให้ครับ (โยนทีละไฟล์ หรือคลุมดำลากมาทีเดียว 4 ไฟล์เลยก็ได้)</p>

      <div style={{ border: '2px dashed #ff7300', borderRadius: 12, padding: 40, textAlign: 'center', backgroundColor: '#fff7f0', marginBottom: 24 }}>
        <input 
          type="file" 
          multiple 
          accept=".xls,.xlsx" 
          onChange={handleFileUpload} 
          disabled={isProcessing}
          ref={fileInputRef}
          style={{ display: 'none' }}
          id="file-upload"
        />

        <div style={{ marginBottom: 20, padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', textAlign: 'left' }}>
          <h3 style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 12, color: '#334155' }}>เลือกร้านที่จะนำเข้า:</h3>
          <div style={{ display: 'flex', gap: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 15 }}>
              <input 
                type="radio" 
                name="store" 
                value="shopee1" 
                checked={targetStore === 'shopee1'} 
                onChange={() => setTargetStore('shopee1')}
                style={{ width: 18, height: 18, accentColor: '#ea580c' }}
              />
              🟠 Shopee 1 (ร้านหลัก)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 15 }}>
              <input 
                type="radio" 
                name="store" 
                value="shopee2" 
                checked={targetStore === 'shopee2'} 
                onChange={() => setTargetStore('shopee2')}
                style={{ width: 18, height: 18, accentColor: '#ea580c' }}
              />
              🟡 Shopee 2 (ร้านรอง)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 15 }}>
              <input 
                type="radio" 
                name="store" 
                value="june" 
                checked={targetStore === 'june'} 
                onChange={() => setTargetStore('june')}
                style={{ width: 18, height: 18, accentColor: '#ea580c' }}
              />
              🟢 ร้านของ June
            </label>
          </div>
        </div>

        <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'inline-block' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📤</div>
          <div style={{ fontSize: 18, fontWeight: 'bold', color: '#ff7300', marginBottom: 8 }}>คลิกเพื่อเลือกไฟล์ Excel หรือลากไฟล์มาวางตรงนี้</div>
          <div style={{ fontSize: 14, color: '#666' }}>รองรับไฟล์ "แก้ไขสินค้า", "ข้อมูลการจัดส่ง", "ข้อมูลรูปภาพ" ฯลฯ</div>
        </label>
      </div>

      {hasProducts && (
        <div style={{ border: '1px solid #eaeaea', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 18, fontWeight: 'bold', margin: 0 }}>พรีวิวข้อมูลที่อ่านได้ ({productsList.length} รายการ)</h3>
            <button 
              onClick={() => setProductsMap({})}
              style={{ background: 'transparent', border: '1px solid #ddd', padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}
            >
              ล้างข้อมูล
            </button>
          </div>
          
          <div style={{ maxHeight: 200, overflowY: 'auto', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', paddingTop: 8, paddingBottom: 8, fontSize: 14 }}>
            {productsList.slice(0, 50).map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '4px 0', borderBottom: '1px dashed #f0f0f0' }}>
                <span style={{ width: 100, color: '#888' }}>{p.shopee_id}</span>
                <span style={{ flex: 1, fontWeight: 'bold' }}>{p.name}</span>
                {p.price && <span style={{ width: 60, color: '#059669' }}>฿{p.price}</span>}
                {p.shopee_images?.length > 0 && <span style={{ width: 80, color: '#3b82f6' }}>{p.shopee_images.length} รูป</span>}
              </div>
            ))}
            {productsList.length > 50 && <div style={{ textAlign: 'center', color: '#888', marginTop: 8 }}>... และอีก {productsList.length - 50} รายการ</div>}
          </div>

          <div style={{ marginTop: 16 }}>
            {progress > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 4 }}>
                  <span>กำลังนำเข้าข้อมูล... ({progress}/{total})</span>
                  <span>{Math.round((progress/total)*100)}%</span>
                </div>
                <div style={{ width: '100%', height: 8, background: '#eaeaea', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${(progress/total)*100}%`, height: '100%', background: '#ff7300', transition: 'width 0.3s' }}></div>
                </div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
                  ✅ สำเร็จ: <span style={{ color: '#059669', fontWeight: 'bold' }}>{successCount}</span> | 
                  ❌ ผิดพลาด: <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{errorCount}</span>
                </div>
              </div>
            )}

            <button 
              onClick={handleStartImport}
              disabled={isProcessing || isClearing}
              style={{ 
                width: '100%', 
                padding: '12px', 
                background: isProcessing || isClearing ? '#ccc' : '#ff7300', 
                color: 'white', 
                border: 'none', 
                borderRadius: 8, 
                fontWeight: 'bold', 
                fontSize: 16,
                cursor: isProcessing || isClearing ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing && progress === 0 ? 'กำลังเตรียมข้อมูล...' : isProcessing ? 'กำลังทำงาน...' : '🚀 เริ่มนำเข้าข้อมูลเข้าสู่ระบบ'}
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
        <button 
          onClick={handleClearAll} 
          disabled={isClearing || isProcessing}
          style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, fontSize: 13, cursor: isClearing || isProcessing ? 'not-allowed' : 'pointer' }}
        >
          {isClearing ? 'กำลังล้างข้อมูล...' : '⚠️ ล้างฐานข้อมูลทั้งหมด (Reset System)'}
        </button>
        <p style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>
          *กดปุ่มนี้ถ้าตัวเลขสินค้าเพี้ยน ระบบจะล้างข้อมูลเก่าทิ้งทั้งหมดเพื่อให้คุณนำเข้าไฟล์ Excel ใหม่ตั้งแต่ต้น
        </p>
      </div>
    </div>
  );
}
