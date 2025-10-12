import React, { useEffect, useState } from "react";
import "../Assets/Favorites.css";

function Favorites() {
  const adminEmail = "Admin@gmail.com";
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem(`favorites_${adminEmail}`)) || [];
    setFavorites(stored);
  }, []);

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">FAVORITES</h1>
      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          favorites.map((fav, i) => (
            <div className="fav-card" key={i}>
              <img src={fav.image || "/placeholder.jpg"} alt={fav.name} />
              <h3>{fav.name}</h3>
              <p>{fav.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
