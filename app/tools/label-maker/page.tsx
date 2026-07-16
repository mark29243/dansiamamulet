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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">🔒 ใส่รหัสผ่าน</h1>
          <input
            type="password"
            value={passcode}
            onChange={e => setPasscode(e.target.value)}
            className="w-full px-4 py-3 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            placeholder="รหัส 6 หลัก"
            maxLength={6}
            autoFocus
          />
          <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
            เข้าใช้งาน
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-black text-white px-6 py-4">
          <h1 className="text-xl font-bold">🖨️ สร้างใบปะหน้าด้วยตัวเอง</h1>
        </div>
        
        <div className="p-6 md:p-8 space-y-6">
          {/* Order No */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Order No. (ไม่บังคับ)</label>
            <input 
              type="text" 
              value={orderNo}
              onChange={e => setOrderNo(e.target.value)}
              placeholder="เช่น CUSTOM01"
              maxLength={8}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <hr className="border-gray-200" />

          {/* Sender */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">ข้อมูลผู้ส่ง (From)</label>
            <select 
              value={senderId}
              onChange={e => setSenderId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-4"
            >
              {DEFAULT_SENDERS.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.phone})</option>
              ))}
              <option value="custom">+ กำหนดเอง (พิมพ์ใหม่)</option>
            </select>

            {senderId === 'custom' && (
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg border">
                <input 
                  type="text" 
                  placeholder="ชื่อผู้ส่ง" 
                  value={customSender.name}
                  onChange={e => setCustomSender({...customSender, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input 
                  type="text" 
                  placeholder="เบอร์โทร" 
                  value={customSender.phone}
                  onChange={e => setCustomSender({...customSender, phone: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
                <textarea 
                  placeholder="ที่อยู่ผู้ส่ง" 
                  rows={2}
                  value={customSender.address}
                  onChange={e => setCustomSender({...customSender, address: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            )}
          </div>

          <hr className="border-gray-200" />

          {/* Receiver */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              ข้อมูลผู้รับ (To) 
              <span className="text-xs font-normal text-gray-500 ml-2">ก๊อปปี้ชื่อและที่อยู่วางรวมกันได้เลย</span>
            </label>
            <textarea 
              value={receiverText}
              onChange={e => setReceiverText(e.target.value)}
              rows={5}
              placeholder="นาย สมชาย ใจดี\n123/45 ถนน... แขวง... เขต... กทม. 10000\nโทร 0812345678"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Print Button */}
          <div className="pt-4">
            <button 
              onClick={handlePrint}
              disabled={isGenerating || !receiverText.trim()}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>⏳ กำลังสร้าง PDF...</>
              ) : (
                <>🖨️ สร้างไฟล์ PDF</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
