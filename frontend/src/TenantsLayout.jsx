import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Home2.css';

const UserLayout = ({ children }) => {
  //const [showProfileSettings, setShowProfileSettings] = useState(false);
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
            <Link to="/userdashboard" className="sidebar-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/bookhome" className="sidebar-link">  
              <i className="fas fa-home"></i> Book Home
            </Link>
          </li>

          {/* Profile Settings Direct Link */}
          <li>
            <Link to="/userprofile" className="sidebar-link">
              <i className="fas fa-user-cog"></i> Profile Settings
            </Link>
          </li>

          {/* Track Applications Direct Link */}
          <li>
            <Link to="/trackapplication" className="sidebar-link">
              <i className="fas fa-file-alt"></i> Track My Applications
            </Link>
          </li>

          <li>
            <Link to="/userhome" className="sidebar-link">
              <i className="fas fa-home"></i> My Rented Home
            </Link>
          </li>

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
