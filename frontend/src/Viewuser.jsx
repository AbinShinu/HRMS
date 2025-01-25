import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const [error, setError] = useState(""); // State to show error messages
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for "View More"
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [token, setToken] = useState(localStorage.getItem("authToken")); // Token for authorization

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewMore = (userId) => {
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleRemove = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:3000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          alert("User removed successfully.");
          setUsers(users.filter((user) => user._id !== userId)); // Update state
        })
        .catch((error) => {
          console.error("Error removing user:", error);
          alert("Failed to remove user. Please try again.");
        });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tenants List</h1>

      {loading && <p>Loading users...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && users.filter((user) => user.role === "tenant").length === 0 && (
        <p>No tenants found in the database.</p>
      )}

      {!loading && !error && users.filter((user) => user.role === "tenant").length > 0 && (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            textAlign: "left",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}></th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.role === "tenant")
              .map((user) => (
                <tr key={user._id}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.phone || "N/A"}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleViewMore(user._id)} style={styles.viewMoreButton}>
                      View More
                    </button>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => handleRemove(user._id)} style={styles.removeButton}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {/* Modal to display user details */}
      {isModalOpen && selectedUser && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>User Details</h2>
            <p><strong>ID:</strong> {selectedUser._id}</p>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(selectedUser.updatedAt).toLocaleString()}</p>
            <button onClick={handleCloseModal} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  },
  viewMoreButton: {
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  removeButton: {
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "black",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
    textAlign: "left",
  },
  closeButton: {
    padding: "5px 10px",
    marginTop: "10px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
};

export default UsersList;
