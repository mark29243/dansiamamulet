import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

export function registerSarabunFont(fontDir: string) {
  Font.register({
    family: 'Sarabun',
    fonts: [
      { src: `${fontDir}/Sarabun-Regular.ttf` },
      { src: `${fontDir}/Sarabun-Bold.ttf`, fontWeight: 700 },
    ],
  });
}

// 76mm × 130mm portrait (1mm = 2.8346pt)
const W = 215.4;  // 76mm
const H = 368.5;  // 130mm

const s = StyleSheet.create({
  page: {
    width: W, height: H,
    flexDirection: 'column',
    backgroundColor: 'white',
    fontFamily: 'Sarabun',
  },
  header: {
    backgroundColor: '#1A1208',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  headerBrand: { color: '#C9A84C', fontSize: 8 },
  headerOrder: { color: 'white', fontSize: 11, fontWeight: 700 },
  body: { flex: 1, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 6 },
  fromLabel: { fontSize: 6, color: '#999', marginBottom: 2 },
  fromName: { fontSize: 8.5, fontWeight: 700, color: '#1A1208', marginBottom: 1 },
  fromAddr: { fontSize: 7, color: '#555', lineHeight: 1.45 },
  fromPhone: { fontSize: 7, color: '#777', marginTop: 1 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 9, marginBottom: 9 },
  dividerLine: { flex: 1, height: 0.5, backgroundColor: '#EDE0C4' },
  dividerDot: { fontSize: 7, color: '#C9A84C', marginHorizontal: 4 },
  toLabel: { fontSize: 6, color: '#999', textAlign: 'right', marginBottom: 3 },
  toName: { fontSize: 15, fontWeight: 700, color: '#1A1208', textAlign: 'right', marginBottom: 3 },
  toAddr: { fontSize: 8.5, color: '#333', lineHeight: 1.6, textAlign: 'right' },
  toPhone: { fontSize: 10, fontWeight: 700, color: '#222', textAlign: 'right', marginTop: 4 },
  footer: {
    backgroundColor: '#F7F0E3',
    borderTopWidth: 0.5,
    borderTopColor: '#EDE0C4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  footerText: { fontSize: 8, color: '#555', fontWeight: 700, letterSpacing: 1 },
});

interface Props {
  order: { id: string; customer_name: string; customer_phone?: string; shipping_address: any };
  lang: 'th' | 'en';
}

const SENDER = {
  th: { name: 'พระเครื่องแดนสยาม', addr1: '105/1 ม.2 ต.หนองโพ', addr2: 'อ.โพธาราม จ.ราชบุรี 70120', phone: '063-240-5335' },
  en: { name: 'Dan Siam Amulets', addr1: '105/1 M.2, Nongpho', addr2: 'Photharam, Ratchaburi 70120 TH', phone: '+66 63 240 5335' },
};

export function LabelPDF({ order, lang }: Props) {
  const orderNo = order.id.slice(0, 8).toUpperCase();
  const sender = SENDER[lang];
  const addr = order.shipping_address;
  const addrLine3 = [addr.city, addr.state, addr.postal_code].filter(Boolean).join(', ');

  return (
    <Document>
      <Page size={[W, H]} style={s.page}>

        {/* Header */}
        <View style={s.header}>
          <Text style={s.headerBrand}>{lang === 'th' ? 'พระเครื่อง · แดนสยาม' : 'Dan Siam Amulets'}</Text>
          <Text style={s.headerOrder}>#{orderNo}</Text>
        </View>

        {/* Body */}
        <View style={s.body}>
          {/* FROM */}
          <Text style={s.fromLabel}>{lang === 'th' ? 'ผู้ส่ง' : 'FROM'}</Text>
          <Text style={s.fromName}>{sender.name}</Text>
          <Text style={s.fromAddr}>{sender.addr1}{'\n'}{sender.addr2}</Text>
          <Text style={s.fromPhone}>Tel: {sender.phone}</Text>

          {/* Divider */}
          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerDot}>- o -</Text>
            <View style={s.dividerLine} />
          </View>

          {/* TO */}
          <Text style={s.toLabel}>{lang === 'th' ? 'ผู้รับ' : 'TO'}</Text>
          <Text style={s.toName}>{order.customer_name}</Text>
          <Text style={s.toAddr}>
            {addr.line1}
            {addr.line2 ? '\n' + addr.line2 : ''}
            {'\n'}{addrLine3}
            {'\n'}{addr.country}
          </Text>
          {order.customer_phone && (
            <Text style={s.toPhone}>Tel: {order.customer_phone}</Text>
          )}
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>||| {orderNo} |||</Text>
        </View>

      </Page>
    </Document>
  );
}
