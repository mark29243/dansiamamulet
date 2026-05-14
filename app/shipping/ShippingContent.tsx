'use client';
import Link from 'next/link';
import { useLang } from '@/components/LangProvider';

export default function ShippingContent() {
  const { lang } = useLang();

  const content = {
    th: {
      title: 'นโยบายการจัดส่ง',
      subtitle: 'จัดส่งทั่วโลก · รวดเร็ว · ปลอดภัย',
      domestic: {
        title: '🇹🇭 ในประเทศไทย',
        rows: [
          ['Kerry / Flash Express', '฿50', '1-3 วันทำการ'],
          ['พื้นที่ห่างไกล', '฿100', '3-5 วันทำการ'],
        ],
        note: 'จัดส่งทุกวันจันทร์-เสาร์ ยกเว้นวันหยุดนักขัตฤกษ์',
      },
      international: {
        title: '🌏 ต่างประเทศ',
        rows: [
          ['เอเชีย (จีน/ญี่ปุ่น/ฮ่องกง)', 'Airmail ฿150 / EMS ฿350', '7-15 วัน / 5-7 วัน'],
          ['ทั่วโลก (ยุโรป/อเมริกา)', 'Airmail ฿200 / EMS ฿520', '14-21 วัน / 7-10 วัน'],
        ],
        note: 'EMS มี tracking number ทุกชิ้น · Airmail ไม่มี tracking',
      },
      packaging: {
        title: '📦 การบรรจุภัณฑ์',
        text: 'พระเครื่องทุกองค์บรรจุในกล่องกันกระแทกอย่างดี',
      },
      note: {
        title: '⚠️ หมายเหตุ',
        items: [
          'ค่าส่งคิดแยกต่างหากจากราคาสินค้า',
          'สำหรับต่างประเทศ ลูกค้าต้องรับผิดชอบค่าภาษีนำเข้าของแต่ละประเทศ',
          'หลังชำระเงินแล้ว จัดส่งภายใน 1-2 วันทำการ',
        ],
      },
    },
    en: {
      title: 'Shipping Policy',
      subtitle: 'Worldwide Shipping · Fast · Secure',
      domestic: {
        title: '🇹🇭 Within Thailand',
        rows: [
          ['Kerry / Flash Express', '฿50', '1-3 business days'],
          ['Remote areas', '฿100', '3-5 business days'],
        ],
        note: 'Ships Monday–Saturday, excluding public holidays',
      },
      international: {
        title: '🌏 International',
        rows: [
          ['Asia (China/Japan/HK)', 'Airmail ฿150 / EMS ฿350', '7-15 days / 5-7 days'],
          ['Worldwide (Europe/USA)', 'Airmail ฿200 / EMS ฿520', '14-21 days / 7-10 days'],
        ],
        note: 'EMS includes tracking number · Airmail is untracked',
      },
      packaging: {
        title: '📦 Packaging',
        text: 'Each amulet is carefully packed in a cushioned box with a certificate of authenticity and a sacred cloth wrapping.',
      },
      note: {
        title: '⚠️ Please Note',
        items: [
          'Shipping fees are charged separately from the product price',
          'For international orders, the buyer is responsible for any import duties or taxes',
          'Orders are dispatched within 1-2 business days after payment',
        ],
      },
    },
    zh: {
      title: '配送政策',
      subtitle: '全球配送 · 快速 · 安全',
      domestic: {
        title: '🇹🇭 泰国境内',
        rows: [
          ['Kerry / Flash Express', '฿50', '1-3个工作日'],
          ['偏远地区', '฿100', '3-5个工作日'],
        ],
        note: '周一至周六发货，公共假日除外',
      },
      international: {
        title: '🌏 国际配送',
        rows: [
          ['亚洲（中国/日本/香港）', '普通航空 ฿150 / EMS ฿350', '7-15天 / 5-7天'],
          ['全球（欧洲/美国）', '普通航空 ฿200 / EMS ฿520', '14-21天 / 7-10天'],
        ],
        note: 'EMS含追踪号码 · 普通航空邮件不含追踪',
      },
      packaging: {
        title: '📦 包装',
        text: '每件佛牌均采用防震盒精心包装，附真品证书和神圣布料包裹。',
      },
      note: {
        title: '⚠️ 注意事项',
        items: [
          '运费与商品价格分开计算',
          '国际订单买家需自行承担进口关税',
          '付款后1-2个工作日内发货',
        ],
      },
    },
  };

  const t = content[lang] || content.en;

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px 80px', maxWidth: 800 }}>
      <nav className="breadcrumb" style={{ marginBottom: 20 }}>
        <Link href="/">{lang === 'th' ? 'หน้าแรก' : lang === 'zh' ? '首页' : 'Home'}</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{t.title}</span>
      </nav>

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div className="serif" style={{ fontSize: 10, letterSpacing: 5, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 10 }}>✦ SHIPPING ✦</div>
        <h1 className="serif" style={{ fontSize: 32, fontWeight: 300, fontStyle: 'italic', marginBottom: 8 }}>{t.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{t.subtitle}</p>
      </div>

      {/* Domestic */}
      <div className="card" style={{ marginBottom: 24, padding: 28 }}>
        <h2 className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>{t.domestic.title}</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--cream-dark)' }}>
              {[lang === 'th' ? 'บริการ' : lang === 'zh' ? '服务' : 'Service',
                lang === 'th' ? 'ราคา' : lang === 'zh' ? '价格' : 'Rate',
                lang === 'th' ? 'ระยะเวลา' : lang === 'zh' ? '时效' : 'Duration'].map((h, i) => (
                <th key={i} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--gold-dark)', fontWeight: 600, fontSize: 11, letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.domestic.rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--cream-dark)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '12px', color: 'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>* {t.domestic.note}</p>
      </div>

      {/* International */}
      <div className="card" style={{ marginBottom: 24, padding: 28 }}>
        <h2 className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>{t.international.title}</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--cream-dark)' }}>
              {[lang === 'th' ? 'ปลายทาง' : lang === 'zh' ? '目的地' : 'Destination',
                lang === 'th' ? 'ราคา' : lang === 'zh' ? '价格' : 'Rate',
                lang === 'th' ? 'ระยะเวลา' : lang === 'zh' ? '时效' : 'Duration'].map((h, i) => (
                <th key={i} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--gold-dark)', fontWeight: 600, fontSize: 11, letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.international.rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--cream-dark)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '12px', color: 'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>* {t.international.note}</p>
      </div>

      {/* Packaging */}
      <div className="card" style={{ marginBottom: 24, padding: 28 }}>
        <h2 className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{t.packaging.title}</h2>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{t.packaging.text}</p>
      </div>

      {/* Note */}
      <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid var(--gold-light)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
        <h3 className="serif" style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.note.title}</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {t.note.items.map((item, i) => (
            <li key={i} style={{ fontSize: 13, color: 'var(--text)', display: 'flex', gap: 8 }}>
              <span style={{ color: 'var(--gold)' }}>✦</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
