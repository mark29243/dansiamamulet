import { createAdminClient } from '@/lib/supabase/server';
import ShopeeImporterClient from './ShopeeImporterClient';

export const dynamic = 'force-dynamic';

export default async function ImportShopeePage() {
  const admin = createAdminClient();
  
  // Optionally prefetch products if we need to know what exists
  // But maybe it's better to fetch them inside the client to avoid huge payloads
  
  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <ShopeeImporterClient />
    </div>
  );
}
