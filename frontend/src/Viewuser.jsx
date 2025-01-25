import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const [error, setError] = useState(""); // State to show error messages

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users"); // Replace with your backend API endpoint
        setUsers(response.data); // Store fetched users in state
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewMore = (userId) => {
    console.log("View more details for user:", userId);
    // You can add additional functionality here, like opening a modal or redirecting to a detailed view page.
  };

  const handleRemove = (userId) => {
    console.log("Remove user with ID:", userId);
    // You can add logic to remove the user, like sending a delete request to your API.
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>

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
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}></th> {/* Empty header for "View More" button */}
              <th style={styles.th}></th> {/* Empty header for "Remove" button */}
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.role === "tenant") // Filter users with role "tenant"
              .map((user) => (
                <tr key={user._id}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.username}</td>
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
    </div>
  );
};

const styles = {
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center", // Center-align the header cells
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center", // Center-align the data cells
  },
  viewMoreButton: {
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    backgroundColor: "#007bff", // Blue color for "View More" button
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  removeButton: {
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    backgroundColor: "#dc3545", // Red color for "Remove" button
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
};

export default UsersList;
