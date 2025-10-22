import React from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/AdminAccess.css";

function AdminAccess() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="content">
        <div className="buttons">
          <button
            className="admin-btn users"
            onClick={() => navigate("/userlist")}
          >
            Manage Users
          </button>

          <button
            className="admin-btn stations"
            onClick={() => navigate("/astation")}
          >
            Manage Stations
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminAccess;
