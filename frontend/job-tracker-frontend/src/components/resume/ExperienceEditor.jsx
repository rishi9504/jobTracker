// File: components/ExperienceEditor.jsx
import React from 'react';

export default function ExperienceEditor({ data, onChange }) {
  const updateJob = (index, key, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const updateBullet = (index, bulletIndex, value) => {
    const updated = [...data];
    updated[index].bullets[bulletIndex] = value;
    onChange(updated);
  };

  return (
    <section style={{ marginBottom: '16px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Experience</h2>
      {data.map((job, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '12px' }}>
          <input
            type="text"
            value={job.title}
            onChange={e => updateJob(index, 'title', e.target.value)}
            placeholder="Job Title"
            style={{ border: '1px solid #ccc', padding: '8px', width: '100%', marginBottom: '8px' }}
          />
          <input
            type="text"
            value={job.company}
            onChange={e => updateJob(index, 'company', e.target.value)}
            placeholder="Company"
            style={{ border: '1px solid #ccc', padding: '8px', width: '100%', marginBottom: '8px' }}
          />
          <input
            type="text"
            value={job.period}
            onChange={e => updateJob(index, 'period', e.target.value)}
            placeholder="Period"
            style={{ border: '1px solid #ccc', padding: '8px', width: '100%', marginBottom: '8px' }}
          />
          {job.bullets.map((b, bulletIndex) => (
            <textarea
              key={bulletIndex}
              value={b}
              onChange={e => updateBullet(index, bulletIndex, e.target.value)}
              placeholder={`Bullet ${bulletIndex + 1}`}
              style={{ border: '1px solid #ccc', padding: '8px', width: '100%', marginBottom: '4px' }}
            />
          ))}
        </div>
      ))}
    </section>
  );
}