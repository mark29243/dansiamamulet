'use client';
import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { IcoTrophy, IcoClock, IcoCheck, IcoSearch, IcoMoney, IcoPackage, IcoClipboard } from '@/components/icons';
import type { ReactNode } from 'react';

type ReturnItem = { icon: ReactNode; title: string; text: string };

const CONTENT = {
  th: {
    title: 'การรับประกันและคืนสินค้า',
    subtitle: 'รับประกันความแท้ 100% · คืนเงินเต็มจำนวน',
    guarantee: {
      title: '✦ รับประกันความแท้ 100%',
      text: 'พระเครื่องแดนสยามทุกองค์ได้รับการคัดสรรและรับรองความแท้จากผู้เชี่ยวชาญ ทุกชิ้นพร้อมใบรับรองความแท้ หากพิสูจน์ได้ว่าสินค้าไม่แท้ ยินดีคืนเงินเต็มจำนวน',
    },
    returns: {
      title: '↩ เงื่อนไขการคืนสินค้า',
      items: [
        { icon: <IcoClock size={22} />, title: 'ระยะเวลา', text: 'แจ้งคืนภายใน 7 วันหลังได้รับสินค้า' },
        { icon: <IcoCheck size={22} />, title: 'เงื่อนไขสินค้า', text: 'สินค้าต้องอยู่ในสภาพเดิม ไม่มีร่องรอยการใช้งาน' },
        { icon: <IcoSearch size={22} />, title: 'เหตุผล', text: 'รับคืนเฉพาะกรณีที่พิสูจน์ได้ว่าสินค้าไม่แท้เท่านั้น' },
        { icon: <IcoMoney size={22} />, title: 'การคืนเงิน', text: 'คืนเงินเต็มจำนวนภายใน 5-7 วันทำการ หลังได้รับสินค้าคืน' },
        { icon: <IcoPackage size={22} />, title: 'ค่าส่งคืน', text: 'ทางร้านเป็นผู้รับผิดชอบค่าส่งสินค้าคืน' },
      ] as ReturnItem[],
    },
    process: {
      title: 'ขั้นตอนการคืนสินค้า',
      steps: [
        'ติดต่อเราทาง LINE หรืออีเมล พร้อมแจ้งเลขออเดอร์และเหตุผล',
        'ส่งรูปถ่ายสินค้าและใบรับรองมาให้ทีมงานตรวจสอบ',
        'รอการยืนยันจากทีมงานภายใน 2 วันทำการ',
        'ส่งสินค้าคืนทางไปรษณีย์พร้อมเลขพัสดุ',
        'รับเงินคืนภายใน 5-7 วันทำการ',
      ],
    },
  },
  en: {
    title: 'Returns & Guarantee',
    subtitle: '100% Authenticity Guarantee · Full Refund',
    guarantee: {
      title: '✦ 100% Authenticity Guarantee',
      text: 'Every amulet at Dan Siam is hand-selected and certified authentic by our experts. Each piece comes with a certificate of authenticity. If proven to be inauthentic, we offer a full refund — no questions asked.',
    },
    returns: {
      title: '↩ Return Policy',
      items: [
        { icon: <IcoClock size={22} />, title: 'Time Limit', text: 'Contact us within 7 days of receiving your order' },
        { icon: <IcoCheck size={22} />, title: 'Condition', text: 'Item must be in original condition with no signs of use' },
        { icon: <IcoSearch size={22} />, title: 'Reason', text: 'Returns accepted only if the item is proven to be inauthentic' },
        { icon: <IcoMoney size={22} />, title: 'Refund', text: 'Full refund within 5-7 business days after we receive the item back' },
        { icon: <IcoPackage size={22} />, title: 'Return Shipping', text: 'We cover all return shipping costs' },
      ] as ReturnItem[],
    },
    process: {
      title: 'Return Process',
      steps: [
        'Contact us via LINE or email with your order number and reason',
        'Send photos of the item and certificate for our team to review',
        'Await confirmation from our team within 2 business days',
        'Ship the item back with a tracking number',
        'Receive your refund within 5-7 business days',
      ],
    },
  },
  zh: {
    title: '退货与保证',
    subtitle: '100%正品保证 · 全额退款',
    guarantee: {
      title: '✦ 100%正品保证',
      text: '丹暹罗的每件佛牌均由专家精心挑选并认证为正品。每件附有真品证书。如证明为非正品，我们提供全额退款，无需质疑。',
    },
    returns: {
      title: '↩ 退货政策',
      items: [
        { icon: <IcoClock size={22} />, title: '时限', text: '收到商品后7天内联系我们' },
        { icon: <IcoCheck size={22} />, title: '商品状态', text: '商品必须保持原始状态，无使用痕迹' },
        { icon: <IcoSearch size={22} />, title: '原因', text: '仅接受经证明为非正品的退货' },
        { icon: <IcoMoney size={22} />, title: '退款', text: '收到退货后5-7个工作日内全额退款' },
        { icon: <IcoPackage size={22} />, title: '退货运费', text: '店铺承担退货运费' },
      ] as ReturnItem[],
    },
    process: {
      title: '退货流程',
      steps: [
        '通过LINE或邮件联系我们，提供订单号和原因',
        '发送商品和证书照片供我们团队审核',
        '等待我们团队2个工作日内确认',
        '附追踪号寄回商品',
        '5-7个工作日内收到退款',
      ],
    },
  },
};

export default function ReturnsContent() {
  const { lang } = useLang();
  const t = CONTENT[lang as keyof typeof CONTENT] || CONTENT.en;

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px 80px', maxWidth: 800 }}>
      <nav className="breadcrumb" style={{ marginBottom: 20 }}>
        <Link href="/">{lang === 'th' ? 'หน้าแรก' : lang === 'zh' ? '首页' : 'Home'}</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{t.title}</span>
      </nav>

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div className="serif" style={{ fontSize: 10, letterSpacing: 5, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 10 }}>✦ GUARANTEE ✦</div>
        <h1 className="serif" style={{ fontSize: 32, fontWeight: 300, fontStyle: 'italic', marginBottom: 8 }}>{t.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{t.subtitle}</p>
      </div>

      <div style={{ background: 'linear-gradient(135deg, var(--deep), #2A1E08)', borderRadius: 'var(--radius-lg)', padding: 32, marginBottom: 24, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: 'var(--gold)' }}>
          <IcoTrophy size={48} strokeWidth={1.2} />
        </div>
        <h2 className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--gold)', marginBottom: 12 }}>{t.guarantee.title}</h2>
        <p style={{ fontSize: 14, color: '#A89868', lineHeight: 1.8, maxWidth: 500, margin: '0 auto' }}>{t.guarantee.text}</p>
      </div>

      <div className="card" style={{ marginBottom: 24, padding: 28 }}>
        <h2 className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>{t.returns.title}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {t.returns.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--gold-dark)', flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
              <div>
                <div className="serif" style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)', marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 28 }}>
        <h2 className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <IcoClipboard size={20} style={{ color: 'var(--gold-dark)' }} /> {t.process.title}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {t.process.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: 'var(--deep)' }}>{i + 1}</div>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6, paddingTop: 4 }}>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
