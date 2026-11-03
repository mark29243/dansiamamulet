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
    <div className="admin-page-container" style={{ maxWidth: 1150, margin: '0 auto', padding: '16px 12px', fontFamily: 'sans-serif' }}>
      
      {/* Mobile-responsive styles injected directly */}
      <style>{`
        .desktop-only { display: block !important; }
        .mobile-only { display: none !important; }
        .mobile-flex { display: none !important; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .summary-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
          .mobile-flex { display: flex !important; }

          .admin-page-container {
            padding: 12px 10px 80px 10px !important;
          }

          .summary-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            margin-bottom: 16px !important;
          }

          .summary-card {
            padding: 12px 12px !important;
            border-radius: 10px !important;
          }

          .summary-card-title {
            font-size: 11px !important;
            margin-bottom: 3px !important;
          }

          .summary-card-value {
            font-size: 18px !important;
            line-height: 1.2 !important;
          }

          .summary-card-sub {
            font-size: 10px !important;
            margin-top: 3px !important;
          }

          .mobile-full-btn {
            width: 100% !important;
            justify-content: center !important;
          }

          .mobile-mode-selector {
            width: 100% !important;
            display: flex !important;
          }
          .mobile-mode-selector button {
            flex: 1 !important;
            padding: 8px 4px !important;
            font-size: 11.5px !important;
            text-align: center !important;
          }

          .mobile-date-inputs {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .mobile-date-inputs input, .mobile-date-inputs select {
            width: 100% !important;
            font-size: 14px !important;
          }

          .mobile-search-bar {
            width: 100% !important;
            min-width: 100% !important;
          }

          .mobile-filter-pills {
            width: 100% !important;
            display: flex !important;
            overflow-x: auto !important;
            white-space: nowrap !important;
          }
          .mobile-filter-pills button {
            flex: 1 !important;
            padding: 7px 8px !important;
            font-size: 12px !important;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h1 style={{ fontSize: 22, fontWeight: 'bold', margin: 0, color: '#111' }}>💰 ระบบบัญชี</h1>
            <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>Admin</span>
          </div>
          <p style={{ fontSize: 13, color: '#666', margin: '4px 0 0 0' }}>
            สรุปยอดขาย รายรับ รายจ่าย และกำไรสุทธิ
          </p>
        </div>
        
        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: 'auto' }}>
          <button 
            onClick={() => window.open(printUrl, '_blank')}
            style={{ padding: '8px 12px', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: 8, fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
          >
            🖨️ <span className="desktop-only">พิมพ์รายงาน</span>
          </button>
          
          <button 
            onClick={() => setShowAddModal(true)}
            style={{ padding: '8px 16px', background: '#059669', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 8px rgba(5,150,105,0.3)' }}
          >
            ➕ เพิ่มรายการ
          </button>
        </div>
      </div>

      {/* Date Filter & Range Picker Bar */}
      <div style={{ background: 'white', padding: '14px 16px', borderRadius: 12, border: '1px solid #e5e7eb', marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        
        {/* Mode Selector Tabs */}
        <div style={{ marginBottom: 12, borderBottom: '1px solid #f3f4f6', paddingBottom: 12 }}>
          
          {/* View Mode Toggle */}
          <div className="mobile-mode-selector" style={{ display: 'flex', background: '#f3f4f6', borderRadius: 8, padding: 3, border: '1px solid #e5e7eb', gap: 4, marginBottom: 10 }}>
            <button
              onClick={() => setViewMode('dateRange')}
              style={{
                padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
                background: viewMode === 'dateRange' ? '#2563eb' : 'transparent',
                color: viewMode === 'dateRange' ? 'white' : '#4b5563',
                boxShadow: viewMode === 'dateRange' ? '0 1px 3px rgba(37,99,235,0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              📆 ช่วงวัน
            </button>
            <button
              onClick={() => setViewMode('range')}
              style={{
                padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
                background: viewMode === 'range' ? '#2563eb' : 'transparent',
                color: viewMode === 'range' ? 'white' : '#4b5563',
                boxShadow: viewMode === 'range' ? '0 1px 3px rgba(37,99,235,0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              📅 หลายเดือน
            </button>
            <button
              onClick={() => setViewMode('single')}
              style={{
                padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
                background: viewMode === 'single' ? '#2563eb' : 'transparent',
                color: viewMode === 'single' ? 'white' : '#4b5563',
                boxShadow: viewMode === 'single' ? '0 1px 3px rgba(37,99,235,0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              🗓️ รายเดือน
            </button>
          </div>

          {/* Quick Presets (Horizontal Scroll on Mobile) */}
          <div className="no-scrollbar" style={{ display: 'flex', gap: 6, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 2, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#6b7280', whiteSpace: 'nowrap', fontWeight: 600 }}>ทางลัด:</span>
            {[
              { label: 'วันนี้', val: 'TODAY' as const },
              { label: '7 วันล่าสุด', val: 'LAST_7_DAYS' as const },
              { label: '30 วันล่าสุด', val: 'LAST_30_DAYS' as const },
              { label: 'เดือนนี้', val: 'THIS_MONTH' as const },
              { label: 'เดือนที่แล้ว', val: 'LAST_MONTH' as const },
              { label: '3 เดือนล่าสุด', val: 'LAST_3_MONTHS' as const },
              { label: 'ปี 2026', val: 'YEAR_2026' as const },
              { label: 'ปี 2025', val: 'YEAR_2025' as const },
            ].map(p => (
              <button
                key={p.val}
                onClick={() => applyPreset(p.val)}
                style={{ padding: '4px 10px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 11.5, color: '#374151', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                {p.label}
              </button>
            ))}
          </div>

        </div>

        {/* Inputs based on Mode */}
        <div>
          {viewMode === 'dateRange' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="mobile-date-inputs" style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 130 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 3 }}>ตั้งแต่วันที่:</span>
                  <input 
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, background: 'white' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 130 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 3 }}>ถึงวันที่:</span>
                  <input 
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, background: 'white' }}
                  />
                </div>
              </div>

              <div style={{ background: '#eff6ff', color: '#1e40af', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #bfdbfe' }}>
                <span>📌 {formatThaiDate(startDate)} – {formatThaiDate(endDate)}</span>
                <span style={{ background: '#2563eb', color: 'white', padding: '1px 8px', borderRadius: 10, fontSize: 11 }}>
                  {dayCount} วัน
                </span>
              </div>
            </div>
          ) : viewMode === 'range' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="mobile-date-inputs" style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 130 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 3 }}>ตั้งแต่:</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <select 
                      value={fromMonth} 
                      onChange={e => setFromMonth(parseInt(e.target.value))}
                      style={{ flex: 2, padding: '7px 8px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 13, background: 'white' }}
                    >
                      {THAI_MONTHS.map((mName, i) => (
                        <option key={i + 1} value={i + 1}>{mName}</option>
                      ))}
                    </select>
                    <select 
                      value={fromYear} 
                      onChange={e => setFromYear(parseInt(e.target.value))}
                      style={{ flex: 1, padding: '7px 6px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 13, background: 'white' }}
                    >
                      {AVAILABLE_YEARS.map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 130 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 3 }}>ถึง:</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <select 
                      value={toMonth} 
                      onChange={e => setToMonth(parseInt(e.target.value))}
                      style={{ flex: 2, padding: '7px 8px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 13, background: 'white' }}
                    >
                      {THAI_MONTHS.map((mName, i) => (
                        <option key={i + 1} value={i + 1}>{mName}</option>
                      ))}
                    </select>
                    <select 
                      value={toYear} 
                      onChange={e => setToYear(parseInt(e.target.value))}
                      style={{ flex: 1, padding: '7px 6px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 13, background: 'white' }}
                    >
                      {AVAILABLE_YEARS.map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ background: '#eff6ff', color: '#1e40af', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500, border: '1px solid #bfdbfe' }}>
                📌 {THAI_MONTHS[fromMonth - 1]} {fromYear} – {THAI_MONTHS[toMonth - 1]} {toYear}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>เลือกเดือน:</span>
              <select 
                value={currentMonth} 
                onChange={e => setCurrentMonth(parseInt(e.target.value))}
                style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 13, background: 'white' }}
              >
                {THAI_MONTHS.map((mName, i) => (
                  <option key={i + 1} value={i + 1}>{mName} (เดือน {i + 1})</option>
                ))}
              </select>
              <select 
                value={currentYear} 
                onChange={e => setCurrentYear(parseInt(e.target.value))}
                style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 13, background: 'white' }}
              >
                {AVAILABLE_YEARS.map(y => (
                  <option key={y} value={y}>ปี {y}</option>
                ))}
              </select>
            </div>
          )}
        </div>

      </div>

      {/* Summary Cards Grid (Responsive 2x2 on Mobile) */}
      <div className="summary-cards-grid">
        {/* Revenue */}
        <div className="summary-card" style={{ background: 'white', padding: 18, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div className="summary-card-title" style={{ fontSize: 12.5, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>รายรับรวม (Revenue)</div>
          <div className="summary-card-value" style={{ fontSize: 24, fontWeight: 'bold', color: '#111827' }}>
            ฿{totalIncome.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div className="summary-card-sub" style={{ fontSize: 11.5, color: '#059669', marginTop: 4 }}>
            {records.filter(r => r.type === 'SALE' || r.type === 'INCOME').length} รายการรับ
          </div>
        </div>

        {/* Expenses */}
        <div className="summary-card" style={{ background: 'white', padding: 18, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #ef4444', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div className="summary-card-title" style={{ fontSize: 12.5, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>รายจ่ายรวม (Expenses)</div>
          <div className="summary-card-value" style={{ fontSize: 24, fontWeight: 'bold', color: '#111827' }}>
            ฿{totalExpense.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div className="summary-card-sub" style={{ fontSize: 11, color: '#dc2626', marginTop: 4 }}>
            ต้นทุนพระ + ขนส่ง + จ่าย
          </div>
        </div>

        {/* Net Profit */}
        <div className="summary-card" style={{ background: 'white', padding: 18, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div className="summary-card-title" style={{ fontSize: 12.5, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>กำไรสุทธิ (Net Profit)</div>
          <div className="summary-card-value" style={{ fontSize: 24, fontWeight: 'bold', color: netProfit >= 0 ? '#059669' : '#dc2626' }}>
            {netProfit >= 0 ? '+' : ''}฿{netProfit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div className="summary-card-sub" style={{ fontSize: 11.5, color: '#4b5563', marginTop: 4 }}>
            Margin: <strong>{overallMargin}%</strong>
          </div>
        </div>

        {/* Average */}
        {viewMode === 'dateRange' && dayCount > 1 ? (
          <div className="summary-card" style={{ background: 'white', padding: 18, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #8b5cf6', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div className="summary-card-title" style={{ fontSize: 12.5, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>เฉลี่ยต่อวัน ({dayCount} วัน)</div>
            <div className="summary-card-value" style={{ fontSize: 24, fontWeight: 'bold', color: '#111827' }}>
              ฿{(netProfit / dayCount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div className="summary-card-sub" style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>
              ยอดขาย ฿{(totalIncome / dayCount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} /วัน
            </div>
          </div>
        ) : monthlyBreakdown.length > 1 ? (
          <div className="summary-card" style={{ background: 'white', padding: 18, borderRadius: 12, border: '1px solid #e5e7eb', borderLeft: '4px solid #8b5cf6', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div className="summary-card-title" style={{ fontSize: 12.5, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>เฉลี่ยต่อเดือน ({monthlyBreakdown.length} ด.)</div>
            <div className="summary-card-value" style={{ fontSize: 24, fontWeight: 'bold', color: '#111827' }}>
              ฿{(netProfit / monthlyBreakdown.length).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div className="summary-card-sub" style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>
              ยอดขาย ฿{(totalIncome / monthlyBreakdown.length).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} /ด.
            </div>
          </div>
        ) : null}
      </div>

      {/* Multi-Month Breakdown (เมื่อมีข้อมูลมากกว่า 1 เดือน) */}
      {monthlyBreakdown.length > 1 && (
        <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', marginBottom: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #e5e7eb', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
                📊 สรุปยอดแยกตามรายเดือน ({monthlyBreakdown.length} เดือน)
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: 12, color: '#64748b' }}>
                แตะที่เดือนเพื่อกรองดูรายการเฉพาะเดือนนั้น
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

          {/* Desktop Table View */}
          <div className="desktop-only" style={{ overflowX: 'auto' }}>
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

          {/* Mobile Card View for Monthly Summary */}
          <div className="mobile-only" style={{ padding: '10px 12px' }}>
            {monthlyBreakdown.map(item => {
              const isSelected = selectedMonthFilter === item.mKey;
              const marginVal = item.income > 0 ? ((item.netProfit / item.income) * 100).toFixed(1) : '0';
              return (
                <div 
                  key={item.mKey}
                  onClick={() => setSelectedMonthFilter(prev => prev === item.mKey ? 'ALL' : item.mKey)}
                  style={{
                    background: isSelected ? '#eff6ff' : 'white',
                    border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    borderRadius: 10,
                    padding: '10px 12px',
                    marginBottom: 8,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: isSelected ? '#1d4ed8' : '#1e293b' }}>
                      📅 {item.label}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 11, color: '#64748b' }}>ขาย {item.salesCount} / จ่าย {item.expenseCount}</span>
                      {isSelected && (
                        <span style={{ fontSize: 10.5, background: '#2563eb', color: 'white', padding: '1px 6px', borderRadius: 8, fontWeight: 700 }}>
                          เลือกอยู่
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 6, textAlign: 'center', background: '#f8fafc', padding: '8px 6px', borderRadius: 8 }}>
                    <div>
                      <div style={{ fontSize: 10, color: '#64748b' }}>รายรับ</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#059669' }}>฿{item.income.toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: '#64748b' }}>รายจ่าย</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#dc2626' }}>฿{item.totalExpense.toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: '#64748b' }}>กำไร ({marginVal}%)</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: item.netProfit >= 0 ? '#059669' : '#dc2626' }}>
                        {item.netProfit >= 0 ? '+' : ''}฿{item.netProfit.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Transactions List */}
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        
        {/* Table Filter Controls */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#111827' }}>
                รายการบัญชี
              </h2>
              <span style={{ fontSize: 12, color: '#4b5563', background: '#e5e7eb', padding: '1px 8px', borderRadius: 12, fontWeight: 600 }}>
                {filteredRecords.length} รายการ
              </span>
            </div>
            
            {/* Quick Count on Mobile */}
            <span className="mobile-only" style={{ fontSize: 11.5, color: '#6b7280' }}>
              {selectedMonthFilter !== 'ALL' ? `กรอง: ${selectedMonthFilter}` : 'ทั้งหมด'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
            {/* Search Box */}
            <input 
              type="text"
              placeholder="🔍 ค้นหาสินค้า / หมวดหมู่..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="mobile-search-bar"
              style={{ flex: 1, padding: '7px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 13, minWidth: 160 }}
            />

            {/* Type Filter Buttons */}
            <div className="mobile-filter-pills" style={{ display: 'flex', background: '#e5e7eb', borderRadius: 6, padding: 2, gap: 2 }}>
              {(['ALL', 'SALE', 'INCOME', 'EXPENSE'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  style={{
                    padding: '5px 10px', borderRadius: 5, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                    background: typeFilter === t ? 'white' : 'transparent',
                    color: typeFilter === t ? '#111827' : '#6b7280',
                    boxShadow: typeFilter === t ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  {t === 'ALL' ? 'ทั้งหมด' : t === 'SALE' ? 'ขาย' : t === 'INCOME' ? 'รับ' : 'จ่าย'}
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
          <>
            {/* 🖥️ Desktop Table View */}
            <div className="desktop-only" style={{ overflowX: 'auto' }}>
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

            {/* 📱 Mobile Touch Card View (ใช้งานง่ายสุดๆ บนมือถือ) */}
            <div className="mobile-only" style={{ padding: '10px 10px' }}>
              {filteredRecords.map(record => {
                const isSale = record.type === 'SALE';
                const isIncome = record.type === 'INCOME';
                const isExpense = record.type === 'EXPENSE';
                const hasZeroCost = isSale && (!record.cost || record.cost === 0);

                return (
                  <div 
                    key={record.id}
                    style={{
                      background: hasZeroCost ? '#fffdf0' : 'white',
                      borderRadius: 12,
                      padding: '12px 14px',
                      marginBottom: 10,
                      border: hasZeroCost ? '1px solid #fde047' : '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}
                  >
                    {/* Top Row: Date, Badge, Delete */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>
                          📅 {new Date(record.date).toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: '2-digit' })}
                        </span>
                        <span style={{
                          padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700,
                          background: isIncome ? '#d1fae5' : isExpense ? '#fee2e2' : '#dbeafe',
                          color: isIncome ? '#065f46' : isExpense ? '#991b1b' : '#1e40af'
                        }}>
                          {isIncome ? 'รายรับ' : isExpense ? 'รายจ่าย' : 'ขายสินค้า'}
                        </span>
                      </div>

                      <button 
                        onClick={() => handleDelete(record.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', padding: '4px 6px', cursor: 'pointer', fontSize: 16 }}
                        title="ลบรายการ"
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Product Name & Description */}
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: '#111827', lineHeight: 1.35 }}>
                        {record.product_name || record.category || 'ไม่มีชื่อรายการ'}
                      </div>
                      {(record.category || record.description) && (
                        <div style={{ fontSize: 12.5, color: '#6b7280', marginTop: 2 }}>
                          {record.category} {record.description ? `• ${record.description}` : ''}
                        </div>
                      )}
                    </div>

                    {/* Amount Banner */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '8px 10px', borderRadius: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 12.5, color: '#475569', fontWeight: 500 }}>
                        {isExpense ? 'ยอดรายจ่าย' : 'ยอดเงินรับเข้า'}
                      </span>
                      <span style={{ fontSize: 17, fontWeight: 800, color: (isIncome || isSale) ? '#059669' : '#dc2626' }}>
                        {(isIncome || isSale) ? `+฿${Number(record.amount).toLocaleString()}` : `-฿${Number(record.amount).toLocaleString()}`}
                      </span>
                    </div>

                    {/* For SALE: Costs breakdown & inline edits on Mobile */}
                    {isSale && (
                      <div style={{ background: '#f1f5f9', borderRadius: 8, padding: '8px 10px', fontSize: 12 }}>
                        {/* Cost */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ color: '#475569' }}>📦 ต้นทุนพระ:</span>
                          {editingCostId === record.id ? (
                            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                              <input 
                                type="number"
                                value={editingCostValue}
                                onChange={e => setEditingCostValue(e.target.value)}
                                style={{ width: 80, padding: '4px 6px', border: '1px solid #2563eb', borderRadius: 4, fontSize: 13, textAlign: 'right' }}
                                autoFocus
                              />
                              <button onClick={() => handleUpdateCost(record.id)} style={{ background: '#059669', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px', fontWeight: 700 }}>✓</button>
                              <button onClick={() => setEditingCostId(null)} style={{ background: '#9ca3af', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px' }}>✕</button>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              {record.cost > 0 ? (
                                <span style={{ fontWeight: 600, color: '#dc2626' }}>-฿{Number(record.cost).toLocaleString()}</span>
                              ) : (
                                <span style={{ background: '#fef3c7', color: '#b45309', padding: '1px 6px', borderRadius: 4, fontWeight: 700, fontSize: 11 }}>⚠️ ยังไม่ใส่ต้นทุน</span>
                              )}
                              <button 
                                onClick={() => { setEditingCostId(record.id); setEditingCostValue(record.cost?.toString() || ''); }}
                                style={{ background: '#e2e8f0', color: '#1e293b', border: 'none', borderRadius: 4, padding: '2px 6px', fontSize: 11, cursor: 'pointer' }}
                              >
                                ✏️ แก้ไข
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Fee */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ color: '#475569' }}>💳 ค่าธรรมเนียม:</span>
                          {editingFeeId === record.id ? (
                            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                              <input 
                                type="number"
                                value={editingFeeValue}
                                onChange={e => setEditingFeeValue(e.target.value)}
                                style={{ width: 80, padding: '4px 6px', border: '1px solid #2563eb', borderRadius: 4, fontSize: 13, textAlign: 'right' }}
                                autoFocus
                              />
                              <button onClick={() => handleUpdateFee(record.id)} style={{ background: '#059669', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px', fontWeight: 700 }}>✓</button>
                              <button onClick={() => setEditingFeeId(null)} style={{ background: '#9ca3af', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px' }}>✕</button>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ color: record.fee > 0 ? '#dc2626' : '#9ca3af' }}>
                                {record.fee > 0 ? `-฿${Number(record.fee).toLocaleString()}` : '-'}
                              </span>
                              <button 
                                onClick={() => { setEditingFeeId(record.id); setEditingFeeValue(record.fee?.toString() || ''); }}
                                style={{ background: '#e2e8f0', color: '#1e293b', border: 'none', borderRadius: 4, padding: '2px 6px', fontSize: 11, cursor: 'pointer' }}
                              >
                                ✏️
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Shipping */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#475569' }}>🚚 ค่าจัดส่ง:</span>
                          {editingShippingId === record.id ? (
                            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                              <input 
                                type="number"
                                value={editingShippingValue}
                                onChange={e => setEditingShippingValue(e.target.value)}
                                style={{ width: 80, padding: '4px 6px', border: '1px solid #2563eb', borderRadius: 4, fontSize: 13, textAlign: 'right' }}
                                autoFocus
                              />
                              <button onClick={() => handleUpdateShipping(record.id)} style={{ background: '#059669', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px', fontWeight: 700 }}>✓</button>
                              <button onClick={() => setEditingShippingId(null)} style={{ background: '#9ca3af', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px' }}>✕</button>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ color: record.shipping > 0 ? '#dc2626' : '#9ca3af' }}>
                                {record.shipping > 0 ? `-฿${Number(record.shipping).toLocaleString()}` : '-'}
                              </span>
                              <button 
                                onClick={() => { setEditingShippingId(record.id); setEditingShippingValue(record.shipping?.toString() || ''); }}
                                style={{ background: '#e2e8f0', color: '#1e293b', border: 'none', borderRadius: 4, padding: '2px 6px', fontSize: 11, cursor: 'pointer' }}
                              >
                                ✏️
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Net profit this item */}
                        <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                          <span style={{ color: '#334155', fontWeight: 600 }}>กำไรรายการนี้:</span>
                          <span style={{ fontWeight: 700, color: (Number(record.amount) - (Number(record.cost || 0) + Number(record.fee || 0) + Number(record.shipping || 0))) >= 0 ? '#059669' : '#dc2626' }}>
                            ฿{(Number(record.amount) - (Number(record.cost || 0) + Number(record.fee || 0) + Number(record.shipping || 0))).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Slip preview if any */}
                    {record.image_url && (
                      <div style={{ marginTop: 6, textAlign: 'right' }}>
                        <a href={record.image_url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
                          📎 ดูรูปภาพ / สลิปโอน
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Floating Action Button (FAB) on Mobile */}
      <button
        onClick={() => setShowAddModal(true)}
        className="mobile-only"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: 24,
          right: 20,
          background: 'linear-gradient(135deg, #059669, #047857)',
          color: 'white',
          border: 'none',
          borderRadius: 50,
          padding: '12px 20px',
          fontWeight: 'bold',
          fontSize: 15,
          boxShadow: '0 6px 20px rgba(5,150,105,0.45)',
          zIndex: 90,
          cursor: 'pointer'
        }}
      >
        ➕ เพิ่มรายการ
      </button>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '12px' }}>
          <div style={{ background: 'white', padding: 20, borderRadius: 16, width: '100%', maxWidth: 520, maxHeight: '92vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 'bold', margin: 0, color: '#111' }}>➕ เพิ่มรายการบัญชี</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: '#f3f4f6', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 14, color: '#6b7280' }}>✕</button>
            </div>
            
            <form onSubmit={handleSaveRecord} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              
              {/* Type Switcher */}
              <div style={{ display: 'flex', gap: 8 }}>
                {(['INCOME', 'EXPENSE', 'SALE'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAddType(type)}
                    style={{
                      flex: 1, padding: '10px 4px', borderRadius: 8, fontWeight: 'bold', border: '2px solid', fontSize: 13,
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
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>วันที่</label>
                <input type="date" value={addDate} onChange={e => setAddDate(e.target.value)} required style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }} />
              </div>

              {addType === 'SALE' && (
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>ชื่อสินค้า / พระที่ขาย</label>
                  <input type="text" value={addProductName} onChange={e => setAddProductName(e.target.value)} required style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }} placeholder="เช่น เหรียญหลวงพ่อรวย..." />
                </div>
              )}

              {/* Amounts Grid: 2x2 for SALE on mobile/desktop */}
              {addType === 'SALE' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 3 }}>ราคาขาย (รายรับ)</label>
                    <input type="number" value={addAmount} onChange={e => setAddAmount(e.target.value)} required style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }} placeholder="0.00" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 3 }}>ต้นทุนพระ</label>
                    <input type="number" value={addCost} onChange={e => setAddCost(e.target.value)} style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }} placeholder="0.00 (ใส่ทีหลังได้)" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 3 }}>ค่าธรรมเนียม</label>
                    <input type="number" value={addFee} onChange={e => setAddFee(e.target.value)} style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }} placeholder="0.00" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 3 }}>ค่าจัดส่ง</label>
                    <input type="number" value={addShipping} onChange={e => setAddShipping(e.target.value)} style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }} placeholder="0.00" />
                  </div>
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>จำนวนเงิน</label>
                  <input type="number" value={addAmount} onChange={e => setAddAmount(e.target.value)} required style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }} placeholder="0.00" />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>หมวดหมู่</label>
                <input type="text" value={addCategory} onChange={e => setAddCategory(e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }} placeholder="เช่น ค่าขนส่ง, ค่ากล่อง, ค่าโฆษณา..." />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>รายละเอียดเพิ่มเติม (ถ้ามี)</label>
                <textarea value={addDescription} onChange={e => setAddDescription(e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', minHeight: 50, fontSize: 14 }} placeholder="..." />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>แนบรูปภาพ / สลิป (ถ้ามี)</label>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  {addImageUrl && (
                    <div style={{ width: 50, height: 50, borderRadius: 8, overflow: 'hidden', position: 'relative', border: '1px solid #ddd' }}>
                      <Image src={addImageUrl} alt="slip" fill style={{ objectFit: 'cover' }} unoptimized />
                    </div>
                  )}
                  <label style={{ padding: '8px 14px', background: '#f3f4f6', border: '1px dashed #9ca3af', borderRadius: 8, cursor: 'pointer', fontSize: 13, color: '#4b5563', fontWeight: 600 }}>
                    {isUploading ? 'Uploading...' : '📁 เลือกรูปภาพ'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} style={{ display: 'none' }} />
                  </label>
                  {addImageUrl && (
                    <button type="button" onClick={() => setAddImageUrl('')} style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>ลบรูป</button>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '11px', background: '#f3f4f6', color: '#4b5563', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', fontSize: 14 }}>
                  ยกเลิก
                </button>
                <button type="submit" disabled={isSaving} style={{ flex: 1.5, padding: '11px', background: '#059669', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: isSaving ? 'not-allowed' : 'pointer', fontSize: 14 }}>
                  {isSaving ? 'กำลังบันทึก...' : '💾 บันทึกรายการ'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
