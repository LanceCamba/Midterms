import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import logo from "../Assets/logo.png";
import "../Assets/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
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
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/stations" onClick={() => setIsOpen(false)}>Stations</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
          <li><Link to="/favorites" onClick={() => setIsOpen(false)}>Favorites</Link></li>
        </ul>

        <div className="nav-icons">
          <FaSearch className="nav-icon" />

          <div className="dropdown">
            <FaUser
              className="nav-icon user-icon"
              onClick={toggleDropdown}
            />

            {showDropdown && (
              <div className="dropdown-content">
                <Link to="/signup" onClick={closeDropdown}>Sign Up</Link>
                <Link to="/login" onClick={closeDropdown}>Login</Link>
                <Link to="/admin" onClick={closeDropdown}>Admin</Link>
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
