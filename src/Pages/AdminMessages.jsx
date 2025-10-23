import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../Assets/UserList.css"; 

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 5;

    const sheetdbUrl = "https://sheetdb.io/api/v1/8i0xrsehdkbfc";

    const fetchMessages = async () => {
    try {
        const response = await fetch(sheetdbUrl);
        const data = await response.json();
        setMessages(data);
    } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load messages.");
    }
    };

    useEffect(() => {
    fetchMessages();
    }, []);

    // Delete a message by email
    const handleDelete = async (email) => {
    const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This will permanently delete this message.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
        try {
        const response = await fetch(`${sheetdbUrl}/email/${email}`, {
            method: "DELETE",
        });
        if (response.ok) {
            Swal.fire("Deleted!", "Message has been removed.", "success");
            fetchMessages();
        } else {
            Swal.fire("Error", "Failed to delete message.", "error");
        }
        } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Error deleting message.", "error");
        }
    }
    };

    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);
    const totalPages = Math.ceil(messages.length / messagesPerPage);

    return (
    <div className="container mt-5">
        <h2 className="text-center mb-4">User Contact Messages</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
            <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    {currentMessages.length > 0 ? (
    currentMessages.map((msg, index) => (
        <tr key={index}>
        <td>{msg.Name || "—"}</td>
        <td>{msg.Email || "—"}</td>
        <td>{msg.Message || "—"}</td>
        <td>
            <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(msg.Email)}
            >
            Delete
            </button>
        </td>
        </tr>
    ))
    ) : (
    <tr>
        <td colSpan="4" className="text-center">
        No messages found 
        </td>
    </tr>
    )}
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

export default AdminMessages;
