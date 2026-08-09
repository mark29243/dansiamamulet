import { redirect } from 'next/navigation';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function PrintAccountingPage({ searchParams }: { searchParams: { month?: string; year?: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const admin = createAdminClient();
  const { data: adminData } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!adminData) redirect('/admin/login');

  const month = parseInt(searchParams.month || (new Date().getMonth() + 1).toString());
  const year = parseInt(searchParams.year || new Date().getFullYear().toString());

  const paddedMonth = month.toString().padStart(2, '0');
  const endDate = new Date(year, month, 0); // last day of month

  const { data: records, error } = await admin
    .from('accounting_records')
    .select('*')
    .gte('date', `${year}-${paddedMonth}-01`)
    .lte('date', `${year}-${paddedMonth}-${endDate.getDate().toString().padStart(2, '0')}`)
    .order('date', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    return <div>Error loading records: {error.message}</div>;
  }

  const list = records || [];

  const totalIncome = list.filter(r => r.type === 'INCOME' || r.type === 'SALE').reduce((sum, r) => sum + Number(r.amount), 0);
  const totalExpense = list.filter(r => r.type === 'EXPENSE').reduce((sum, r) => sum + Number(r.amount), 0) + 
                       list.filter(r => r.type === 'SALE').reduce((sum, r) => sum + Number(r.cost) + Number(r.fee || 0) + Number(r.shipping || 0), 0);
  const netProfit = totalIncome - totalExpense;

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', background: 'white' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .print-container { padding: 0 !important; max-width: none !important; }
          table { page-break-inside: auto; }
          tr { page-break-inside: avoid; page-break-after: auto; }
          thead { display: table-header-group; }
          tfoot { display: table-footer-group; }
        }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
        th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
        th { background-color: #f9fafb; font-weight: 600; color: #374151; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .summary-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-top: 32px; display: flex; justify-content: space-between; page-break-inside: avoid; }
      `}} />

      <div className="no-print" style={{ marginBottom: 20, display: 'flex', gap: 12 }}>
        <button onClick={() => window.print()} style={{ padding: '10px 20px', background: '#059669', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' }}>
          🖨️ พิมพ์หน้านี้ (Print)
        </button>
        <button onClick={() => window.close()} style={{ padding: '10px 20px', background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer' }}>
          ปิดหน้าต่าง
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1 style={{ fontSize: 24, margin: '0 0 8px 0', color: '#111' }}>รายงานบัญชี (Accounting Report)</h1>
        <h2 style={{ fontSize: 18, margin: 0, color: '#4b5563', fontWeight: 'normal' }}>
          ประจำเดือน {thaiMonths[month - 1]} ปี {year}
        </h2>
      </div>

      <table>
        <thead>
          <tr>
            <th style={{ width: 90 }}>วันที่</th>
            <th style={{ width: 120 }}>ประเภท</th>
            <th>รายการ / รายละเอียด</th>
            <th style={{ width: 80, textAlign: 'center' }}>รูปภาพ</th>
            <th className="text-right" style={{ width: 100 }}>รายรับ (฿)</th>
            <th className="text-right" style={{ width: 100 }}>รายจ่าย (฿)</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center" style={{ padding: 40, color: '#6b7280' }}>
                ไม่มีรายการในเดือนนี้
              </td>
            </tr>
          ) : (
            list.map((r, i) => {
              const dateObj = new Date(r.date);
              const formattedDate = dateObj.toLocaleDateString('th-TH', { day: '2-digit', month: 'short' });
              
              let typeLabel = '';
              if (r.type === 'INCOME') typeLabel = 'รายรับ';
              if (r.type === 'EXPENSE') typeLabel = 'รายจ่าย';
              if (r.type === 'SALE') typeLabel = 'ขายสินค้า';

              let expenseDetails = '';
              if (r.type === 'SALE') {
                const costs = [];
                if (r.cost > 0) costs.push(`ต้นทุน: ฿${r.cost}`);
                if (r.fee > 0) costs.push(`ค่าธรรมเนียม: ฿${r.fee}`);
                if (r.shipping > 0) costs.push(`ค่าส่ง: ฿${r.shipping}`);
                expenseDetails = costs.length > 0 ? `(${costs.join(', ')})` : '';
              }

              const rowIncome = (r.type === 'INCOME' || r.type === 'SALE') ? Number(r.amount) : 0;
              const rowExpense = r.type === 'EXPENSE' ? Number(r.amount) : (r.type === 'SALE' ? (Number(r.cost) + Number(r.fee) + Number(r.shipping)) : 0);

              return (
                <tr key={r.id}>
                  <td>{formattedDate}</td>
                  <td>
                    <span style={{ 
                      color: r.type === 'INCOME' ? '#059669' : r.type === 'EXPENSE' ? '#dc2626' : '#2563eb',
                      fontWeight: 600
                    }}>
                      {typeLabel}
                    </span>
                    {r.category && <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{r.category}</div>}
                  </td>
                  <td>
                    {r.product_name && <div style={{ fontWeight: 600, color: '#111' }}>{r.product_name}</div>}
                    {r.description && <div style={{ color: '#4b5563', fontSize: 12, marginTop: r.product_name ? 4 : 0 }}>{r.description}</div>}
                    {expenseDetails && <div style={{ color: '#dc2626', fontSize: 11, marginTop: 4 }}>{expenseDetails}</div>}
                  </td>
                  <td className="text-center" style={{ padding: '4px' }}>
                    {r.image_url ? (
                      <div style={{ width: 60, height: 60, position: 'relative', margin: '0 auto', borderRadius: 4, overflow: 'hidden', border: '1px solid #eee' }}>
                        <Image src={r.image_url} alt="" fill sizes="60px" style={{ objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <span style={{ color: '#d1d5db', fontSize: 11 }}>-</span>
                    )}
                  </td>
                  <td className="text-right" style={{ color: rowIncome > 0 ? '#059669' : '#9ca3af', fontWeight: rowIncome > 0 ? 600 : 400 }}>
                    {rowIncome > 0 ? rowIncome.toLocaleString() : '-'}
                  </td>
                  <td className="text-right" style={{ color: rowExpense > 0 ? '#dc2626' : '#9ca3af', fontWeight: rowExpense > 0 ? 600 : 400 }}>
                    {rowExpense > 0 ? rowExpense.toLocaleString() : '-'}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className="summary-box">
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#4b5563', marginBottom: 4 }}>รวมรายรับทั้งหมด</div>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#059669' }}>฿{totalIncome.toLocaleString()}</div>
        </div>
        <div style={{ width: 1, background: '#e5e7eb', margin: '0 16px' }}></div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#4b5563', marginBottom: 4 }}>รวมรายจ่ายทั้งหมด</div>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#dc2626' }}>฿{totalExpense.toLocaleString()}</div>
        </div>
        <div style={{ width: 1, background: '#e5e7eb', margin: '0 16px' }}></div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#4b5563', marginBottom: 4 }}>กำไรสุทธิ (Net Profit)</div>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: netProfit >= 0 ? '#2563eb' : '#dc2626' }}>
            ฿{netProfit.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: 40, fontSize: 12, color: '#9ca3af' }}>
        พิมพ์เมื่อ {new Date().toLocaleString('th-TH')}
      </div>
    </div>
  );
}
