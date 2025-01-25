import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // Ensure the styles are updated here
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [homes, setHomes] = useState([]); // Initialize with an empty array
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Add authentication state
    const navigate = useNavigate();

    // Fetch data from the backend when the component mounts
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

        // Check if user is logged in (this can be based on a token or session)
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleViewDetails = (homeId) => {
        if (isLoggedIn) {
            navigate(`/homes/${homeId}`);
        } else {
            navigate('/login'); // Redirect to login if not logged in
        }
    };

    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Welcome to HRMS</h1>
                <p>Find your dream home today!</p>
                <div className="auth-links">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </header>
            <main className="home-list">
                {homes.length > 0 ? (
                    homes.map((home) => (
                        <div key={home._id} className="home-card">
                            <img
                                src={home.imageUrl} // Use the image URL from the database
                                alt={home.title}
                                className="home-image"
                            />
                            <div className="home-details">
                                <h2>{home.title}</h2>
                                <p>{home.location}</p>
                                <p>₹{home.price}/month</p>
                                <button
                                    onClick={() => handleViewDetails(home._id)}
                                    className="view-details"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No homes available at the moment.</p>
                )}
            </main>
            <footer className="homepage-footer">
                <p>Contact Us: +91 1234567890 | email@example.com</p>
                <p>© 2025 HRMS. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
