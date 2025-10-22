import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import logo from "../Assets/logo.png";
import "../Assets/Navbar.css";

const AdminNavbar = () => {
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
        <Link to="/adminaccess" className="navbar-logo">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className="navbar-right">
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/aschedule" onClick={() => setIsOpen(false)}>Schedule</Link></li>
          <li><Link to="/userlist" onClick={() => setIsOpen(false)}>Users</Link></li>
          <li><Link to="/messages" onClick={() => setIsOpen(false)}>Messages</Link></li>
        </ul>

        <div className="nav-icons"> 
          <div className="dropdown">
            <FaUser
              className="nav-icon user-icon"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown-content">
                <Link to="/" onClick={handleLogout}>Logout</Link>
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
