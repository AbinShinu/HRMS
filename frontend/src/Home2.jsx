import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home2.css';
import { Link, useNavigate } from 'react-router-dom';

const HomePage2 = () => {
    const [homes, setHomes] = useState([
        {
            _id: '1',
            title: 'Cozy Apartment in the City',
            location: 'Downtown, Mumbai',
            rent: 25000,
            image: 'https://res.cloudinary.com/dw72cnkab/image/upload/v1736492968/city_apartment_xp2mbt.jpg',
        },
        {
            _id: '2',
            title: 'Luxury Villa with Pool',
            location: 'Suburbs, Bangalore',
            rent: 60000,
            image: 'https://res.cloudinary.com/dw72cnkab/image/upload/v1736492968/pool_apartment_zg832u.jpg',
        },
        {
            _id: '3',
            title: 'Modern Duplex with Garden',
            location: 'Pune, Maharashtra',
            rent: 45000,
            image: 'https://res.cloudinary.com/dw72cnkab/image/upload/v1736492968/garden_apartment_yxv2ow.jpg',
        },
        {
            _id: '4',
            title: 'Beachfront Cottage',
            location: 'Goa, India',
            rent: 70000,
            image: 'https://res.cloudinary.com/dw72cnkab/image/upload/v1736492967/beachfront_apartment_bl2iy6.jpg',
        },
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:3000/homes')
            .then((response) => {
                setHomes((prevHomes) => [...prevHomes, ...response.data]);
            })
            .catch((error) => {
                console.error('Error fetching homes:', error);
            });
    }, []);

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

                <main className="home-list">
                    {homes.length > 0 ? (
                        homes.map((home) => (
                            <div key={home._id} className="home-card">
                                <img
                                    src={home.image}
                                    alt={home.title}
                                    className="home-image"
                                />
                                <div className="home-details">
                                    <h2>{home.title}</h2>
                                    <p>{home.location}</p>
                                    <p>₹{home.rent}/month</p>
                                    <Link
                                        to={`/homes/${home._id}`}
                                        className="view-details"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No homes available at the moment.</p>
                    )}
                </main>
            </div>
        </div>

        <footer className="homepage-footer">
            <p>Contact Us: +91 1234567890 | email@example.com</p>
            <p>© 2025 HRMS. All Rights Reserved.</p>
        </footer>
        </>
    );
};

export default HomePage2;