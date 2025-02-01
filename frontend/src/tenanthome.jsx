import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserLayout from './TenantsLayout';
import './Home2.css';

const RentedHomesPage = () => {
    const [rentedHomes, setRentedHomes] = useState([]);
    const [selectedHome, setSelectedHome] = useState(null); // State for selected home
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

    useEffect(() => {
        const fetchRentedHomes = async () => {
            const tenantId = localStorage.getItem('userId'); // Assuming tenant ID is stored in localStorage
            const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage

            if (!tenantId || !token) {
                alert("Please log in to view rented homes.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/users/api/rentedhomes/${tenantId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setRentedHomes(response.data); // Update state with rented homes data
            } catch (error) {
                console.error('Error fetching rented homes:', error);
                alert('Error fetching rented homes.');
            }
        };

        fetchRentedHomes();
    }, []);

    const handleViewDetails = (homeId) => {
        const home = rentedHomes.find((home) => home._id === homeId);
        setSelectedHome(home);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedHome(null);
    };

    return (
        <UserLayout>
            <div>
                <h1>Your Rented Homes</h1>
                {rentedHomes.length > 0 ? (
                    <div className="homes-list">
                        {rentedHomes.map((home) => (
                            <div key={home._id} className="home-card">
                                <img 
                                    src={home.imageUrl[0]} 
                                    alt={home.category} 
                                    className="home-image"
                                />
                                <div className="home-details">
                                    <h3>{home.location}</h3>
                                    <p>Price: ₹{home.price}</p>
                                    <p>Category: {home.category}</p>
                                    <p>Status: {home.status}</p>
                                    <button
                                        onClick={() => handleViewDetails(home._id)}
                                        className="view-more-btn"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You have not rented any homes yet.</p>
                )}
            </div>

            {/* Modal to display home details */}
            {isModalOpen && selectedHome && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>Home Details</h2>
                        <p><strong>Location:</strong> {selectedHome.location}</p>
                        <p><strong>Price:</strong> ₹{selectedHome.price}</p>
                        <p><strong>Category:</strong> {selectedHome.category}</p>
                        <p><strong>Status:</strong> {selectedHome.status}</p>
                        <p><strong>Contact Person:</strong> {selectedHome.contactPersonName}</p>
                        <p><strong>Contact Email:</strong> {selectedHome.contactPersonEmail}</p>
                        <p><strong>Contact Phone:</strong> {selectedHome.contactPersonPhone}</p>
                        <button 
                            onClick={handleCloseModal} 
                            style={styles.closeButton}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </UserLayout>
    );
};

// Styles for modal
const styles = {
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
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        color: "white",
    },
    closeButton: {
        padding: "10px 15px",
        marginTop: "10px",
        cursor: "pointer",
        backgroundColor: "#28a745", // Green color for "Close" button
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "14px",
    },
};

export default RentedHomesPage;
