// Thailand Post international shipping rates
// Sources:
//   ePacket  — effective 6 January 2026 (Thailand Post rate card)
//   SPA      — Small Packet Air, amendment 2567 (Thailand Post rate card)
//
// Weight formula: first item = 100 g, each additional item +20 g
// All costs stored in satang (baht × 100)

export type CarrierCode =
  | 'epacket' | 'spa'
  | 'thaipost' | 'thaipost-remote'
  | 'flash'    | 'flash-remote'
  | 'kerry'    | 'kerry-remote';

export interface ShippingOption {
  carrier: CarrierCode;
  label: string;
  sublabel: string;
  estimatedDays: string;
  cost: number;       // satang (standard area)
  remoteCost?: number; // satang (remote area, domestic only)
  tracked: boolean;
}

// ─── Weight ───────────────────────────────────────────────────────────────────

export function calcWeight(qty: number): number {
  return 100 + (qty - 1) * 20;
}

// ─── Band helpers ─────────────────────────────────────────────────────────────

// ePacket bands: 0=0-100g, 1=101-200g, 2=201-300g, 3=301-400g, 4=401-500g
function epBand(weight: number): number {
  return weight <= 100 ? 0 : Math.ceil((weight - 100) / 100);
}

// SPA bands: 0=0-50g, 1=51-100g, 2=101-150g, 3=151-200g, 4=201-250g, 5=251-300g
function spaBand(weight: number): number {
  return Math.ceil(weight / 50) - 1;
}

// ─── ePacket rate table (baht) — indexed [band][zone-1], zones 1-17 ───────────
// Source: Thailand Post ePacket rate card, effective 6 Jan 2026
const EP_RATES: number[][] = [
  [175, 209, 189, 200, 189, 250, 239, 260, 259, 286, 260, 260, 260, 273, 289, 290, 250], // 0-100g
  [195, 229, 209, 255, 249, 275, 295, 325, 289, 358, 349, 325, 340, 362, 379, 385, 275], // 101-200g
  [240, 249, 240, 310, 319, 330, 365, 390, 339, 429, 439, 390, 430, 455, 459, 510, 330], // 201-300g
  [285, 285, 285, 365, 379, 385, 440, 455, 369, 512, 529, 455, 520, 549, 549, 635, 390], // 301-400g
  [330, 330, 330, 420, 439, 440, 510, 520, 420, 598, 619, 535, 610, 641, 639, 765, 470], // 401-500g
];

// ─── Small Packet Air rate table (baht) — indexed [band][zone-1], zones 1-13 ─
// Source: Thailand Post SPA rate card, amendment 2567
const SPA_RATES: number[][] = [
  [ 90,  90,  90,  95,  95, 100, 110, 130, 130, 130, 130, 130, 210], // 0-50g
  [120, 120, 130, 100, 110, 110, 130, 150, 140, 150, 150, 160, 245], // 51-100g
  [155, 155, 180, 110, 120, 130, 150, 170, 160, 170, 180, 190, 280], // 101-150g
  [190, 190, 220, 140, 140, 150, 180, 190, 200, 210, 220, 240, 315], // 151-200g
  [225, 225, 260, 160, 170, 180, 220, 225, 240, 250, 260, 290, 350], // 201-250g
  [260, 260, 300, 180, 190, 210, 255, 260, 280, 290, 310, 340, 385], // 251-300g
];

// ─── Country → [ePacketZone | null, spaZone | null] ──────────────────────────
// null means the service is unavailable to that country
const COUNTRY_ZONES: Record<string, [number | null, number | null]> = {
  // ── Zone 1 eP ──
  KH: [1, 4], CN: [1, 5], HK: [1, 4], ID: [1, 5], KR: [1, 2],
  LA: [1, 5], MY: [1, 5], MM: [1, 1], PH: [1, 5], SG: [1, 4],
  TW: [1, 4], VN: [1, 4],
  // ── Zone 2 eP ──
  BT: [2, 7], IN: [2, 7], MV: [2, 7],
  // ── Zone 3 eP ──
  JP: [3, 1], MO: [3, 2],
  // ── Zone 4 eP ──
  LK: [4, 7],
  // ── Zone 5 eP ──
  AE: [5, 7], BN: [5, 1], BG: [5, 7], BY: [5, 11], PK: [5, 7],
  // ── Zone 6 eP ──
  AU: [6, 12], BH: [6, 9], BD: [6, 7],
  // ── Zone 7 eP ──
  AM: [7, 11], AZ: [7, 9], FR: [7, 9], IR: [7, 7], IQ: [7, 7],
  KE: [7, 7], KW: [7, 7], LB: [7, 7], MN: [7, null], MA: [7, 7],
  NZ: [7, 12], NG: [7, 7], GB: [7, 9], UZ: [7, 7],
  // ── Zone 8 eP ──
  DZ: [8, 7], CI: [8, 9], CY: [8, 11], CZ: [8, 7], EG: [8, 7],
  EE: [8, 9], GE: [8, 9], IL: [8, 10], KZ: [8, 7], KG: [8, 9],
  MG: [8, 11], MU: [8, 7], RW: [8, 11], RS: [8, 7], TN: [8, 7],
  // ── Zone 9 eP ──
  DE: [9, 8],
  // ── Zone 10 eP ──
  HU: [10, 7], IE: [10, 9], IT: [10, 9], NP: [10, 11], OM: [10, 7],
  RO: [10, 7], ZA: [10, 9],
  // ── Zone 11 eP ──
  AL: [11, 9], HR: [11, 9], ET: [11, 11], FI: [11, 9], GH: [11, 12],
  LU: [11, 9], MT: [11, 12], MD: [11, 9], MZ: [11, 11], PL: [11, 7],
  QA: [11, 7], SA: [11, 10], TR: [11, 11], ZM: [11, 11],
  // ── Zone 12 eP ──
  JO: [12, 11], RU: [12, 10],
  // ── Zone 13 eP ──
  AT: [13, 11], BE: [13, 10], BA: [13, 12], DK: [13, 10], GR: [13, 10],
  IS: [13, 12], LT: [13, 7], NL: [13, 3], NO: [13, 11], PT: [13, 10],
  SI: [13, 11], CH: [13, 10], TZ: [13, 11],
  // ── Zone 14 eP ──
  BR: [14, 11], CO: [14, 12], DJ: [14, 11], MK: [14, 12], PA: [14, 12],
  SN: [14, 11],
  // ── Zone 15 eP ──
  ES: [15, 9], SE: [15, 9],
  // ── Zone 16 eP ──
  AR: [16, 12], CA: [16, 11], LV: [16, 11], SK: [16, 11],
  // ── Zone 17 eP ──
  MX: [17, 11],
  // ── ePacket unavailable ──
  US: [null, 13], UA: [null, 12], CR: [null, 12],
};

// ─── Rate calculators ─────────────────────────────────────────────────────────

function epacketCost(zone: number, weight: number): number {
  const band = Math.min(epBand(weight), EP_RATES.length - 1);
  return (EP_RATES[band][zone - 1] ?? 0) * 100;
}

function spaCost(zone: number, weight: number): number {
  const band = Math.min(spaBand(weight), SPA_RATES.length - 1);
  return (SPA_RATES[band][zone - 1] ?? 0) * 100;
}

// ─── Domestic remote-area postal codes (Flash Express list) ──────────────────
// Applied to all domestic carriers: thaipost +฿10, flash/kerry +฿50
const REMOTE_POSTALS = new Set([
  // ภาคกลาง — กาญจนบุรี
  '71180', '71240',
  // ภาคเหนือ — เชียงใหม่
  '50260', '50270', '50310', '50350',
  // ภาคเหนือ — น่าน
  '55130', '55220',
  // ภาคเหนือ — แม่ฮ่องสอน + กัลยาณิวัฒนา (เชียงใหม่)
  '58110', '58120', '58130', '58140', '58150',
  // ภาคเหนือ — ตาก
  '63150', '63170',
  // ภาคเหนือ — เพชรบูรณ์
  '67260',
  // ภาคใต้ — พังงา
  '82150',
  // ภาคใต้ — ปัตตานี
  '94000', '94110', '94120', '94130', '94140', '94150',
  '94160', '94170', '94180', '94190', '94220', '94230',
  // ภาคใต้ — ยะลา
  '95000', '95110', '95120', '95130', '95140', '95150', '95160', '95170',
  // ภาคใต้ — นราธิวาส
  '96000', '96110', '96120', '96130', '96140', '96150',
  '96160', '96170', '96180', '96190', '96210', '96220',
]);

export function isRemotePostal(postal: string): boolean {
  return REMOTE_POSTALS.has(postal.trim());
}

// ─── Public API ──────────────────────────────────────────────────────────────

const DOMESTIC_CARRIERS: {
  carrier: CarrierCode;
  label: string;
  sublabel: string;
  estimatedDays: string;
  cost: number;
  remoteCost: number;
}[] = [
  { carrier: 'thaipost', label: 'ไปรษณีย์ไทย', sublabel: 'EMS / Registered',  estimatedDays: '1–3', cost: 5000,  remoteCost: 6000  },
  { carrier: 'flash',    label: 'Flash Express', sublabel: 'Express',           estimatedDays: '1–3', cost: 5000,  remoteCost: 10000 },
  { carrier: 'kerry',    label: 'Kerry Express', sublabel: 'Express',           estimatedDays: '1–3', cost: 5000,  remoteCost: 10000 },
];

export function getShippingOptions(country: string, qty: number): ShippingOption[] {
  if (country === 'TH') {
    return DOMESTIC_CARRIERS.map((c) => ({ ...c, tracked: true }));
  }

  const zones = COUNTRY_ZONES[country];
  if (!zones) return [];

  const weight = calcWeight(qty);
  const [eZone, sZone] = zones;
  const options: ShippingOption[] = [];

  if (eZone !== null) {
    options.push({
      carrier: 'epacket',
      label: 'ePacket',
      sublabel: 'Tracked airmail',
      estimatedDays: '7–15',
      cost: epacketCost(eZone, weight),
      tracked: true,
    });
  }

  return options;
}

// Validate a carrier + country + qty combination and return the expected cost.
// Returns null if the combination is invalid.
export function validateShipping(
  country: string,
  carrier: CarrierCode,
  qty: number,
): number | null {
  if (country === 'TH') {
    const isRemote = carrier.endsWith('-remote');
    const base = (isRemote ? carrier.slice(0, -7) : carrier) as CarrierCode;
    const d = DOMESTIC_CARRIERS.find((c) => c.carrier === base);
    if (!d) return null;
    return isRemote ? d.remoteCost : d.cost;
  }
  const opts = getShippingOptions(country, qty);
  const match = opts.find((o) => o.carrier === carrier);
  return match ? match.cost : null;
}
