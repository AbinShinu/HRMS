import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import "./Dashboard.css";


const Dashboard = () => {
  const [totalHomes, setTotalHomes] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch total homes
    fetch("/api/homes/count")
      .then((res) => res.json())
      .then((data) => setTotalHomes(data.totalHomes || 0)) // Default to 0 if data is undefined
      .catch((err) => {
        console.error(err);
        //alert("Failed to fetch total homes. Please try again later.");
      });

    // Fetch total requests
    fetch("/api/requests/count")
      .then((res) => res.json())
      .then((data) => setTotalRequests(data.totalRequests || 0)) // Default to 0 if data is undefined
      .catch((err) => {
        console.error(err);
        //alert("Failed to fetch new requests. Please try again later.");
      });
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
            <Link to="/manage-homes">
              <i className="fas fa-home"></i> Manage Homes
            </Link>
          </li>
          <li>
            <Link to="/manage-tenants">
              <i className="fas fa-users"></i> Manage Tenants
            </Link>
          </li>
          <li>
          <Link to="/profilesetting">
              <i className="fas fa-user-cog"></i> Profile Settings
              </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Welcome, Admin</h1>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
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
