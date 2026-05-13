import { createClient } from '@/lib/supabase/server';
import type { Order } from '@/lib/types';
import OrdersClient from './OrdersClient';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return <OrdersClient orders={null} userEmail={null} />;

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return <OrdersClient orders={(orders ?? []) as Order[]} userEmail={user.email ?? null} />;
}
