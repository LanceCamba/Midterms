import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../Assets/UserList.css";

const AdminSchedule = () => {
  const routes = {
    "IMUS-MAKATI": "Imus → Makati",
    "MAKATI-IMUS": "Makati → Imus",
    "ATC-GREENBELT": "ATC → Greenbelt",
    "GREENBELT-ATC": "Greenbelt → ATC",
    "ATC-GREENHILLS": "ATC → Greenhills",
    "GREENHILLS-ATC": "Greenhills → ATC",
    "LASPINAS-MAKATI": "Las Piñas → Makati",
    "MAKATI-LASPINAS": "Makati → Las Piñas",
    "CALAMBA-BGC": "Calamba → BGC",
    "BGC-CALAMBA": "BGC → Calamba",
    "NUVALI-MAKATI": "Nuvali → Makati",
    "MAKATI-NUVALI": "Makati → Nuvali",
  };

  const [selectedSheet, setSelectedSheet] = useState("IMUS-MAKATI");
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Change this to YOUR working Apps Script deployment URL:
  const WRITE_API =
    "https://script.google.com/macros/s/AKfycbzlaLuOz04EocEeSLIhhheV152E8K7WfsILl9-Y5a4DbkAGRMLdKX9NNdFCdlc75MAZ/exec";

  // ✅ Reading from your opensheet.elk.sh (same as before)
  const READ_API =
    "https://opensheet.elk.sh/1rgbKL2dsFTFJBG_i5gFQ4BH3MvoVXX4-weq4rJiZ_yo";

  const statusOptions = [
    "On Time",
    "Boarding",
    "Arrived",
    "Departed",
    "Delayed",
    "Cancelled",
  ];

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${READ_API}/${selectedSheet}`);
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire("Error", "Failed to load schedule data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [selectedSheet]);

  const handleEdit = (index, field, value) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  const addRow = () => {
    setSchedule([...schedule, { Time: "", Status: "On Time" }]);
  };

  const deleteRow = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This schedule entry will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        const updated = schedule.filter((_, i) => i !== index);
        setSchedule(updated);
      }
    });
  };

  const saveChanges = async () => {
    if (!selectedSheet) {
      Swal.fire("Error", "Please select a route first.", "error");
      return;
    }

    try {
      const response = await fetch(WRITE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheet: selectedSheet,
          data: schedule,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire(
          "Saved!",
          `✅ Schedule for ${routes[selectedSheet]} updated successfully!`,
          "success"
        );
        fetchSchedule();
      } else {
        Swal.fire("Error", "❌ Failed to save schedule changes.", "error");
      }
    } catch (err) {
      console.error("Save error:", err);
      Swal.fire("Error", "Something went wrong while saving.", "error");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Admin Schedule Management</h2>

      {/* Route Selector + Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <select
          className="form-select w-auto"
          value={selectedSheet}
          onChange={(e) => setSelectedSheet(e.target.value)}
        >
          {Object.keys(routes).map((key) => (
            <option key={key} value={key}>
              {routes[key]}
            </option>
          ))}
        </select>

        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-primary" onClick={addRow}>
            Add Row
          </button>
          <button className="btn btn-success" onClick={saveChanges}>
            Save Changes
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center mt-5">Loading schedule...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "40%" }}>Time</th>
                <th style={{ width: "40%" }}>Status</th>
                <th style={{ width: "20%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedule.length > 0 ? (
                schedule.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        type="text"
                        className="form-control text-center"
                        value={row.Time || ""}
                        onChange={(e) =>
                          handleEdit(i, "Time", e.target.value)
                        }
                        placeholder="e.g. 8:30 AM"
                      />
                    </td>
                    <td>
                      <select
                        className="form-select text-center"
                        value={row.Status || "On Time"}
                        onChange={(e) =>
                          handleEdit(i, "Status", e.target.value)
                        }
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteRow(i)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-muted">
                    No schedule entries for this route.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSchedule;
