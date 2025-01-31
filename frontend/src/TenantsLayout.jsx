import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Home2.css';

const UserLayout = ({ children }) => {
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showTrackApplications, setShowTrackApplications] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="user-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>User Dashboard</h2>
        <ul>
          {/* Dashboard Link */}
          <li>
            <Link to="/home2" className="sidebar-link">
              Dashboard
            </Link>
          </li>

          {/* Profile Settings Dropdown */}
          <li onClick={() => setShowProfileSettings(!showProfileSettings)}>
            <i className="fas fa-user-cog"></i> Profile Settings
            <i className={`fas ${showProfileSettings ? "fa-chevron-down" : "fa-chevron-right"}`} />
          </li>
          {showProfileSettings && (
            <ul className="submenu">
              <li>
                <Link to="/userprofile">➤ Update Profile</Link>
              </li>
              
            </ul>
          )}

          {/* Track Applications Dropdown */}
          <li onClick={() => setShowTrackApplications(!showTrackApplications)}>
            <i className="fas fa-file-alt"></i> Track Applications
            <i className={`fas ${showTrackApplications ? "fa-chevron-down" : "fa-chevron-right"}`} />
          </li>
          {showTrackApplications && (
            <ul className="submenu">
              <li>
                <Link to="/trackapplication">➤ Track My Applications</Link>
              </li>
            </ul>
          )}

          {/* Logout */}
          <li>
            <button onClick={handleLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Welcome to Your Dashboard</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
