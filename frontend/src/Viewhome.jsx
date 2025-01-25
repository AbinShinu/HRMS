import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewhome.css';

const HomesList = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHome, setSelectedHome] = useState(null); // State for selected home
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    // Fetch homes from the API
    axios
      .get('http://localhost:3000/users/api/home') // Replace with your backend API endpoint
      .then((response) => {
        setHomes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching homes:', err);
        setError('Failed to load homes.');
        setLoading(false);
      });
  }, []);

  const handleViewMore = (homeId) => {
    const home = homes.find((home) => home._id === homeId);
    setSelectedHome(home);
    setIsModalOpen(true); // Open the modal to show details
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHome(null); // Clear selected home
  };

  const handleRemove = (homeId) => {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
  
    if (!token) {
      alert("You must be logged in to delete a home.");
      return;
    }
  
    if (window.confirm("Are you sure you want to delete this home?")) {
      axios
        .delete(`http://localhost:3000/users/api/home/${homeId}`, {
          headers: { Authorization: `Bearer ${token}` }, // Pass the token in the Authorization header
        })
        .then((response) => {
          alert("Home removed successfully.");
          setHomes(homes.filter((home) => home._id !== homeId)); // Update state after successful deletion
        })
        .catch((error) => {
          console.error("Error removing home:", error);
          alert("Failed to remove home. Please try again.");
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="homes-list">
      <h1>Available Homes</h1>
      {homes.length > 0 ? (
        <div className="homes-grid">
          {homes.map((home) => (
            <div key={home._id} className="home-card">
              <img src={home.imageUrl[0]} alt={home.category} style={{ width: '100%', height: '200px' }} />
              <div className="home-details">
                <h3>{home.location}</h3>
                <p>Price: {home.price}</p>
                <p>Category: {home.category}</p>

                {/* Only show full details if View More is clicked */}
                <button
                  onClick={() => handleViewMore(home._id)}
                  style={styles.viewMoreButton}
                >
                  View More
                </button>
                <button
                  onClick={() => handleRemove(home._id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>

                {/* Render full details only if View More is clicked */}
                {selectedHome && selectedHome._id === home._id && (
                  <>
                    <p>Status: {home.status}</p>
                    <p>Contact Person: {home.contactPersonName}</p>
                    <p>Contact Email: {home.contactPersonEmail}</p>
                    <p>Contact Phone: {home.contactPersonPhone}</p>
                    <p>Applicants: {home.applicants.length}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No homes available at the moment.</p>
      )}

      {/* Modal to display home details */}
      {isModalOpen && selectedHome && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Home Details</h2>
            <p><strong>ID:</strong> {selectedHome._id}</p>
            <p><strong>Location:</strong> {selectedHome.location}</p>
            <p><strong>Price:</strong> {selectedHome.price}</p>
            <p><strong>Category:</strong> {selectedHome.category}</p>
            <p><strong>Status:</strong> {selectedHome.status}</p>
            <p><strong>Contact Person:</strong> {selectedHome.contactPersonName}</p>
            <p><strong>Contact Email:</strong> {selectedHome.contactPersonEmail}</p>
            <p><strong>Contact Phone:</strong> {selectedHome.contactPersonPhone}</p>
            <p><strong>Applicants:</strong> {selectedHome.applicants.length}</p>
            <button onClick={handleCloseModal} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  },
  viewMoreButton: {
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    backgroundColor: "#007bff", // Blue color for "View More" button
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  removeButton: {
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    backgroundColor: "#dc3545", // Red color for "Remove" button
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "black",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
    textAlign: "left",
  },
  closeButton: {
    padding: "5px 10px",
    marginTop: "10px",
    cursor: "pointer",
    backgroundColor: "#28a745", // Green color for "Close" button
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
};

export default HomesList;
