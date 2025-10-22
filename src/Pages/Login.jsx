import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Signup.css";
import logo from "../Assets/metro.png";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: "#f25c1e",
      color: "#fff",
    });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const user = sessionStorage.getItem("loggedInUser");
      if (!user) navigate("/login");

    try {
      if (
        email === "Admin@gmail.com" &&
        password === "123"
      ) {
        sessionStorage.setItem("loggedInUser", "Admin");
        sessionStorage.setItem("userRole", "Admin");

        Toast.fire({
          title: "Welcome, Admin!",
          text: "Redirecting to the admin dashboard...",
        }).then(() => navigate("/adminaccess"));
        return;
      }

      const response = await fetch(
        `https://sheetdb.io/api/v1/mjsofaysxw41w/search?Email=${email}`
      );
      const data = await response.json();

      if (data.length === 0) {
        Toast.fire({
          title: "User not found!",
          text: "Please check your email or sign up first.",
        });
      } else if (data[0].Password === password) {
        const username = data[0].Name || "User";

        sessionStorage.setItem("loggedInUser", username);
        sessionStorage.setItem("userRole", "User");

        Toast.fire({
          title: `Welcome back, ${username}!`,
          text: "Login successful. Redirecting...",
        }).then(() => {
          navigate("/");
        });
      } else {
        Toast.fire({
          title: "Incorrect Password!",
          text: "Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="box">
        <form onSubmit={handleLogin} className="form">
          <img src={logo} alt="Metro Express Logo" className="logo" />

          <label htmlFor="email">Email:</label>
          <input id="email" type="email" name="email" placeholder="Enter your email" required />

          <label htmlFor="password">Password:</label>
          <input id="password" type="password" name="password" placeholder="Enter your password" required/>

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
