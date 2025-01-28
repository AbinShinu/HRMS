import React, { useState, useEffect } from "react";
import "./Applications.css"; // Optional CSS for styling

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch applications from the backend
    fetch("http://localhost:3000/users/api/application")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch applications");
        return res.json();
      })
      .then((data) => setApplications(data))
      .catch((err) => console.error("Error fetching applications:", err));
  }, []);

  // Handle approve action
  const handleApprove = async (applicationId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/api/application/${applicationId}/approve`, {
        method: "PATCH", // Assuming a PATCH request for approval
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Application approved successfully!");
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: "approved" } : app
          )
        );
      } else {
        throw new Error("Failed to approve application");
      }
    } catch (error) {
      console.error("Error approving application:", error);
    }
  };

  // Handle remove action
  const handleRemove = async (applicationId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/api/application/${applicationId}`, {
        method: "PATCH", // Assuming a PATCH request to change status to "rejected"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });

      if (response.ok) {
        alert("Application removed successfully!");
        setApplications((prev) => prev.filter((app) => app._id !== applicationId));
      } else {
        throw new Error("Failed to remove application");
      }
    } catch (error) {
      console.error("Error removing application:", error);
    }
  };

  return (
    <div className="applications-container">
      <h1>Applications</h1>
      {applications.length > 0 ? (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Applicant Name</th>
              <th>Applicant Email</th>
              <th>Home Location</th>
              <th>Home Price</th>
              <th>Status</th>
              <th>Timestamp</th>
              <th> </th>
                <th> </th>  
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td>{application.applicationId}</td>
                <td>{application.applicantId?.name || "N/A"}</td>
                <td>{application.applicantId?.email || "N/A"}</td>
                <td>{application.homeId?.location || "N/A"}</td>
                <td>{application.homeId?.price || "N/A"}</td>
                <td>{application.status}</td>
                <td>{new Date(application.timestamp).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleApprove(application._id)}
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      marginRight: "5px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Approve
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleRemove(application._id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default Applications;
