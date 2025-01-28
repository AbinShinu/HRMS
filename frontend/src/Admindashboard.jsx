import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [totalHomes, setTotalHomes] = useState(0);
  const [availableHomes, setAvailableHomes] = useState(0);
  const [rentedHomes, setRentedHomes] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch homes count (total, available, rented)
    fetch('http://localhost:3000/users/api/home/count')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch home count data");
        return res.json();
      })
      .then((data) => {
        setTotalHomes(data.totalHomes || 0);
        setAvailableHomes(data.availableHomes || 0);
        setRentedHomes(data.rentedHomes || 0);
      })
      .catch((err) => console.error("Error fetching homes:", err));

    // Fetch applications count (total, pending)
    fetch('http://localhost:3000/users/api/application/count')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch application count data");
        return res.json();
      })
      .then((data) => {
        setTotalRequests(data.totalApplications || 0);
        setPendingRequests(data.pendingApplications || 0);
      })
      .catch((err) => console.error("Error fetching applications:", err));
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
            <Link to="/getApplication">
              <i className="fas fa-file-alt"></i> View Applications
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
          <div className="homes-widget-container">
            <div className="widget">
              <h3>Total Homes</h3>
              <p>{totalHomes}</p>
            </div>
            <div className="widget">
              <h3>Available Homes</h3>
              <p>{availableHomes}</p>
            </div>
            <div className="widget">
              <h3>Rented Homes</h3>
              <p>{rentedHomes}</p>
            </div>
          </div>

          <div className="applications-widget-container">
            <div className="widget">
              <h3>Total Applications</h3>
              <p>{totalRequests}</p>
            </div>
            <div className="widget">
              <h3>New/Pending Applications</h3>
              <p>{pendingRequests}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
