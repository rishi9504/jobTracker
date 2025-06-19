import React from 'react';

export default function ResumePreview({ data }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '24px', backgroundColor: '#fff', color: '#1a202c', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '16px', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{data.header.name}</h1>
        <p style={{ fontSize: '16px', color: '#4a5568', fontStyle: 'italic' }}>{data.header.title}</p>
        <p style={{ fontSize: '14px', color: '#718096' }}>{data.header.email} | {data.header.phone} | {data.header.location}</p>
        <a style={{ fontSize: '14px', color: '#3182ce', textDecoration: 'underline' }} href={data.header.linkedin} target="_blank" rel="noopener noreferrer">
          {data.header.linkedin}
        </a>
      </div>

      {/* Summary */}
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', borderBottom: '1px solid #ccc', marginBottom: '8px' }}>Summary</h2>
        <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#2d3748' }}>{data.summary}</p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', borderBottom: '1px solid #ccc', marginBottom: '8px' }}>Experience</h2>
        {data.experience.map((exp, idx) => (
          <div key={idx} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{exp.title}</p>
              <p style={{ fontSize: '14px', color: '#718096', fontStyle: 'italic' }}>{exp.period}</p>
            </div>
            <p style={{ fontSize: '14px', color: '#4a5568', marginBottom: '8px' }}>{exp.company}</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '14px', color: '#2d3748' }}>
              {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', borderBottom: '1px solid #ccc', marginBottom: '8px' }}>Education</h2>
        <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{data.education.degree}</p>
        <p style={{ fontSize: '14px', color: '#4a5568' }}>{data.education.university} | {data.education.period}</p>
        <p style={{ fontSize: '14px', color: '#718096', fontStyle: 'italic' }}>{data.education.location}</p>
      </section>

      {/* Skills */}
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', borderBottom: '1px solid #ccc', marginBottom: '8px' }}>Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '14px' }}>
          {data.skills.map((skill, idx) => (
            <span key={idx} style={{ backgroundColor: '#edf2f7', padding: '4px 8px', borderRadius: '16px' }}>{skill}</span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', borderBottom: '1px solid #ccc', marginBottom: '8px' }}>Projects</h2>
        {data.projects.map((proj, idx) => (
          <div key={idx} style={{ marginBottom: '8px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{proj.name}</p>
            <p style={{ fontSize: '14px', color: '#4a5568', fontStyle: 'italic' }}>{proj.stack.join(', ')}</p>
            <p style={{ fontSize: '14px', color: '#2d3748' }}>{proj.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}