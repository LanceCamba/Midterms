import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import logo from "../Assets/logo.png";
import "../Assets/Navbar.css";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/adminaccess" className="navbar-logo">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className="navbar-right">
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/aschedule" onClick={() => setIsOpen(false)}>Schedule</Link></li>
          <li><Link to="/userlist" onClick={() => setIsOpen(false)}>Users</Link></li>
        </ul>

        <div className="nav-icons"> 
          <div className="dropdown">
            <FaUser
              className="nav-icon user-icon"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown-content">
                <Link to="/" onClick={closeDropdown}>Logout</Link>
                <Link to="/adminaccess" onClick={closeDropdown}>Back to Admin Page</Link>
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

export default AdminNavbar;
