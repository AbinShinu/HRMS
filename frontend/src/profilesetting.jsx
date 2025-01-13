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
  
  const userId = 'userId_from_localStorage'; // Replace with actual user ID, possibly stored in context or localStorage
  
  useEffect(() => {
    // Fetch the user data on component mount
    axios.get(`http://localhost:3000/users/${userId}`)
      .then(response => {
        setUserData(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user data', error);
        setError('Could not fetch user data');
      });
  }, [userId]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put('http://localhost:3000/users/update', {
      userId,
      ...userData
    })
      .then(response => {
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile', error);
        setError('Failed to update profile');
      });
  };

  return (
    <div>
      <h2>Update Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileSettings;
