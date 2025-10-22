import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/Favorites.css";

const MAP_LINKS = {
  "imus-makati": "https://maps.app.goo.gl/Ha1pf7uDNhKBDX8u6",
  "makati-imus": "https://maps.app.goo.gl/Ha1pf7uDNhKBDX8u6",
  "atc-greenbelt": "https://maps.app.goo.gl/GMzFEXhWZhNmYgsQ7",
  "greenbelt-atc": "https://maps.app.goo.gl/4qBAWonoFSh8iqYA6",
  "atc-greenhills": "https://maps.app.goo.gl/ZBKgiiDTxfMQvSmL7",
  "greenhills-atc": "https://maps.app.goo.gl/6uvsQwPGGG6LGqC87",
  "laspinas-makati": "https://maps.app.goo.gl/ze5wifzTu9yD4oNb9",
  "makati-laspinas": "https://maps.app.goo.gl/9EfboZooi1jszpLPA",
  "calamba-bgc": "https://maps.app.goo.gl/9dFA72uMYeCKXosx9",
  "bgc-calamba": "https://maps.app.goo.gl/vHRyL8t5MwwHfqUB8",
  "nuvali-makati": "https://maps.app.goo.gl/YRqDHPvM3HCxrxqDA",
  "makati-nuvali": "https://maps.app.goo.gl/r9f6HquDhw82iFoM8",
};

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const handleRemove = (routeId) => {
    const updated = favorites.filter((fav) => fav.routeId !== routeId);
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
          {favorites.map((fav, i) => {
            const mapLink = MAP_LINKS[fav.routeId];
<<<<<<< Updated upstream
=======
            // optional static preview image (you can change this to dynamic screenshot service later)
>>>>>>> Stashed changes
            const staticMapImg = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
              fav.routeName
            )}&zoom=11&size=400x300&maptype=roadmap&key=${
              process.env.REACT_APP_GOOGLE_MAPS_KEY
            }`;

            return (
              <div className="fav-card" key={i}>
                <img
                  src={staticMapImg}
                  alt={fav.routeName}
                  className="fav-map-img"
                  onClick={() => navigate(`/routes/${fav.routeId}`)}
                />
                <h4>{fav.routeName}</h4>
                <p>{fav.details || "Route info unavailable"}</p>
                <div className="fav-buttons">
                  <button
                    className="view-map-btn"
                    onClick={() => window.open(mapLink, "_blank")}
                  >
                    View Map
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(fav.routeId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favorites;