import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home2.css'; // Use the same CSS
import { Link } from 'react-router-dom';

const HomePage2 = () => {
    const [homes, setHomes] = useState([
        // Initial mock data for four homes
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

    //Fetch data from the backend when the component mounts
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

    // Logout function
    const handleLogout = () => {
        // Perform logout logic here (e.g., clearing tokens)
        console.log('Logged out');
    };

    return (
        <>
        <div className="homepage">
            <header className="homepage-header">
                <h1>Welcome to HRMS</h1>
                <p>Find your dream home today!</p>
                <div className="auth-links">
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </header>
            <div className="main-container">
                {/* Search Bar */}
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search for homes..."
                        className="search-bar"
                    />
                </div>

                {/* Main Content */}
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

                {/* Logout Button */}
               
            </div>

            <footer className="homepage-footer">
                <p>Contact Us: +91 1234567890 | email@example.com</p>
                <p>© 2025 HRMS. All Rights Reserved.</p>
            </footer>
        </div>
        </>
    );
};

export default HomePage2;
