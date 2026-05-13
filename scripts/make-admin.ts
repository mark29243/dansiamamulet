/**
 * Promote a user to admin.
 * Usage:
 *   npm run make-admin -- you@example.com
 *
 * The user must already have signed up (signed in via magic link at least once).
 */
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const email = process.argv[2];
if (!email) {
  console.error('Usage: npm run make-admin -- you@example.com');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

async function main() {
  // Find the user
  const { data: users, error: usersErr } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (usersErr) throw usersErr;

  const user = users.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!user) {
    console.error(`✕ No user found with email "${email}".`);
    console.error('  The user must sign up first (visit /signin and click the magic link).');
    process.exit(1);
  }

  // Insert into admins
  const { data, error } = await supabase
    .from('admins')
    .upsert({ user_id: user.id, email: user.email!, role: 'owner' }, { onConflict: 'user_id' })
    .select('*')
    .single();

  if (error) {
    console.error('✕ Failed to add admin:', error.message);
    process.exit(1);
  }

  console.log(`✓ ${email} is now ${data.role}`);
  console.log(`  Visit /admin to access the dashboard.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
