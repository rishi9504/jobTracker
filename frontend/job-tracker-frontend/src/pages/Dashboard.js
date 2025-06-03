import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [newJob, setNewJob] = useState({
    company: '',
    position: '',
    description: '',
    salary: '',
    location: '',
    remote: false,
    notes: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Create axios instance with default config
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  // Add request interceptor
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If error is 401 and we haven't tried to refresh token yet
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refresh_token');
          const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refreshToken
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh token is invalid, logout user
          await logout();
          navigate('/login');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/jobs/');
      setJobs(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs. Please try again.');
      if (error.response?.status === 401) {
        await logout();
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddJob = async (e, formData) => {
    e.preventDefault();
    try {
      const response = await api.post('/jobs/', formData);
      setJobs([...jobs, response.data]);
      setShowAddModal(false);
      setNewJob({
        company: '',
        position: '',
        description: '',
        salary: '',
        location: '',
        remote: false,
        notes: ''
      });
      setError('');
    } catch (error) {
      console.error('Error adding job:', error);
      setError('Failed to add job. Please try again.');
    }
  };

  const handleEditJob = async (e, formData) => {
    e.preventDefault();
    try {
      const response = await api.put(`/jobs/${formData.id}/`, formData);
      setJobs(jobs.map(job => job.id === formData.id ? response.data : job));
      setShowEditModal(false);
      setSelectedJob(null);
      setError('');
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Failed to update job. Please try again.');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.delete(`/jobs/${jobId}/`);
        setJobs(jobs.filter(job => job.id !== jobId));
        setError('');
      } catch (error) {
        console.error('Error deleting job:', error);
        setError('Failed to delete job. Please try again.');
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const openEditModal = (job) => {
    setSelectedJob({...job});
    setShowEditModal(true);
  };

  const openDetailsModal = (job) => {
    setSelectedJob(job);
    setShowDetailsModal(true);
  };

  const handleInputChange = (field, value, isNewJob = true) => {
    if (isNewJob) {
      const updatedJob = { ...newJob };
      updatedJob[field] = value;
      setNewJob(updatedJob);
    } else {
      const updatedJob = { ...selectedJob };
      updatedJob[field] = value;
      setSelectedJob(updatedJob);
    }
  };

  const JobForm = ({ job, onSubmit, submitText }) => {
    const [formData, setFormData] = useState(job);

    useEffect(() => {
      setFormData(job);
    }, [job]);

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

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder="Enter company name"
          />
        </div>
        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            placeholder="Enter job position"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter job description"
          />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter salary information"
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter job location"
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="remote"
              checked={formData.remote}
              onChange={handleChange}
            />
            Remote
          </label>
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter any additional notes"
          />
        </div>
        <div className="modal-actions">
          <button type="submit" className="submit-button">{submitText}</button>
          <button 
            type="button" 
            className="cancel-button" 
            onClick={() => job === newJob ? setShowAddModal(false) : setShowEditModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Job Applications</h1>
          <button className="add-job-button" onClick={() => setShowAddModal(true)}>
            <i className="fas fa-plus"></i>
            Add New Job
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {error && <div className="error-message">{error}</div>}
        {isLoading ? (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Loading jobs...</span>
          </div>
        ) : (
          <div className="jobs-list">
            {jobs.map((job) => (
              <div key={job.id} className="job-card" onClick={() => openDetailsModal(job)}>
                <h3>{job.company}</h3>
                <p className="position">{job.position}</p>
                <p className="status">Status: {job.status}</p>
                <p className="date">Applied: {new Date(job.applied_date).toLocaleDateString()}</p>
                <div className="job-actions" onClick={e => e.stopPropagation()}>
                  <button className="edit-button" onClick={() => openEditModal(job)}>
                    <i className="fas fa-edit"></i>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteJob(job.id)}>
                    <i className="fas fa-trash"></i>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {jobs.length === 0 && (
              <p className="no-jobs">No job applications yet. Start by adding one!</p>
            )}
          </div>
        )}

        {showAddModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Job</h2>
              <JobForm 
                job={newJob}
                onSubmit={handleAddJob}
                submitText="Add Job"
              />
            </div>
          </div>
        )}

        {showEditModal && selectedJob && (
          <div className="modal">
            <div className="modal-content">
              <h2>Edit Job</h2>
              <JobForm 
                job={selectedJob}
                onSubmit={handleEditJob}
                submitText="Save Changes"
              />
            </div>
          </div>
        )}

        {showDetailsModal && selectedJob && (
          <div className="modal">
            <div className="modal-content details-modal">
              <h2>{selectedJob.company}</h2>
              <div className="job-details">
                <div className="detail-group">
                  <label>Position</label>
                  <p>{selectedJob.position}</p>
                </div>
                <div className="detail-group">
                  <label>Status</label>
                  <p>{selectedJob.status}</p>
                </div>
                <div className="detail-group">
                  <label>Applied Date</label>
                  <p>{new Date(selectedJob.applied_date).toLocaleDateString()}</p>
                </div>
                {selectedJob.description && (
                  <div className="detail-group">
                    <label>Description</label>
                    <p>{selectedJob.description}</p>
                  </div>
                )}
                {selectedJob.salary && (
                  <div className="detail-group">
                    <label>Salary</label>
                    <p>{selectedJob.salary}</p>
                  </div>
                )}
                {selectedJob.location && (
                  <div className="detail-group">
                    <label>Location</label>
                    <p>{selectedJob.location}</p>
                  </div>
                )}
                <div className="detail-group">
                  <label>Remote</label>
                  <p>{selectedJob.remote ? 'Yes' : 'No'}</p>
                </div>
                {selectedJob.notes && (
                  <div className="detail-group">
                    <label>Notes</label>
                    <p>{selectedJob.notes}</p>
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <button className="edit-button" onClick={() => {
                  setShowDetailsModal(false);
                  openEditModal(selectedJob);
                }}>
                  Edit
                </button>
                <button className="cancel-button" onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedJob(null);
                }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
