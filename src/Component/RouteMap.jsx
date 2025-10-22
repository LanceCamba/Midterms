import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
};

const defaultCenter = { lat: 14.4, lng: 120.97 };

function RouteMap({ routeId }) {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  const routeCoordinates = {
    "imus-makati": ["District Imus, Cavite", "One Ayala Terminal, Makati"],
    "makati-imus": ["One Ayala Terminal, Makati", "District Imus, Cavite"],
    "atc-greenbelt": ["Alabang Town Center, Muntinlupa", "Greenbelt 1, Makati"],
    "greenbelt-atc": ["Greenbelt 1, Makati", "Alabang Town Center, Muntinlupa"],
    "atc-greenhills": ["Alabang Town Center, Muntinlupa", "Greenhills, San Juan"],
    "greenhills-atc": ["Greenhills, San Juan", "Alabang Town Center, Muntinlupa"],
    "laspinas-makati": ["Las Piñas City", "One Ayala Terminal, Makati"],
    "makati-laspinas": ["One Ayala Terminal, Makati", "Las Piñas City"],
    "calamba-bgc": ["Calamba, Laguna", "BGC, Taguig"],
    "bgc-calamba": ["BGC, Taguig", "Calamba, Laguna"],
    "nuvali-makati": ["Nuvali, Santa Rosa, Laguna", "One Ayala Terminal, Makati"],
    "makati-nuvali": ["One Ayala Terminal, Makati", "Nuvali, Santa Rosa, Laguna"],
  };

  useEffect(() => {
    if (isLoaded && routeId && routeCoordinates[routeId]) {
      const directionsService = new window.google.maps.DirectionsService();
      const [origin, destination] = routeCoordinates[routeId];

      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            const leg = result.routes[0].legs[0];
            setDistance(leg.distance.text);
            setDuration(leg.duration.text);
          } else {
            console.error(`Directions request failed: ${status}`);
          }
        }
      );
    }
  }, [isLoaded, routeId]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div style={{ width: "100%" }}>
      <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={11}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {distance && duration && (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          <p>
            Distance: <strong>{distance}</strong> | Estimated Time:{" "}
            <strong>{duration}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default React.memo(RouteMap);