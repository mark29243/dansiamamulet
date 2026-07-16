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
      <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl max-w-sm w-full transform transition-all hover:scale-105 duration-500">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h1 className="text-2xl font-bold text-center mb-8 text-white tracking-wide">กรุณาใส่รหัสผ่าน</h1>
          <input
            type="password"
            value={passcode}
            onChange={e => setPasscode(e.target.value)}
            className="w-full px-5 py-4 text-center text-2xl bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white/20 transition-all mb-8 shadow-inner"
            placeholder="••••••"
            maxLength={6}
            autoFocus
          />
          <button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-500 hover:to-yellow-400 transform transition-all shadow-lg hover:shadow-amber-500/50">
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl w-full mx-auto my-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-black px-8 py-10 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner text-white">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">ระบบสร้างใบปะหน้า</h1>
                <p className="text-gray-400 mt-1">สร้าง PDF สำหรับปริ้นท์ใบปะหน้าอย่างรวดเร็ว</p>
              </div>
            </div>
          </div>
          
          <div className="p-8 sm:p-10 space-y-10">
            
            {/* Order No Section */}
            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 group-hover:scale-150 transition-transform"></span>
                Order No. <span className="text-gray-400 ml-2 font-normal lowercase">(ไม่บังคับ)</span>
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={orderNo}
                  onChange={e => setOrderNo(e.target.value)}
                  placeholder="เช่น CUSTOM01"
                  maxLength={8}
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm font-medium"
                />
              </div>
            </div>

            {/* Sender Section */}
            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 group-hover:scale-150 transition-transform"></span>
                ข้อมูลผู้ส่ง (From)
              </label>
              
              <div className="relative">
                <select 
                  value={senderId}
                  onChange={e => setSenderId(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-medium cursor-pointer"
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
                <div className="mt-4 grid gap-4 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl shadow-inner animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="ชื่อผู้ส่ง" 
                      value={customSender.name}
                      onChange={e => setCustomSender({...customSender, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                    />
                    <input 
                      type="text" 
                      placeholder="เบอร์โทร" 
                      value={customSender.phone}
                      onChange={e => setCustomSender({...customSender, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                    />
                  </div>
                  <textarea 
                    placeholder="ที่อยู่ผู้ส่ง" 
                    rows={2}
                    value={customSender.address}
                    onChange={e => setCustomSender({...customSender, address: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow resize-none"
                  />
                </div>
              )}
            </div>

            {/* Receiver Section */}
            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 group-hover:scale-150 transition-transform"></span>
                ข้อมูลผู้รับ (To)
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <textarea 
                  value={receiverText}
                  onChange={e => setReceiverText(e.target.value)}
                  rows={5}
                  placeholder="นาย สมชาย ใจดี\n123/45 ถนน... แขวง... เขต... กทม. 10000\nโทร 0812345678"
                  className="relative w-full px-5 py-4 bg-white/90 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm font-medium resize-none leading-relaxed"
                />
              </div>
              <p className="mt-3 text-sm text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                เคล็ดลับ: สามารถก๊อปปี้ชื่อ ที่อยู่ และเบอร์โทรมาวางรวมกันได้เลย
              </p>
            </div>

            {/* Actions */}
            <div className="pt-6">
              <button 
                onClick={handlePrint}
                disabled={isGenerating || !receiverText.trim()}
                className="relative w-full overflow-hidden group rounded-2xl p-[2px]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-700 to-black rounded-2xl opacity-100 group-hover:opacity-90 transition-opacity"></span>
                <span className="relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-900 to-black text-white py-5 rounded-2xl font-bold text-lg shadow-xl group-hover:shadow-gray-900/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
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
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
