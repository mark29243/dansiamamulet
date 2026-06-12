'use client';

import { Component, ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { hasError: boolean; message: string }

export default class ChartErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error?.message ?? 'Unknown error' };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section style={{ marginBottom: 36 }}>
          <div className="card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
            📈 Product Views — ไม่สามารถโหลดกราฟได้
            <br />
            <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>{this.state.message}</span>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}
