import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Dashboard.css";

const Dashboard = () => {
  const [totalHomes, setTotalHomes] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch total homes
    fetch("/api/homes/count")
      .then((res) => res.json())
      .then((data) => setTotalHomes(data.totalHomes))
      .catch((err) => console.error(err));

    // Fetch total requests
    fetch("/api/requests/count")
      .then((res) => res.json())
      .then((data) => setTotalRequests(data.totalRequests))
      .catch((err) => console.error(err));
  }, []);

  const handleProfileSettings = () => {
    // Navigate to the Profile Settings page
    navigate("/profilesetting");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>HRMS Admin</h2>
        <ul>
          <li>
            <a href="/manage-homes">
              <i className="fas fa-home"></i> Manage Homes
            </a>
          </li>
          <li>
            <a href="/manage-tenants">
              <i className="fas fa-users"></i> Manage Tenants
            </a>
          </li>
          <li>
            <button onClick={handleProfileSettings} className="profile-settings-btn">
              <i className="fas fa-user-cog"></i> Profile Settings
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Welcome, Admin</h1>
          <button className="logout-btn">Logout</button>
        </div>

        {/* Widgets Section */}
        <div className="widgets">
          <div className="widget">
            <h3>Total Homes</h3>
            <p>{totalHomes}</p>
          </div>
          <div className="widget">
            <h3>New Requests</h3>
            <p>{totalRequests}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
