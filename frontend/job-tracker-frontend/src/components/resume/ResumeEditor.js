// File: ResumeEditor.jsx
import React, { useState } from 'react';
import HeaderEditor from './HeaderEditor';
import SummaryEditor from './SummaryEditor';
import ExperienceEditor from './ExperienceEditor';
import ResumePreview from './ResumePreview';
import ResumeFormat from './ResumeFormat';
import EducationEditor from './EducationEditor';
import SkillsEditor from './SkillsEditor';
import ProjectsEditor from './ProjectsEditor';
// This file contains the main ResumeEditor component which allows users to edit their resume.


// Sample data

export default function ResumeEditor() {
  const [resumeData, setResumeData] = useState(ResumeFormat);

  const updateSection = (section, updatedValue) => {
    setResumeData(prev => ({
      ...prev,
      [section]: updatedValue
    }));
  };

  const handleSave = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'updatedResume.json';
    a.click();
  };

  return (
    <div style={{ padding: '24px', maxWidth: '80rem', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Resume Editor</h1>
      <HeaderEditor data={resumeData.header} onChange={(val) => updateSection('header', val)} />
      <SummaryEditor data={resumeData.summary} onChange={(val) => updateSection('summary', val)} />
      <ExperienceEditor data={resumeData.experience} onChange={(val) => updateSection('experience', val)} />
      {/* Add more sections like EducationEditor, SkillsEditor, etc. */}
      <EducationEditor data={resumeData.education} onChange={(val) => updateSection('education', val)} />
      <SkillsEditor data={resumeData.skills} onChange={(val) => updateSection('skills', val)} />
      <ProjectsEditor data={resumeData.projects} onChange={(val) => updateSection('projects', val)} />
      <button onClick={handleSave} style={{ marginTop: '24px', padding: '8px 16px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '4px', border: 'none' }}>Save to JSON</button>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Live Preview</h2>
        <ResumePreview data={resumeData} />
      </div>
    </div>
  );
}


