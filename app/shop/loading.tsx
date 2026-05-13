export default function ShopLoading() {
  return (
    <div style={{ padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div className="skeleton" style={{ height: 12, width: 120, margin: '0 auto 12px', borderRadius: 100 }} />
        <div className="skeleton" style={{ height: 36, width: 220, margin: '0 auto' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 }}>
        <div className="hide-mobile">
          <div className="skeleton" style={{ height: 300, borderRadius: 'var(--radius-lg)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="skeleton" style={{ height: 200, borderRadius: 0 }} />
              <div style={{ padding: 14 }}>
                <div className="skeleton" style={{ height: 9, width: '35%', marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 13, width: '90%', marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 13, width: '65%', marginBottom: 16 }} />
                <div className="skeleton" style={{ height: 22, width: '45%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
