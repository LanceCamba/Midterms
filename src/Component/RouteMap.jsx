import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
};

const center = { lat: 14.4, lng: 120.97 }; // Cavite area (starting center)

function RouteMap() {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY, 
  });

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: "District Imus, Cavite",
          destination: "One Ayala Terminal, Makati",
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            const leg = result.routes[0].legs[0];
            setDistance(leg.distance.text);
            setDuration(leg.duration.text);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  }, [isLoaded]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div style={{ width: "100%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {/* Optional Info Below Map */}
      {distance && duration && (
        <div
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          <p>
            Distance: <strong>{distance}</strong> | Estimated Time:{" "} <strong>{duration}</strong>
          </p>
        </div>
      )}             
    </div>
  );
}

export default React.memo(RouteMap);
