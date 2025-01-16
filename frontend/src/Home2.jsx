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
            image: 'https://i.pinimg.com/originals/99/5a/8c/995a8c342b93481f70a4d16f14afdd18.jpg',
        },
        {
            _id: '2',
            title: 'Luxury Villa with Pool',
            location: 'Suburbs, Bangalore',
            rent: 60000,
            image: 'https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg',
        },
        {
            _id: '3',
            title: 'Modern Duplex with Garden',
            location: 'Pune, Maharashtra',
            rent: 45000,
            image: 'https://cdn.gobankingrates.com/wp-content/uploads/2019/07/Beautiful-luxury-home-exterior-iStock-1054759884.jpg?quality=80',
        },
        {
            _id: '4',
            title: 'Beachfront Cottage',
            location: 'Goa, India',
            rent: 70000,
            image: 'https://smithbrothersconstruction.com/wp-content/uploads/2014/04/3KapaluaPl-566-Edit.jpg',
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
                            <Link to="/profile" className="sidebar-link">Profile Settings</Link>
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