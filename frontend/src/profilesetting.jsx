import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    setToken(token);
    setUserId(userId);

    if (!token) {
      console.error('Token is missing from localStorage');
      alert('You need to log in again.');
      navigate('/login');
      return;
    }

    console.log('Authorization Token:', token);

    axios
      .get(`http://localhost:3000/users/fetch/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('Profile fetched:', response.data);
        setProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
      });
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put(
        `http://localhost:3000/users/profilesettings/${userId}`,
        { ...profile },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setProfile(response.data);
        setIsEditing(false);
        alert('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error.response ? error.response.data : error.message);
        alert('Failed to update profile. Please try again.');
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Profile Settings</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      ) : (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default ProfileSettings;
