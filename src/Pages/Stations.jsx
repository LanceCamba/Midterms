import { Link } from "react-router-dom";
import React from "react";
import Bus from "../Assets/Bus.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Stations.css";

const stationList = [
  "IMUS",
  "MAKATI",
  "ALABANG",
  "GREENBELT",
  "GREENHILLS",
  "LAS PIÑAS",
  "CALAMBA",
  "BGC",
  "NUVALI",
];

const Stations = () => {
  return (
    <div className="stations-page text-center py-5">
      <h1 className="mb-5 text-danger fw-bold">STATIONS</h1>
      <div className="container">
        <div className="row justify-content-center">
          {stationList.map((name, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4"
              key={index}
            >
              <div className="station-card text-center">
                <Link to={`/stations/${name.toLowerCase()}`}>
                  <img src={Bus} alt={name} className="station-img" />
                </Link>
                <div className="station-card-body">
                  <h3>{name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stations;
