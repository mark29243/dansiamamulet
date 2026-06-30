import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const admin = createAdminClient();
    
    // fetch all ids
    const { data: products, error: fetchError } = await admin.from('products').select('id');
    
    if (fetchError) {
      return NextResponse.json({ error: 'Fetch Error: ' + fetchError.message }, { status: 500 });
    }

    if (!products || products.length === 0) {
      return NextResponse.json({ message: 'No products to delete.' });
    }

    const ids = products.map((p: any) => p.id);
    const { error: deleteError } = await admin.from('products').delete().in('id', ids);
    
    if (deleteError) {
      return NextResponse.json({ error: 'Delete Error: ' + deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ message: `Successfully deleted ${products.length} products.` });
  } catch (error: any) {
    return NextResponse.json({ error: 'System Error: ' + (error.message || String(error)) }, { status: 500 });
  }
}
