export default function Loading() {
  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div className="skeleton" style={{ height: 32, width: '40%', marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 16, width: '60%', marginBottom: 32 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="skeleton" style={{ height: 220, width: '100%', borderRadius: 0 }} />
            <div style={{ padding: 16 }}>
              <div className="skeleton" style={{ height: 10, width: '40%', marginBottom: 10 }} />
              <div className="skeleton" style={{ height: 14, width: '80%', marginBottom: 8 }} />
              <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 16 }} />
              <div className="skeleton" style={{ height: 24, width: '50%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
