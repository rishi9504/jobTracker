import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import './SideNav.css';

const SideNav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sidenav">
      <div className="nav-section">
        <h3>Job Search</h3>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-home"></i>
          Dashboard
        </NavLink>
        <NavLink to="/applications" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-briefcase"></i>
          Applications
        </NavLink>
        <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-calendar-alt"></i>
          Calendar
        </NavLink>
      </div>

      <div className="nav-section">
        <h3>Documents</h3>
        <NavLink to="/resumes" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-file-alt"></i>
          Resumes
        </NavLink>
        <NavLink to="/cover-letters" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-envelope"></i>
          Cover Letters
        </NavLink>
      </div>

      <div className="nav-section">
        <h3>Network</h3>
        <NavLink to="/contacts" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-address-book"></i>
          Contacts
        </NavLink>
        <NavLink to="/companies" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-building"></i>
          Companies
        </NavLink>
      </div>

      <div className="nav-section">
        <h3>Analytics</h3>
        <NavLink to="/insights" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-chart-line"></i>
          Insights
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-file-contract"></i>
          Reports
        </NavLink>
      </div>

      <div className="nav-section">
        <h3>Settings</h3>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-user"></i>
          Profile
        </NavLink>
        <NavLink to="/preferences" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-cog"></i>
          Preferences
        </NavLink>
      </div>

      <div className="nav-section logout-section">
        <button onClick={handleLogout} className="logout-button">
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default SideNav; 