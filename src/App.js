import React from "react";
import { GoogleMap } from '@vis.gl/react-google-maps';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import HomePage from "./Pages/HomePage";
import RoutePage from "./Pages/RoutePage";
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/routes/:routeId" element={<RoutePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
