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
    "imus": ["District Imus, Cavite"],
    "makati": ["One Ayala Terminal, Makati"],
    "atc": ["Alabang Town Center, Muntinlupa"],
    "greenbelt": ["Greenbelt 1, Makati"],
    "greenhills": ["Greenhills, San Juan"],
    "laspinas": ["Las Piñas City"],
    "calamba": ["Calamba, Laguna"],
    "bgc": ["BGC, Taguig"],
    "nuvali": ["Nuvali, Santa Rosa, Laguna"],
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
  
        </div>
      )}
    </div>
  );
}

export default React.memo(RouteMap);