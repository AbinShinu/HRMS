import React, { useState, useEffect } from "react";
import "./Applications.css"; // Optional CSS for styling
import AdminLayout from "./AdminLayout";

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/api/application/all/applications");
        if (!response.ok) throw new Error("Failed to fetch applications");
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <AdminLayout>
      <div className="applications-container">
      <h1 style={{ color: 'white' }}>Applications</h1>

        {loading ? (
          <p>Loading applications...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : applications.length > 0 ? (
          <table className="applications-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Applicant Name</th>
                <th>Home Location</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td>{application.applicationId}</td>
                  <td>{application.applicantId?.name || "N/A"}</td>
                  <td>{application.homeId?.location || "N/A"}</td>
                  <td>{application.status}</td>
                  <td>{new Date(application.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No applications found.</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default AllApplications;
