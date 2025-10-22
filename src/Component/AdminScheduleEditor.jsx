import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../Assets/UserList.css";

const AdminScheduleEditor = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState("IMUS-MAKATI");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTime, setEditTime] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const SHEETDB_API = "https://sheetdb.io/api/v1/iqe4w67dofyxj";
  
  const sheetOptions = [
    "IMUS-MAKATI", "MAKATI-IMUS", "ATC-GREENBELT", "GREENBELT-ATC",
    "ATC-GREENHILLS", "GREENHILLS-ATC", "LASPINAS-MAKATI", "MAKATI-LASPINAS",
    "CALAMBA-BGC", "BGC-CALAMBA", "NUVALI-MAKATI", "MAKATI-NUVALI"
  ];

  const statusOptions = ["On Time", "Boarding", "Delayed", "Arrived"];

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${SHEETDB_API}?sheet=${selectedSheet}`
      );
      const data = await response.json();
      setSchedules(data.filter(item => item.Time && item.Time.trim() !== ""));
      setCurrentPage(1);
    } catch (err) {
      Swal.fire("Error", "Failed to load schedules", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [selectedSheet]);

  const handleEdit = (item, index) => {
    setEditingIndex(index);
    setEditTime(item.Time);
    setEditStatus(item.Status);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditTime("");
    setEditStatus("");
  };

  const handleSave = async () => {
    if (!editTime.trim()) {
      Swal.fire("Error", "Time is required", "error");
      return;
    }

    const originalItem = schedules[editingIndex];
    
    try {
      const response = await fetch(
        `${SHEETDB_API}/Time/${encodeURIComponent(originalItem.Time)}?sheet=${selectedSheet}`,
        {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            data: {
              Time: editTime,
              Status: editStatus
            }
          })
        }
      );

      if (response.ok) {
        Swal.fire("Success", "Schedule updated successfully!", "success");
        handleCancelEdit();
        fetchSchedules();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update");
      }
    } catch (err) {
      Swal.fire(
        "Error",
        "Failed to save schedule: " + err.message,
        "error"
      );
      console.error(err);
    }
  };

  const handleDelete = async (item) => {
    const confirm = await Swal.fire({
      title: "Delete this schedule?",
      text: `Time: ${item.Time}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(
          `${SHEETDB_API}/Time/${encodeURIComponent(item.Time)}?sheet=${selectedSheet}`,
          { 
            method: "DELETE",
            headers: {
              "Accept": "application/json"
            }
          }
        );

        if (response.ok) {
          Swal.fire("Deleted!", "Schedule removed.", "success");
          fetchSchedules();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete");
        }
      } catch (err) {
        Swal.fire("Error", "Failed to delete schedule: " + err.message, "error");
        console.error(err);
      }
    }
  };

  const handleAddNew = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Add New Schedule',
      html:
        '<input id="swal-time" class="swal2-input" placeholder="Time (e.g., 6:00 AM)">' +
        '<select id="swal-status" class="swal2-input">' +
        '<option value="On Time">On Time</option>' +
        '<option value="Boarding">Boarding</option>' +
        '<option value="Delayed">Delayed</option>' +
        '<option value="Arrived">Arrived</option>' +
        '</select>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#f25c1e',
      preConfirm: () => {
        return {
          time: document.getElementById('swal-time').value,
          status: document.getElementById('swal-status').value
        }
      }
    });

    if (formValues && formValues.time.trim()) {
      try {
        const response = await fetch(
          `${SHEETDB_API}?sheet=${selectedSheet}`,
          {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              data: {
                Time: formValues.time,
                Status: formValues.status
              }
            })
          }
        );

        if (response.ok) {
          Swal.fire("Success", "Schedule added successfully!", "success");
          fetchSchedules();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add");
        }
      } catch (err) {
        Swal.fire("Error", "Failed to add schedule: " + err.message, "error");
        console.error(err);
      }
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = schedules.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(schedules.length / itemsPerPage);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: "#f25c1e", fontWeight: "bold" }}>
        Schedule Management
      </h2>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <label style={{ fontWeight: "600", marginRight: "10px" }}>Select Route:</label>
          <select
            value={selectedSheet}
            onChange={(e) => setSelectedSheet(e.target.value)}
            style={{
              padding: "8px 15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px"
            }}
          >
            {sheetOptions.map(sheet => (
              <option key={sheet} value={sheet}>{sheet}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddNew}
          style={{
            backgroundColor: "#f25c1e",
            color: "white",
            border: "none",
            padding: "8px 20px",
            borderRadius: "5px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          + Add Schedule
        </button>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <p style={{ color: "#f25c1e", fontSize: "18px" }}>Loading schedules...</p>
        </div>
      ) : (
        <>
          <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: "30px", color: "#777" }}>
                    No schedules found for this route
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => {
                  const actualIndex = indexOfFirstItem + index;
                  return (
                    <tr key={actualIndex}>
                      <td>{actualIndex + 1}</td>
                      <td>
                        {editingIndex === actualIndex ? (
                          <input
                            type="text"
                            value={editTime}
                            onChange={(e) => setEditTime(e.target.value)}
                            style={{ 
                              width: "100%",
                              padding: "5px",
                              border: "1px solid #ccc",
                              borderRadius: "4px"
                            }}
                          />
                        ) : (
                          item.Time
                        )}
                      </td>
                      <td>
                        {editingIndex === actualIndex ? (
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            style={{ 
                              width: "100%",
                              padding: "5px",
                              border: "1px solid #ccc",
                              borderRadius: "4px"
                            }}
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        ) : (
                          <span style={{
                            color: item.Status === "On Time" ? "#00b050" :
                                   item.Status === "Boarding" ? "#f4b400" :
                                   item.Status === "Delayed" ? "#d93025" : "#1a73e8",
                            fontWeight: "600"
                          }}>
                            {item.Status}
                          </span>
                        )}
                      </td>
                      <td>
                        {editingIndex === actualIndex ? (
                          <>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={handleSave}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEdit(item, actualIndex)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(item)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
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
          )}
        </>
      )}

      <div style={{
        marginTop: "30px",
        padding: "15px",
        backgroundColor: "#e7f3ff",
        borderLeft: "4px solid #2196F3",
        borderRadius: "4px"
      }}>
        <strong>✅ SheetDB Connected!</strong>
        <p style={{ marginBottom: "0", marginTop: "8px", fontSize: "14px" }}>
          You can now add, edit, and delete schedules. Changes will be reflected in your Google Sheet.
        </p>
      </div>
    </div>
  );
};

export default AdminScheduleEditor;