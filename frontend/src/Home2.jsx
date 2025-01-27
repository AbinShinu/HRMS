import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home2.css';
import { Link, useNavigate } from 'react-router-dom';

const HomePage2 = () => {
    const [homes, setHomes] = useState([]); // Initialize as an empty array
    const [selectedHome, setSelectedHome] = useState(null); // State for selected home
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

    const navigate = useNavigate();

    // Fetch homes from the database
    useEffect(() => {
        const fetchHomes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/api/home');
                setHomes(response.data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching homes:', error);
            }
        };

        fetchHomes();
    }, []);

    const handleViewDetails = (homeId) => {
        const home = homes.find((home) => home._id === homeId);
        setSelectedHome(home);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedHome(null);
    };

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <>
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2 className="dashboard-title">Welcome to HRMS</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to="/profilesettings" className="sidebar-link">Profile Settings</Link>
                        </li>
                        <li>
                            <Link to="/applications" className="sidebar-link">Track Applications</Link>
                        </li>
                        <li>
                            <Link to="/homes" className="sidebar-link">Home Listings</Link>
                        </li>
                        <li>
                            <button 
                                onClick={handleLogout} 
                                className="logout-btn"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="dashboard-main">
                <header className="homepage-header">
                    <h1>Find Your Dream Home Today!</h1>
                </header>

                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search for homes..."
                        className="search-bar"
                    />
                </div>

                <main className="homes-list">
    <h1>Available Homes</h1>
    {homes.length > 0 ? (
        <div className="homes-grid">
            {homes.map((home) => (
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
        <p>No homes available at the moment.</p>
    )}
</main>

            </div>

            {/* Modal to display home details */}
            {isModalOpen && selectedHome && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>Home Details</h2>
                        <p><strong>ID:</strong> {selectedHome._id}</p>
                        <p><strong>Location:</strong> {selectedHome.location}</p>
                        <p><strong>Price:</strong> ₹{selectedHome.price}</p>
                        <p><strong>Category:</strong> {selectedHome.category}</p>
                        <p><strong>Status:</strong> {selectedHome.status}</p>
                        <p><strong>Contact Person:</strong> {selectedHome.contactPersonName}</p>
                        <p><strong>Contact Email:</strong> {selectedHome.contactPersonEmail}</p>
                        <p><strong>Contact Phone:</strong> {selectedHome.contactPersonPhone}</p>
                        <p><strong>Applicants:</strong> {selectedHome.applicants?.length || 0}</p>
                        <button 
                            onClick={handleCloseModal} 
                            style={styles.closeButton}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            
        </div>
        <footer className="homepage-footer">
                <p>Contact Us: +91 1234567890 | email@example.com</p>
                <p>© 2025 HRMS. All Rights Reserved.</p>
            </footer>
        </>
        
    );
};

const styles = {
    viewMoreButton: {
        padding: "10px 15px",
        marginTop: "10px",
        cursor: "pointer",
        backgroundColor: "#007bff", // Blue color for "View More" button
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "14px",
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
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
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

export default HomePage2;
