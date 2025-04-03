/* global google */

import React, { useRef, useState } from "react";
import { FaLocationArrow, FaTimes, FaCrosshairs } from "react-icons/fa";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";

const center = { lat: 18.563546, lng: 73.884707 }; // UBS Pune Office

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [userLocation, setUserLocation] = useState(null); // Stores GPS location

  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const originAutocomplete = useRef(null);
  const destinationAutocomplete = useRef(null);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Handle selected place from autocomplete
  function handlePlaceSelect(ref, inputRef) {
    if (ref.current) {
      const place = ref.current.getPlace();
      if (place && place.formatted_address) {
        inputRef.current.value = place.formatted_address;
      }
    }
  }

  // Calculate Route
  async function calculateRoute() {
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  // Clear Route
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  // Get User's Current Location and Place a Marker
  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
          map.panTo(newLocation);
          map.setZoom(15);
        },
        () => alert("Geolocation failed or is not supported.")
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Google Map */}
      <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "100%" }}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {/* Marker at UBS Pune */}
          <Marker position={center} />

          {/* GPS Marker for User Location */}
          {userLocation && <Marker position={userLocation} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />}

          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </div>

      {/* Control Panel */}
      <div
        style={{
          padding: "16px",
          borderRadius: "8px",
          margin: "16px",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          minWidth: "400px",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ flexGrow: 1, marginRight: "8px" }}>
            <Autocomplete
              onLoad={(autocomplete) => (originAutocomplete.current = autocomplete)}
              onPlaceChanged={() => handlePlaceSelect(originAutocomplete, originRef)}
            >
              <input
                type="text"
                placeholder="Origin"
                ref={originRef}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </Autocomplete>
          </div>
          <div style={{ flexGrow: 1, marginRight: "8px" }}>
            <Autocomplete
              onLoad={(autocomplete) => (destinationAutocomplete.current = autocomplete)}
              onPlaceChanged={() => handlePlaceSelect(destinationAutocomplete, destinationRef)}
            >
              <input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </Autocomplete>
          </div>
          <div>
            <button
              onClick={calculateRoute}
              style={{
                padding: "8px 12px",
                backgroundColor: "#ff69b4",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Calculate Route
            </button>
            <button
              onClick={clearRoute}
              style={{
                marginLeft: "8px",
                padding: "8px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Distance, Duration & GPS Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
          <div>
            {/* Center to UBS Pune */}
            <button
              onClick={() => {
                map.panTo(center);
                map.setZoom(15);
              }}
              style={{
                padding: "8px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "blue",
                color: "white",
                cursor: "pointer",
                marginRight: "8px",
              }}
            >
              <FaLocationArrow />
            </button>

            {/* GPS Button */}
            <button
              onClick={getUserLocation}
              style={{
                padding: "8px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "green",
                color: "white",
                cursor: "pointer",
              }}
            >
              <FaCrosshairs />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;