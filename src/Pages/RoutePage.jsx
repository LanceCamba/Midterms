import React, { useState, useEffect } from "react";
import "../Assets/RoutePage.css";
import Schedule from "../Component/Schedule";
import RouteMap from "../Component/RouteMap";
import { FaBus } from "react-icons/fa";

function RoutePage() {
  const routeName = "IMUS → MAKATI";
  const routeId = "imus-makati"; // used to open this page again
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
          routeName,
          image: `https://maps.googleapis.com/maps/api/staticmap?size=400x200&path=enc:encodedpath&key=AIzaSyA4HA3XYnt5P3VMX2AquW1wI6_pG1izYE0`,
          details: "Monday - Saturday ",
        },
      ];
      showPopup("Added to Favorites ");
    }

    localStorage.setItem(key, JSON.stringify(updated));
    setIsFavorite(!exists);
  };

  const showPopup = (message) => {
    setShowToast(message);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="route-container">
      {/* LEFT SIDE (MAP) */}
      <div className="route-left">
        <div className="map-container">
          <RouteMap />
        </div>

        <div className="travel-info">
          <p>
            <strong>Estimated Time:</strong> 43–54 mins{" "}
            <strong>Distance:</strong> 25–33 km
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (INFO) */}
      <div className="route-right">
        <div className="route-title-container">
          <h2 className="route-title">
            <span className="from">IMUS</span>{" "}
            <span className="arrow">→</span>{" "}
            <span className="to">MAKATI</span>
          </h2>

          <button
            className={`fav-btn ${isFavorite ? "active" : ""}`}
            onClick={handleFavorite}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <FaBus />
          </button>
        </div>

        <p className="days">Monday - Saturday</p>

        <div className="schedule-box">
          <h3>
            <strong>Schedules:</strong>
          </h3>
          <Schedule />
        </div>

        {showToast && <div className="toast-popup">{showToast}</div>}
      </div>
    </div>
  );
}

export default RoutePage;
