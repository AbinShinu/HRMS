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

  // Retrieve userId from localStorage (after successful login)
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!userId || !token) {
      setError("User not authenticated");
      return;
    }
  
    axios
      .get(`http://localhost:3000/users/${userId}`,  {
        headers: {
          Authorization: `Bearer ${token}`, // Adding token to the Authorization header
        }
      })
      .then((response) => {
        const user = response.data.user || {};  // Ensure user is defined
        setUserData({
          name: user.name || "",       // Default to empty string if not found
          username: user.username || "", // Default to empty string if not found
          email: user.email || "",     // Default to empty string if not found
          password: user.password || "", // Default to empty string if not found
        });
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
        setError("Could not fetch user data");
      });
  }, [userId, token]);
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:3000/users/update', {
      id: userId, // The user ID fetched after login
      ...userData, // Updated data from the form
    })
      .then((response) => {
        alert('Profile updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating profile', error);
        alert('Failed to update profile. Please try again.');
      });
  };
  

  return (
    <div>
      <h2>Update Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData && (
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
      )}
    </div>
  );
} 
export default ProfileSettings;
