import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserLayout from './TenantsLayout';
const TrackApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const applicantId = localStorage.getItem('userId'); 
    const token = localStorage.getItem('authToken'); 

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/api/application/${applicantId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setApplications(response.data);
            } catch (err) {
                console.error('Error fetching applications:', err);
                setError('Failed to load applications. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (applicantId && token) {
            fetchApplications();
        }
    }, [applicantId, token]);

    return (
        <UserLayout>    
        <div style={styles.container}>
            <h2 style={styles.heading}>Your Applications</h2>

            {loading ? (
                <p style={styles.loading}>Loading...</p>
            ) : error ? (
                <p style={styles.error}>{error}</p>
            ) : applications.length > 0 ? (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>SI No</th>
                                <th style={styles.tableHeader}>Application Time</th>
                                <th style={styles.tableHeader}>Status</th>
                                <th style={styles.tableHeader}>Home Location</th>
                                <th style={styles.tableHeader}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application, index) => (
                                <tr key={application._id}>
                                    <td style={styles.tableData}>{index + 1}</td>
                                    <td style={styles.tableData}>
                                        {new Date(application.timestamp).toLocaleString()}
                                    </td>
                                    <td style={styles.tableData}>{application.status}</td>
                                    <td style={styles.tableData}>{application.homeId?.location || 'N/A'}</td>
                                    <td style={styles.tableData}>₹{application.homeId?.price || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p style={styles.noData}>No applications found.</p>
            )}
        </div>
        </UserLayout>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#121212',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
    },
    heading: {
        marginBottom: '20px',
        fontSize: '24px',
    },
    tableContainer: {
        width: '80%',
        maxWidth: '900px',
        padding: '20px',
        backgroundColor: '#1e1e1e',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#292929',
        color: '#fff',
    },
    tableHeader: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '2px solid #444',
        backgroundColor: '#007bff',
        color: '#000',
    },
    tableData: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #444',
    },
    loading: {
        color: '#00bcd4',
    },
    error: {
        color: '#ff4d4d',
    },
    noData: {
        color: '#bbb',
    },
};

export default TrackApplications;
