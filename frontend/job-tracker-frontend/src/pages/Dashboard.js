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

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/jobs/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs');
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/jobs/', newJob, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
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
    } catch (error) {
      console.error('Error adding job:', error);
      setError('Failed to add job');
    }
  };

  const handleEditJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/jobs/${selectedJob.id}/`, selectedJob, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setJobs(jobs.map(job => job.id === selectedJob.id ? response.data : job));
      setShowEditModal(false);
      setSelectedJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Failed to update job');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/jobs/${jobId}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setJobs(jobs.filter(job => job.id !== jobId));
      } catch (error) {
        console.error('Error deleting job:', error);
        setError('Failed to delete job');
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

  const JobForm = ({ job, onSubmit, title, submitText }) => (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Company</label>
        <input
          type="text"
          value={job.company}
          onChange={(e) => job === newJob ? 
            setNewJob({...newJob, company: e.target.value}) : 
            setSelectedJob({...selectedJob, company: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Position</label>
        <input
          type="text"
          value={job.position}
          onChange={(e) => job === newJob ? 
            setNewJob({...newJob, position: e.target.value}) : 
            setSelectedJob({...selectedJob, position: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={job.description}
          onChange={(e) => job === newJob ? 
            setNewJob({...newJob, description: e.target.value}) : 
            setSelectedJob({...selectedJob, description: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Salary</label>
        <input
          type="text"
          value={job.salary}
          onChange={(e) => job === newJob ? 
            setNewJob({...newJob, salary: e.target.value}) : 
            setSelectedJob({...selectedJob, salary: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          value={job.location}
          onChange={(e) => job === newJob ? 
            setNewJob({...newJob, location: e.target.value}) : 
            setSelectedJob({...selectedJob, location: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={job.remote}
            onChange={(e) => job === newJob ? 
              setNewJob({...newJob, remote: e.target.checked}) : 
              setSelectedJob({...selectedJob, remote: e.target.checked})}
          />
          Remote
        </label>
      </div>
      <div className="form-group">
        <label>Notes</label>
        <textarea
          value={job.notes}
          onChange={(e) => job === newJob ? 
            setNewJob({...newJob, notes: e.target.value}) : 
            setSelectedJob({...selectedJob, notes: e.target.value})}
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

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Job Tracker</h1>
          <div className="user-section">
            <span className="username">Welcome, {user?.username || 'User'}!</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="jobs-header">
          <h2>Your Job Applications</h2>
          <button className="add-job-button" onClick={() => setShowAddModal(true)}>
            Add New Job
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="jobs-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-card" onClick={() => openDetailsModal(job)}>
              <h3>{job.company}</h3>
              <p className="position">{job.position}</p>
              <p className="status">Status: {job.status}</p>
              <p className="date">Applied: {new Date(job.applied_date).toLocaleDateString()}</p>
              <div className="job-actions" onClick={e => e.stopPropagation()}>
                <button className="edit-button" onClick={() => openEditModal(job)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDeleteJob(job.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {jobs.length === 0 && (
            <p className="no-jobs">No job applications yet. Start by adding one!</p>
          )}
        </div>

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
      </main>
    </div>
  );
};

export default Dashboard;
