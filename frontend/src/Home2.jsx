import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home2.css';
import { Link, useNavigate } from 'react-router-dom';

const HomePage2 = () => {
    const [homes, setHomes] = useState([]); 
    const [filteredHomes, setFilteredHomes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedHome, setSelectedHome] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    // Fetch homes from the database
    useEffect(() => {
        const fetchHomes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/api/home');
                setHomes(response.data);
                setFilteredHomes(response.data); // Set initially filtered homes
            } catch (error) {
                console.error('Error fetching homes:', error);
            }
        };

        fetchHomes();
    }, []);

    // Handle category filter change
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

        if (category === "All") {
            setFilteredHomes(homes);
        } else {
            setFilteredHomes(homes.filter(home => home.category === category));
        }
    };

    // Extract unique categories
    const categories = ["All", ...new Set(homes.map(home => home.category))];

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

    const handleBookNow = async (homeId) => {
        try {
            const applicantId = localStorage.getItem('userId');
            const token = localStorage.getItem('authToken');
            
            if (!applicantId || !token) {
                alert('Missing user details or token');
                return;
            }
    
            const applicationData = {
                applicantName: "Applicant Name",
                applicantId,
                homeId,
            };
    
            const response = await axios.post(`http://localhost:3000/users/api/application/${homeId}`, applicationData, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            alert(response.data.message || "Application submitted successfully!");
        } catch (error) {
            alert(error.response?.data?.message || "There was an error submitting your application.");
        }
    };

    return (
        <>
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2 className="dashboard-title">Welcome to HRMS</h2>
                <nav>
                    <ul>
                        <li><Link to="/userdashboard" className="sidebar-link">Dashboard</Link></li>
                        <li><Link to="/userprofile" className="sidebar-link">Profile Settings</Link></li>
                        <li><Link to="/trackapplication" className="sidebar-link">Track Applications</Link></li>
                        <li><Link to="/tenanthome" className="sidebar-link">My Rented Homes</Link></li>
                        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                    </ul>
                </nav>

                {/* Category Filter */}
                <div className="filter-section">
                    <h3>Filter by Category</h3>
                    <select className="category-filter" value={selectedCategory} onChange={handleCategoryChange}>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Main Content */}
            <div className="dashboard-main">
                <header className="homepage-header">
                    <h1>Find Your Dream Home Today!</h1>
                </header>

                <main className="homes-list">
                    <h1>Available Homes</h1>
                    {filteredHomes.length > 0 ? (
                        <div className="homes-grid">
                            {filteredHomes.map((home) => (
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
                                        <div className="home-buttons">
                                            <button onClick={() => handleViewDetails(home._id)} className="view-more-btn">
                                                View Details
                                            </button>
                                            <button onClick={() => handleBookNow(home._id)} className="book-now-btn">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No homes available in this category.</p>
                    )}
                </main>
            </div>

            {/* Modal for Home Details */}
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
                        <button onClick={handleCloseModal} style={styles.closeButton}>Close</button>
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
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "14px",
    },
};

export default HomePage2;
