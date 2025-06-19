// File: components/SummaryEditor.jsx
import React from 'react';

export default function SummaryEditor({ data, onChange }) {
  return (
    <section style={{ marginBottom: '16px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Summary</h2>
      <textarea
        value={data}
        onChange={e => onChange(e.target.value)}
        style={{ border: '1px solid #ccc', padding: '8px', width: '100%', height: '96px' }}
      />
    </section>
  );
}
