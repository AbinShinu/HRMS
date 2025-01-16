import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileSettings = () => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Get the token from localStorage
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      setError("User not authenticated");
      return;
    }

    // Fetch user data using the token
    axios
      .get('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      })
      .then((response) => {
        const user = response.data.user || {};
        setUserData({
          name: user.name || '',
          username: user.username || '',
          email: user.email || '',
          password: '', // Password should not be pre-filled for security reasons
        });
      })
      .catch((error) => {
        console.error('Error fetching user data', error);
        setError('Could not fetch user data');
      });
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        'http://localhost:3000/users/update',
        {
          ...userData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      )
      .then((response) => {
        alert('Profile updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating profile', error);
        alert('Failed to update profile. Please try again.');
      });
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Update Profile</h2>
      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
      {userData && (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '5px',
                color: '#555',
              }}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '5px',
                color: '#555',
              }}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '5px',
                color: '#555',
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '5px',
                color: '#555',
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              color: '#fff',
              backgroundColor: '#007bff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileSettings;
