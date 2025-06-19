import React from 'react';

export default function ProjectsEditor({ data, onChange }) {
  const updateProject = (idx, key, value) => {
    const updated = [...data];
    updated[idx] = { ...updated[idx], [key]: value };
    onChange(updated);
  };

  const updateStack = (idx, value) => {
    const updated = [...data];
    updated[idx].stack = value.split(',').map(s => s.trim());
    onChange(updated);
  };

  const addProject = () => {
    onChange([...data, { name: '', stack: [], description: '' }]);
  };

  const removeProject = (idx) => {
    const updated = data.filter((_, i) => i !== idx);
    onChange(updated);
  };

  return (
    <section style={{ marginBottom: '16px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Projects</h2>
      {data.map((proj, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '12px' }}>
          <input
            type="text"
            value={proj.name}
            onChange={e => updateProject(idx, 'name', e.target.value)}
            placeholder="Project Name"
            style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px', width: '100%' }}
          />
          <input
            type="text"
            value={proj.stack.join(', ')}
            onChange={e => updateStack(idx, e.target.value)}
            placeholder="Tech Stack (comma-separated)"
            style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px', width: '100%' }}
          />
          <textarea
            value={proj.description}
            onChange={e => updateProject(idx, 'description', e.target.value)}
            placeholder="Project Description"
            style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px', width: '100%' }}
          />
          <button onClick={() => removeProject(idx)} style={{ color: '#e3342f', fontSize: '14px' }}>Remove</button>
        </div>
      ))}
      <button onClick={addProject} style={{ marginTop: '8px', padding: '8px 12px', backgroundColor: '#38a169', color: '#fff', borderRadius: '4px', fontSize: '14px' }}>Add Project</button>
    </section>
  );
}
// This component allows users to edit their projects in the resume editor.
// It includes fields for project name, tech stack, and description.