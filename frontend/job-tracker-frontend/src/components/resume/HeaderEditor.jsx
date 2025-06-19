// File: components/HeaderEditor.jsx
import React from 'react';

export default function HeaderEditor({ data, onChange }) {
  const handleInput = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <section style={{ marginBottom: '16px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Header</h2>
      {Object.entries(data).map(([key, val]) => (
        <input
          key={key}
          type="text"
          value={val}
          onChange={e => handleInput(key, e.target.value)}
          placeholder={key}
          style={{ border: '1px solid #ccc', padding: '8px', margin: '4px 0', width: '100%' }}
        />
      ))}
    </section>
  );
}
