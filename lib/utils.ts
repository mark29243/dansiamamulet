// Convert satang (price * 100) to displayable currency string based on language
// Thai: ฿ (THB), English: $ (USD), Chinese: ¥ (CNY)
export function formatPrice(
  satang: number,
  lang: 'th' | 'en' | 'zh' = 'th',
  rates?: { USD?: number; CNY?: number }
) {
  const baht = satang / 100;
  if (lang === 'th') {
    return `฿${new Intl.NumberFormat('th-TH').format(baht)}`;
  }
  if (lang === 'zh') {
    const rate = rates?.CNY ?? 0.20;
    const cny = Math.round(baht * rate);
    return `¥${new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 }).format(cny)}`;
  }
  const rate = rates?.USD ?? 0.028;
  const usd = Math.round(baht * rate);
  return `$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(usd)}`;
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
