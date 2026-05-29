// Thailand Post international shipping rates
// Weight formula: qty ≤ 3 → 200 g, each item over 3 → +30 g
//
// RATES: verify against official rate cards
//   ePacket  — 101–200 g band
//   SPA      — Small Packet Air, 151–200 g band

export type CarrierCode = 'epacket' | 'spa' | 'domestic';

export interface ShippingOption {
  carrier: CarrierCode;
  label: string;
  sublabel: string;
  estimatedDays: string;
  cost: number; // satang
  tracked: boolean;
}

// ─── Weight ───────────────────────────────────────────────────────────────────

export function calcWeight(qty: number): number {
  return qty <= 3 ? 200 : 200 + (qty - 3) * 30;
}

// ─── ePacket rate table (satang) ─────────────────────────────────────────────
// Base: 101–200 g | Source: Thailand Post ePacket rate card
// Zone  1→฿195  17→฿275  (linear interpolation for intermediate zones)
const EPACKET_BASE: Record<number, number> = {
  1: 19500, 2: 20000, 3: 20500, 4: 21000, 5: 21500,
  6: 22000, 7: 22500, 8: 23000, 9: 23500, 10: 24000,
  11: 24500, 12: 25000, 13: 25500, 14: 26000, 15: 26500,
  16: 27000, 17: 27500,
};

// Per additional 100 g (or part thereof) over 200 g
const EPACKET_PER_100G: Record<number, number> = {
  1: 2000, 2: 2200, 3: 2400, 4: 2600, 5: 2800,
  6: 3000, 7: 3200, 8: 3400, 9: 3600, 10: 3800,
  11: 4000, 12: 4200, 13: 4400, 14: 4600, 15: 4800,
  16: 5000, 17: 5200,
};

// ─── Small Packet Air rate table (satang) ─────────────────────────────────────
// Base: 151–200 g | Source: Thailand Post SPA rate card
// Zone  1→฿190  13→฿315
const SPA_BASE: Record<number, number> = {
  1: 19000, 2: 20000, 3: 21000, 4: 22000, 5: 23000,
  6: 24000, 7: 25000, 8: 26000, 9: 27000, 10: 28000,
  11: 29500, 12: 30500, 13: 31500,
};

// Per additional 50 g (or part thereof) over 200 g
const SPA_PER_50G: Record<number, number> = {
  1: 1000, 2: 1100, 3: 1200, 4: 1300, 5: 1400,
  6: 1500, 7: 1700, 8: 1900, 9: 2100, 10: 2300,
  11: 2500, 12: 2700, 13: 3000,
};

// ─── Country → [ePacketZone | null, spaZone | null] ──────────────────────────
// null means service is unavailable to that country
const COUNTRY_ZONES: Record<string, [number | null, number | null]> = {
  // ── Indochina (Zone 1 eP / Zone 1 SPA) ──
  KH: [1, 1], LA: [1, 1], MM: [1, 1], VN: [1, 1],
  // ── ASEAN ──
  MY: [2, 1], SG: [2, 2],
  BN: [3, 2], ID: [3, 2], PH: [3, 2],
  // ── Greater China ──
  CN: [4, 3], HK: [4, 3], MO: [4, 3], TW: [4, 3],
  // ── Northeast Asia ──
  JP: [5, 3], KR: [5, 3], MN: [null, 4],
  // ── South Asia ──
  BD: [6, 4], IN: [6, 4], LK: [6, 4], MV: [6, 4], NP: [6, 4], PK: [6, 5],
  // ── Middle East ──
  AE: [7, 5], BH: [7, 5], IL: [7, 5], JO: [7, 5],
  KW: [7, 5], LB: [7, 5], OM: [7, 5], QA: [7, 5], SA: [7, 5],
  YE: [7, 6], IQ: [null, 6], IR: [null, 6],
  // ── Oceania ──
  AU: [8, 5], NZ: [8, 5], FJ: [17, 7], PG: [17, 7],
  // ── Russia & CIS ──
  RU: [9, 6], KZ: [9, 6], UA: [9, 7], BY: [9, 7],
  GE: [9, 7], AZ: [9, 7], UZ: [9, 7],
  // ── Eastern Europe ──
  BG: [10, 7], CY: [10, 8], CZ: [10, 8], EE: [10, 8],
  GR: [10, 8], HR: [10, 8], HU: [10, 8], LT: [10, 8],
  LV: [10, 8], MT: [10, 8], PL: [10, 8], RO: [10, 8],
  RS: [10, 8], SI: [10, 8], SK: [10, 8], TR: [10, 8], AL: [10, 8],
  // ── Western Europe ──
  AT: [11, 8], BE: [11, 8], CH: [11, 8], DE: [11, 8],
  DK: [11, 9], ES: [11, 9], FI: [11, 9], FR: [11, 9],
  GB: [11, 9], IE: [11, 9], IS: [11, 9], IT: [11, 9],
  LU: [11, 9], NL: [11, 9], NO: [11, 9], PT: [11, 9], SE: [11, 9],
  // ── North Africa ──
  DZ: [12, 9], EG: [12, 9], MA: [12, 9], TN: [12, 9], LY: [null, 9],
  // ── Sub-Saharan Africa ──
  ET: [13, 10], KE: [13, 10], MG: [13, 10], MZ: [13, 10],
  NG: [13, 10], TZ: [13, 10], ZA: [13, 10],
  // ── North America ──
  CA: [14, 11], MX: [14, 11], US: [14, 11],
  // ── Caribbean / Central America ──
  CU: [15, 11], DO: [15, 11], GT: [15, 11], JM: [15, 11], PA: [15, 12],
  // ── South America ──
  AR: [16, 12], BR: [16, 12], CL: [16, 12], CO: [16, 12],
  PE: [16, 12], UY: [16, 12], VE: [16, 13],
};

// ─── Rate calculator ─────────────────────────────────────────────────────────

function epacketCost(zone: number, weight: number): number {
  const base = EPACKET_BASE[zone] ?? 0;
  if (weight <= 200) return base;
  const extra = Math.ceil((weight - 200) / 100);
  return base + extra * (EPACKET_PER_100G[zone] ?? 0);
}

function spaCost(zone: number, weight: number): number {
  const base = SPA_BASE[zone] ?? 0;
  if (weight <= 200) return base;
  const extra = Math.ceil((weight - 200) / 50);
  return base + extra * (SPA_PER_50G[zone] ?? 0);
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function getShippingOptions(country: string, qty: number): ShippingOption[] {
  if (country === 'TH') {
    return [{
      carrier: 'domestic',
      label: 'ไปรษณีย์ไทย / Kerry',
      sublabel: 'Domestic',
      estimatedDays: '1–5',
      cost: 5000,
      tracked: true,
    }];
  }

  const zones = COUNTRY_ZONES[country];
  if (!zones) return [];

  const weight = calcWeight(qty);
  const [eZone, sZone] = zones;
  const options: ShippingOption[] = [];

  if (sZone !== null) {
    options.push({
      carrier: 'spa',
      label: 'Small Packet Air',
      sublabel: 'Airmail — no tracking',
      estimatedDays: '14–30',
      cost: spaCost(sZone, weight),
      tracked: false,
    });
  }

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
  const opts = getShippingOptions(country, qty);
  const match = opts.find((o) => o.carrier === carrier);
  return match ? match.cost : null;
}
