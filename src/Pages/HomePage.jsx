import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaExchangeAlt } from "react-icons/fa";
import Metro from "../Assets/metro.png";
import Bus from "../Assets/Bus.jpg";
import "../Assets/MainPage.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigate = useNavigate();

  const routes = {
    "imus-makati": { from: "Imus", to: "Makati" },
    "alabang-cubao": { from: "Alabang", to: "Cubao" },
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    const formattedFrom = from.trim().toLowerCase();
    const formattedTo = to.trim().toLowerCase();

    const foundRoute = Object.entries(routes).find(
      ([, route]) =>
        route.from.toLowerCase() === formattedFrom &&
        route.to.toLowerCase() === formattedTo
    );

    if (foundRoute) {
      navigate(`/routes/${foundRoute[0]}`);
    } else {
      alert("No route found for that combination!");
    }
  };

  return (
    <div
      className="main-container d-flex align-items-center"
      style={{
        backgroundImage: `url(${Bus})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="search-card p-4 shadow-lg rounded-4">
        <img src={Metro} alt="Metro Express" className="logo-img mb-3" />
        <p className="subtitle fw-bold text-center">
          Premium Point To Point Bus
        </p>

        <h6 className="text-success fw-bold text-start mt-3 mb-2">
          Bus Locations
        </h6>

        <div className="location-inputs d-flex align-items-center mb-3 gap-2 flex-wrap">
          <input
            type="text"
            className="form-control"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <button className="swap-btn btn btn-light border" onClick={handleSwap}>
            <FaExchangeAlt />
          </button>
          <input
            type="text"
            className="form-control"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <button className="search-btn w-100 fw-bold" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Homepage;

