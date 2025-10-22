import React from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/AdminAccess.css";
import AdminStats from "../Component/AdminStats";

function AdminAccess() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="cont">
        <h1 className="title">Welcome to MexBus, Admin!</h1>
        <div className="buttons">
          <button
            className="admin-btn users"
            onClick={() => navigate("/userlist")}
          >
            Manage Users
          </button>

          <button
            className="admin-btn stations"
            onClick={() => navigate("/ASchedule")}
          >
            Manage Schedules
          </button>

          <button
            className="admin-btn stations"
            onClick={() => navigate("/messages")}
          >
            Manage Messages
          </button>
        </div>

        <AdminStats />
      </div>
    </div>
  );
}

export default AdminAccess;
