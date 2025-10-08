import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Bus from "../Assets/Bus.jpg"; 
import "../Assets/AboutPage.css";

function AboutPage() {
  return (
    <div className="about-container container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={Bus}
            alt="Metro Express Bus"
            className="img-fluid about-image rounded-3 shadow-sm"
          />
        </div>

        <div className="col-md-6">
          <h2 className="about-title fw-bold mb-3 text-uppercase">About</h2>
          <p className="about-text">
            Metro Express is a Premium Point-to-Point bus service designed to
            offer passengers a safe, fast, and comfortable travel experience
            between key city locations. Our mission is to connect communities
            with reliable and efficient transport while maintaining modern
            standards and convenience.
          </p>
          <p className="about-text">
            With every trip, we aim to provide accessibility, sustainability,
            and comfort — ensuring every passenger reaches their destination
            safely and on time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
