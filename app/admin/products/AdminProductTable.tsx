'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import StockEditor from './StockEditor';
import PublishButton from './PublishButton';
import { useToast } from '@/components/ToastProvider';
import * as XLSX from 'xlsx';

const SHOPEE_ROW_1 = ['หมวดหมู่สินค้า', 'ชื่อสินค้า', 'รายละเอียดสินค้า', 'จำนวนสินค้าสูงสุดที่ซื้อได้', 'จำนวนสินค้าสูงสุดที่ซื้อได้ - เวลาเริ่มต้น', 'จำนวนสินค้าสูงสุดที่ซื้อได้ - ระยะเวลา (วัน)', 'จำนวนสินค้าสูงสุดที่ซื้อได้ - วันที่สิ้นสุด', 'จำนวนการซื้อขั้นต่ำ', 'Parent SKU', 'เลขอ้างอิงตัวเลือกสินค้า', 'ชื่อตัวเลือก 1', 'ตัวเลือก 1', 'ภาพตัวเลือก', 'ชื่อตัวเลือก 2', 'ตัวเลือก 2', 'ราคา', 'คลังสินค้า', 'เลข SKU', 'แบบฟอร์มตารางขนาดสินค้า', 'รูปภาพตารางขนาดสินค้า', 'GTIN', 'ภาพปก', 'รูปภาพ 1', 'รูปภาพ 2', 'รูปภาพ 3', 'รูปภาพ 4', 'รูปภาพ 5', 'รูปภาพ 6', 'รูปภาพ 7', 'รูปภาพ 8', 'น้ำหนัก', 'ความยาว', 'ความกว้าง', 'ความสูง', 'Standard Delivery - ส่งธรรมดาในประเทศ', 'Express Delivery - ส่งด่วน', 'ระยะเวลาเตรียมพัสดุสำหรับสินค้าพรีออเดอร์', 'เหตุผล'];
const SHOPEE_ROW_2 = ['ตัวเลือกเสริม', 'จำเป็นต้องกรอก', 'จำเป็นต้องกรอก', 'ตัวเลือกเสริม', 'เงื่อนไขบังคับที่ต้องเลือก', 'เงื่อนไขบังคับที่ต้องเลือก', 'เงื่อนไขบังคับที่ต้องเลือก', 'ตัวเลือกเสริม', 'ตัวเลือกเสริม', 'เงื่อนไขบังคับที่ต้องเลือก', 'เงื่อนไขบังคับที่ต้องเลือก', 'เงื่อนไขบังคับที่ต้องเลือก', 'เงื่อนไขบังคับที่ต้องเลือก', 'เงื่อนไขบังคับที่ต้องเลือก', 'เงื่อนไขบังคับที่ต้องเลือก', 'จำเป็นต้องกรอก', 'เงื่อนไขบังคับที่ต้องเลือก', 'ตัวเลือกเสริม', 'เงื่อนไขบังคับที่ต้องเลือก', 'เงื่อนไขบังคับที่ต้องเลือก', 'ตัวเลือกเสริม', 'ตัวเลือกเสริม', 'ตัวเลือกเสริม', 'ตัวเลือกเสริม', 'ตัวเลือกเสริม', 'ตัวเลือกเสริม', 'ตัวเลือกเสริม', 'ตัวเลือกเสริม', 'ตัวเลือกเสริม', 'ตัวเลือกเสริม', 'ตัวเลือกเสริม', 'เงื่อนไขบังคับที่ต้องเลือก', 'เงื่อนไขบังคับที่ต้องเลือก', 'เงื่อนไขบังคับที่ต้องเลือก', 'เงื่อนไขบังคับที่ต้องเลือก', 'เงื่อนไขบังคับที่ต้องเลือก', 'ตัวเลือกเสริม', ''];
const SHOPEE_ROW_3 = ['ตั้งค่าหมวดหมู่ให้เหมาะสมกับสินค้าของคุณเพื่อให้ผู้ซื้อเห็นสินค้ามากขึ้น', 'ชื่อสินค้าควรมีชื่อยี่ห้อและรุ่นของสินค้า โปรดหลีกเลี่ยงการใช้คำซ้ำ หรือคำที่ไม่เกี่ยวข้องกับตัวสินค้า ซึ่งอาจทำให้สินค้าของคุณถูกระงับ สำหรับสินค้าทีมีหลายรุ่น กรุณาระบุชื่อสินค้าที่รุ่นแรกสุดที่เพิ่มและปล่อยว่างในช่องที่เหลือ', 'การเขียนรายละเอียดสินค้าให้น่าสนใจสามารถช่วยเพิ่มยอดขายให้คุณได้ สำหรับสินค้าทีมีหลายรุ่น กรุณาระบุชื่อสินค้าที่รุ่นแรกสุดที่เพิ่มและปล่อยว่างในช่องที่เหลือ', '[ต่อคำสั่งซื้อและต่อช่วงเวลา] จำนวนสินค้าสูงสุดที่ซื้อได้จะตั้งค่าตามสินค้าแต่ละชิ้น โดยจะจำกัดจำนวนสินค้าที่ผู้ซื้อแต่ละคนสามารถซื้อได้ในช่วงเวลาที่กำหนด', '[ต่อช่วงเวลา] กรุณาเลือกเวลาเริ่มต้นสำหรับจำนวนสินค้าสูงสุดที่ซื้อได้ โดยเวลาที่เร็วที่สุดที่เลือกได้คือวันพรุ่งนี้', '[ต่อช่วงเวลา] การจำกัดจำนวนสินค้าจะสิ้นสุดหลังจากวันที่กำหนด', '"[ต่อช่วงเวลา] ตั้งค่าช่วงที่ต้องการให้มีการจำกัดจำนวนการซื้อจนกว่าจะถึงเวลาสิ้นสุด สำหรับการตั้งค่าเพียงครั้งเดียว วันที่สิ้นสุดจะต้องเป็นเวลาหลังจากวันที่เริ่มต้นตามระยะเวลาโปรโมชั่น เช่น หากวันที่เริ่มต้นเป็น 2021-05-01 และมีระยะเวลา 10 วัน วันที่สิ้นสุดจะต้องเป็น 2021-05-10 สำหรับการตั้งค่าต่อเนื่องหลายช่วง หากต้องการตั้งค่าจำนวนสินค้าสูงสุดตามแต่ละช่วง วันที่สิ้นสุดจะต้องเป็นวันสุดท้ายของช่วงสุดท้าย เช่น หากวันที่เริ่มต้นเป็น 2021-05-01 และมีระยะเวลา 10 วัน หากคุณต้องการให้จำนวนสินค้าสูงสุดเริ่มใหม่ 3 ครั้ง (3 ช่วง) วันที่สิ้นสุดจะต้องเป็น 2021-05-30"', 'จำนวนการซื้อขั้นต่ำ หมายถึงจำนวนสินค้าอย่างน้อยที่สุดที่ผู้ซื้อสามารถสั่งซื้อสินค้าชิ้นนี้ได้ โดยจะนับรวมจากทุกตัวเลือกสินค้าและตั้งค่าเป็น 1 ชิ้นโดยอัตโนมัติ หากจำนวนสินค้าในคลังของคุณมีน้อยกว่าจำนวนสินค้าขั้นต่ำ ผู้ซื้อจะไม่สามารถสั่งซื้อสินค้าชิ้นนี้ได้', '"จำเป็นต้องกรอก* Parent SKU จะใช้เพื่อค้นหาและ ระบุตำแหน่งของสินค้าทั้งหมด โดยที่ Parent SKU จะไม่สามารถซ้ำกันภายในร้านได้"', 'จำเป็นต้องใส่หากสินค้าของคุณมีตัวเลือกสินค้า โดยเป็นเลขที่เชื่อมระหว่างสินค้าและตัวเลือก', 'กรุณาใส่ชื่อตัวเลือกขั้นแรก', 'กรุณาใส่ตัวเลือก', 'กรุณาอัปโหลดรูปภาพของแต่ละตัวเลือก', 'กรุณาใส่ชื่อตัวเลือกขั้นที่สอง', 'กรุณาใส่ตัวเลือก', 'ใส่ราคาสินค้าของคุณ โดยระบบจะยอมรับเฉพาะจำนวนบวก (สินค้าราคาต้องมากกว่า 0 บาท)', 'ใส่สต็อกสินค้าของคุณเฉพาะจำนวนเต็มบวกเท่านั้นที่จะได้รับการยอมรับ (สินค้าราคาต้องมากกว่า 0 บาท)', 'SKU จะใช้เพื่อระบุตัวตนของสินค้าแต่ละชิ้น ซึ่งไม่ควรซ้ำกันในร้านค้า', 'กรุณากรอกรหัสแบบฟอร์มตารางขนาดสินค้า (ดูได้ในหน้ารายการตารางขนาดสินค้า)', 'เลือกกรอกข้อมูลในช่องแบบฟอร์มตารางขนาดสินค้าหรือรูปภาพตารางขนาดสินค้าช่องใดช่องหนึ่ง หากคุณกรอกทั้ง 2 ช่อง ระบบจะเลือกใช้แบบฟอร์มเป็นหลัก', 'GTIN is an identifier for trade items, developed by the international organization GS1. They have 8 to 14 digits. The most common are UPC, EAN, JAN and ISBN.', 'อัปโหลดลิงก์รูปภาพสินค้าของคุณ โดยจะต้องไม่ซ้ำกับรูปภาพของสินค้าชิ้นอื่นในร้านค้า หากคุณไม่อัปโหลดรูปภาพ คุณจะไม่สามารถเผยแพร่สินค้าได้ แต่คุณสามารถข้ามขั้นตอนนี้และอัปโหลดรูปภาพได้ภายหลังที่ "เครื่องมือจัดการคุณลักษณะ"', 'กรอกลิงก์สำหรับรูปภาพสินค้า', 'กรอกลิงก์สำหรับรูปภาพสินค้า', 'กรอกลิงก์สำหรับรูปภาพสินค้า', 'กรอกลิงก์สำหรับรูปภาพสินค้า', 'กรอกลิงก์สำหรับรูปภาพสินค้า', 'กรอกลิงก์สำหรับรูปภาพสินค้า', 'กรอกลิงก์สำหรับรูปภาพสินค้า', 'กรอกลิงก์สำหรับรูปภาพสินค้า', '"กรอกน้ำหนักของสินค้า โดยสามารถกรอกได้เฉพาะจำนวนเต็มบวก และกรอกแยกแต่ละตัวเลือกได้ หมายเหตุ: การกรอกน้ำหนักไม่ตรงตามความเป็นจริงอาจทำให้เสียค่าจัดส่งเพิ่มเติม หรือถูกปฏิเสธการจัดส่งจากบริษัทขนส่ง"', 'กรอกขนาดสินค้าหลังบรรจุลงกล่องพัสดุ โดยขนาดจะนำไปคำนวณค่าจัดส่งโดยบริษัทขนส่ง สามารถกรอกแยกแต่ละตัวเลือกได้', '"กรอกความกว้างของสินค้าหลังบรรจุลงกล่องพัสดุ โดยสามารถกรอกได้เฉพาะจำนวนเต็มบวกหรือ 0 และกรอกแยกแต่ละตัวเลือกได้ หมายเหตุ: การกรอกขนาดสินค้าไม่ตรงตามความเป็นจริงอาจทำให้เสียค่าจัดส่งเพิ่มเติม หรือถูกปฏิเสธการจัดส่งจากบริษัทขนส่ง"', '"กรอกความสูงของสินค้าหลังบรรจุลงกล่องพัสดุ โดยสามารถกรอกได้เฉพาะจำนวนเต็มบวกหรือ 0 และกรอกแยกแต่ละตัวเลือกได้ หมายเหตุ: การกรอกขนาดสินค้าไม่ตรงตามความเป็นจริงอาจทำให้เสียค่าจัดส่งเพิ่มเติม หรือถูกปฏิเสธการจัดส่งจากบริษัทขนส่ง"', 'จำเป็นจะต้องเลือกใช้งานอย่างน้อย 1 ตัวเลือกสำหรับสินค้าแต่ละชิ้น', 'จำเป็นจะต้องเลือกใช้งานอย่างน้อย 1 ตัวเลือกสำหรับสินค้าแต่ละชิ้น', 'ระยะเวลาเตรียมพัสดุสินค้าพรีออเดอร์จะหมายถึงระยะเวลาที่คุณต้องใช้ในการเตรียมจัดส่งสินค้าสำหรับเฉพาะสินค้าพรีออเดอร์เท่านั้น หากคุณไม่ใส่เลขในช่องนี้ ระบบจะคำนวณเป็น 2 วันโดยอัตโนมัติ', ''];
const SHOPEE_ROW_4 = ['กรอกรหัสหมวดหมู่สินค้าจากรายการหมวดหมู่สินค้าใน Seller Centre หรือใช้หมวดหมู่สินค้าที่ระบบแนะนำ', 'โปรดป้อนอักขระ 20 ถึง 120 ตัวสำหรับชื่อสินค้า', 'โปรดป้อนอักขระ 60 ถึง 5000 ตัวสำหรับคำอธิบายสินค้า', 'กรุณากรอกตัวเลขระหว่าง 1-999,999', 'กรุณากรอกวันที่  YYYY-MM-DD', 'กรุณากรอกตัวเลขระหว่าง 1-365', 'กรุณากรอกวันที่  YYYY-MM-DD', 'คุณสามารถตั้งจำนวนการซื้อขั้นต่ำได้เป็นจำนวนเต็มบวกระหว่าง 1-999,999 เท่านั้น', 'โปรดป้อนอักขระ 1-100 ตัวสำหรับ Parent SKU', 'สามารถใส่ได้ 1-100 ตัวอักษร', 'กรอกชื่อตัวเลือกสินค้า โดยมีความยาวระหว่าง 1-14 ตัวอักษร', 'กรอกชื่อตัวเลือก โดยมีความยาวระหว่าง 1-20 ตัวอักษร', 'กรุณาใส่ลิงก์รูปภาพสินค้า', 'กรอกชื่อตัวเลือกสินค้า โดยมีความยาวระหว่าง 1-14 ตัวอักษร', 'กรอกชื่อตัวเลือก โดยมีความยาวระหว่าง 1-20 ตัวอักษร', 'ระบุราคาสินค้าระหว่าง 1-500000 ราคาของตัวเลือกสินค้าจะต้องต่างกันไม่เกิน 5 เท่า', 'กรุณาใส่ตัวเลข 0 ถึง 10000000 สำหรับสต็อกสินค้า', 'กรุณาใส่น้อยกว่า 100 ตัวอักษรสำหรับการอ้างอิง SKU', 'กรุณากรอกรหัสแบบฟอร์มตารางขนาดสินค้า', '"กรอกลิงก์ที่นี่ ขนาดไฟล์: ไม่เกิน 2Mb ความละเอียดไม่เกิน 1280x1280px นามสกุลไฟล์: PDF,JPG,PNG"', 'Please input a number between 8 to 14 digits.', '"ขนาด: สูงสุด 2.0mb สำหรับแต่ละภาพ รูปแบบไฟล์: JPG, JPEG, PNG ขนาดที่แนะนำ: 500 x 500 px"', '"ขนาด: สูงสุด 2.0mb สำหรับแต่ละภาพ รูปแบบไฟล์: JPG, JPEG, PNG ขนาดที่แนะนำ: 500 x 500 px"', '"ขนาด: สูงสุด 2.0mb สำหรับแต่ละภาพ รูปแบบไฟล์: JPG, JPEG, PNG ขนาดที่แนะนำ: 500 x 500 px"', '"ขนาด: สูงสุด 2.0mb สำหรับแต่ละภาพ รูปแบบไฟล์: JPG, JPEG, PNG ขนาดที่แนะนำ: 500 x 500 px"', '"ขนาด: สูงสุด 2.0mb สำหรับแต่ละภาพ รูปแบบไฟล์: JPG, JPEG, PNG ขนาดที่แนะนำ: 500 x 500 px"', '"ขนาด: สูงสุด 2.0mb สำหรับแต่ละภาพ รูปแบบไฟล์: JPG, JPEG, PNG ขนาดที่แนะนำ: 500 x 500 px"', '"ขนาด: สูงสุด 2.0mb สำหรับแต่ละภาพ รูปแบบไฟล์: JPG, JPEG, PNG ขนาดที่แนะนำ: 500 x 500 px"', '"ขนาด: สูงสุด 2.0mb สำหรับแต่ละภาพ รูปแบบไฟล์: JPG, JPEG, PNG ขนาดที่แนะนำ: 500 x 500 px"', '"ขนาด: สูงสุด 2.0mb สำหรับแต่ละภาพ รูปแบบไฟล์: JPG, JPEG, PNG ขนาดที่แนะนำ: 500 x 500 px"', 'โปรดป้อน 0.00 ถึง 100000.00 kg สำหรับน้ำหนักสินค้า', 'โปรดป้อน 0 ถึง 10000000 สำหรับความยาวของสินค้า', 'โปรดป้อน 0 ถึง 10000000 สำหรับความกว้างของสินค้า', 'โปรดป้อน 0 ถึง 10000000 สำหรับความสูงของสินค้า', 'เปิด/ปิด', 'เปิด/ปิด', 'หากคุณต้องการตั้งค่าสินค้าเป็นสินค้าพรีออเดอร์ กรุณาตรวจสอบระยะเวลาเตรียมพัสดุที่ตั้งค่าได้ของแต่ละหมวดหมู่และกรอกระยะเวลาให้ถูกต้อง', ''];



export default function AdminProductTable({ products }: { products: any[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [customPrices, setCustomPrices] = useState<Record<number, string>>({});
  const { toast } = useToast();

  function handlePriceChange(id: number, value: string) {
    setCustomPrices(prev => ({ ...prev, [id]: value }));
  }

  function toggleAll(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setSelectedIds(new Set(products.map(p => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  }

  function toggleRow(id: number) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  async function exportShopee() {
    if (selectedIds.size === 0) return;
    const selectedProds = products.filter(p => selectedIds.has(p.id));
    
    try {
      // Load the original template file
      const response = await fetch('/shopee_template.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const wb = XLSX.read(arrayBuffer);
      
      const wsName = 'แบบฟอร์มการลงสินค้า'; // Shopee's main data sheet
      const ws = wb.Sheets[wsName];
      
      if (!ws) {
        throw new Error("ไม่พบชีต 'แบบฟอร์มการลงสินค้า' ในแบบฟอร์มต้นฉบับ");
      }

      const rows: any[][] = [];

      // Add data rows
      for (const p of selectedProds) {
        const row = new Array(38).fill('');
        // Column mappings:
        row[0] = '101394'; // Category Code
        
        // Name must be 20-120 chars
        let shopeeName = p.name_th || p.name || '';
        if (shopeeName.length > 120) {
          shopeeName = shopeeName.substring(0, 117) + '...';
        } else if (shopeeName.length < 20) {
          shopeeName = shopeeName + ' (แท้ 100% พร้อมส่ง)';
        }
        row[1] = shopeeName;
        
        row[2] = p.description_th || p.description || shopeeName;
        const basePrice = (p.sale_price || p.price || 0) / 100;
        const finalPrice = customPrices[p.id] ? parseFloat(customPrices[p.id]) : basePrice;
        row[15] = finalPrice.toString();
        row[16] = (p.stock || 0).toString();
        
        // SKU must not exceed 100 chars
        let sku = p.slug || p.id.toString();
        if (sku.length > 100) sku = sku.substring(0, 100);
        row[17] = sku;
        
        if (p.images && p.images.length > 0) row[21] = p.images[0];
        for (let i = 1; i <= 8; i++) {
          if (p.images && p.images.length > i) {
            row[21 + i] = p.images[i];
          }
        }

        row[30] = '0.30'; // Weight
        row[31] = '16'; // Length
        row[32] = '10'; // Width
        row[33] = '7'; // Height
        row[34] = 'เปิด'; // Standard Delivery

        rows.push(row);
      }

      // Append data to the sheet starting at row index 6 (row 7 in Excel)
      XLSX.utils.sheet_add_aoa(ws, rows, { origin: 6 });
      
      const fileName = `shopee_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, fileName);
      
      toast('ดาวน์โหลดไฟล์ Excel สำหรับ Shopee เรียบร้อยแล้ว', 'success');
    } catch (error) {
      console.error('Error generating Shopee export:', error);
      toast('เกิดข้อผิดพลาดในการสร้างไฟล์ Excel', 'error');
    }
  }

  return (
    <>
      {selectedIds.size > 0 && (
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--cream-light)', padding: '12px 16px', borderRadius: 'var(--radius)', border: '1px solid var(--gold)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)' }}>เลือกไว้ {selectedIds.size} รายการ</span>
          <button onClick={exportShopee} className="btn-primary" style={{ padding: '8px 16px', fontSize: 12 }}>
            📥 Export to Shopee
          </button>
        </div>
      )}

      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: 'var(--cream-dark)', textAlign: 'left' }}>
                <Th style={{ width: 40, textAlign: 'center' }}>
                  <input type="checkbox" checked={selectedIds.size === products.length && products.length > 0} onChange={toggleAll} style={{ cursor: 'pointer' }} />
                </Th>
                <Th>&nbsp;</Th>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Stock</Th>
                <Th>Status</Th>
                <Th>&nbsp;</Th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => (
                <tr key={p.id} style={{ borderTop: '1px solid var(--cream-dark)', background: selectedIds.has(p.id) ? 'rgba(201, 169, 110, 0.05)' : 'transparent' }}>
                  <Td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={selectedIds.has(p.id)} onChange={() => toggleRow(p.id)} style={{ cursor: 'pointer' }} />
                  </Td>
                  <Td style={{ width: 60 }}>
                    {p.images?.[0] && (
                      <div style={{ width: 48, height: 48, background: 'var(--cream-dark)', overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                        <Image src={p.images[0]} alt="" width={48} height={48} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                      </div>
                    )}
                  </Td>
                  <Td>
                    <Link href={`/product/${p.slug}`} target="_blank" className="serif" style={{ color: 'var(--text)', fontWeight: 600, fontSize: 14 }}>
                      {(p.name_th || p.name).slice(0, 60)}{(p.name_th || p.name).length > 60 ? '…' : ''}
                    </Link>
                    <div style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 2 }}>ID #{p.id}</div>
                  </Td>
                  <Td style={{ color: 'var(--text-muted)' }}>{p.category}</Td>
                  <Td className="serif">
                    <div style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>
                      {formatPrice(p.sale_price ?? p.price)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Shopee: ฿</span>
                      <input 
                        type="number" 
                        placeholder={((p.sale_price || p.price || 0) / 100).toString()}
                        value={customPrices[p.id] || ''}
                        onChange={(e) => handlePriceChange(p.id, e.target.value)}
                        style={{ width: 60, padding: '2px 4px', fontSize: 12, border: '1px solid var(--cream-dark)', borderRadius: 2, outline: 'none' }}
                      />
                    </div>
                  </Td>
                  <Td>
                    <StockEditor productId={p.id} stock={p.stock} />
                  </Td>
                  <Td>
                    {p.stock === 0 ? <span className="badge badge-oos">OOS</span> : p.stock <= 3 ? <span className="badge badge-warning">LOW</span> : <span className="badge badge-success">OK</span>}
                    {!p.published && <span className="badge" style={{ background: 'var(--text-faint)', color: '#fff', marginLeft: 4 }}>HIDDEN</span>}
                  </Td>
                  <Td style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    {!p.published && <PublishButton productId={p.id} />}
                    <Link href={`/admin/products/${p.id}`} className="btn-text" style={{ padding: 0, fontSize: 11, color: 'var(--gold-dark)', fontWeight: 600 }}>Edit ✎</Link>
                    <Link href={`/product/${p.slug}`} target="_blank" className="btn-text" style={{ padding: 0, fontSize: 11, color: 'var(--text-muted)' }}>View ↗</Link>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Th({ children, style }: { children: React.ReactNode; style?: any }) {
  return <th style={{ padding: '12px 16px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, ...style }}>{children}</th>;
}
function Td({ children, style }: any) {
  return <td style={{ padding: '12px 16px', fontSize: 13, verticalAlign: 'middle', ...style }}>{children}</td>;
}
