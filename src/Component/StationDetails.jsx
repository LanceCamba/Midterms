import React from "react";
import { useParams, Link } from "react-router-dom";
import Schedule from "./Schedule";
import "../Assets/StationDetails.css";

const stationInfo = {
  imus: {
    name: "IMUS STATION",
    location: "Daang Hari Road, cor Aguinaldo Hwy, Imus, Cavite",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.979177203074!2d120.9368424751479!3d14.37061698608891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d37faef3495b%3A0x2271700d622a3f58!2sThe%20District%20Imus!5e0!3m2!1sen!2sph!4v1761155376670!5m2!1sen!2sph",
    routes: [
      { routeKey: "imus-makati", dest: "MAKATI" },
    ],
  },
  makati: {
    name: "MAKATI STATION",
    location: "Ayala Tower One, Ayala Ave, Makati City, Metro Manila",
    mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.851965795602!2d121.02529507515126!3d14.550456685929962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9f6ba0ef9cf%3A0x1226e71e1618dbe5!2sOne%20Ayala%20Terminal!5e0!3m2!1sen!2sph!4v1761159143526!5m2!1sen!2sph",
    routes: [
      { routeKey: "makati-imus", dest: "IMUS" },
      { routeKey: "makati-laspinas", dest: "LAS PIÑAS" },
      { routeKey: "makati-nuvali", dest: "NUVALI" },
    ],
  },
  alabang: {
    name: "ALABANG STATION",
    location: "Commerce Avenue, corner Madrigal Ave, Muntinlupa, 1780 Metro Manila",
    mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.0738043988167!2d121.0273545751488!3d14.422908886042638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d105865923a5%3A0x52b872049e576880!2sAlabang%20Town%20Center!5e0!3m2!1sen!2sph!4v1761159286495!5m2!1sen!2sph",
    routes: [
      { routeKey: "atc-greenbelt", dest: "GREENBELT" },
      { routeKey: "atc-greenhills", dest: "GREENHILLS" },
    ],
  },
  greenbelt: {
    name: "GREENBELT STATION",
    location: "Greenbelt 1, Paseo de Roxas, Makati City, Metro Manila",
    mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.7970021666256!2d121.0181747751514!3d14.553598085927254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9a51dc29c5f%3A0x43121e57ed97d47a!2sGreenbelt%201%20P2P%20Terminal%20-%20Greenbelt%201-Alabang%20Town%20Center!5e0!3m2!1sen!2sph!4v1761159448265!5m2!1sen!2sph",
    routes: [{ routeKey: "greenbelt-atc", dest: "ALABANG" }],
  },
  greenhills: {
    name: "GREENHILLS STATION",
    location: "Greenhills Shopping Center, 1502 Ortigas Ave, San Juan City, Metro Manila",
    mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.969675606161!2d121.04390458004244!3d14.60080334949249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7d8b667a1bf%3A0x34a555b38fef3094!2sGreenhills%20Mall!5e0!3m2!1sen!2sph!4v1761159644761!5m2!1sen!2sph",
    routes: [{ routeKey: "greenhills-atc", dest: "ALABANG" }],
  },
  laspiñas: {
    name: "LAS PIÑAS STATION",
    location: "SM Southmall Alabang–Zapote Rd, Almanza, Las Piñas, 1750 Metro Manila",
    mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.8941813233682!2d121.00799157514902!3d14.433261386033514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d1dd991a126b%3A0x67862091bd5d31e2!2sSM%20Southmall!5e0!3m2!1sen!2sph!4v1761159887914!5m2!1sen!2sph",
    routes: [{ routeKey: "laspinas-makati", dest: "MAKATI" }],
  },
  calamba: {
    name: "CALAMBA STATION",
    location: "SM City Calamba National Road, Brgy Real Calamba City Triangle, 4027 Laguna",
    mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.8671820356476!2d121.15330257514464!3d14.202554236237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd63000286fa21%3A0x18d0e2688547e2d8!2sSM%20City%20Calamba!5e0!3m2!1sen!2sph!4v1761159984575!5m2!1sen!2sph",
    routes: [{ routeKey: "calamba-bgc", dest: "BGC" }],
  },
  bgc: {
    name: "BGC STATION",
    location: "MEXBus Terminal, 32nd St, Taguig, 1634 Metro Manila",
    mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4592.487889425744!2d121.01853148349211!3d14.55304938823505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c961fb9c2bb3%3A0x8978a82b9c5782d5!2sMEXBus(P2P)%20Terminal%20Makati%20-%20Taguig!5e0!3m2!1sen!2sph!4v1761160096426!5m2!1sen!2sph",
    routes: [{ routeKey: "bgc-calamba", dest: "CALAMBA" }],
  },
  nuvali: {
    name: "NUVALI STATION",
    location: "Nuvali, Santa Rosa, Laguna",
    mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.2797943314426!2d121.05497847514542!3d14.236893686207521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7d3d83da264f%3A0x3a8e4025b00e304f!2sNuvali!5e0!3m2!1sen!2sph!4v1761160163913!5m2!1sen!2sph",
    routes: [{ routeKey: "nuvali-makati", dest: "MAKATI" }],
  },
};

const StationDetails = () => {
  const { id } = useParams();
  const station = stationInfo[id];

  if (!station) {
    return (
      <div className="text-center mt-5">
        <h2>Station not found</h2>
        <Link to="/stations">← Back to Stations</Link>
      </div>
    );
  }

  return (
  <div className="container my-4 station-page">
    <div className="row">
      <div className="col-md-6">
        <iframe
          src={station.mapSrc}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title={`${station.name} Map`}
        ></iframe>

        <div className="travel-info mt-3">
          <strong>Location:</strong> {station.location}
        </div>
      </div>

      <div className="col-md-6">
        <h1 className="mb-4">{station.name}</h1>

        {station.routes.map((r, i) => (
          <div key={i} className="route-box">
            <h4>
              {station.name.split(" ")[0]} → {r.dest}
            </h4>
            <p>Schedules:</p>
            <div className="schedule-container">
              <Schedule sheetName={r.routeKey} />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="text-center mt-4">
      <Link to="/stations" className="back-btn">
        ← Back to Stations
      </Link>
    </div>
  </div>
);

};

export default StationDetails;
