import React from "react";
import { useParams } from "react-router-dom";
import "../Assets/RoutePage.css";
import Bus from "../Assets/Bus.jpg"; 

function RoutePage() {
  const { routeId } = useParams();

  const routeData = {
    "imus-makati": {
      from: "IMUS",
      to: "MAKATI",
      days: "Monday - Saturday",
      image: Bus, 
      schedules: [
        "5:00 AM - First Trip",
        "6:30 AM - Second Trip",
        "8:00 AM - Third Trip",
        "10:00 AM - Fourth Trip",
      ],
    },
    "alabang-cubao": {
      from: "ALABANG",
      to: "CUBAO",
      days: "Monday - Sunday",
      image: Bus,
      schedules: [
        "6:00 AM - First Trip",
        "8:00 AM - Second Trip",
        "10:00 AM - Third Trip",
        "1:00 PM - Fourth Trip",
      ],
    },
  };

  const route = routeData[routeId];

  if (!route) {
    return (
      <div className="route-container">
        <h2>Route not found.</h2>
      </div>
    );
  }

  return (
    <div className="route-container">
      <div className="route-content">
        <div className="route-image">
          <img src={route.image} alt={`${route.from} to ${route.to}`} />
        </div>

        <div className="route-info">
          <h2 className="route-title">
            {route.from} <span className="arrow">→</span> {route.to}
          </h2>
          <h5 className="route-days">{route.days}</h5>

          <div className="schedule-box">
            <h6>Schedules:</h6>
            <ul>
              {route.schedules.map((schedule, index) => (
                <li key={index}>{schedule}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoutePage;
