import { redirect } from 'next/navigation';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import PrintButtons from './PrintButtons';

export const dynamic = 'force-dynamic';

export default async function PrintAccountingPage({ 
  searchParams 
}: { 
  searchParams: { 
    month?: string; 
    year?: string;
    fromMonth?: string;
    fromYear?: string;
    toMonth?: string;
    toYear?: string;
    startDate?: string;
    endDate?: string;
  } 
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const admin = createAdminClient();
  const { data: adminData } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!adminData) redirect('/admin/login');

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  let isRange = false;
  let reportTitle = '';
  let startQueryDate = '';
  let endQueryDate = '';

  if (searchParams.fromMonth && searchParams.fromYear && searchParams.toMonth && searchParams.toYear) {
    isRange = true;
    const fM = parseInt(searchParams.fromMonth);
    const fY = parseInt(searchParams.fromYear);
    const tM = parseInt(searchParams.toMonth);
    const tY = parseInt(searchParams.toYear);

    const startPadded = fM.toString().padStart(2, '0');
    const endPadded = tM.toString().padStart(2, '0');
    const endLastDay = new Date(tY, tM, 0).getDate().toString().padStart(2, '0');

    startQueryDate = `${fY}-${startPadded}-01`;
    endQueryDate = `${tY}-${endPadded}-${endLastDay}`;

    if (fM === tM && fY === tY) {
      reportTitle = `ประจำเดือน ${thaiMonths[fM - 1]} ปี ${fY}`;
    } else {
      reportTitle = `ประจำช่วง ${thaiMonths[fM - 1]} ปี ${fY} – ${thaiMonths[tM - 1]} ปี ${tY}`;
    }
  } else if (searchParams.startDate && searchParams.endDate) {
    isRange = true;
    startQueryDate = searchParams.startDate;
    endQueryDate = searchParams.endDate;

    const formatThaiDate = (dStr: string) => {
      try {
        const [y, m, d] = dStr.split('-').map(Number);
        return `${d} ${thaiMonths[m - 1]} ${y}`;
      } catch {
        return dStr;
      }
    };

    reportTitle = `ประจำช่วงวันที่ ${formatThaiDate(startQueryDate)} ถึง ${formatThaiDate(endQueryDate)}`;
  } else {
    const month = parseInt(searchParams.month || (new Date().getMonth() + 1).toString());
    const year = parseInt(searchParams.year || new Date().getFullYear().toString());
    const paddedMonth = month.toString().padStart(2, '0');
    const endDate = new Date(year, month, 0);

    startQueryDate = `${year}-${paddedMonth}-01`;
    endQueryDate = `${year}-${paddedMonth}-${endDate.getDate().toString().padStart(2, '0')}`;
    reportTitle = `ประจำเดือน ${thaiMonths[month - 1]} ปี ${year}`;
  }

  const { data: records, error } = await admin
    .from('accounting_records')
    .select('*')
    .gte('date', startQueryDate)
    .lte('date', endQueryDate)
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

  // Monthly breakdown if multiple months
  const monthsMap: Record<string, {
    mKey: string;
    monthName: string;
    year: string;
    income: number;
    cost: number;
    feeShipping: number;
    otherExpense: number;
    totalExpense: number;
    netProfit: number;
    salesCount: number;
    expenseCount: number;
  }> = {};

  for (const r of list) {
    const mKey = (r.date || '').slice(0, 7);
    if (!mKey) continue;
    if (!monthsMap[mKey]) {
      const [y, m] = mKey.split('-');
      monthsMap[mKey] = {
        mKey,
        monthName: thaiMonths[parseInt(m) - 1],
        year: y,
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
    const item = monthsMap[mKey];
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

  const sortedMonthKeys = Object.keys(monthsMap).sort();
  const showMonthlyBreakdown = sortedMonthKeys.length > 1;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', background: 'white' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: landscape; margin: 10mm; }
          html, body { 
            background: white !important; 
            margin: 0 !important; 
            padding: 0 !important; 
            min-width: 100% !important; 
            height: auto !important; 
            overflow: visible !important; 
          }
          * { overflow: visible !important; }
          .no-print, nav, aside { display: none !important; }
          body > div, main { 
            display: block !important; 
            width: 100% !important; 
            max-width: none !important; 
            height: auto !important; 
            padding: 0 !important; 
            margin: 0 !important;
          }
          table { 
            page-break-inside: auto; 
            width: 100% !important; 
            max-width: 100% !important; 
            table-layout: auto !important;
          }
          tr { page-break-inside: avoid; page-break-after: auto; }
          thead { display: table-header-group; }
          tfoot { display: table-footer-group; }
          td, th { white-space: normal !important; word-break: break-word !important; }
        }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; table-layout: auto; }
        th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
        th { background-color: #f9fafb; font-weight: 600; color: #374151; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .summary-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-top: 24px; display: flex; justify-content: space-between; page-break-inside: avoid; }
      `}} />

      <PrintButtons />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, margin: '0 0 8px 0', color: '#111' }}>รายงานสรุปบัญชี (Accounting Report)</h1>
        <h2 style={{ fontSize: 18, margin: 0, color: '#4b5563', fontWeight: 'normal' }}>
          {reportTitle}
        </h2>
        <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#6b7280' }}>
          ร้านแดนสยามพระเครื่อง (DanSiam Amulets) • ข้อมูลวันที่ {startQueryDate} ถึง {endQueryDate}
        </p>
      </div>

      {/* Multi-Month Breakdown Table */}
      {showMonthlyBreakdown && (
        <div style={{ marginBottom: 32, pageBreakInside: 'avoid' }}>
          <h3 style={{ fontSize: 15, fontWeight: 'bold', margin: '0 0 8px 0', color: '#1f2937' }}>
            📊 สรุปยอดเปรียบเทียบแยกรายเดือน (Monthly Summary Breakdown)
          </h3>
          <table>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th>เดือน / ปี</th>
                <th className="text-center" style={{ width: 110 }}>ยอดขาย / จ่าย</th>
                <th className="text-right" style={{ width: 110 }}>รายรับรวม (฿)</th>
                <th className="text-right" style={{ width: 100 }}>ต้นทุนพระ (฿)</th>
                <th className="text-right" style={{ width: 110 }}>ค่าส่ง+ธรรมเนียม</th>
                <th className="text-right" style={{ width: 100 }}>ค่าใช้จ่ายอื่น</th>
                <th className="text-right" style={{ width: 110 }}>รวมรายจ่าย (฿)</th>
                <th className="text-right" style={{ width: 120 }}>กำไรสุทธิ (฿)</th>
                <th className="text-center" style={{ width: 80 }}>Margin</th>
              </tr>
            </thead>
            <tbody>
              {sortedMonthKeys.map(k => {
                const item = monthsMap[k];
                const margin = item.income > 0 ? ((item.netProfit / item.income) * 100).toFixed(1) : '0';
                return (
                  <tr key={k}>
                    <td style={{ fontWeight: 600 }}>{item.monthName} {item.year}</td>
                    <td className="text-center" style={{ fontSize: 12, color: '#4b5563' }}>
                      ขาย {item.salesCount} / จ่าย {item.expenseCount}
                    </td>
                    <td className="text-right" style={{ fontWeight: 600, color: item.income > 0 ? '#059669' : '#9ca3af' }}>
                      ฿{item.income.toLocaleString()}
                    </td>
                    <td className="text-right" style={{ color: item.cost > 0 ? '#dc2626' : '#9ca3af' }}>
                      {item.cost > 0 ? `฿${item.cost.toLocaleString()}` : '-'}
                    </td>
                    <td className="text-right" style={{ color: item.feeShipping > 0 ? '#dc2626' : '#9ca3af' }}>
                      {item.feeShipping > 0 ? `฿${item.feeShipping.toLocaleString()}` : '-'}
                    </td>
                    <td className="text-right" style={{ color: item.otherExpense > 0 ? '#dc2626' : '#9ca3af' }}>
                      {item.otherExpense > 0 ? `฿${item.otherExpense.toLocaleString()}` : '-'}
                    </td>
                    <td className="text-right" style={{ fontWeight: 600, color: item.totalExpense > 0 ? '#dc2626' : '#9ca3af' }}>
                      ฿{item.totalExpense.toLocaleString()}
                    </td>
                    <td className="text-right" style={{ fontWeight: 'bold', color: item.netProfit >= 0 ? '#059669' : '#dc2626' }}>
                      {item.netProfit >= 0 ? '+' : ''}฿{item.netProfit.toLocaleString()}
                    </td>
                    <td className="text-center" style={{ fontWeight: 600, color: item.netProfit >= 0 ? '#059669' : '#dc2626' }}>
                      {margin}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ background: '#f9fafb', fontWeight: 'bold' }}>
                <td>รวมทุกเดือน</td>
                <td className="text-center">
                  ขาย {list.filter(r => r.type === 'SALE').length} / จ่าย {list.filter(r => r.type === 'EXPENSE').length}
                </td>
                <td className="text-right" style={{ color: '#059669' }}>฿{totalIncome.toLocaleString()}</td>
                <td className="text-right" style={{ color: '#dc2626' }}>
                  ฿{list.filter(r => r.type === 'SALE').reduce((s, r) => s + Number(r.cost || 0), 0).toLocaleString()}
                </td>
                <td className="text-right" style={{ color: '#dc2626' }}>
                  ฿{list.filter(r => r.type === 'SALE').reduce((s, r) => s + Number(r.fee || 0) + Number(r.shipping || 0), 0).toLocaleString()}
                </td>
                <td className="text-right" style={{ color: '#dc2626' }}>
                  ฿{list.filter(r => r.type === 'EXPENSE').reduce((s, r) => s + Number(r.amount || 0), 0).toLocaleString()}
                </td>
                <td className="text-right" style={{ color: '#dc2626' }}>฿{totalExpense.toLocaleString()}</td>
                <td className="text-right" style={{ color: netProfit >= 0 ? '#059669' : '#dc2626' }}>
                  {netProfit >= 0 ? '+' : ''}฿{netProfit.toLocaleString()}
                </td>
                <td className="text-center" style={{ color: netProfit >= 0 ? '#059669' : '#dc2626' }}>
                  {totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : 0}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Main Transactions Table */}
      <h3 style={{ fontSize: 15, fontWeight: 'bold', margin: '20px 0 8px 0', color: '#1f2937' }}>
        📋 รายการเดินบัญชีทั้งหมด ({list.length} รายการ)
      </h3>
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
                ไม่มีรายการในช่วงเวลานี้
              </td>
            </tr>
          ) : (
            list.map((r) => {
              const dateObj = new Date(r.date);
              const formattedDate = dateObj.toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: '2-digit' });
              
              let typeLabel = '';
              if (r.type === 'INCOME') typeLabel = 'รายรับ';
              if (r.type === 'EXPENSE') typeLabel = 'รายจ่าย';
              if (r.type === 'SALE') typeLabel = 'ขายสินค้า';

              let expenseDetails = '';
              if (r.type === 'SALE') {
                const costs = [];
                if (r.cost > 0) costs.push(`ทุน: ฿${r.cost}`);
                if (r.fee > 0) costs.push(`ธรรมเนียม: ฿${r.fee}`);
                if (r.shipping > 0) costs.push(`ส่ง: ฿${r.shipping}`);
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
                  <td className="text-center" style={{ padding: '4px', verticalAlign: 'middle' }}>
                    {r.image_url ? (
                      <div style={{ width: 50, height: 50, margin: '0 auto', borderRadius: 4, overflow: 'hidden', border: '1px solid #eee' }}>
                        <img src={r.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="eager" crossOrigin="anonymous" />
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

      {/* Summary Box */}
      <div className="summary-box">
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#4b5563', marginBottom: 4 }}>รวมรายรับทั้งหมด ({list.filter(r => r.type === 'SALE' || r.type === 'INCOME').length} รายการ)</div>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#059669' }}>฿{totalIncome.toLocaleString()}</div>
        </div>
        <div style={{ width: 1, background: '#e5e7eb', margin: '0 16px' }}></div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#4b5563', marginBottom: 4 }}>รวมรายจ่ายทั้งหมด</div>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#dc2626' }}>฿{totalExpense.toLocaleString()}</div>
        </div>
        <div style={{ width: 1, background: '#e5e7eb', margin: '0 16px' }}></div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#4b5563', marginBottom: 4 }}>กำไรสุทธิรวม (Total Net Profit)</div>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: netProfit >= 0 ? '#059669' : '#dc2626' }}>
            {netProfit >= 0 ? '+' : ''}฿{netProfit.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: 40, fontSize: 12, color: '#9ca3af' }}>
        พิมพ์เมื่อ {new Date().toLocaleString('th-TH')} • DanSiam Amulets Accounting System
      </div>
    </div>
  );
}
