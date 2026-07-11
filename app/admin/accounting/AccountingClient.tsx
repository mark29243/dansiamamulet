'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type AccountingRecord = {
  id: string;
  created_at: string;
  date: string;
  type: 'INCOME' | 'EXPENSE' | 'SALE';
  category: string;
  product_name: string;
  amount: number;
  cost: number;
  description: string;
  image_url: string;
  order_id: string;
};

export default function AccountingClient() {
  const [records, setRecords] = useState<AccountingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState<'INCOME' | 'EXPENSE' | 'SALE'>('INCOME');
  const [addDate, setAddDate] = useState(new Date().toISOString().split('T')[0]);
  const [addCategory, setAddCategory] = useState('');
  const [addProductName, setAddProductName] = useState('');
  const [addAmount, setAddAmount] = useState('');
  const [addCost, setAddCost] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addImageUrl, setAddImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [editingCostId, setEditingCostId] = useState<string | null>(null);
  const [editingCostValue, setEditingCostValue] = useState('');

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/accounting?month=${currentMonth}&year=${currentYear}`);
      const data = await res.json();
      if (res.ok) {
        setRecords(data || []);
      } else {
        alert('Failed to fetch records: ' + data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [currentMonth, currentYear]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setAddImageUrl(data.url);
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/accounting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: addType,
          date: addDate,
          category: addCategory,
          product_name: addType === 'SALE' ? addProductName : null,
          amount: addAmount,
          cost: addType === 'SALE' ? addCost : 0,
          description: addDescription,
          image_url: addImageUrl
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setShowAddModal(false);
      resetForm();
      fetchRecords();
    } catch (err: any) {
      alert('Error saving record: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ยืนยันการลบรายการนี้?')) return;
    try {
      const res = await fetch(`/api/admin/accounting/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRecords(prev => prev.filter(r => r.id !== id));
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCost = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/accounting/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cost: editingCostValue })
      });
      if (res.ok) {
        setRecords(prev => prev.map(r => r.id === id ? { ...r, cost: parseFloat(editingCostValue) || 0 } : r));
        setEditingCostId(null);
      } else {
        alert('Failed to update cost');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setAddType('INCOME');
    setAddDate(new Date().toISOString().split('T')[0]);
    setAddCategory('');
    setAddProductName('');
    setAddAmount('');
    setAddCost('');
    setAddDescription('');
    setAddImageUrl('');
  };

  // Calculations
  const totalIncome = records.filter(r => r.type === 'INCOME' || r.type === 'SALE').reduce((sum, r) => sum + Number(r.amount), 0);
  const totalExpense = records.filter(r => r.type === 'EXPENSE').reduce((sum, r) => sum + Number(r.amount), 0) + 
                       records.filter(r => r.type === 'SALE').reduce((sum, r) => sum + Number(r.cost), 0);
  const netProfit = totalIncome - totalExpense;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' }}>
      
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0, color: '#111' }}>💰 ระบบบัญชี (Accounting)</h1>
          <p style={{ fontSize: 14, color: '#666', margin: '4px 0 0 0' }}>สรุปยอดรายรับ รายจ่าย และกำไรสุทธิ</p>
        </div>
        
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <select 
            value={currentMonth} 
            onChange={e => setCurrentMonth(parseInt(e.target.value))}
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14 }}
          >
            {Array.from({length: 12}, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>เดือน {m}</option>
            ))}
          </select>
          <select 
            value={currentYear} 
            onChange={e => setCurrentYear(parseInt(e.target.value))}
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14 }}
          >
            {[2024, 2025, 2026, 2027].map(y => (
              <option key={y} value={y}>ปี {y}</option>
            ))}
          </select>
          
          <button 
            onClick={() => setShowAddModal(true)}
            style={{ padding: '8px 16px', background: '#059669', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}
          >
            + เพิ่มรายการ
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 32 }}>
        <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>รายรับรวม (Income + Sales)</div>
          <div style={{ fontSize: 28, fontWeight: 'bold', color: '#111827' }}>฿{totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>รายจ่ายรวม (Expenses + Cost)</div>
          <div style={{ fontSize: 28, fontWeight: 'bold', color: '#111827' }}>฿{totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>กำไรสุทธิ (Net Profit)</div>
          <div style={{ fontSize: 28, fontWeight: 'bold', color: netProfit >= 0 ? '#059669' : '#dc2626' }}>
            {netProfit >= 0 ? '+' : ''}฿{netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: '#111827' }}>รายการบัญชี (Transactions)</h2>
        </div>
        
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#6b7280' }}>กำลังโหลดข้อมูล...</div>
        ) : records.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#6b7280' }}>ยังไม่มีรายการบัญชีในเดือนนี้</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f9fafb', color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>วันที่</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>ประเภท</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>รายละเอียด</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>รายรับ</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>รายจ่าย/ต้นทุน</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>หลักฐาน</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}></th>
                </tr>
              </thead>
              <tbody>
                {records.map(record => (
                  <tr key={record.id} style={{ borderBottom: '1px solid #e5e7eb', background: record.type === 'SALE' && record.cost === 0 ? '#fefce8' : 'white' }}>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{new Date(record.date).toLocaleDateString('th-TH')}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600,
                        background: record.type === 'INCOME' ? '#d1fae5' : record.type === 'EXPENSE' ? '#fee2e2' : '#dbeafe',
                        color: record.type === 'INCOME' ? '#065f46' : record.type === 'EXPENSE' ? '#991b1b' : '#1e40af'
                      }}>
                        {record.type === 'INCOME' ? 'รายรับ' : record.type === 'EXPENSE' ? 'รายจ่าย' : 'ขายสินค้า'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#111827' }}>
                      {record.product_name ? <div style={{ fontWeight: 600 }}>{record.product_name}</div> : null}
                      <div style={{ color: '#6b7280', fontSize: 13 }}>{record.category} {record.description ? `- ${record.description}` : ''}</div>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: (record.type === 'INCOME' || record.type === 'SALE') ? '#059669' : '#d1d5db' }}>
                      {(record.type === 'INCOME' || record.type === 'SALE') ? `+${Number(record.amount).toLocaleString()}` : '-'}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: (record.type === 'EXPENSE' || record.type === 'SALE') ? '#dc2626' : '#d1d5db' }}>
                      {record.type === 'EXPENSE' ? `-${Number(record.amount).toLocaleString()}` : 
                       record.type === 'SALE' ? (
                         editingCostId === record.id ? (
                           <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                             <input 
                               type="number" 
                               value={editingCostValue} 
                               onChange={e => setEditingCostValue(e.target.value)}
                               style={{ width: 80, padding: 4, border: '1px solid #ddd', borderRadius: 4, textAlign: 'right' }}
                               autoFocus
                             />
                             <button onClick={() => handleUpdateCost(record.id)} style={{ background: '#059669', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px', cursor: 'pointer' }}>✓</button>
                             <button onClick={() => setEditingCostId(null)} style={{ background: '#9ca3af', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px', cursor: 'pointer' }}>✕</button>
                           </div>
                         ) : (
                           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                             <span>{record.cost > 0 ? `-${Number(record.cost).toLocaleString()}` : (
                               <span style={{ color: '#d97706', fontSize: 12, background: '#fef3c7', padding: '2px 6px', borderRadius: 4 }}>กรอกต้นทุน</span>
                             )}</span>
                             <button 
                               onClick={() => { setEditingCostId(record.id); setEditingCostValue(record.cost?.toString() || ''); }}
                               style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 12, textDecoration: 'underline' }}
                             >
                               ✏️
                             </button>
                           </div>
                         )
                       ) : '-'}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      {record.image_url ? (
                        <a href={record.image_url} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                          ดูสลิป
                        </a>
                      ) : '-'}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button onClick={() => handleDelete(record.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 16 }} title="ลบรายการ">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: 'white', padding: 24, borderRadius: 16, width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: 20, fontWeight: 'bold', margin: '0 0 20px 0', color: '#111' }}>เพิ่มรายการบัญชี</h2>
            
            <form onSubmit={handleSaveRecord} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              
              <div style={{ display: 'flex', gap: 12 }}>
                {(['INCOME', 'EXPENSE', 'SALE'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAddType(type)}
                    style={{
                      flex: 1, padding: 10, borderRadius: 8, fontWeight: 'bold', border: '2px solid',
                      background: addType === type ? (type === 'INCOME' ? '#d1fae5' : type === 'EXPENSE' ? '#fee2e2' : '#dbeafe') : 'white',
                      borderColor: addType === type ? (type === 'INCOME' ? '#10b981' : type === 'EXPENSE' ? '#ef4444' : '#3b82f6') : '#e5e7eb',
                      color: addType === type ? (type === 'INCOME' ? '#065f46' : type === 'EXPENSE' ? '#991b1b' : '#1e40af') : '#6b7280',
                      cursor: 'pointer'
                    }}
                  >
                    {type === 'INCOME' ? 'รายรับ' : type === 'EXPENSE' ? 'รายจ่าย' : 'ขายสินค้า'}
                  </button>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>วันที่</label>
                <input type="date" value={addDate} onChange={e => setAddDate(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db' }} />
              </div>

              {addType === 'SALE' && (
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>ชื่อสินค้า / พระที่ขาย</label>
                  <input type="text" value={addProductName} onChange={e => setAddProductName(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db' }} placeholder="เช่น เหรียญหลวงพ่อรวย..." />
                </div>
              )}

              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>{addType === 'SALE' ? 'ราคาขาย (รายรับ)' : 'จำนวนเงิน'}</label>
                  <input type="number" value={addAmount} onChange={e => setAddAmount(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db' }} placeholder="0.00" />
                </div>
                {addType === 'SALE' && (
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>ต้นทุนพระ (รายจ่าย)</label>
                    <input type="number" value={addCost} onChange={e => setAddCost(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db' }} placeholder="0.00 (ใส่ทีหลังได้)" />
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>หมวดหมู่</label>
                <input type="text" value={addCategory} onChange={e => setAddCategory(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db' }} placeholder="เช่น ค่าขนส่ง, ค่าโฆษณา, ค่ากล่อง..." />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>รายละเอียดเพิ่มเติม (ถ้ามี)</label>
                <textarea value={addDescription} onChange={e => setAddDescription(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', minHeight: 60 }} placeholder="..." />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>แนบรูปภาพ/สลิป (ถ้ามี)</label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {addImageUrl && (
                    <div style={{ width: 60, height: 60, borderRadius: 8, overflow: 'hidden', position: 'relative', border: '1px solid #ddd' }}>
                      <Image src={addImageUrl} alt="slip" fill style={{ objectFit: 'cover' }} unoptimized />
                    </div>
                  )}
                  <label style={{ padding: '8px 16px', background: '#f3f4f6', border: '1px dashed #9ca3af', borderRadius: 8, cursor: 'pointer', fontSize: 13, color: '#4b5563', fontWeight: 600 }}>
                    {isUploading ? 'Uploading...' : 'เลือกรูปภาพ'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} style={{ display: 'none' }} />
                  </label>
                  {addImageUrl && (
                    <button type="button" onClick={() => setAddImageUrl('')} style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>ลบรูป</button>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: 12, background: '#f3f4f6', color: '#4b5563', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>
                  ยกเลิก
                </button>
                <button type="submit" disabled={isSaving} style={{ flex: 1, padding: 12, background: '#111827', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: isSaving ? 'not-allowed' : 'pointer' }}>
                  {isSaving ? 'กำลังบันทึก...' : 'บันทึกรายการ'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
