import { NextRequest, NextResponse } from 'next/server';
import { createElement } from 'react';
import { renderToBuffer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { registerSarabunFont } from '@/app/api/print/[id]/LabelPDF';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dansiamamulets.com';
registerSarabunFont(SITE + '/fonts');

// 130mm × 76mm landscape (1mm = 2.8346pt)
const W = 368.5;
const H = 215.4;
const mm = 2.8346;

const s = StyleSheet.create({
  page: { width: W, height: H, backgroundColor: 'white', fontFamily: 'Sarabun' },
  fromBox: { position: 'absolute', left: 2 * mm, top: 2 * mm, width: 68 * mm, height: 22 * mm, padding: 3 },
  fromTextBold: { fontSize: 10, fontWeight: 700, color: '#000', lineHeight: 1.3 },
  fromText: { fontSize: 9, color: '#000', lineHeight: 1.3 },
  rightBox: { position: 'absolute', left: 73 * mm, top: 2 * mm, width: 55 * mm, height: 32 * mm },
  toLabel: { position: 'absolute', left: 2 * mm, top: 44 * mm, fontSize: 10, fontWeight: 700, color: '#000' },
  toBox: { position: 'absolute', left: 12 * mm, top: 42 * mm, width: 116 * mm, height: 32 * mm, padding: 2 },
  toName: { fontSize: 12, fontWeight: 700, lineHeight: 1.3 },
  toAddress: { fontSize: 9.5, fontWeight: 400, lineHeight: 1.4 }
});

function getFontFamily(text: string) {
  if (!text) return 'Sarabun';
  if (/[\u4e00-\u9fa5]/.test(text)) return 'SimHei';
  return 'Sarabun';
}

const addresses = [
  "1. ปกติ: คุณสมหญิง รักดี\n12 ม.3 ต.หนองโพ อ.โพธาราม จ.ราชบุรี 70120\n089-123-4567",
  "2. ติดกันยาว: คุณสมหมาย ใจมั่น\n45/67หมู่บ้านสุขสันต์ซอย5ถนนเพชรเกษมแขวงบางหว้าเขตภาษีเจริญกรุงเทพมหานคร10160โทร0812345678",
  "3. เบอร์ต่อท้าย: นางสาวสวยเสมอ น่ารัก 0854445555\n123/456 ถ.สุขุมวิท 71 แขวงคลองตันเหนือ เขตวัฒนา กทม. 10110",
  "4. เบอร์สุดท้าย: เด็กชายใจดี มีสุข\nหมู่ 1 ต.บ้านไร่ อ.ดำเนินสะดวก จ.ราชบุรี 70130\nโทร.081-111-2222",
  "5. ชื่อยาวมาก: คุณประภาศรี รัตนบดินทร์ ศรีสุวรรณพงศ์\n99/999 หมู่บ้านอภิมหาเศรษฐี ซ.สุขุมวิท 101/1 แขวงบางจาก เขตพระโขนง กรุงเทพมหานคร 10260",
  "6. อังกฤษสั้น: Mr. John Smith\n1234 Elm Street, Apt 5B\nSpringfield, IL 62704\nUSA",
  "7. อังกฤษยาว: Dr. Alexander Bartholomew\nDepartment of Computer Science, University of Technology, 456 University Blvd, Techville, TX 75001, United States",
  "8. จีน: 王先生\n北京市朝阳区建国路88号SOHO现代城A座1201室\n100022\n13800138000",
  "9. จีนติดกัน: 李小龙\n广东省深圳市南山区高新科技园中区科苑路15号科兴科学园B栋3单元1502室邮编518057电话13912345678",
  "10. เบอร์ต่างประเทศ: Somchai Lee\n123 Petchburi Road\nRatchathewi, Bangkok 10400\n+66 89 123 4567",
  "11. ไทยผสมอังกฤษ: สมพร สมบัติ (Somporn Sombat)\n456 Ratchadaphisek Rd, Dindaeng, BKK 10400\n0823334444",
  "12. หลายเบอร์: ร้านค้าออนไลน์\nตลาดจตุจักร โครงการ 1 ซอย 2 แขวงจตุจักร เขตจตุจักร กทม 10900\n081-222-3333, 082-333-4444",
  "13. ยาวมากๆๆๆ: นางมาลี สวยสดใส\n555/555 หมู่บ้านแสนสุขใจสุดๆ ซอยเจริญนคร 14 ถนนเจริญนคร แขวงคลองต้นไทร เขตคลองสาน กรุงเทพมหานคร 10600 ประเทศไทย เบอร์โทรศัพท์ติดต่อ 0899999999",
  "14. สั้นสุดๆ: โต้ง\nไปรษณีย์กลาง บางรัก",
  "15. ไม่มีรหัสปณ.: ป้าแจ๋ว\nร้านส้มตำหน้าปากซอย 5 ถ.จรัญสนิทวงศ์ แขวงบางขุนศรี เขตบางกอกน้อย",
  "16. มีแต่เบอร์: 081-555-6666 สมใจ\nมารับเอง",
  "17. อินเตอร์ไม่บวก: Jane Doe\n45 King St, Sydney NSW 2000, Australia\n61412345678",
  "18. สัญลักษณ์: คุณ A&B\n#123-456 (ชั้น 2) @ตึกคอม, ถ.สุขุมวิท! แขวง... เขต??? กทม. 10110",
  "19. ตัวเลขล้วน: 12345\n88/88 8 8 10110 0812345678",
  "20. คำหลอก: คุณอำนาจ\nตึกอำนวยการ แขวงสีลม เขตบางรัก จันทบุรี 20000",
  "21. ฟอร์แมตเป๊ะ: คุณกิตติ\nบ้านเลขที่ 99/9 ซอยหมู่บ้านศุภาลัยพาร์ควิลล์ ถนนรามอินทรา แขวงคันนายาว เขตคันนายาว กรุงเทพมหานคร 10230\n0812345678",
  "22. คอนโด: นายเอกราช\nคอนโดลุมพินีวิลล์ นครอินทร์-ริเวอร์วิว ห้อง 123/456 ชั้น 20 อาคาร A ถ.นครอินทร์ ต.ตลาดขวัญ อ.เมือง จ.นนทบุรี 11000",
  "23. นิคม: บริษัท เอบีซี จำกัด\nนิคมอุตสาหกรรมอมตะนคร 700/123 ม.1 ต.บ้านเก่า อ.พานทอง จ.ชลบุรี 20160",
  "24. ติดกันยาวมาก2: นางสาวสวยเจริญรุ่งเรืองบ้านเลขที่123หมู่4ตำบลหนองปรืออำเภอบางละมุงจังหวัดชลบุรี20150โทร0898765432",
  "25. ชื่อสั้นที่ยาว: น.\n888/888อาคารจีทาวเวอร์แกรนด์พระราม9ชั้น35ถนนพระราม9แขวงห้วยขวางเขตห้วยขวางกรุงเทพมหานคร10310",
  "26. เบอร์แปลก: พี่บอล\n12 ถ.สุขสวัสดิ์ จอมทอง กทม 10150\nโทร (081) 234-5678 ต่อ 123",
  "27. เคาะสเปซเยอะ: คุณนัท\n15     ซอย     พหลโยธิน   แขวงสามเสนใน    พญาไท  10400",
  "28. ต./อ. ห่าง: คุณแอน\n99 ม.1 ต. คลองหนึ่ง อ. คลองหลวง จ. ปทุมธานี 12120",
  "29. รัสเซีย: Матвей\nУлица Пушкина, Дом 10, Квартира 5\nМосква, Россия 101000\n+7 916 123-45-67",
  "30. รับเอง: ไม่ประสงค์ออกนาม\nมารับเองหน้าโรงงาน"
];

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const pages = addresses.map((rawText, index) => {
      let text = rawText || '';
      
      // Auto formatting logic just like route.tsx
      text = text.replace(/([^\s])(ตำบล|แขวง|อำเภอ|เขต|จังหวัด|ต\.|อ\.|จ\.|รหัส)/g, '$1 $2');
      text = text.replace(/([^\s])(\d{5})(?!\d)/g, '$1 $2');

      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      const customer_name = lines.length > 0 ? lines[0] : 'Unknown';
      const addressLines = lines.slice(1).join(' ');

      const orderNo = `TEST${(index + 1).toString().padStart(4, '0')}`;

      const sender = {
        name: 'Dansiamamulets',
        phone: '+66898157535',
        address: '105/1 M.2, NONGPHO, PHOTHARAM,\nRATCHABURI, THAILAND 70120'
      };
      const senderAddressLines = sender.address.split('\n');

      return createElement(Page, { key: index, size: [W, H], style: s.page }, 
        createElement(View, { style: s.fromBox }, 
          createElement(Text, { style: { ...s.fromTextBold, fontFamily: getFontFamily(sender.name) } }, `From : ${sender.name} (${sender.phone})`),
          ...senderAddressLines.map((line, i) => createElement(Text, { key: i, style: { ...s.fromText, fontFamily: getFontFamily(line) } }, line))
        ),
        createElement(View, { style: s.rightBox }),
        createElement(Text, { style: s.toLabel }, "To :"),
        createElement(View, { style: s.toBox }, 
          createElement(Text, { style: { ...s.toName, fontFamily: getFontFamily(customer_name) } }, customer_name),
          createElement(Text, { style: { ...s.toAddress, fontFamily: getFontFamily(addressLines) } }, addressLines)
        )
      );
    });

    const buffer = await (renderToBuffer as any)(
      createElement(Document, null, ...pages)
    );

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="label-test-30.pdf"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (e: any) {
    return new NextResponse(`PDF error: ${e?.message ?? String(e)}`, { status: 500 });
  }
}
