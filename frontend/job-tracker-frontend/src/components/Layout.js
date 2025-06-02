import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useLocation } from 'react-router-dom';
import SideNav from './SideNav';
import './Layout.css';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const location = useLocation();

  // Don't show sidenav on login and register pages
  const shouldShowSideNav = user && !['/login', '/register'].includes(location.pathname);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="layout">
      {shouldShowSideNav && (
        <>
          <div className={`sidenav-container ${isSideNavOpen ? 'open' : ''}`}>
            <SideNav />
          </div>
          <button 
            className={`menu-toggle ${isSideNavOpen ? 'open' : ''}`}
            onClick={toggleSideNav}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </>
      )}
      <main className={`main-content ${shouldShowSideNav ? 'with-sidenav' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout; 