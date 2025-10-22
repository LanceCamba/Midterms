import React from "react";
import "../Assets/Footer.css";
import logo from "../Assets/logo.png";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-left">
        <img src={logo} alt="Metro Express" className="footer-logo" />
      </div>
      
      <div className="footer-right">
        <p>
          Copyright ©2025 &nbsp;
          <span className="brand">Metro Express</span> &nbsp; | &nbsp;
          <span className="designer">Designed By: Camba & Añonuevo</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
