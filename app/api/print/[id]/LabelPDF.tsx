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

// 130mm × 76mm landscape (1mm = 2.8346pt)
const W = 368.5;  // 130mm
const H = 215.4;  // 76mm

const s = StyleSheet.create({
  page: {
    width: W, height: H,
    flexDirection: 'column',
    backgroundColor: 'white',
    fontFamily: 'Sarabun',
    padding: 10,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  fromBox: {
    width: 70.4 * 2.8346,
    height: 16.9 * 2.8346,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    padding: 3,
    borderRadius: 4,
  },
  fromText: {
    fontSize: 6,
    color: '#000',
    lineHeight: 1.3,
  },
  rightBox: {
    width: 55 * 2.8346,
    height: 32 * 2.8346,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderNoText: {
    fontSize: 8,
    color: '#666',
  },
  toSection: {
    flexDirection: 'column',
    marginTop: 2,
  },
  toNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  toLabel: {
    fontSize: 10,
    fontWeight: 700,
    marginRight: 4,
  },
  nameBox: {
    width: 80 * 2.8346,
    height: 11 * 2.8346, // slightly taller than 9mm to fit font properly
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    paddingHorizontal: 4,
    justifyContent: 'center',
    borderRadius: 4,
  },
  nameText: {
    fontSize: 10,
    fontWeight: 700,
  },
  addressBox: {
    width: 109 * 2.8346,
    height: 27 * 2.8346,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    padding: 4,
    borderRadius: 4,
    marginLeft: 14, // align with name box
  },
  addressText: {
    fontSize: 10,
    fontWeight: 700,
    lineHeight: 1.4,
  }
});

interface Props {
  order: { id: string; customer_name: string; customer_phone?: string; shipping_address: any };
  lang: 'th' | 'en';
}

export function LabelPDF({ order, lang }: Props) {
  const orderNo = order.id.slice(0, 8).toUpperCase();
  const addr = order.shipping_address;
  const addrLine3 = [addr.city, addr.state, addr.postal_code].filter(Boolean).join(', ');

  return (
    <Document>
      <Page size={[W, H]} style={s.page}>

        {/* Top Section */}
        <View style={s.topSection}>
          <View style={s.fromBox}>
            <Text style={s.fromText}>
              From : Dansiamamulets (+66898157535){'\n'}
              105/1 M.2, NONGPHO, PHOTHARAM,{'\n'}
              RATCHABURI, THAILAND 70120
            </Text>
          </View>
          <View style={s.rightBox}>
             <Text style={s.orderNoText}>#{orderNo}</Text>
          </View>
        </View>

        {/* To Section */}
        <View style={s.toSection}>
          <View style={s.toNameRow}>
            <Text style={s.toLabel}>To :</Text>
            <View style={s.nameBox}>
              <Text style={s.nameText}>{order.customer_name}</Text>
            </View>
          </View>
          <View style={s.addressBox}>
            <Text style={s.addressText}>
              {addr.line1}
              {addr.line2 ? ' ' + addr.line2 : ''}
              {' '}{addrLine3}
              {'\n'}{addr.country}
              {order.customer_phone ? `\nTel: ${order.customer_phone}` : ''}
            </Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}
