import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [totalHomes, setTotalHomes] = useState(0);
  const [availableHomes, setAvailableHomes] = useState(0);
  const [rentedHomes, setRentedHomes] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [totalTenants, setTotalTenants] = useState(0);
  const [showManageHomes, setShowManageHomes] = useState(false);
  const [showManageApplications, setShowManageApplications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/users/api/home/count")
      .then((res) => res.json())
      .then((data) => {
        setTotalHomes(data.totalHomes || 0);
        setAvailableHomes(data.availableHomes || 0);
        setRentedHomes(data.rentedHomes || 0);
      })
      .catch((err) => console.error("Error fetching homes:", err));

    fetch("http://localhost:3000/users/api/application/count")
      .then((res) => res.json())
      .then((data) => {
        setTotalRequests(data.totalApplications || 0);
        setPendingRequests(data.pendingApplications || 0);
      })
      .catch((err) => console.error("Error fetching applications:", err));

    // Fetch total tenants
    fetch("http://localhost:3000/users/api/tenant/count")
      .then((res) => res.json())
      .then((data) => {
        setTotalTenants(data.totalTenants || 0);
      })
      .catch((err) => console.error("Error fetching tenants:", err));
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
          {/* Manage Homes with dropdown */}
          <li onClick={() => setShowManageHomes(!showManageHomes)}>
            <i className="fas fa-home"></i> Manage Homes
            <i
              className={`fas ${
                showManageHomes ? "fa-chevron-down" : "fa-chevron-right"
              }`}
            />
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

          {/* Manage Tenants */}
          <li>
            <Link to="/getuser">
              <i className="fas fa-users"></i> Manage Tenants
            </Link>
          </li>

          {/* Manage Applications with dropdown */}
          <li onClick={() => setShowManageApplications(!showManageApplications)}>
            <i className="fas fa-file-alt"></i> Manage Applications
            <i
              className={`fas ${
                showManageApplications ? "fa-chevron-down" : "fa-chevron-right"
              }`}
            />
          </li>
          {showManageApplications && (
            <ul className="submenu">
              <li>
                <Link to="/AllApplication">➤ Application History</Link>
              </li>
              <li>
                <Link to="/getPendingApplication">➤ New Applications</Link>
              </li>
            </ul>
          )}

          {/* Profile Settings */}
          <li>
            <Link to="/profilesettings">
              <i className="fas fa-user-cog"></i> Profile Settings
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
          <h1>Welcome Admin</h1>
        </div>
        <div className="widgets">
          <div className="homes-widget-container">
            <div className="widget" onClick={() => navigate("/viewhome")}>
              <h3>Total Homes</h3>
              <p>{totalHomes}</p>
            </div>
            <div className="widget" onClick={() => navigate("/availablehome")}>
              <h3>Available Homes</h3>
              <p>{availableHomes}</p>
            </div>
            <div className="widget" onClick={() => navigate("/rentedHome")}>
              <h3>Rented Homes</h3>
              <p>{rentedHomes}</p>
            </div>
          </div>

          <div className="applications-widget-container">
            <div className="widget" onClick={() => navigate("/AllApplication")}>
              <h3>Total Applications</h3>
              <p>{totalRequests}</p>
            </div>
            <div className="widget" onClick={() => navigate("/getPendingApplication")}>
              <h3>New/Pending Applications</h3>
              <p>{pendingRequests}</p>
            </div>
          </div>

          {/* New Widget for Total Tenants */}
          <div className="widget" onClick={() => navigate("/getuser")}>
            <h3>Total Tenants</h3>
            <p>{totalTenants}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
