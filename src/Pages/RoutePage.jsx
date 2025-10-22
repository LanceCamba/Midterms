import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Assets/RoutePage.css";
import Schedule from "../Component/Schedule";
import RouteMap from "../Component/RouteMap";
import { FaBus } from "react-icons/fa";

function RoutePage() {
  const { routeId } = useParams(); 
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [time, setTime] = useState("");

  const loggedInUser = sessionStorage.getItem("loggedInUser");

  useEffect(() => {
    if (!loggedInUser) return;
    const savedFavorites =
      JSON.parse(localStorage.getItem(`${loggedInUser}-favorites`)) || [];
    setIsFavorite(savedFavorites.some((r) => r.routeId === routeId));
  }, [routeId, loggedInUser]);

  const handleFavorite = () => {
    const key = `${loggedInUser}-favorites`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    const exists = stored.some((r) => r.routeId === routeId);

    let updated;
    if (exists) {
      updated = stored.filter((r) => r.routeId !== routeId);
      showPopup("Removed from Favorites");
    } else {
      updated = [
        ...stored,
        {
          routeId,
          routeName: name,
          image: `/maps/${routeId}.png`, 
          details: "Monday - Saturday | 43–54 mins | 25–33 km",
        },
      ];
      showPopup("Added to Favorites");
    }

    localStorage.setItem(key, JSON.stringify(updated));
    setIsFavorite(!exists);
  };

  const showPopup = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="route-container">
      <div className="route-left">
        <div className="map-container">
          <RouteMap routeId={routeId} />
        </div>
        <div className="travel-info">
          <p>
            <strong>Estimated Time:</strong> 43–54 mins{" "}
            <strong>Distance:</strong> 25–33 km
          </p>
        </div>
      </div>

      <div className="route-right">
        <div className="route-title-container">
          <h2 className="route-title">{name}</h2>
          <button
            className={`fav-btn ${isFavorite ? "active" : ""}`}
            onClick={handleFavorite}
          >
            <FaBus />
          </button>
        </div>

        <p className="days">Monday - Saturday</p>
        <div className="schedule-box">
          <h3><strong>Schedules:</strong></h3>
          <Schedule sheetName={sheet} />
        </div>

        <p className="current-time">Current Time: {time}</p>
        {showToast && <div className="toast-popup">{showToast}</div>}
      </div>
    </div>
  );
}

export default RoutePage;
