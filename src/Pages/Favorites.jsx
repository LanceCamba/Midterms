import React, { useEffect, useState } from "react";
import "../Assets/Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const handleRemove = (route) => {
    const updated = favorites.filter((fav) => fav.routeName !== route.routeName);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">FAVORITES</h1>

      {favorites.length === 0 ? (
        <p className="empty-favorites">Add Your Favorite Routes!</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((fav, i) => (
            <div className="fav-card" key={i}>
              <img src={fav.image || "/placeholder.jpg"} alt={fav.routeName} />
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
