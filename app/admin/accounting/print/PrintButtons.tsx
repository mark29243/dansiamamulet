'use client';

export default function PrintButtons() {
  return (
    <div className="no-print" style={{ marginBottom: 20, display: 'flex', gap: 12 }}>
      <button onClick={() => window.print()} style={{ padding: '10px 20px', background: '#059669', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' }}>
        🖨️ พิมพ์หน้านี้ (Print)
      </button>
      <button onClick={() => window.close()} style={{ padding: '10px 20px', background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer' }}>
        ปิดหน้าต่าง
      </button>
    </div>
  );
}
