'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  fee: number;
  shipping: number;
  description: string;
  image_url: string;
  order_id: string;
};

const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const AVAILABLE_YEARS = [2024, 2025, 2026, 2027];

export default function AccountingClient() {
  const [records, setRecords] = useState<AccountingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  // View Mode: 'dateRange' (เลือกช่วงวัน) | 'range' (ช่วงหลายเดือน) | 'single' (รายเดือน)
  const [viewMode, setViewMode] = useState<'dateRange' | 'range' | 'single'>('dateRange');

  // Single Month State
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  // Range State (จากเดือน... ถึงเดือน...) - Default to 4 months back to current month
  const [fromMonth, setFromMonth] = useState(Math.max(1, now.getMonth() - 2));
  const [fromYear, setFromYear] = useState(now.getFullYear());
  const [toMonth, setToMonth] = useState(now.getMonth() + 1);
  const [toYear, setToYear] = useState(now.getFullYear());

  // Date Range State (จากวันที่... ถึงวันที่...) - Default: วันที่ 1 ของเดือนปัจจุบัน ถึง วันนี้
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const firstOfMonthStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
  }, []);
  const [startDate, setStartDate] = useState(firstOfMonthStr);
  const [endDate, setEndDate] = useState(todayStr);

  const formatThaiDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const mNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
      return `${d} ${mNames[m - 1]} ${y}`;
    } catch {
      return dateStr;
    }
  };

  const dayCount = useMemo(() => {
    if (viewMode !== 'dateRange' || !startDate || !endDate) return 0;
    try {
      const s = new Date(startDate).getTime();
      const e = new Date(endDate).getTime();
      const diff = Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(1, diff);
    } catch {
      return 1;
    }
  }, [viewMode, startDate, endDate]);

  // In-table Filter State
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'SALE' | 'INCOME' | 'EXPENSE'>('ALL');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('ALL'); // 'ALL' or 'YYYY-MM'
  const [searchQuery, setSearchQuery] = useState('');

  // Add / Edit Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState<'INCOME' | 'EXPENSE' | 'SALE'>('INCOME');
  const [addDate, setAddDate] = useState(new Date().toISOString().split('T')[0]);
  const [addCategory, setAddCategory] = useState('');
  const [addProductName, setAddProductName] = useState('');
  const [addAmount, setAddAmount] = useState('');
  const [addCost, setAddCost] = useState('');
  const [addFee, setAddFee] = useState('');
  const [addShipping, setAddShipping] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addImageUrl, setAddImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // In-line editing
  const [editingCostId, setEditingCostId] = useState<string | null>(null);
  const [editingCostValue, setEditingCostValue] = useState('');
  const [editingFeeId, setEditingFeeId] = useState<string | null>(null);
  const [editingFeeValue, setEditingFeeValue] = useState('');
  const [editingShippingId, setEditingShippingId] = useState<string | null>(null);
  const [editingShippingValue, setEditingShippingValue] = useState('');

  // Fetch records
  const fetchRecords = async () => {
    setLoading(true);
    try {
      let url = '/api/admin/accounting';
      if (viewMode === 'dateRange') {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      } else if (viewMode === 'single') {
        url += `?month=${currentMonth}&year=${currentYear}`;
      } else {
        url += `?fromMonth=${fromMonth}&fromYear=${fromYear}&toMonth=${toMonth}&toYear=${toYear}`;
      }

      const res = await fetch(url);
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
    setSelectedMonthFilter('ALL');
  }, [viewMode, startDate, endDate, currentMonth, currentYear, fromMonth, fromYear, toMonth, toYear]);

  // Quick Presets
  const applyPreset = (preset: 'TODAY' | 'LAST_7_DAYS' | 'LAST_30_DAYS' | 'THIS_MONTH' | 'LAST_MONTH' | 'LAST_3_MONTHS' | 'LAST_6_MONTHS' | 'YEAR_2026' | 'YEAR_2025') => {
    const d = new Date();
    const today = d.toISOString().split('T')[0];

    const formatDate = (date: Date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    if (preset === 'TODAY') {
      setViewMode('dateRange');
      setStartDate(today);
      setEndDate(today);
    } else if (preset === 'LAST_7_DAYS') {
      setViewMode('dateRange');
      const past7 = new Date();
      past7.setDate(past7.getDate() - 6);
      setStartDate(formatDate(past7));
      setEndDate(today);
    } else if (preset === 'LAST_30_DAYS') {
      setViewMode('dateRange');
      const past30 = new Date();
      past30.setDate(past30.getDate() - 29);
      setStartDate(formatDate(past30));
      setEndDate(today);
    } else if (preset === 'THIS_MONTH') {
      setViewMode('dateRange');
      const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
      setStartDate(formatDate(firstDay));
      setEndDate(today);
      setCurrentMonth(d.getMonth() + 1);
      setCurrentYear(d.getFullYear());
    } else if (preset === 'LAST_MONTH') {
      setViewMode('dateRange');
      const firstDayLastMonth = new Date(d.getFullYear(), d.getMonth() - 1, 1);
      const lastDayLastMonth = new Date(d.getFullYear(), d.getMonth(), 0);
      setStartDate(formatDate(firstDayLastMonth));
      setEndDate(formatDate(lastDayLastMonth));
    } else if (preset === 'LAST_3_MONTHS') {
      setViewMode('range');
      let startM = d.getMonth() + 1 - 2;
      let startY = d.getFullYear();
      if (startM <= 0) {
        startM += 12;
        startY -= 1;
      }
      setFromMonth(startM);
      setFromYear(startY);
      setToMonth(d.getMonth() + 1);
      setToYear(d.getFullYear());
    } else if (preset === 'LAST_6_MONTHS') {
      setViewMode('range');
      let startM = d.getMonth() + 1 - 5;
      let startY = d.getFullYear();
      if (startM <= 0) {
        startM += 12;
        startY -= 1;
      }
      setFromMonth(startM);
      setFromYear(startY);
      setToMonth(d.getMonth() + 1);
      setToYear(d.getFullYear());
    } else if (preset === 'YEAR_2026') {
      setViewMode('range');
      setFromMonth(1);
      setFromYear(2026);
      setToMonth(12);
      setToYear(2026);
    } else if (preset === 'YEAR_2025') {
      setViewMode('range');
      setFromMonth(1);
      setFromYear(2025);
      setToMonth(12);
      setToYear(2025);
    }
  };

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
          fee: addType === 'SALE' ? addFee : 0,
          shipping: addType === 'SALE' ? addShipping : 0,
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

  const handleUpdateFee = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/accounting/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fee: editingFeeValue })
      });
      if (res.ok) {
        setRecords(prev => prev.map(r => r.id === id ? { ...r, fee: parseFloat(editingFeeValue) || 0 } : r));
        setEditingFeeId(null);
      } else {
        alert('Failed to update fee');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateShipping = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/accounting/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shipping: editingShippingValue })
      });
      if (res.ok) {
        setRecords(prev => prev.map(r => r.id === id ? { ...r, shipping: parseFloat(editingShippingValue) || 0 } : r));
        setEditingShippingId(null);
      } else {
        alert('Failed to update shipping');
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
    setAddFee('');
    setAddShipping('');
    setAddDescription('');
    setAddImageUrl('');
  };

  // Calculations for all fetched records
  const totalIncome = records.filter(r => r.type === 'INCOME' || r.type === 'SALE').reduce((sum, r) => sum + Number(r.amount), 0);
  const totalExpense = records.filter(r => r.type === 'EXPENSE').reduce((sum, r) => sum + Number(r.amount), 0) + 
                       records.filter(r => r.type === 'SALE').reduce((sum, r) => sum + Number(r.cost) + Number(r.fee || 0) + Number(r.shipping || 0), 0);
  const netProfit = totalIncome - totalExpense;
  const overallMargin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : '0';

  // Monthly breakdown map
  const monthlyBreakdown = useMemo(() => {
    const map: Record<string, {
      mKey: string;
      label: string;
      income: number;
      cost: number;
      feeShipping: number;
      otherExpense: number;
      totalExpense: number;
      netProfit: number;
      salesCount: number;
      expenseCount: number;
    }> = {};

    for (const r of records) {
      const mKey = (r.date || '').slice(0, 7);
      if (!mKey) continue;
      if (!map[mKey]) {
        const [y, m] = mKey.split('-');
        const monthIndex = parseInt(m) - 1;
        map[mKey] = {
          mKey,
          label: `${THAI_MONTHS[monthIndex]} ${y}`,
          income: 0,
          cost: 0,
          feeShipping: 0,
          otherExpense: 0,
          totalExpense: 0,
          netProfit: 0,
          salesCount: 0,
          expenseCount: 0
        };
      }
      const item = map[mKey];
      if (r.type === 'INCOME' || r.type === 'SALE') {
        item.income += Number(r.amount);
      }
      if (r.type === 'SALE') {
        item.salesCount++;
        item.cost += Number(r.cost || 0);
        item.feeShipping += Number(r.fee || 0) + Number(r.shipping || 0);
      } else if (r.type === 'EXPENSE') {
        item.expenseCount++;
        item.otherExpense += Number(r.amount);
      }
      item.totalExpense = item.cost + item.feeShipping + item.otherExpense;
      item.netProfit = item.income - item.totalExpense;
    }

    return Object.values(map).sort((a, b) => b.mKey.localeCompare(a.mKey));
  }, [records]);

  // Filtered transactions for the table
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      // Filter by type
      if (typeFilter !== 'ALL' && r.type !== typeFilter) return false;
      // Filter by month
      if (selectedMonthFilter !== 'ALL' && !r.date.startsWith(selectedMonthFilter)) return false;
      // Filter by search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (r.product_name || '').toLowerCase().includes(q);
        const matchCat = (r.category || '').toLowerCase().includes(q);
        const matchDesc = (r.description || '').toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchDesc) return false;
      }
      return true;
    });
  }, [records, typeFilter, selectedMonthFilter, searchQuery]);

  // Construct print URL
  const printUrl = viewMode === 'dateRange'
    ? `/admin/accounting/print?startDate=${startDate}&endDate=${endDate}`
    : viewMode === 'single'
    ? `/admin/accounting/print?month=${currentMonth}&year=${currentYear}`
    : `/admin/accounting/print?fromMonth=${fromMonth}&fromYear=${fromYear}&toMonth=${toMonth}&toYear=${toYear}`;

  return (
    <div className="admin-page-container" style={{ maxWidth: 1150, margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0, color: '#111' }}>💰 ระบบบัญชี (Accounting)</h1>
          <p style={{ fontSize: 14, color: '#666', margin: '4px 0 0 0' }}>
            สรุปยอดรายรับ รายจ่าย กำไรสุทธิ เลือกดูตามช่วงวัน (วัน... ถึง วัน...) หรือเลือกหลายเดือนได้ตามต้องการ
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => window.open(printUrl, '_blank')}
            style={{ padding: '8px 16px', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: 8, fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}
          >
            🖨️ พิมพ์รายงาน / PDF
          </button>
          
          <button 
            onClick={() => setShowAddModal(true)}
            style={{ padding: '8px 16px', background: '#059669', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', fontSize: 14 }}
          >
            + เพิ่มรายการ
          </button>
        </div>
      </div>

      {/* Date Filter & Range Picker Bar */}
      <div style={{ background: 'white', padding: '16px 20px', borderRadius: 12, border: '1px solid #e5e7eb', marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        
        {/* Mode Selector Tabs & Quick Presets */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16, borderBottom: '1px solid #f3f4f6', paddingBottom: 12 }}>
          
          {/* View Mode Toggle */}
          <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 8, padding: 3, border: '1px solid #e5e7eb', flexWrap: 'wrap', gap: 4 }}>
            <button
              onClick={() => setViewMode('dateRange')}
              style={{
                padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: viewMode === 'dateRange' ? '#2563eb' : 'transparent',
                color: viewMode === 'dateRange' ? 'white' : '#4b5563',
                boxShadow: viewMode === 'dateRange' ? '0 1px 3px rgba(37,99,235,0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              📆 เลือกช่วงวัน (วัน... ถึง วัน...)
            </button>
            <button
              onClick={() => setViewMode('range')}
              style={{
                padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: viewMode === 'range' ? '#2563eb' : 'transparent',
                color: viewMode === 'range' ? 'white' : '#4b5563',
                boxShadow: viewMode === 'range' ? '0 1px 3px rgba(37,99,235,0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              📅 เลือกช่วงหลายเดือน
            </button>
            <button
              onClick={() => setViewMode('single')}
              style={{
                padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: viewMode === 'single' ? '#2563eb' : 'transparent',
                color: viewMode === 'single' ? 'white' : '#4b5563',
                boxShadow: viewMode === 'single' ? '0 1px 3px rgba(37,99,235,0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              🗓️ ดูรายเดือนเดียว
            </button>
          </div>

          {/* Quick Presets */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#6b7280', marginRight: 4 }}>ทางลัด:</span>
            <button
              onClick={() => applyPreset('TODAY')}
              style={{ padding: '4px 10px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 12, color: '#374151', cursor: 'pointer' }}
            >
              วันนี้
            </button>
            <button
              onClick={() => applyPreset('LAST_7_DAYS')}
              style={{ padding: '4px 10px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 12, color: '#374151', cursor: 'pointer' }}
            >
              ๗ วันล่าสุด
            </button>
            <button
              onClick={() => applyPreset('LAST_30_DAYS')}
              style={{ padding: '4px 10px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 12, color: '#374151', cursor: 'pointer' }}
            >
              ๓๐ วันล่าสุด
            </button>
            <button
              onClick={() => applyPreset('THIS_MONTH')}
              style={{ padding: '4px 10px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 12, color: '#374151', cursor: 'pointer' }}
            >
              เดือนนี้
            </button>
            <button
              onClick={() => applyPreset('LAST_MONTH')}
              style={{ padding: '4px 10px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 12, color: '#374151', cursor: 'pointer' }}
            >
              เดือนที่แล้ว
            </button>
            <button
              onClick={() => applyPreset('LAST_3_MONTHS')}
              style={{ padding: '4px 10px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 12, color: '#374151', cursor: 'pointer' }}
            >
              ๓ เดือนล่าสุด
            </button>
            <button
              onClick={() => applyPreset('YEAR_2026')}
              style={{ padding: '4px 10px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 12, color: '#374151', cursor: 'pointer' }}
            >
              ปี 2026 ทั้งหมด
            </button>
          </div>

        </div>

        {/* Inputs based on Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          
          {viewMode === 'dateRange' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>ตั้งแต่วันที่:</span>
                <input 
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, background: 'white' }}
                />
              </div>

              <span style={{ fontSize: 16, color: '#9ca3af', fontWeight: 'bold' }}>➜</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>ถึงวันที่:</span>
                <input 
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, background: 'white' }}
                />
              </div>

              <div style={{ marginLeft: 8, background: '#eff6ff', color: '#1e40af', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #bfdbfe' }}>
                <span>📌 สรุปยอดช่วง: {formatThaiDate(startDate)} – {formatThaiDate(endDate)}</span>
                <span style={{ background: '#2563eb', color: 'white', padding: '1px 8px', borderRadius: 10, fontSize: 11 }}>
                  {dayCount} วัน
                </span>
              </div>
            </div>
          ) : viewMode === 'range' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>ตั้งแต่เดือน:</span>
                <select 
                  value={fromMonth} 
                  onChange={e => setFromMonth(parseInt(e.target.value))}
                  style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, background: 'white' }}
                >
                  {THAI_MONTHS.map((mName, i) => (
                    <option key={i + 1} value={i + 1}>{mName} (เดือน {i + 1})</option>
                  ))}
                </select>
                <select 
                  value={fromYear} 
                  onChange={e => setFromYear(parseInt(e.target.value))}
                  style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, background: 'white' }}
                >
                  {AVAILABLE_YEARS.map(y => (
                    <option key={y} value={y}>ปี {y}</option>
                  ))}
                </select>
              </div>

              <span style={{ fontSize: 16, color: '#9ca3af', fontWeight: 'bold' }}>➜</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>ถึงเดือน:</span>
                <select 
                  value={toMonth} 
                  onChange={e => setToMonth(parseInt(e.target.value))}
                  style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, background: 'white' }}
                >
                  {THAI_MONTHS.map((mName, i) => (
                    <option key={i + 1} value={i + 1}>{mName} (เดือน {i + 1})</option>
                  ))}
                </select>
                <select 
                  value={toYear} 
                  onChange={e => setToYear(parseInt(e.target.value))}
                  style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, background: 'white' }}
                >
                  {AVAILABLE_YEARS.map(y => (
                    <option key={y} value={y}>ปี {y}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginLeft: 8, background: '#eff6ff', color: '#1e40af', padding: '6px 12px', borderRadius: 20, fontSize: 13, fontWeight: 500 }}>
                📌 สรุปยอด: {THAI_MONTHS[fromMonth - 1]} {fromYear} – {THAI_MONTHS[toMonth - 1]} {toYear}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>เลือกเดือน:</span>
              <select 
                value={currentMonth} 
                onChange={e => setCurrentMonth(parseInt(e.target.value))}
                style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, background: 'white' }}
              >
                {THAI_MONTHS.map((mName, i) => (
                  <option key={i + 1} value={i + 1}>{mName} (เดือน {i + 1})</option>
                ))}
              </select>
              <select 
                value={currentYear} 
                onChange={e => setCurrentYear(parseInt(e.target.value))}
                style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, background: 'white' }}
              >
                {AVAILABLE_YEARS.map(y => (
                  <option key={y} value={y}>ปี {y}</option>
                ))}
              </select>
            </div>
          )}

        </div>

      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>รายรับรวม (Total Revenue)</div>
          <div style={{ fontSize: 26, fontWeight: 'bold', color: '#111827' }}>
            ฿{totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: 12, color: '#059669', marginTop: 4 }}>
            {records.filter(r => r.type === 'SALE' || r.type === 'INCOME').length} รายการรับ
          </div>
        </div>

        <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #ef4444', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>รายจ่ายรวม (Total Expenses)</div>
          <div style={{ fontSize: 26, fontWeight: 'bold', color: '#111827' }}>
            ฿{totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>
            ต้นทุนพระ + ค่าส่ง/ธรรมเนียม + รายจ่าย
          </div>
        </div>

        <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>กำไรสุทธิ (Net Profit)</div>
          <div style={{ fontSize: 26, fontWeight: 'bold', color: netProfit >= 0 ? '#059669' : '#dc2626' }}>
            {netProfit >= 0 ? '+' : ''}฿{netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: 12, color: '#4b5563', marginTop: 4 }}>
            อัตรากำไร (Margin): <strong>{overallMargin}%</strong>
          </div>
        </div>

        {viewMode === 'dateRange' && dayCount > 1 ? (
          <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #8b5cf6', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>เฉลี่ยต่อวัน (รวม {dayCount} วัน)</div>
            <div style={{ fontSize: 26, fontWeight: 'bold', color: '#111827' }}>
              ฿{(netProfit / dayCount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
              ยอดขายเฉลี่ย ฿{(totalIncome / dayCount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} / วัน
            </div>
          </div>
        ) : monthlyBreakdown.length > 1 ? (
          <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #8b5cf6', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>เฉลี่ยต่อเดือน ({monthlyBreakdown.length} เดือน)</div>
            <div style={{ fontSize: 26, fontWeight: 'bold', color: '#111827' }}>
              ฿{(netProfit / monthlyBreakdown.length).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
              ยอดขายเฉลี่ย ฿{(totalIncome / monthlyBreakdown.length).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} / เดือน
            </div>
          </div>
        ) : null}
      </div>

      {/* Multi-Month Breakdown Table (เมื่อมีข้อมูลมากกว่า 1 เดือน) */}
      {monthlyBreakdown.length > 1 && (
        <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', marginBottom: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
                📊 ตารางสรุปยอดแยกตามรายเดือน (Monthly Summary Breakdown)
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: 13, color: '#64748b' }}>
                คลิกที่แถวเพื่อกรองดูเฉพาะรายการในเดือนนั้นๆ
              </p>
            </div>
            {selectedMonthFilter !== 'ALL' && (
              <button
                onClick={() => setSelectedMonthFilter('ALL')}
                style={{ padding: '4px 10px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
              >
                ✕ แสดงทั้งหมดทุกเดือน
              </button>
            )}
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13, minWidth: 750 }}>
              <thead>
                <tr style={{ background: '#f1f5f9', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '10px 16px', fontWeight: 600 }}>เดือน / ปี</th>
                  <th style={{ padding: '10px 16px', fontWeight: 600, textAlign: 'center' }}>จำนวนรายการ</th>
                  <th style={{ padding: '10px 16px', fontWeight: 600, textAlign: 'right' }}>รายรับรวม (฿)</th>
                  <th style={{ padding: '10px 16px', fontWeight: 600, textAlign: 'right' }}>ต้นทุนพระ (฿)</th>
                  <th style={{ padding: '10px 16px', fontWeight: 600, textAlign: 'right' }}>ค่าส่ง/ธรรมเนียม</th>
                  <th style={{ padding: '10px 16px', fontWeight: 600, textAlign: 'right' }}>รายจ่ายอื่น (฿)</th>
                  <th style={{ padding: '10px 16px', fontWeight: 600, textAlign: 'right' }}>รวมรายจ่าย (฿)</th>
                  <th style={{ padding: '10px 16px', fontWeight: 600, textAlign: 'right' }}>กำไรสุทธิ (฿)</th>
                  <th style={{ padding: '10px 16px', fontWeight: 600, textAlign: 'center' }}>Margin</th>
                </tr>
              </thead>
              <tbody>
                {monthlyBreakdown.map(item => {
                  const isSelected = selectedMonthFilter === item.mKey;
                  const marginVal = item.income > 0 ? ((item.netProfit / item.income) * 100).toFixed(1) : '0';
                  return (
                    <tr 
                      key={item.mKey}
                      onClick={() => setSelectedMonthFilter(prev => prev === item.mKey ? 'ALL' : item.mKey)}
                      style={{ 
                        borderBottom: '1px solid #f1f5f9', 
                        cursor: 'pointer',
                        background: isSelected ? '#eff6ff' : 'white',
                        transition: 'background 0.15s ease'
                      }}
                      title="คลิกเพื่อกรองดูรายการเฉพาะเดือนนี้"
                    >
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: isSelected ? '#1d4ed8' : '#1e293b' }}>
                        {item.label} {isSelected && <span style={{ fontSize: 11, background: '#2563eb', color: 'white', padding: '1px 6px', borderRadius: 4, marginLeft: 6 }}>เลือกอยู่</span>}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#64748b' }}>
                        ขาย {item.salesCount} / จ่าย {item.expenseCount}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: item.income > 0 ? '#059669' : '#9ca3af' }}>
                        ฿{item.income.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: item.cost > 0 ? '#dc2626' : '#9ca3af' }}>
                        {item.cost > 0 ? `฿${item.cost.toLocaleString()}` : '-'}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: item.feeShipping > 0 ? '#dc2626' : '#9ca3af' }}>
                        {item.feeShipping > 0 ? `฿${item.feeShipping.toLocaleString()}` : '-'}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: item.otherExpense > 0 ? '#dc2626' : '#9ca3af' }}>
                        {item.otherExpense > 0 ? `฿${item.otherExpense.toLocaleString()}` : '-'}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: item.totalExpense > 0 ? '#dc2626' : '#9ca3af' }}>
                        ฿{item.totalExpense.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: item.netProfit >= 0 ? '#059669' : '#dc2626' }}>
                        {item.netProfit >= 0 ? '+' : ''}฿{item.netProfit.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: item.netProfit >= 0 ? '#059669' : '#dc2626' }}>
                        {marginVal}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f8fafc', fontWeight: 'bold', borderTop: '2px solid #cbd5e1' }}>
                  <td style={{ padding: '12px 16px' }}>รวมทั้งสิ้น ({monthlyBreakdown.length} เดือน)</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    ขาย {records.filter(r => r.type === 'SALE').length} / จ่าย {records.filter(r => r.type === 'EXPENSE').length}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#059669' }}>
                    ฿{totalIncome.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#dc2626' }}>
                    ฿{records.filter(r => r.type === 'SALE').reduce((s, r) => s + Number(r.cost || 0), 0).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#dc2626' }}>
                    ฿{records.filter(r => r.type === 'SALE').reduce((s, r) => s + Number(r.fee || 0) + Number(r.shipping || 0), 0).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#dc2626' }}>
                    ฿{records.filter(r => r.type === 'EXPENSE').reduce((s, r) => s + Number(r.amount || 0), 0).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#dc2626' }}>
                    ฿{totalExpense.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: netProfit >= 0 ? '#059669' : '#dc2626' }}>
                    {netProfit >= 0 ? '+' : ''}฿{netProfit.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: netProfit >= 0 ? '#059669' : '#dc2626' }}>
                    {overallMargin}%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        
        {/* Table Filter Controls */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: '#111827' }}>
              รายการบัญชี (Transactions)
            </h2>
            <span style={{ fontSize: 12, color: '#6b7280', background: '#e5e7eb', padding: '2px 8px', borderRadius: 12 }}>
              {filteredRecords.length} / {records.length}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            
            {/* Search Box */}
            <input 
              type="text"
              placeholder="🔍 ค้นหาสินค้า / หมวดหมู่..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 13, minWidth: 200 }}
            />

            {/* Type Filter Buttons */}
            <div style={{ display: 'flex', background: '#e5e7eb', borderRadius: 6, padding: 2 }}>
              {(['ALL', 'SALE', 'INCOME', 'EXPENSE'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  style={{
                    padding: '4px 10px', borderRadius: 5, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500,
                    background: typeFilter === t ? 'white' : 'transparent',
                    color: typeFilter === t ? '#111827' : '#6b7280',
                    boxShadow: typeFilter === t ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  {t === 'ALL' ? 'ทั้งหมด' : t === 'SALE' ? 'ขายสินค้า' : t === 'INCOME' ? 'รายรับ' : 'รายจ่าย'}
                </button>
              ))}
            </div>

          </div>
        </div>
        
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#6b7280' }}>กำลังโหลดข้อมูลบัญชี...</div>
        ) : filteredRecords.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#6b7280' }}>
            {records.length === 0 ? 'ยังไม่มีรายการบัญชีในช่วงเวลานี้' : 'ไม่พบรายการที่ตรงกับตัวกรอง'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14, minWidth: 800 }}>
              <thead>
                <tr style={{ background: '#f9fafb', color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>วันที่</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>ประเภท</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>รายละเอียด</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>รายรับ</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ต้นทุน / ธรรมเนียม / ขนส่ง / จ่าย</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>หลักฐาน</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map(record => (
                  <tr key={record.id} style={{ borderBottom: '1px solid #e5e7eb', background: record.type === 'SALE' && record.cost === 0 ? '#fefce8' : 'white' }}>
                    <td style={{ padding: '12px 16px', color: '#374151', whiteSpace: 'nowrap' }}>
                      {new Date(record.date).toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </td>
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
                         <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                           {editingCostId === record.id ? (
                             <div style={{ display: 'flex', gap: 4 }}>
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
                             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                               <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 'normal' }}>ต้นทุน:</span>
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
                           )}
                           
                           {editingFeeId === record.id ? (
                             <div style={{ display: 'flex', gap: 4 }}>
                               <input 
                                 type="number" 
                                 value={editingFeeValue} 
                                 onChange={e => setEditingFeeValue(e.target.value)}
                                 style={{ width: 80, padding: 4, border: '1px solid #ddd', borderRadius: 4, textAlign: 'right' }}
                                 autoFocus
                               />
                               <button onClick={() => handleUpdateFee(record.id)} style={{ background: '#059669', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px', cursor: 'pointer' }}>✓</button>
                               <button onClick={() => setEditingFeeId(null)} style={{ background: '#9ca3af', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px', cursor: 'pointer' }}>✕</button>
                             </div>
                           ) : (
                             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                               <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 'normal' }}>ค่าธรรมเนียม:</span>
                               <span>{record.fee > 0 ? `-${Number(record.fee).toLocaleString()}` : (
                                 <span style={{ color: '#9ca3af', fontSize: 12 }}>-</span>
                               )}</span>
                               <button 
                                 onClick={() => { setEditingFeeId(record.id); setEditingFeeValue(record.fee?.toString() || ''); }}
                                 style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 12, textDecoration: 'underline' }}
                               >
                                 ✏️
                               </button>
                             </div>
                           )}

                           {editingShippingId === record.id ? (
                             <div style={{ display: 'flex', gap: 4 }}>
                               <input 
                                 type="number" 
                                 value={editingShippingValue} 
                                 onChange={e => setEditingShippingValue(e.target.value)}
                                 style={{ width: 80, padding: 4, border: '1px solid #ddd', borderRadius: 4, textAlign: 'right' }}
                                 autoFocus
                               />
                               <button onClick={() => handleUpdateShipping(record.id)} style={{ background: '#059669', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px', cursor: 'pointer' }}>✓</button>
                               <button onClick={() => setEditingShippingId(null)} style={{ background: '#9ca3af', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px', cursor: 'pointer' }}>✕</button>
                             </div>
                           ) : (
                             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                               <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 'normal' }}>ค่าจัดส่ง:</span>
                               <span>{record.shipping > 0 ? `-${Number(record.shipping).toLocaleString()}` : (
                                 <span style={{ color: '#9ca3af', fontSize: 12 }}>-</span>
                               )}</span>
                               <button 
                                 onClick={() => { setEditingShippingId(record.id); setEditingShippingValue(record.shipping?.toString() || ''); }}
                                 style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 12, textDecoration: 'underline' }}
                               >
                                 ✏️
                               </button>
                             </div>
                           )}
                         </div>
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
                  <>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>ต้นทุนพระ</label>
                      <input type="number" value={addCost} onChange={e => setAddCost(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db' }} placeholder="0.00 (ใส่ทีหลังได้)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>ค่าธรรมเนียม</label>
                      <input type="number" value={addFee} onChange={e => setAddFee(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db' }} placeholder="0.00 (ใส่ทีหลังได้)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>ค่าจัดส่ง</label>
                      <input type="number" value={addShipping} onChange={e => setAddShipping(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db' }} placeholder="0.00 (ใส่ทีหลังได้)" />
                    </div>
                  </>
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
