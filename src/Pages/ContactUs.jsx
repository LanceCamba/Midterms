import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Bus from "../Assets/Bus.jpg";
import "../Assets/AboutPage.css";
import Metro from "../Assets/metro.png"

function ContactUs() {
return (
<div className="about-container container">
    <div className="row align-items-center">

    <div className="col">
        <img src={Bus} alt="Metro Express Bus" className="cont-image" />
    </div>

    <div className="col">
        <img src={Metro} alt="Metro Express" className="logo-img" />

        <h4 className="about-title fw-bold">Contact Us</h4>

        <form action="https://sheetdb.io/api/v1/8i0xrsehdkbfc" method="POST" id="sheetdb-form" className="contact-form">
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
);
}

export default ContactUs;
