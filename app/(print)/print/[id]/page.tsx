import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/server';
import { labelToken, verifyLabelToken } from '@/lib/label-token';
import type { Order } from '@/lib/types';
import PrintLabelClient from './PrintLabelClient';

export const dynamic = 'force-dynamic';

export default async function PrintLabelPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { k?: string };
}) {
  if (!verifyLabelToken(params.id, searchParams.k)) notFound();

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('orders')
    .select('id, customer_name, customer_phone, shipping_address')
    .eq('id', params.id)
    .single();

  if (error || !data) notFound();

  return <PrintLabelClient order={data as Order} token={labelToken(params.id)} />;
}
