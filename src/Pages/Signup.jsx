import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Signup.css";
import logo from "../Assets/metro.png";

function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const response = await fetch("https://sheetdb.io/api/v1/mjsofaysxw41w", {
      method: "POST",
      body: new FormData(form),
    });

    if (response.ok) {
      Swal.fire({
        title: "Account Created!",
        text: "You’ve successfully signed up. Redirecting to the homepage...",
        icon: "success",
        confirmButtonColor: "#007bff",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        navigate("/"); 
      });

      form.reset();
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="box">
        <form onSubmit={handleSubmit} id="sheetdb-form" className="form">
          <img src={logo} alt="Metro Express Logo" className="logo" />

          <label htmlFor="name">Name:</label>
          <input id="name" type="text" name="data[Name]" placeholder="Full Name" required />

          <label htmlFor="email">Email:</label>
          <input id="email" type="email" name="data[Email]" placeholder="Enter your email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="data[Password]" placeholder="Enter your password" required />

          <button type="submit" className="button">Sign Up</button>

          <p className="sText">
            Already have an account?{" "}
            <Link to="/login" className="login-link">Log In</Link>
          </p>
        </form>
      </div>
    </div>

  );
}

export default Signup;
