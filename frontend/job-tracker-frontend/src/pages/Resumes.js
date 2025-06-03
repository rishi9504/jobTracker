import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import './Resumes.css';

const Resumes = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [newResume, setNewResume] = useState({
    title: '',
    resume_type: 'GENERAL',
    description: '',
    version: '',
    target_job_titles: '',
    keywords: '',
    file: null,
    fileName: ''
  });

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    }
  });

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/users/resumes/');
      setResumes(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setError('Failed to fetch resumes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e, isNewResume = true) => {
    const file = e.target.files[0];
    if (file) {
      if (isNewResume) {
        const updatedResume = { ...newResume };
        updatedResume.file = file;
        updatedResume.fileName = file.name;
        setNewResume(updatedResume);
      } else {
        const updatedResume = { ...selectedResume };
        updatedResume.file = file;
        updatedResume.fileName = file.name;
        setSelectedResume(updatedResume);
      }
    }
  };

  const handleInputChange = (field, value, isNewResume = true) => {
    if (isNewResume) {
      const updatedResume = { ...newResume };
      updatedResume[field] = value;
      setNewResume(updatedResume);
    } else {
      const updatedResume = { ...selectedResume };
      updatedResume[field] = value;
      setSelectedResume(updatedResume);
    }
  };

  const handleAddResume = async (e, formData) => {
    e.preventDefault();
    setError('');
    
    const submitData = new FormData();
    
    // Append all fields except file and fileName
    Object.keys(formData).forEach(key => {
      if (key !== 'file' && key !== 'fileName') {
        submitData.append(key, formData[key]);
      }
    });
    
    // Handle file upload
    if (formData.file) {
      submitData.append('file', formData.file);
    } else {
      setError('Please select a file');
      return;
    }

    try {
      const response = await api.post('/users/resumes/', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResumes([...resumes, response.data]);
      setShowAddModal(false);
      setNewResume({
        title: '',
        resume_type: 'GENERAL',
        description: '',
        version: '',
        target_job_titles: '',
        keywords: '',
        file: null,
        fileName: ''
      });
    } catch (error) {
      console.error('Error adding resume:', error.response || error);
      setError(error.response?.data?.detail || 'Failed to add resume. Please try again.');
    }
  };

  const handleEditResume = async (e, formData) => {
    e.preventDefault();
    setError('');
    
    const submitData = new FormData();
    
    // Append all fields except file, fileName, and file_url
    Object.keys(formData).forEach(key => {
      if (key !== 'file' && key !== 'fileName' && key !== 'file_url') {
        submitData.append(key, formData[key]);
      }
    });
    
    // Only append file if a new one is selected
    if (formData.file instanceof File) {
      submitData.append('file', formData.file);
    }

    try {
      const response = await api.put(`/users/resumes/${formData.id}/`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResumes(resumes.map(resume => 
        resume.id === formData.id ? response.data : resume
      ));
      setShowEditModal(false);
      setSelectedResume(null);
    } catch (error) {
      console.error('Error updating resume:', error.response || error);
      setError(error.response?.data?.detail || 'Failed to update resume. Please try again.');
    }
  };

  const handleDeleteResume = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.delete(`/users/resumes/${id}/`);
        setResumes(resumes.filter(resume => resume.id !== id));
        setError('');
      } catch (error) {
        console.error('Error deleting resume:', error);
        setError('Failed to delete resume. Please try again.');
      }
    }
  };

  const ResumeForm = ({ resume, onSubmit, submitText, isNew = true }) => {
    const [formData, setFormData] = useState(resume);

    useEffect(() => {
      setFormData(resume);
    }, [resume]);

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(e, formData);
    };

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          file: file,
          fileName: file.name
        }));
      }
    };

    return (
      <form onSubmit={handleSubmit} className="resume-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter resume title"
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select
            name="resume_type"
            value={formData.resume_type}
            onChange={handleChange}
            required
          >
            <option value="GENERAL">General Purpose</option>
            <option value="PYTHON">Python Developer</option>
            <option value="REACT">React Developer</option>
            <option value="FULLSTACK">Full Stack Developer</option>
            <option value="DATA">Data Analyst</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter resume description"
          />
        </div>
        <div className="form-group">
          <label>Version</label>
          <input
            type="text"
            name="version"
            value={formData.version}
            onChange={handleChange}
            placeholder="e.g., v1.0, 2024-Q1"
          />
        </div>
        <div className="form-group">
          <label>Target Job Titles (comma-separated)</label>
          <input
            type="text"
            name="target_job_titles"
            value={formData.target_job_titles}
            onChange={handleChange}
            placeholder="e.g., Software Engineer, Full Stack Developer"
          />
        </div>
        <div className="form-group">
          <label>Keywords (comma-separated)</label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="e.g., React, Python, AWS"
          />
        </div>
        <div className="form-group">
          <label>Resume File</label>
          <div className="file-input-container">
            <input
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx"
              required={isNew}
              className="file-input"
            />
            {(formData.fileName || formData.file_url) && (
              <div className="selected-file">
                Selected file: {formData.fileName || formData.file_url?.split('/').pop()}
              </div>
            )}
          </div>
        </div>
        <div className="modal-actions">
          <button type="submit" className="submit-button">{submitText}</button>
          <button 
            type="button" 
            className="cancel-button" 
            onClick={() => isNew ? setShowAddModal(false) : setShowEditModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="resumes-container">
      <div className="resumes-header">
        <div className="header-content">
          <h1>My Resumes</h1>
          <button className="add-resume-button" onClick={() => setShowAddModal(true)}>
            <i className="fas fa-plus"></i>
            Add New Resume
          </button>
        </div>
      </div>

      <div className="resumes-content">
        {error && <div className="error-message">{error}</div>}
        
        {isLoading ? (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Loading resumes...</span>
          </div>
        ) : (
          <div className="resumes-grid">
            {resumes.map((resume) => (
              <div key={resume.id} className="resume-card">
                <div className="resume-card-header">
                  <h3>{resume.title}</h3>
                  <span className={`resume-type ${resume.resume_type.toLowerCase()}`}>
                    {resume.resume_type}
                  </span>
                </div>
                <div className="resume-card-content">
                  {resume.description && (
                    <p className="description">{resume.description}</p>
                  )}
                  {resume.version && (
                    <p className="version">Version: {resume.version}</p>
                  )}
                  <p className="date">Updated: {new Date(resume.updated_at).toLocaleDateString()}</p>
                </div>
                <div className="resume-card-actions">
                  <a 
                    href={resume.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-button"
                  >
                    <i className="fas fa-eye"></i>
                    View
                  </a>
                  <button 
                    className="edit-button"
                    onClick={() => {
                      setSelectedResume(resume);
                      setShowEditModal(true);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                    Edit
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteResume(resume.id)}
                  >
                    <i className="fas fa-trash"></i>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {resumes.length === 0 && (
              <p className="no-resumes">No resumes yet. Start by adding one!</p>
            )}
          </div>
        )}

        {showAddModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Resume</h2>
              <ResumeForm 
                resume={newResume}
                onSubmit={handleAddResume}
                submitText="Add Resume"
                isNew={true}
              />
            </div>
          </div>
        )}

        {showEditModal && selectedResume && (
          <div className="modal">
            <div className="modal-content">
              <h2>Edit Resume</h2>
              <ResumeForm 
                resume={selectedResume}
                onSubmit={handleEditResume}
                submitText="Save Changes"
                isNew={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resumes; 