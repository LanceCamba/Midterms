import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import AdminNavbar from "./Component/AdminNavbar";
import Footer from "./Component/Footer";
import StationDetails from "./Component/StationDetails";
import HomePage from "./Pages/HomePage";
import RoutePage from "./Pages/RoutePage";
import Stations from "./Pages/Stations";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import Favorites from "./Pages/Favorites";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import AdminAccess from "./Pages/AdminAccess";
import AdminMessages from "./Pages/AdminMessages";
import ASchedule from "./Pages/ASchedule";
import UserListWithActions from "./Pages/UserList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const adminRoutes = ["/AdminNavbar", "/adminaccess", "/userlist", "/aschedule", "/messages"];

  const isAdminPage = adminRoutes.some((path) => location.pathname.startsWith(path));

  return (
    <>
      {isAdminPage ? <AdminNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/routes/:routeId" element={<RoutePage />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/stations/:id" element={<StationDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="contactus" element={<ContactUs/>} />
        <Route path="/favorites" element={<Favorites />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminaccess" element={<AdminAccess />} />
        <Route path="/userlist" element={<UserListWithActions />} />
        <Route path="/aschedule" element={<ASchedule />} />
        <Route path="/messages" element={<AdminMessages />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
