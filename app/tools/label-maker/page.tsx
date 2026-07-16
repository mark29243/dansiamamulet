'use client';

import { useState } from 'react';

const DEFAULT_SENDERS = [
  {
    id: 'dansiam',
    name: 'Dansiamamulets',
    phone: '+66898157535',
    address: '105/1 M.2, NONGPHO, PHOTHARAM,\nRATCHABURI, THAILAND 70120'
  }
];

export default function LabelMakerPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [senderId, setSenderId] = useState('dansiam');
  const [customSender, setCustomSender] = useState({ name: '', phone: '', address: '' });
  
  const [receiverText, setReceiverText] = useState('');
  const [orderNo, setOrderNo] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '454545') {
      setIsAuthenticated(true);
    } else {
      alert('รหัสผ่านไม่ถูกต้อง');
    }
  };

  const handlePrint = async () => {
    if (!receiverText.trim()) {
      alert('กรุณาใส่ข้อมูลผู้รับ');
      return;
    }

    setIsGenerating(true);
    try {
      let sender = DEFAULT_SENDERS.find(s => s.id === senderId);
      if (senderId === 'custom') {
        sender = { id: 'custom', ...customSender };
      }

      const res = await fetch('/api/print-custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNo: orderNo.trim(),
          senderName: sender?.name,
          senderPhone: sender?.phone,
          senderAddress: sender?.address,
          receiverText,
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (e: any) {
      alert('เกิดข้อผิดพลาด: ' + e.message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <form onSubmit={handleLogin} className="card" style={{ maxWidth: '400px', width: '100%', padding: '40px 30px', textAlign: 'center' }}>
          <div style={{ marginBottom: '24px' }}>
            <svg style={{ width: '48px', height: '48px', color: 'var(--gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h1 className="serif" style={{ fontSize: '24px', marginBottom: '24px', color: 'var(--deep)' }}>เข้าสู่ระบบพิมพ์ใบปะหน้า</h1>
          <div style={{ marginBottom: '24px' }}>
            <input
              type="password"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              className="input"
              style={{ textAlign: 'center', fontSize: '20px', letterSpacing: '4px' }}
              placeholder="รหัส 6 หลัก"
              maxLength={6}
              autoFocus
            />
          </div>
          <button type="submit" className="btn-gold" style={{ width: '100%' }}>
            ยืนยันรหัสผ่าน
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: '60px', paddingTop: '40px' }}>
      <div className="card" style={{ maxWidth: '700px', margin: '0 auto', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ background: 'var(--deep)', padding: '30px 40px', color: 'var(--cream)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'var(--gold)', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: '28px', height: '28px', color: 'var(--deep)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
            </svg>
          </div>
          <div>
            <h1 className="serif" style={{ fontSize: '24px', margin: 0, fontWeight: 700 }}>Dan Siam Label Maker</h1>
            <p className="thai" style={{ color: 'var(--cream-dark)', margin: '4px 0 0 0', fontSize: '14px', fontWeight: 400 }}>ระบบสร้างใบปะหน้าพัสดุ</p>
          </div>
        </div>
        
        <div style={{ padding: '40px' }}>
          
          {/* Order No Section */}
          <div style={{ marginBottom: '32px' }}>
            <label className="label">
              Order No. <span style={{ textTransform: 'none', color: 'var(--text-faint)' }}>(ไม่บังคับ)</span>
            </label>
            <input 
              type="text" 
              value={orderNo}
              onChange={e => setOrderNo(e.target.value)}
              placeholder="เช่น CUSTOM01"
              maxLength={8}
              className="input"
            />
          </div>

          {/* Sender Section */}
          <div style={{ marginBottom: '32px' }}>
            <label className="label">ข้อมูลผู้ส่ง (From)</label>
            <select 
              value={senderId}
              onChange={e => setSenderId(e.target.value)}
              className="input"
              style={{ cursor: 'pointer', marginBottom: senderId === 'custom' ? '16px' : '0' }}
            >
              {DEFAULT_SENDERS.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.phone})</option>
              ))}
              <option value="custom">+ กำหนดเอง (พิมพ์ใหม่)</option>
            </select>

            {senderId === 'custom' && (
              <div style={{ background: 'rgba(201, 168, 76, 0.05)', border: '1px solid var(--border)', padding: '20px', borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input 
                    type="text" 
                    placeholder="ชื่อผู้ส่ง" 
                    value={customSender.name}
                    onChange={e => setCustomSender({...customSender, name: e.target.value})}
                    className="input"
                    style={{ background: '#fff' }}
                  />
                  <input 
                    type="text" 
                    placeholder="เบอร์โทร" 
                    value={customSender.phone}
                    onChange={e => setCustomSender({...customSender, phone: e.target.value})}
                    className="input"
                    style={{ background: '#fff' }}
                  />
                </div>
                <textarea 
                  placeholder="ที่อยู่ผู้ส่ง" 
                  rows={2}
                  value={customSender.address}
                  onChange={e => setCustomSender({...customSender, address: e.target.value})}
                  className="input"
                  style={{ background: '#fff', resize: 'none' }}
                />
              </div>
            )}
          </div>

          {/* Receiver Section */}
          <div style={{ marginBottom: '40px' }}>
            <label className="label">
              ข้อมูลผู้รับ (To)
            </label>
            <textarea 
              value={receiverText}
              onChange={e => setReceiverText(e.target.value)}
              rows={5}
              placeholder="นาย สมชาย ใจดี\n123/45 ถนน... แขวง... เขต... กทม. 10000\nโทร 0812345678"
              className="input"
              style={{ resize: 'none', lineHeight: '1.6' }}
            />
            <div className="helper" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
              <svg style={{ width: '14px', height: '14px', color: 'var(--gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              เคล็ดลับ: สามารถก๊อปปี้ชื่อ ที่อยู่ และเบอร์โทรมาวางรวมกันได้เลย
            </div>
          </div>

          {/* Actions */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
            <button 
              onClick={handlePrint}
              disabled={isGenerating || !receiverText.trim()}
              className="btn-gold"
              style={{ width: '100%', fontSize: '15px', padding: '16px' }}
            >
              {isGenerating ? (
                <>
                  <div className="spinner" style={{ marginRight: '8px' }}></div>
                  กำลังสร้าง PDF...
                </>
              ) : (
                <>
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                  </svg>
                  สร้างไฟล์ PDF
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
