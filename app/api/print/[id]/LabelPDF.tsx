import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

export function registerSarabunFont(fontDir: string) {
  Font.register({
    family: 'Sarabun',
    fonts: [
      { src: `${fontDir}/Sarabun-Regular.ttf` },
      { src: `${fontDir}/Sarabun-Bold.ttf`, fontWeight: 700 },
    ],
  });
  Font.register({
    family: 'SimHei',
    fonts: [
      { src: `${fontDir}/SimHei.ttf` },
      { src: `${fontDir}/NotoSansSC-Bold.otf`, fontWeight: 700 }
    ]
  });
}

function getFontFamily(text: string) {
  if (!text) return 'Sarabun';
  if (/[\u4e00-\u9fa5]/.test(text)) return 'SimHei';
  return 'Sarabun';
}

// 130mm × 76mm landscape (1mm = 2.8346pt)
const W = 368.5;  // 130mm
const H = 215.4;  // 76mm
const mm = 2.8346;

const s = StyleSheet.create({
  page: {
    width: W, height: H,
    backgroundColor: 'white',
    fontFamily: 'Sarabun',
  },
  fromBox: {
    position: 'absolute',
    left: 2 * mm, top: 2 * mm,
    width: 68 * mm, height: 22 * mm,
    padding: 3,
  },
  fromTextBold: { fontSize: 10, fontWeight: 700, color: '#000', lineHeight: 1.3 },
  fromText: { fontSize: 9, color: '#000', lineHeight: 1.3 },
  rightBox: {
    position: 'absolute',
    left: 73 * mm, top: 2 * mm,
    width: 55 * mm, height: 32 * mm,
  },
  orderNoText: { fontSize: 10, color: '#666' },
  toLabel: {
    position: 'absolute',
    left: 2 * mm, top: 44 * mm,
    fontSize: 10, fontWeight: 700, color: '#000',
  },
  toBox: {
    position: 'absolute',
    left: 12 * mm, top: 42 * mm,
    width: 116 * mm, height: 32 * mm,
    padding: 2,
  },
  toName: { fontSize: 12, fontWeight: 700, lineHeight: 1.3 },
  toAddress: { fontSize: 9.5, fontWeight: 400, lineHeight: 1.4 }
});

interface Props {
  order: { id: string; customer_name: string; customer_phone?: string; shipping_address: any };
  lang: 'th' | 'en';
  sender?: {
    name: string;
    phone: string;
    address: string;
  };
  isCod?: boolean;
}

export function LabelPDF({ order, lang, sender, isCod }: Props) {
  const orderNo = order.id.slice(0, 8).toUpperCase();
  const addr = order.shipping_address;
  const addrLine3 = [addr.city, addr.state, addr.postal_code].filter(Boolean).join(', ');
  const fullAddress = `${addr.line1 || ''} ${addr.line2 || ''} ${addrLine3} ${addr.country || ''}`;

  const senderName = sender?.name || 'Dansiamamulets';
  const senderPhone = sender?.phone || '+66898157535';
  const senderAddress = sender?.address || '105/1 M.2, NONGPHO, PHOTHARAM,\nRATCHABURI, THAILAND 70120';
  const senderAddressLines = senderAddress.split('\n');

  // If COD, we leave 50x50mm at bottom-left, so we shift "To" section to the right (e.g. left 52mm instead of 2/12mm).
  const dynamicToLabelStyle = isCod 
    ? { ...s.toLabel, left: 52 * mm } 
    : s.toLabel;
  const dynamicToBoxStyle = isCod 
    ? { ...s.toBox, left: 62 * mm, width: 66 * mm } 
    : s.toBox;

  return (
    <Document>
      <Page size={[W, H]} style={s.page}>
        
        {/* From Box */}
        <View style={s.fromBox}>
          <Text style={{ ...s.fromTextBold, fontFamily: getFontFamily(senderName) }}>
            From : {senderName} {senderPhone ? `(${senderPhone})` : ''}
          </Text>
          {senderAddressLines.map((line, i) => (
            <Text key={i} style={{ ...s.fromText, fontFamily: getFontFamily(line) }}>
              {line}
            </Text>
          ))}
        </View>

        {/* Right Box (Sticker Area) */}
        <View style={s.rightBox}></View>

        {/* To Section */}
        <Text style={dynamicToLabelStyle}>To :</Text>
        <View style={dynamicToBoxStyle}>
          <Text style={{ ...s.toName, fontFamily: getFontFamily(order.customer_name) }}>
            {order.customer_name} {order.customer_phone ? `${order.customer_phone}` : ''}
          </Text>
          <Text style={{ ...s.toAddress, fontFamily: getFontFamily(fullAddress) }}>
            {addr.line1}
            {addr.line2 ? ' ' + addr.line2 : ''}
            {' '}{addrLine3}
            {'\n'}{addr.country}
          </Text>
        </View>

      </Page>
    </Document>
  );
}
