import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/server';
import EditProductForm from './EditProductForm';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const admin = createAdminClient();
  const { data: product } = await admin
    .from('products')
    .select('*')
    .eq('id', parseInt(params.id))
    .single();

  if (!product) notFound();

  return (
    <div className="container" style={{ padding: '32px 24px 60px', maxWidth: 680 }}>
      <h1 className="serif" style={{ fontSize: 24, fontWeight: 500, marginBottom: 28, color: 'var(--text)' }}>
        แก้ไขสินค้า <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>#{product.id}</span>
      </h1>
      <EditProductForm product={product} />
    </div>
  );
}
