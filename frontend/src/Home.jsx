import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // Ensure the styles are updated here
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [homes, setHomes] = useState([
        // Initial mock data for four homes
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

    // Fetch data from the backend when the component mounts
    useEffect(() => {
        axios
            .get('http://localhost:3000/homes')
            .then((response) => {
                // Append fetched data to initial mock data
                setHomes((prevHomes) => [...prevHomes, ...response.data]);
            })
            .catch((error) => {
                console.error('Error fetching homes:', error);
            });
    }, []);

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
            <footer className="homepage-footer">
                <p>Contact Us: +91 1234567890 | email@example.com</p>
                <p>© 2025 HRMS. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
