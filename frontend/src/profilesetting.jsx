import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user profile on component mount
    axios
      .get('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Send the token here
      })
      .then((response) => setProfile(response.data))
      .catch((error) => console.error('Error fetching profile:', error));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put(
        '/http://localhost:3000/users/profilesettings',
        { ...profile },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Send the token when saving the profile
        }
      )
      .then((response) => {
        setProfile(response.data);
        setIsEditing(false);
        alert('Profile updated successfully');
      })
      .catch((error) => console.error('Error updating profile:', error));
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
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={profile.username}
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
