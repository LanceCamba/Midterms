import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../Assets/UserList.css";


const UserListWithActions = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const sheetdbUrl = "https://sheetdb.io/api/v1/mjsofaysxw41w";

  const fetchUsers = async () => {
    try {
      const response = await fetch(sheetdbUrl);
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load user data.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`${sheetdbUrl}/Email/${email}`, {
          method: "DELETE",
        });
        if (response.ok) {
          Swal.fire("Deleted!", "User has been removed.", "success");
          fetchUsers();
        } else {
          Swal.fire("Error", "Failed to delete user.", "error");
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Error deleting user.", "error");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.Email);
    setUpdatedName(user.Name);
    setUpdatedPassword(user.Password);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${sheetdbUrl}/Email/${editingUser}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            Name: updatedName,
            Password: updatedPassword,
          },
        }),
      });

      if (response.ok) {
        Swal.fire("Updated!", "User information has been updated.", "success");
        setEditingUser(null);
        fetchUsers();
      } else {
        Swal.fire("Error", "Failed to update user.", "error");
      }
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", "Something went wrong while updating.", "error");
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td>
                {editingUser === user.Email ? (
                  <input
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                ) : (
                  user.Name
                )}
              </td>
              <td>{user.Email}</td>
              <td>
                {editingUser === user.Email ? (
                  <input
                    value={updatedPassword}
                    onChange={(e) => setUpdatedPassword(e.target.value)}
                  />
                ) : (
                  user.Password
                )}
              </td>
              <td>{user.Role || "User"}</td>
              <td>
                {editingUser === user.Email ? (
                  <>
                    <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingUser(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.Email)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserListWithActions;
