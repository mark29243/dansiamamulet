'use client';

import { useState, useEffect } from 'react';

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
  const [savedSenders, setSavedSenders] = useState<any[]>([]);
  
  const [receiverText, setReceiverText] = useState('');
  const [orderNo, setOrderNo] = useState('');
  const [isCod, setIsCod] = useState(false);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedReceivers, setSavedReceivers] = useState<any[]>([]);

  useEffect(() => {
    const migrateAndFetchData = async () => {
      const localReceivers = JSON.parse(localStorage.getItem('dansiam_saved_receivers') || '[]');
      const localSenders = JSON.parse(localStorage.getItem('dansiam_saved_senders') || '[]');
      
      if (localReceivers.length > 0 || localSenders.length > 0) {
        const payload = [
          ...localSenders.map((s: any) => ({ ...s, type: 'sender' })),
          ...localReceivers.map((r: any) => ({ ...r, type: 'receiver' }))
        ];
        
        try {
          await fetch('/api/tools/label-contacts', {
            method: 'POST',
            body: JSON.stringify(payload)
          });
          localStorage.removeItem('dansiam_saved_receivers');
          localStorage.removeItem('dansiam_saved_senders');
        } catch (e) {
          console.error('Migration failed', e);
        }
      }
      
      const res = await fetch('/api/tools/label-contacts');
      if (res.ok) {
        const data = await res.json();
        setSavedSenders(data.filter((d: any) => d.type === 'sender'));
        setSavedReceivers(data.filter((d: any) => d.type === 'receiver'));
      }
    };

    if (isAuthenticated) {
      migrateAndFetchData();
    }
  }, [isAuthenticated]);

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
      let sender = DEFAULT_SENDERS.find(s => s.id === senderId) || savedSenders.find(s => s.id === senderId);
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
          isCod,
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `label_${orderNo.trim() || 'custom'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (e: any) {
      alert('เกิดข้อผิดพลาด: ' + e.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveReceiver = async () => {
    if (!receiverText.trim()) return;
    const firstLine = receiverText.split('\n')[0].trim() || 'ผู้รับ';
    const name = window.prompt('ตั้งชื่อเพื่อบันทึกผู้รับรายนี้ (เช่น ชื่อลูกค้า):', firstLine);
    if (!name) return;
    
    const newId = Date.now().toString();
    const newObj = { id: newId, type: 'receiver', name, text: receiverText };
    
    setSavedReceivers([...savedReceivers, newObj]);
    await fetch('/api/tools/label-contacts', { method: 'POST', body: JSON.stringify(newObj) });
  };

  const removeSavedReceiver = async (id: string) => {
    if (!window.confirm('ต้องการลบผู้รับรายนี้ออกจากที่บันทึกไว้ใช่หรือไม่?')) return;
    setSavedReceivers(savedReceivers.filter(r => r.id !== id));
    await fetch(`/api/tools/label-contacts?id=${id}`, { method: 'DELETE' });
  };

  const saveCustomSender = async () => {
    if (!customSender.name.trim() || !customSender.phone.trim() || !customSender.address.trim()) {
      alert('กรุณากรอกข้อมูลผู้ส่งให้ครบถ้วนก่อนบันทึก');
      return;
    }
    const newId = 'sender_' + Date.now().toString();
    const newObj = { id: newId, type: 'sender', ...customSender };
    
    setSavedSenders([...savedSenders, newObj]);
    setSenderId(newId);
    setCustomSender({ name: '', phone: '', address: '' });
    
    await fetch('/api/tools/label-contacts', { method: 'POST', body: JSON.stringify(newObj) });
  };

  const removeSavedSender = async (id: string) => {
    if (!window.confirm('ต้องการลบข้อมูลผู้ส่งนี้ใช่หรือไม่?')) return;
    setSavedSenders(savedSenders.filter(s => s.id !== id));
    setSenderId('dansiam');
    await fetch(`/api/tools/label-contacts?id=${id}`, { method: 'DELETE' });
  };

  const currentSavedReceiver = savedReceivers.find(r => r.text === receiverText);

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
            <div style={{ display: 'flex', gap: '12px', marginBottom: senderId === 'custom' ? '16px' : '0' }}>
              <select 
                value={senderId}
                onChange={e => setSenderId(e.target.value)}
                className="input"
                style={{ cursor: 'pointer', flex: 1 }}
              >
                {DEFAULT_SENDERS.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.phone})</option>
                ))}
                {savedSenders.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.phone})</option>
                ))}
                <option value="custom">+ กำหนดเอง (พิมพ์ใหม่)</option>
              </select>
              
              {senderId !== 'dansiam' && senderId !== 'custom' && (
                <button 
                  type="button" 
                  onClick={() => removeSavedSender(senderId)}
                  className="btn-outline" 
                  style={{ padding: '0 16px', borderColor: 'var(--burgundy)', color: 'var(--burgundy)' }}
                  title="ลบข้อมูลผู้ส่งนี้"
                >
                  <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              )}
            </div>

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
                <button 
                  type="button" 
                  onClick={saveCustomSender}
                  className="btn-text"
                  style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
                >
                  <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                  </svg>
                  บันทึกเป็นผู้ส่งประจำ
                </button>
              </div>
            )}
          </div>

          {/* Receiver Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <label className="label" style={{ marginBottom: 0 }}>
                ข้อมูลผู้รับ (To)
              </label>
              
              {savedReceivers.length > 0 && (
                <select 
                  onChange={(e) => {
                    if (!e.target.value) return;
                    const found = savedReceivers.find(r => r.id === e.target.value);
                    if (found) setReceiverText(found.text);
                    e.target.value = ""; 
                  }}
                  className="input"
                  style={{ width: 'auto', padding: '6px 12px', fontSize: '13px', minWidth: '200px', cursor: 'pointer', background: 'var(--cream)' }}
                  defaultValue=""
                >
                  <option value="" disabled>⭐ เลือกผู้รับที่ส่งบ่อย...</option>
                  {savedReceivers.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              )}
            </div>

            <textarea 
              value={receiverText}
              onChange={e => setReceiverText(e.target.value)}
              rows={5}
              placeholder="นาย สมชาย ใจดี\n123/45 ถนน... แขวง... เขต... กทม. 10000\nโทร 0812345678"
              className="input"
              style={{ resize: 'none', lineHeight: '1.6' }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', flexWrap: 'wrap', gap: '12px' }}>
              <div className="helper" style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                <svg style={{ width: '14px', height: '14px', color: 'var(--gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                เคล็ดลับ: สามารถก๊อปปี้ชื่อและที่อยู่มาวางรวมกันได้เลย
              </div>
              
              {receiverText.trim() && (
                currentSavedReceiver ? (
                  <button 
                    type="button" 
                    onClick={() => removeSavedReceiver(currentSavedReceiver.id)}
                    className="btn-text"
                    style={{ color: 'var(--burgundy)', padding: 0, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', textDecorationColor: 'rgba(92, 26, 26, 0.3)' }}
                  >
                    <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    ลบออกจากรายชื่อโปรด
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={saveReceiver}
                    className="btn-text"
                    style={{ padding: 0, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                    </svg>
                    บันทึกเป็นรายชื่อโปรด
                  </button>
                )
              )}
            </div>
          </div>

          {/* Actions */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <label className="label">รูปแบบใบปะหน้า</label>
              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    checked={!isCod} 
                    onChange={() => setIsCod(false)} 
                    style={{ accentColor: 'var(--gold)' }}
                  />
                  <span>แบบปกติ (ชำระแล้ว)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    checked={isCod} 
                    onChange={() => setIsCod(true)} 
                    style={{ accentColor: 'var(--gold)' }}
                  />
                  <span>แบบเก็บเงินปลายทาง (เว้นที่แปะ COD)</span>
                </label>
              </div>
            </div>

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
