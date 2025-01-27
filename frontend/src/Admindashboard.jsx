import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [totalHomes, setTotalHomes] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch total homes count
    fetch('http://localhost:3000/users/api/home/count')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch total homes count");
        return res.json();
      })
      .then((data) => setTotalHomes(data.totalHomes || 0)) // Handle missing data gracefully
      .catch((err) => console.error("Error fetching total homes:", err));

    // Fetch total requests count
    fetch('/api/application/count')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch total requests count");
        return res.json();
      })
      .then((data) => setTotalRequests(data.totalRequests || 0)) // Handle missing data gracefully
      .catch((err) => console.error("Error fetching total requests:", err));
  }, []);

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
            <Link to="/addhome">
              <i className="fas fa-home"></i> Add Homes
            </Link>
          </li>
          <li>
            <Link to="/getuser">
              <i className="fas fa-users"></i> View Tenants
            </Link>
          </li>
          <li>
            <Link to="/profilesettings">
              <i className="fas fa-user-cog"></i> Profile Settings
            </Link>
          </li>
          <li>
            <Link to="/viewhome">
              <i className="fas fa-home"></i> View Homes
            </Link>
          </li>
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
