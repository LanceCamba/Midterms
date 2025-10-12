import React from "react";
import "../Assets/RoutePage.css";
import Schedule from "../Component/Schedule";
import RouteMap from "../Component/RouteMap";

function RoutePage() {
  return (
    <div className="route-container">
      <div className="route-left">
        <div className="map-container">
          <RouteMap />
        </div>

        <div className="travel-info">
          <p><strong>Estimated Time:</strong> 43–54 minutes <strong>Distance:</strong> 25–33 km</p>
        </div>
      </div>

      <div className="route-right">
        <h2 className="route-title">
          <span className="from">IMUS</span> <span className="arrow">→</span>{" "}
          <span className="to">MAKATI</span>
        </h2>
        <p className="days">Monday - Saturday</p>

        <div className="schedule-box">
          <h3><strong>Schedules:</strong></h3>
          <Schedule />
        </div>
      </div>
    </div>
  );
}

export default RoutePage;
