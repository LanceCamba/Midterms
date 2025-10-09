import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Signup.css";
import logo from "../Assets/maxbus logo.svg";

function Signup() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const response = await fetch("https://sheetdb.io/api/v1/mjsofaysxw41w", {
      method: "POST",
      body: new FormData(form),
    });

    if (response.ok) {
      alert("Success!");
      form.reset();
    } else {
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="signup-container">
      <form
        onSubmit={handleSubmit}
        id="sheetdb-form"
        className="signup-form"
      >
        <img src={logo} alt="Metro Express Logo" className="logo" />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="data[Email]"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          name="data[Password]"
          required
        />

        <a href="#" className="link">
          Forgot Password?
        </a>

        <button type="submit" className="button">
          Sign Up
        </button>

        <p className="sText">
          Already have an account? <a href="#">Log In</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
