import React from 'react';

export default function SkillsEditor({ data, onChange }) {
  const updateSkill = (idx, value) => {
    const updated = [...data];
    updated[idx] = value;
    onChange(updated);
  };

  const addSkill = () => {
    onChange([...data, '']);
  };

  const removeSkill = (idx) => {
    const updated = data.filter((_, i) => i !== idx);
    onChange(updated);
  };

  return (
    <section style={{ marginBottom: '16px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Skills</h2>
      {data.map((skill, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <input
            type="text"
            value={skill}
            onChange={e => updateSkill(idx, e.target.value)}
            style={{ border: '1px solid #ccc', padding: '8px', width: '100%' }}
          />
          <button onClick={() => removeSkill(idx)} style={{ color: '#e3342f', fontSize: '14px' }}>Remove</button>
        </div>
      ))}
      <button onClick={addSkill} style={{ marginTop: '8px', padding: '8px 12px', backgroundColor: '#38a169', color: '#fff', borderRadius: '4px', fontSize: '14px' }}>Add Skill</button>
    </section>
  );
}
