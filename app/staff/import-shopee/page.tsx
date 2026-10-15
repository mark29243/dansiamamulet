import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { verifyStaffSession } from '@/lib/staff-auth';
import ShopeeImporterClient from '@/app/admin/import-shopee/ShopeeImporterClient';

export const dynamic = 'force-dynamic';

export default async function StaffImportShopeePage() {
  const cookieStore = cookies();
  const staffToken = cookieStore.get('staff_token')?.value;
  let isStaff = verifyStaffSession(staffToken) || cookieStore.get('staff_auth')?.value === 'true';

  const ALLOWED_STAFF = ['mark.29243@gmail.com', 'phatsara7962@gmail.com', 'jarunpimpru@gmail.com'];

  if (!isStaff) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.id) {
      const cleanEmail = user.email ? user.email.toLowerCase().trim() : '';
      if (ALLOWED_STAFF.includes(cleanEmail)) {
        isStaff = true;
      } else {
        const adminClient = createAdminClient();
        const query = cleanEmail
          ? adminClient.from('admins').select('role').or(`user_id.eq.${user.id},email.ilike.${cleanEmail}`).maybeSingle()
          : adminClient.from('admins').select('role').eq('user_id', user.id).maybeSingle();
        const { data: admin } = await query;
        if (admin) {
          isStaff = true;
        }
      }
    }
  }

  if (!isStaff) {
    redirect('/staff/login?next=/staff/import-shopee');
  }
  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--text)' }}>
          นำเข้าข้อมูลด้วย Excel
        </h1>
        <Link href="/staff/june-stock" className="btn-outline" style={{ padding: '8px 16px', fontSize: 13 }}>
          ← กลับไปหน้าสต็อก
        </Link>
      </div>
      <ShopeeImporterClient />
    </div>
  );
}
