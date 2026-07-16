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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-gray-800 border border-gray-700 p-8 sm:p-10 rounded-3xl shadow-2xl max-w-sm w-full">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h1 className="text-2xl font-bold text-center mb-8 text-white tracking-wide">กรุณาใส่รหัสผ่าน</h1>
          <input
            type="password"
            value={passcode}
            onChange={e => setPasscode(e.target.value)}
            className="w-full px-5 py-4 text-center text-2xl bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors mb-8"
            placeholder="••••••"
            maxLength={6}
            autoFocus
          />
          <button type="submit" className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-500 transition-colors shadow-lg">
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gray-900 px-8 py-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700 text-white">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">ระบบสร้างใบปะหน้า</h1>
                <p className="text-gray-400 mt-1">สร้าง PDF สำหรับปริ้นท์ใบปะหน้าอย่างรวดเร็ว</p>
              </div>
            </div>
          </div>
          
          <div className="p-8 sm:p-10 space-y-8">
            
            {/* Order No Section */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                Order No. <span className="text-gray-400 ml-2 font-normal lowercase">(ไม่บังคับ)</span>
              </label>
              <input 
                type="text" 
                value={orderNo}
                onChange={e => setOrderNo(e.target.value)}
                placeholder="เช่น CUSTOM01"
                maxLength={8}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors font-medium"
              />
            </div>

            {/* Sender Section */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                ข้อมูลผู้ส่ง (From)
              </label>
              
              <div className="relative">
                <select 
                  value={senderId}
                  onChange={e => setSenderId(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-medium cursor-pointer"
                >
                  {DEFAULT_SENDERS.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.phone})</option>
                  ))}
                  <option value="custom">กำหนดเอง (พิมพ์ใหม่)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              {senderId === 'custom' && (
                <div className="mt-4 p-5 bg-blue-50 border border-blue-100 rounded-xl space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="ชื่อผู้ส่ง" 
                      value={customSender.name}
                      onChange={e => setCustomSender({...customSender, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                    />
                    <input 
                      type="text" 
                      placeholder="เบอร์โทร" 
                      value={customSender.phone}
                      onChange={e => setCustomSender({...customSender, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                    />
                  </div>
                  <textarea 
                    placeholder="ที่อยู่ผู้ส่ง" 
                    rows={2}
                    value={customSender.address}
                    onChange={e => setCustomSender({...customSender, address: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors resize-none"
                  />
                </div>
              )}
            </div>

            {/* Receiver Section */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                ข้อมูลผู้รับ (To)
              </label>
              <textarea 
                value={receiverText}
                onChange={e => setReceiverText(e.target.value)}
                rows={5}
                placeholder="นาย สมชาย ใจดี\n123/45 ถนน... แขวง... เขต... กทม. 10000\nโทร 0812345678"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-medium resize-none leading-relaxed"
              />
              <p className="mt-2 text-sm text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                เคล็ดลับ: สามารถก๊อปปี้ชื่อ ที่อยู่ และเบอร์โทรมาวางรวมกันได้เลย
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4">
              <button 
                onClick={handlePrint}
                disabled={isGenerating || !receiverText.trim()}
                className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-5 rounded-xl font-bold text-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังสร้าง PDF...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                    สร้างไฟล์ PDF
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
