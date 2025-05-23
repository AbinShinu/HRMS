import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewhome.css';
import UserLayout from './TenantsLayout';

const UserRentedHomesList = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHome, setSelectedHome] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserRentedHomes = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId'); 
       // console.log('User ID:', userId); 

        if (!userId) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:3000/users/api/home/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHomes(response.data); // Assuming backend filters homes for this user
      } catch (err) {
        console.error('Error fetching rented homes:', err.response ? err.response.data : err.message);
        setError('Failed to load rented homes.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRentedHomes();
  }, []);

  const handleViewMore = (homeId) => {
    const home = homes.find((home) => home._id === homeId);
    setSelectedHome(home);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHome(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <UserLayout>
      <div className="homes-list">
        <h1>My Rented Homes</h1>
        {homes.length > 0 ? (
          <div className="homes-grid">
            {homes.map((home) => (
              <div key={home._id} className="home-card">
                <img src={home.imageUrl[0]} alt={home.category} style={{ width: '100%', height: '200px' }} />
                <div className="home-details">
                  <h3>{home.location}</h3>
                  <p>Price: {home.price}</p>
                  <p>Category: {home.category}</p>
                  <button onClick={() => handleViewMore(home._id)} style={styles.viewMoreButton}>
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have not rented any homes yet.</p>
        )}

        {isModalOpen && selectedHome && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h2>Home Details</h2>
              <p><strong>Location:</strong> {selectedHome.location}</p>
              <p><strong>Price:</strong> {selectedHome.price}</p>
              <p><strong>Category:</strong> {selectedHome.category}</p>
              <p><strong>Status:</strong> {selectedHome.status}</p>
              <p><strong>Contact Person:</strong> {selectedHome.contactPersonName}</p>
              <p><strong>Contact Email:</strong> {selectedHome.contactPersonEmail}</p>
              <p><strong>Contact Phone:</strong> {selectedHome.contactPersonPhone}</p>
              <button onClick={handleCloseModal} style={styles.closeButton}>Close</button>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

const styles = {
  viewMoreButton: {
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    backgroundColor: "#007bff",
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
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
};

export default UserRentedHomesList;
