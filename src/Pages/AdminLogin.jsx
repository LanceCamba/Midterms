import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Signup.css";
import logo from "../Assets/metro.png";

function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(
        `https://sheetdb.io/api/v1/mjsofaysxw41w/search?Email=${email}`
      );
      const data = await response.json();

      if (data.length === 0) {
        Swal.fire({
          title: "Admin not found!",
          text: "Please check your email or contact support.",
          icon: "warning",
          confirmButtonColor: "#f8bb86",
        });
      } else if (data[0].Password === password) {
        if (data[0].Role === "Admin") {
          Swal.fire({
            title: "Access Granted!",
            text: "Welcome, Admin!",
            icon: "success",
            confirmButtonColor: "#007bff",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            navigate("/adminaccess");
          });
        } else {
          Swal.fire({
            title: "Access Denied!",
            text: "You are not authorized as an admin.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      } else {
        Swal.fire({
          title: "Incorrect Password!",
          text: "Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleAdminLogin} className="signup-form">
        <img src={logo} alt="Metro Express Logo" className="logo" />

        <h3 className="admin-title">Admin Login</h3>

        <label htmlFor="email">Admin Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your admin email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your admin password"
          name="password"
          required
        />

        <button type="submit" className="button" disabled={loading}>
          {loading ? "Verifying..." : "Log In"}
        </button>

        <p className="sText">
          Return to{" "}
          <Link to="/login" className="login-link">
            User Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default AdminLogin;
