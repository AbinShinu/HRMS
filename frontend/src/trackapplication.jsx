import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrackApplications = () => {
    const [applications, setApplications] = useState([]);
    const applicantId = localStorage.getItem('userId'); // Get applicantId from localStorage (assuming user is logged in)
    const token = localStorage.getItem('authToken'); // Get token for authorization

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/api/application/${applicantId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        if (applicantId && token) {
            fetchApplications();
        }
    }, [applicantId, token]);

    return (
        <div style={styles.container}>
            <h2>Your Applications</h2>
            {applications.length > 0 ? (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>Application ID</th>
                                <th style={styles.tableHeader}>Application Time</th>
                                <th style={styles.tableHeader}>Status</th>
                                <th style={styles.tableHeader}>Home Location</th>
                                <th style={styles.tableHeader}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application) => (
                                <tr key={application._id}>
                                    <td style={styles.tableData}>{application._id}</td>
                                    <td style={styles.tableData}>
                                        {new Date(application.timestamp).toLocaleString()}
                                    </td>
                                    <td style={styles.tableData}>{application.status}</td>
                                    <td style={styles.tableData}>{application.homeId.location}</td>
                                    <td style={styles.tableData}>₹{application.homeId.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No applications found.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#070707',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    tableContainer: {
        width: '80%',  // You can adjust this value to fit your needs (e.g., '60%' for smaller width)
        maxWidth: '900px',  // Optional: set a maximum width for the box
        padding: '20px',
        backgroundColor: '#070707',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        padding: '10px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#007bff',
        color: 'black',
    },
    tableData: {
        padding: '10px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
};

export default TrackApplications;
