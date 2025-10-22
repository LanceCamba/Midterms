import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Assets/Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  useEffect(() => {
    if (loggedInUser) {
      const savedFavorites =
        JSON.parse(localStorage.getItem(`${loggedInUser}-favorites`)) || [];
      setFavorites(savedFavorites);
    }
  }, [loggedInUser]);

  const handleRemove = (favToRemove) => {
    const updatedFavorites = favorites.filter((fav) => fav.routeName !== favToRemove.routeName);
    setFavorites(updatedFavorites);
    localStorage.setItem(`${loggedInUser}-favorites`, JSON.stringify(updatedFavorites));
  };

  if (!loggedInUser) {
    return (
      <div className="favorites-container">
        <h2 className="favorites-title">You’re not logged in!</h2>
        <p className="empty-favorites">Login or Sign up to add your favorite routes.</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">FAVORITES</h1>

      {favorites.length === 0 ? (
        <p className="empty-favorites">Add Your Favorite Routes!</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((fav, i) => (
            <div className="fav-card" key={i}>
              <img
                src={fav.image || "/placeholder.jpg"}
                alt={fav.routeName}
                className="fav-image"
              />
              <h3>{fav.routeName}</h3>
              <p>{fav.details || "Route info unavailable"}</p>
              <button className="remove-btn" onClick={() => handleRemove(fav)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
