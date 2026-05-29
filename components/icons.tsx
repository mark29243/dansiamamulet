// Shared SVG icon library — outline style, stroke-based
// Usage: import { IcoSearch, IcoCart, ... } from '@/components/icons'

import React from 'react';

const base = {
  fill: 'none' as const,
  stroke: 'currentColor' as const,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

type Props = { size?: number; strokeWidth?: number; style?: React.CSSProperties; className?: string };

export function IcoSearch({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
export function IcoCart({ size = 22, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
}
export function IcoUser({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
export function IcoHome({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/></svg>;
}
export function IcoShop({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
}
export function IcoPackage({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
}
export function IcoLock({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
}
export function IcoWarning({ size = 16, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}
export function IcoCheck({ size = 16, strokeWidth = 2, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><polyline points="20 6 9 17 4 12"/></svg>;
}
export function IcoPhone({ size = 16, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
}
export function IcoMail({ size = 16, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
export function IcoChat({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
export function IcoGlobe({ size = 16, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}
export function IcoTruck({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
}
export function IcoMobile({ size = 16, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
}
export function IcoStar({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
export function IcoTrophy({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="10"/><path d="M7 4H4a2 2 0 0 0-2 2v1c0 3.31 2.69 6 6 6h8c3.31 0 6-2.69 6-6V6a2 2 0 0 0-2-2h-3"/><rect x="7" y="2" width="10" height="5" rx="1"/></svg>;
}
export function IcoMoney({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}
export function IcoClipboard({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>;
}
export function IcoDiamond({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3L8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>;
}
export function IcoEye({ size = 16, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}
export function IcoShieldCheck({ size = 24, strokeWidth = 1.6, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/><polyline points="9 12 11 14 15 10"/></svg>;
}
export function IcoAward({ size = 24, strokeWidth = 1.6, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><circle cx="12" cy="9" r="7"/><polyline points="9 9 11 11 15 7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>;
}
export function IcoSuccess({ size = 48, strokeWidth = 1.5, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>;
}
export function IcoAmulet({ size = 56, strokeWidth = 1.2, style, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} opacity={0.3} style={style} className={className}>
      <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
}
export function IcoClock({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
export function IcoCamera({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
}
export function IcoUpload({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>;
}
export function IcoLightning({ size = 16, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
}
export function IcoCelebrate({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>;
}
export function IcoFilter({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
}
export function IcoMapPin({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
export function IcoEdit({ size = 16, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
}
export function IcoTrash({ size = 16, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
}
export function IcoCalendar({ size = 16, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
export function IcoUser2({ size = 16, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
export function IcoSettings({ size = 18, strokeWidth = 1.8, style, className }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} style={style} className={className}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
}
