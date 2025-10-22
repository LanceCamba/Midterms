import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Signup.css";
import logo from "../Assets/metro.png";

function Signup() {
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background: "#f25c1e",
    color: "#fff",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);

    const email = formData.get("data[Email]");
    const name = formData.get("data[Name]");

    const response = await fetch("https://sheetdb.io/api/v1/mjsofaysxw41w", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      sessionStorage.setItem("loggedInUser", JSON.stringify({ Name: name, Email: email }));
      sessionStorage.setItem("userEmail", email);

      Toast.fire({
        title: "You’ve successfully signed up! Redirecting to the homepage...",
      });

      setTimeout(() => {
        navigate("/");
      }, 2500);

      form.reset();
    } else {
      Toast.fire({
        title: "Something went wrong. Please try again.",
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
