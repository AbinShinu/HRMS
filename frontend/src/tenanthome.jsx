// RentedHomesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserLayout from './TenantsLayout';
import './Home2.css';


const RentedHomesPage = () => {
    const [rentedHomes, setRentedHomes] = useState([]);

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
               // alert('Error fetching rented homes.');
            }
        };

        fetchRentedHomes();
    }, []);

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
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have not rented any homes yet.</p>
            )}
        </div>
        </UserLayout>
    );
};

export default RentedHomesPage;
