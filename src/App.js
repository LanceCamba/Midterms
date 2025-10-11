import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import AdminNavbar from "./Component/AdminNavbar";
import Footer from "./Component/Footer";
import HomePage from "./Pages/HomePage";
import RoutePage from "./Pages/RoutePage";
import Stations from "./Pages/Stations";
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import AdminLogin from "./Pages/AdminLogin";
import AdminAccess from "./Pages/AdminAccess";
import AStation from "./Pages/AStation";
import UserListWithActions from "./Pages/UserList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const adminRoutes = ["/adminaccess", "/userlist", "/astation"];

  const isAdminPage = adminRoutes.some((path) => location.pathname.startsWith(path));

  return (
    <>
      {isAdminPage ? <AdminNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/routes/:routeId" element={<RoutePage />} />
        <Route path="/Stations" element={<Stations />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminaccess" element={<AdminAccess />} />
        <Route path="/userlist" element={<UserListWithActions />} />
        <Route path="/astation" element={<AStation />} />
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
