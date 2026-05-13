export default function AdminLoading() {
  return (
    <div style={{ padding: '32px 24px' }}>
      <div className="skeleton" style={{ height: 32, width: '30%', marginBottom: 24 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card" style={{ padding: 20, borderLeft: '3px solid var(--cream-dark)' }}>
            <div className="skeleton" style={{ height: 10, width: '60%', marginBottom: 10 }} />
            <div className="skeleton" style={{ height: 28, width: '40%', marginBottom: 6 }} />
            <div className="skeleton" style={{ height: 10, width: '70%' }} />
          </div>
        ))}
      </div>
      <div className="skeleton" style={{ height: 280 }} />
    </div>
  );
}
