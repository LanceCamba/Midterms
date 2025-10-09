import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import logo from "../Assets/logo.png";
import "../Assets/Navbar.css";

  const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <li><Link to="/save" onClick={() => setIsOpen(false)}>Save</Link></li>
        </ul>

        <div className="nav-icons">
          <FaSearch className="nav-icon" />
          <Link to="/signup">
            <FaUser className="nav-icon user-icon" />
          </Link>
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