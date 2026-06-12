'use client';
import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { IcoPackage, IcoWarning, IcoGlobe, IcoTruck } from '@/components/icons';

export default function ShippingContent() {
  const { lang } = useLang();

  const content = {
    th: {
      title: 'นโยบายการจัดส่ง',
      subtitle: 'จัดส่งทั่วโลก · รวดเร็ว · ปลอดภัย',
      domestic: {
        title: lang === 'th' ? 'ในประเทศไทย' : 'ไทย',
        rows: [
          ['ไปรษณีย์ไทย', '฿50 (พื้นที่ห่างไกล ฿60)', '1-3 วันทำการ'],
          ['Flash Express', '฿50 (พื้นที่ห่างไกล ฿100)', '1-3 วันทำการ'],
          ['Kerry Express', '฿50 (พื้นที่ห่างไกล ฿100)', '1-3 วันทำการ'],
        ],
        note: 'จัดส่งทุกวันจันทร์-เสาร์ ยกเว้นวันหยุดนักขัตฤกษ์',
      },
      international: {
        title: 'ต่างประเทศ',
        rows: [
          ['เอเชีย (จีน/ญี่ปุ่น/ฮ่องกง)', 'SPA ฿100-130 / ePacket ฿175-200', 'SPA 14-30 วัน / ePacket 7-15 วัน'],
          ['ยุโรป / อเมริกา / ออสเตรเลีย', 'SPA ฿130-250 / ePacket ฿240-390', 'SPA 14-30 วัน / ePacket 7-15 วัน'],
        ],
        note: 'ePacket มี tracking number · SPA (Small Packet Air) ไม่มี tracking · ราคาจริงคำนวณตามน้ำหนักและปลายทางที่ checkout',
      },
      packaging: {
        title: 'การบรรจุภัณฑ์',
        text: 'พระเครื่องทุกองค์บรรจุในกล่องกันกระแทกอย่างดี',
      },
      note: {
        title: 'หมายเหตุ',
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
        title: 'Within Thailand',
        rows: [
          ['Thailand Post', '฿50 (remote area ฿60)', '1-3 business days'],
          ['Flash Express', '฿50 (remote area ฿100)', '1-3 business days'],
          ['Kerry Express', '฿50 (remote area ฿100)', '1-3 business days'],
        ],
        note: 'Ships Monday–Saturday, excluding public holidays',
      },
      international: {
        title: 'International',
        rows: [
          ['Asia (China/Japan/HK)', 'SPA ฿100-130 / ePacket ฿175-200', 'SPA 14-30 days / ePacket 7-15 days'],
          ['Europe / Americas / Australia', 'SPA ฿130-250 / ePacket ฿240-390', 'SPA 14-30 days / ePacket 7-15 days'],
        ],
        note: 'ePacket includes tracking number · SPA (Small Packet Air) is untracked · Exact rate calculated at checkout based on weight and destination',
      },
      packaging: {
        title: 'Packaging',
        text: 'Each amulet is carefully packed in a cushioned box with a certificate of authenticity and a sacred cloth wrapping.',
      },
      note: {
        title: 'Please Note',
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
        title: '泰国境内',
        rows: [
          ['泰国邮政', '฿50（偏远地区 ฿60）', '1-3个工作日'],
          ['Flash Express', '฿50（偏远地区 ฿100）', '1-3个工作日'],
          ['Kerry Express', '฿50（偏远地区 ฿100）', '1-3个工作日'],
        ],
        note: '周一至周六发货，公共假日除外',
      },
      international: {
        title: '国际配送',
        rows: [
          ['亚洲（中国/日本/香港）', 'SPA ฿100-130 / ePacket ฿175-200', 'SPA 14-30天 / ePacket 7-15天'],
          ['欧洲 / 美洲 / 澳大利亚', 'SPA ฿130-250 / ePacket ฿240-390', 'SPA 14-30天 / ePacket 7-15天'],
        ],
        note: 'ePacket含追踪号码 · SPA（小包航空）不含追踪 · 实际运费在结账时根据重量和目的地计算',
      },
      packaging: {
        title: '包装',
        text: '每件佛牌均采用防震盒精心包装，附真品证书和神圣布料包裹。',
      },
      note: {
        title: '注意事项',
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
        <h2 className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <IcoTruck size={18} style={{ color: 'var(--gold-dark)' }} /> {t.domestic.title}
        </h2>
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
        <h2 className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <IcoGlobe size={18} style={{ color: 'var(--gold-dark)' }} /> {t.international.title}
        </h2>
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
        <h2 className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <IcoPackage size={18} style={{ color: 'var(--gold-dark)' }} /> {t.packaging.title}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{t.packaging.text}</p>
      </div>

      {/* Note */}
      <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid var(--gold-light)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
        <h3 className="serif" style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <IcoWarning size={16} style={{ color: 'var(--gold-dark)' }} /> {t.note.title}
        </h3>
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
