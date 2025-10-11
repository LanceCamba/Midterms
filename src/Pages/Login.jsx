import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Signup.css";
import logo from "../Assets/metro.png";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
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
          title: "User not found!",
          text: "Please check your email or sign up first.",
          icon: "warning",
          confirmButtonColor: "#f8bb86",
        });
      } else if (data[0].Password === password) {
        Swal.fire({
          title: "Welcome back!",
          text: "Login successful. Redirecting to homepage...",
          icon: "success",
          confirmButtonColor: "#007bff",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/"); // ✅ redirect after login
        });
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
      <div className="box">
        <form onSubmit={handleLogin} id="sheetdb-form" className="form">
        <img src={logo} alt="Metro Express Logo" className="logo" />

        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email" placeholder="Enter your email" required/>

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Enter your password" name="password" required/>

        <button type="submit" className="button" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="sText">
          Don’t have an account?{" "}
          <Link to="/signup" className="login-link">
            Sign Up
          </Link>
        </p>
      </form>
        
      </div>
      
    </div>
  );
}

export default Login;
