import { Link } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Stations.css";

import imus from "../Assets/imus.png";
import makati from "../Assets/makati.jpg";
import alabang from "../Assets/alabang.webp";
import greenbelt from "../Assets/greenbelt.webp";
import greenhills from "../Assets/greenhills.jpg";
import laspinas from "../Assets/laspinas.jpg";
import calamba from "../Assets/calamba.jpg";
import bgc from "../Assets/bgc.jpg";
import nuvali from "../Assets/nuvali.jpg";

const stationList = [
  { name: "IMUS", image: imus },
  { name: "MAKATI", image: makati },
  { name: "ALABANG", image: alabang },
  { name: "GREENBELT", image: greenbelt },
  { name: "GREENHILLS", image: greenhills },
  { name: "LAS PIÑAS", image: laspinas },
  { name: "CALAMBA", image: calamba },
  { name: "BGC", image: bgc },
  { name: "NUVALI", image: nuvali },
];

const Stations = () => {
  return (
    <div className="stations-page text-center py-5">
      <div className="container">
        <h1 className="mb-5 text-danger fw-bold">STATIONS</h1>
        <div className="row justify-content-center">
          {stationList.map((station, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4"
              key={index}
            >
              <div className="station-card text-center shadow-sm">
                <Link to={`/stations/${station.name.toLowerCase()}`}>
                  <img
                    src={station.image}
                    alt={station.name}
                    className="station-img img-fluid"
                  />
                </Link>
                <div className="station-card-body mt-2">
                  <h3 className="fw-bold text-dark">{station.name}</h3>
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