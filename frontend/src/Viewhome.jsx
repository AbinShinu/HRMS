import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewhome.css';

const HomesList = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch homes from the API
    axios
      .get('http://localhost:3000/users/api/home') // Replace with your backend API endpoint
      .then((response) => {
        setHomes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching homes:', err);
        setError('Failed to load homes.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="homes-list">
      <h1>Available Homes</h1>
      {homes.length > 0 ? (
        <div className="homes-grid">
          {homes.map((home) => (
            <div key={home._id} className="home-card">
              <img src={home.imageUrl[0]} alt={home.category} style={{ width: '100%', height: '200px' }} />
              <div className="home-details">
                <h3>{home.location}</h3>
                <p>Price: {home.price}</p>
                <p>Category: {home.category}</p>
                <p>Status: {home.status}</p>
                <p>Contact Person: {home.contactPersonName}</p>
                <p>Contact Email: {home.contactPersonEmail}</p>
                <p>Contact Phone: {home.contactPersonPhone}</p>
                <p>Applicants: {home.applicants.length}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No homes available at the moment.</p>
      )}
    </div>
  );
};

export default HomesList;
