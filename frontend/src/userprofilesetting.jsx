import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserLayout from './TenantsLayout';

const UserProfileSettings = () => {
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
    <UserLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>Profile Settings</h2>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone:</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonContainer}>
          {!isEditing ? (
            <button style={styles.editButton} onClick={() => setIsEditing(true)}>Edit Profile</button>
          ) : (
            <>
              <button style={styles.saveButton} onClick={handleSave}>Save</button>
              <button style={styles.cancelButton} onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

// Inline Styles Object
const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    color: '#555',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: 'black',
    transition: 'border-color 0.3s ease',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  editButton: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  saveButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  cancelButton: {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default UserProfileSettings;
