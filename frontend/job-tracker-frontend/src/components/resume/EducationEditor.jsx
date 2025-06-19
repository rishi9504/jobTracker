import React from 'react';

export default function EducationEditor({ data, onChange }) {
  const handleInput = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <section style={{ marginBottom: '16px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Education</h2>
      <input
        type="text"
        value={data.degree}
        onChange={e => handleInput('degree', e.target.value)}
        placeholder="Degree"
        style={{ border: '1px solid #ccc', padding: '8px', margin: '4px 0', width: '100%' }}
      />
      <input
        type="text"
        value={data.university}
        onChange={e => handleInput('university', e.target.value)}
        placeholder="University"
        style={{ border: '1px solid #ccc', padding: '8px', margin: '4px 0', width: '100%' }}
      />
      <input
        type="text"
        value={data.period}
        onChange={e => handleInput('period', e.target.value)}
        placeholder="Period"
        style={{ border: '1px solid #ccc', padding: '8px', margin: '4px 0', width: '100%' }}
      />
      <input
        type="text"
        value={data.location}
        onChange={e => handleInput('location', e.target.value)}
        placeholder="Location"
        style={{ border: '1px solid #ccc', padding: '8px', margin: '4px 0', width: '100%' }}
      />
    </section>
  );
}
// This component allows users to edit their education details in the resume editor.
// It includes fields for degree, university, period, and location.