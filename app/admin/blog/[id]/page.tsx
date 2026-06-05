import { createAdminClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import BlogForm from '../BlogForm';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const admin = createAdminClient();
  const { data: post } = await admin
    .from('blog_posts')
    .select('*')
    .eq('id', parseInt(params.id))
    .single();

  if (!post) notFound();

  return (
    <div style={{ padding: 24 }}>
      <h1 className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--text)', marginBottom: 24 }}>
        ✏️ แก้ไขบทความ
      </h1>
      <BlogForm post={post} />
    </div>
  );
}
