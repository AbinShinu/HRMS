import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from './TenantsLayout';

const UserDashboard = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <UserLayout>
        <div style={styles.userDashboard}>

            {/* Main Content */}
            <div style={styles.mainContent}>
                

                {/* Two Rows of Two Boxes Each */}
                <div style={styles.dashboardBoxes}>
                    <div style={styles.box} onClick={() => navigate('/trackapplication')}>
                        <h3>My Applications</h3>
                    </div>
                    <div style={styles.box} onClick={() => navigate('/rentedhome')}>
                        <h3>My Home</h3>
                    </div>
                </div>
                <div style={styles.dashboardBoxes}>
                    <div style={styles.box} onClick={() => navigate('/userprofile')}>
                        <h3>Profile</h3>
                    </div>
                    <div style={styles.box} onClick={() => navigate('/bookhome')}>
                        <h3>Book Home</h3>
                    </div>
                </div>

                {/* Additional Child Components */}
                {children}
            </div>
        </div>
        </UserLayout>
    );
};

// Styles in JSX
const styles = {
    userDashboard: {
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'black',
       
    },
    
    sidebar: {
        width: '250px',
        backgroundColor: '#333',
        color: 'white',
        padding: '20px',
        display: 'block',
        postion: 'relative',
        flexDirection: 'column',
        left: 0,
        top: 0,
        overflowY: 'auto',
        height: '100vh',
        
    },
    sidebarTitle: {
        marginBottom: '30px',
        textAlign: 'center',
    },
    sidebarList: {
        listStyleType: 'none',
        padding: '0',
    },
    sidebarListItem: {
        margin: '15px 0',
    },
    sidebarLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        display: 'block',
        padding: '10px',
        borderRadius: '5px',
        transition: 'background 0.3s',
    },
    sidebarLinkHover: {
        backgroundColor: '#374151',
    },
    logoutBtn: {
        color: 'white',
        background: 'none',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        padding: '10px',
        width: '100%',
        textAlign: 'left',
        borderRadius: '5px',
        transition: 'background 0.3s',
    },
    logoutBtnHover: {
        backgroundColor: '#dc3545',
    },
    submenu: {
        paddingLeft: '20px',
    },
    mainContent: {
        flex: '1',
        padding: '20px',
    },
    header: {
        marginBottom: '20px',
        color: '#ffffff',
    },
    dashboardBoxes: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Two columns per row
        gap: '20px',
        marginBottom: '20px',
    },
    box: {
        height: '150px', // Increased box size
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
    },
    boxHover: {
        transform: 'scale(1.05)',
    },
    nav:{
        display: 'flex',
        padding: '0',
        margin: '15px',
    },
    
    
};

export default UserDashboard;
