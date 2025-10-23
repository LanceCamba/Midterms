import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaExchangeAlt } from "react-icons/fa";
import Metro from "../Assets/metro.png";
import Bus from "../Assets/BG.png";
import logo from "../Assets/logo.png"
import AbputBg from "../Assets/BGv3.png"
import "../Assets/MainPage.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Homepage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigate = useNavigate();

  const routes = {
    "imus-makati": { from: "Imus", to: "Makati" },
    "makati-imus": { from: "Makati", to: "Imus" },
    "atc-greenbelt": { from: "Atc", to: "Greenbelt" },
    "greenbelt-atc": { from: "Greenbelt", to: "Atc" },
    "atc-greenhills": { from: "Atc", to: "Greenhills" },
    "greenhills-atc": { from: "Greenhills", to: "Atc" },
    "laspinas-makati": { from: "Las Piñas", to: "Makati" },
    "makati-laspinas": { from: "Makati", to: "Las Piñas" },
    "calamba-bgc": { from: "Calamba", to: "BGC" },
    "bgc-calamba": { from: "BGC", to: "Calamba" },
    "nuvali-makati": { from: "Nuvali", to: "Makati" },
    "makati-nuvali": { from: "Makati", to: "Nuvali" },
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background: "#f25c1e",
    color: "#fff",
  });

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      Toast.fire({
        title: "Please log in to access this feature",
      });
      return;
    }

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
      Toast.fire({
        title: "No route found!",
      });
    }
  };

  return (
    <div>
      <div className="main-container d-flex align-items-center"
        style={{
          backgroundImage: `url(${Bus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="search-card p-4 shadow-lg rounded-4">
          <img src={Metro} alt="Metro Express" className="logo-img mb-3" />
          <p className="subtitle fw-bold">
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
      
      <div className="container-ab-fluid">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={AbputBg}
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
        
        <div className="row">
          <div className="container-ab">
            <img src={Metro} alt="Metro Express" className="logo-img" />
            <h4 className="about-title fw-bold text-uppercase">Contact Us</h4>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetch("https://sheetdb.io/api/v1/8i0xrsehdkbfc", {
                  method: "POST",
                  body: new FormData(e.target),
                })
                  .then((response) => response.json())
                  .then(() => {
                    Toast.fire({
                      title: "Thanks for reaching out! 💌",
                    });
                    e.target.reset();
                  })
                  .catch(() => {
                    Toast.fire({
                      icon: "error",
                      title: "Oops! Something went wrong. Please try again later.",
                    });
                  });
              }}
              id="sheetdb-form"
              className="contact-form"
            >
            <div className="text">
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" id="name" name="data[Name]" className="form-control" required/>
            </div>

            <div className="text">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" id="email" name="data[Email]" className="form-control" required />
            </div>

            <div className="text">
                <label htmlFor="message" className="form-label">Message:</label>
                <textarea id="message" name="data[Message]" className="form-control" rows="4"></textarea>
            </div>

            <button type="submit" className="botton"> Submit </button>
            </form>
          </div>
          
        </div>
      </div>

{/*
      <div className="container-fluid">
        <div className="row">
          <div className="col-md">
            <img src={logo} alt="" /><br/>
            <p className="tagline">Premium Point-to-Point bus</p>
            <h6 className="smol">about us</h6>
            <p className="smol-p">This project was created in partial fulfillment of the Midterm Examination in Web Development. </p>
          </div>

          <div className="col-md">
            <h6>ABOUT</h6>
            <p>
            Metro Express is a Premium Point-to-Point bus service designed to
            offer passengers a safe, fast, and comfortable travel experience
            between key city locations.
            </p>
          </div>
          <div className="col-md-3">
            <h6>CONTACT US</h6>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetch("https://sheetdb.io/api/v1/8i0xrsehdkbfc", {
                  method: "POST",
                  body: new FormData(e.target),
                })
                  .then((response) => response.json())
                  .then(() => {
                    Toast.fire({
                      title: "Thanks for reaching out! 💌",
                    });
                    e.target.reset();
                  })
                  .catch(() => {
                    Toast.fire({
                      icon: "error",
                      title: "Oops! Something went wrong. Please try again later.",
                    });
                  });
              }}
              id="sheetdb-form"
              className="contact-form"
            >
              <input type="email" id="email" name="data[Email]" className="form-em" placeholder="Your Email" required/>
              <button type="submit" className="boton"> -{">"}</button>
            </form>

          </div>
        </div>
      
      </div>
*/}
    </div>
  );
}

export default Homepage;
