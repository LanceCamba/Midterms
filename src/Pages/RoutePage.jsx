import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Assets/RoutePage.css";
import Schedule from "../Component/Schedule";
import RouteMap from "../Component/RouteMap";
import { FaBus } from "react-icons/fa";

function RoutePage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [time, setTime] = useState("");

  const { routeId } = useParams();
  console.log("ROUTE ID:", routeId);
  
  const routes = {
    "imus-makati": { name: "IMUS → MAKATI", sheet: "IMUS-MAKATI" },
    "makati-imus": { name: "MAKATI → IMUS", sheet: "MAKATI-IMUSs" },
    "atc-greenbelt": { name: "ATC → GREENBELT", sheet: "ATC-GREENBELT" },
    "greenbelt-atc": { name: "GREENBELT → ATC", sheet: "GREENBELT-ATC" },
    "atc-greenhills": { name: "ATC → GREENHILLS", sheet: "ATC-GREENHILLS" },
    "greenhills-atc": { name: "GREENHILLS → ATC", sheet: "GREENHILLS-ATC" },
    "laspinas-makati": { name: "LAS PIÑAS → MAKATI", sheet: "LASPINAS-MAKATI" },
    "makati-laspinas": { name: "MAKATI → LAS PIÑAS", sheet: "MAKATI-LASPINAS" },
    "calamba-bgc": { name: "CALAMBA → BGC", sheet: "CALAMBA-BGC" },
    "bgc-calamba": { name: "BGC → CALAMBA", sheet: "BGC-CALAMBA" },
    "nuvali-makati": { name: "NUVALI → MAKATI", sheet: "NUVALI-MAKATI" },
    "makati-nuvali": { name: "MAKATI → NUVALI", sheet: "MAKATI-NUVALI" },
  };
  
  const route = routes[routeId] || null;
  const name = route?.name || "Route Not Found";
  const sheet = route?.sheet || null;
  
  useEffect(() => {
    const now = new Date();
    setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    const timer = setInterval(() => {
      const n = new Date();
      setTime(n.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(stored.some((r) => r.routeId === routeId));
  }, [routeId]);
  
  if (!route) {
  return (
    <div className="route-container">
      <h2 style={{ textAlign: "center", color: "#e65c00", width: "100%" }}>
        Route not found
      </h2>
    </div>
  );}

  const handleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
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
          details: "Monday - Saturday",
        },
      ];
      showPopup("Added to Favorites");
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
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
          <h3>Schedules:</h3>
          <Schedule sheetName={sheet} />
        </div>
      </div>
    </div>
  );
  
}

export default RoutePage;
