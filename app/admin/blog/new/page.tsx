import BlogForm from '../BlogForm';

export default function NewBlogPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1 className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--text)', marginBottom: 24 }}>
        ✍️ เขียนบทความใหม่
      </h1>
      <BlogForm />
    </div>
  );
}
