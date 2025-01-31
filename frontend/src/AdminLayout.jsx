import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const AdminLayout = ({ children }) => {
  const [showManageHomes, setShowManageHomes] = useState(false);
  const [showManageApplications, setShowManageApplications] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>HRMS Admin</h2>
        <ul>
            <li>
                <Link to ="/admindashboard" className="sidebar-link">Dashboard</Link>   
            </li>
          {/* Manage Homes with dropdown */}
          <li onClick={() => setShowManageHomes(!showManageHomes)}>
            <i className="fas fa-home"></i> Manage Homes
            <i className={`fas ${showManageHomes ? "fa-chevron-down" : "fa-chevron-right"}`} />
          </li>
          {showManageHomes && (
            <ul className="submenu">
              <li>
                <Link to="/addhome">➤ Add Home</Link>
              </li>
              <li>
                <Link to="/viewhome">➤ Update Home</Link>
              </li>
            </ul>
          )}

          {/* Manage Tenants (Same as before) */}
          <li>
            <Link to="/getuser">
              <i className="fas fa-users"></i> Manage Tenants
            </Link>
          </li>

          {/* Manage Applications with dropdown */}
          <li onClick={() => setShowManageApplications(!showManageApplications)}>
            <i className="fas fa-file-alt"></i> Manage Applications
            <i className={`fas ${showManageApplications ? "fa-chevron-down" : "fa-chevron-right"}`} />
          </li>
          {showManageApplications && (
            <ul className="submenu">
              <li>
                <Link to="/getApplication">➤ Application History</Link>
              </li>
              <li>
                <Link to="/applications">➤ Applications</Link>
              </li>
            </ul>
          )}

          {/* Profile Settings (Same as before) */}
          <li>
            <Link to="/profilesettings">
              <i className="fas fa-user-cog"></i> Profile Settings
            </Link>
          </li>

          {/* Logout */}
          <li>
            <button onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Welcome, Admin</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
