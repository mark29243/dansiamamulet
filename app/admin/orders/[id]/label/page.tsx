import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/server';
import type { Order } from '@/lib/types';
import LabelClient from './LabelClient';

export const dynamic = 'force-dynamic';

export default async function LabelPage({ params }: { params: { id: string } }) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('orders')
    .select('id, customer_name, customer_phone, shipping_address')
    .eq('id', params.id)
    .single();

  if (error || !data) notFound();

  return <LabelClient order={data as Order} />;
}
