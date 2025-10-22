import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import logo from "../Assets/logo.png";
import "../Assets/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const loggedInUserData = sessionStorage.getItem("loggedInUser");
  let loggedInUser;

  try {
    loggedInUser = JSON.parse(loggedInUserData);
  } catch {
    loggedInUser = loggedInUserData ? { Name: loggedInUserData } : null;
  }

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("userRole");
    closeDropdown();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className="navbar-right">
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/stations" onClick={() => setIsOpen(false)}>Stations</Link>
          </li>
          <li>
            <Link to="/favorites" onClick={() => setIsOpen(false)}>Favorites</Link>
          </li>
          
        </ul>

        <div className="nav-icons">
          <FaSearch className="nav-icon" />

          <div className="dropdown">
            <FaUser className="nav-icon user-icon" onClick={toggleDropdown} />

            {showDropdown && (
              <div className="dropdown-content">
                {loggedInUser ? (
                  <>
                    <p className="dropdown-user">{loggedInUser.Name}</p>
                    <p className="stext">Welcome to MexBus!</p>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/signup" onClick={closeDropdown}> Sign Up </Link>
                    <Link to="/login" onClick={closeDropdown}> Login </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          className={`menu-toggle ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
