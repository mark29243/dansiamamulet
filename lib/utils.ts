// Convert satang (price * 100) to displayable THB string
export function formatPrice(satang: number, lang: 'th' | 'en' | 'zh' = 'en') {
  const baht = satang / 100;
  const formatted = new Intl.NumberFormat(
    lang === 'th' ? 'th-TH' : lang === 'zh' ? 'zh-CN' : 'en-US'
  ).format(baht);
  return `฿${formatted}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

// Calculate shipping in satang based on country + total weight estimate
export function calcShipping(country: string, itemCount: number): number {
  // domestic Thailand
  if (country === 'TH') return 5000;            // ฿50
  // Asia
  const asia = ['CN','HK','TW','MY','SG','JP','KR','VN','LA','KH','MM','PH','ID'];
  if (asia.includes(country)) return 25000;     // ฿250
  // rest of world
  return 50000;                                 // ฿500
}
