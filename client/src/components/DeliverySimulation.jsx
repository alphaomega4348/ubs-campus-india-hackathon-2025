import React, { useEffect, useRef, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  InfoWindow,
} from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCliTDgdPUC04xTYS6RDXsbbKIYR5Ir5W0'; // Replace this

const DeliverySimulation = () => {
  const route = [
    [18.7041, 77.1025],
    [18.552789, 73.893750],
    [18.518344, 73.855417],
    [18.537778, 73.820278],
    [18.511143, 73.683479],
    [18.651674, 73.761536],
    [18.515000, 73.925000],
    [18.735700, 73.675500],
    [18.554499, 73.825729],
    [18.465775, 73.782887],
    [18.147085, 74.777115],
    [18.7041, 77.1025],
  ];

  const [position, setPosition] = useState({ lat: route[0][0], lng: route[0][1] });
  const [activeIndex, setActiveIndex] = useState(0);
  const [deliveryStarted, setDeliveryStarted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [eta, setEta] = useState(null);

  const speed = 0.0012; // Tune for realistic speed
  const animationRef = useRef();
  const routeIndex = useRef(0);

  const move = () => {
    const [lat1, lng1] = route[routeIndex.current];
    const [lat2, lng2] = route[routeIndex.current + 1];
    const dx = lat2 - lat1;
    const dy = lng2 - lng1;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < speed) {
      routeIndex.current++;
      setActiveIndex(routeIndex.current);
      setShowInfo(true);

      if (routeIndex.current >= route.length - 1) {
        cancelAnimationFrame(animationRef.current);
        return;
      }

      setTimeout(() => {
        setShowInfo(false);
        animationRef.current = requestAnimationFrame(move);
      }, 1500); // Pause at each school
      return;
    }

    const t = speed / dist;
    const newLat = position.lat + dx * t;
    const newLng = position.lng + dy * t;

    setPosition({ lat: newLat, lng: newLng });
    animationRef.current = requestAnimationFrame(move);
  };

  const handleStart = () => {
    if (deliveryStarted) return;
    setDeliveryStarted(true);
    animationRef.current = requestAnimationFrame(move);
  };

  useEffect(() => {
    if (!deliveryStarted) return;

    const interval = setInterval(() => {
      const [lat1, lng1] = route[routeIndex.current];
      const [lat2, lng2] = route[routeIndex.current + 1];
      const dx = lat2 - lat1;
      const dy = lng2 - lng1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const etaSec = dist / speed * 16 / 1000; // Estimate time based on 60fps
      setEta(Math.ceil(etaSec));
    }, 1000);

    return () => clearInterval(interval);
  }, [deliveryStarted]);

  const containerStyle = { width: '100%', height: '500px' };
  const center = { lat: 18.5668967, lng: 73.9071862 };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h2>🚚 Real-time Delivery Simulation</h2>
      <button onClick={handleStart} disabled={deliveryStarted}>
        {deliveryStarted ? 'Delivery in Progress...' : 'Start Delivery'}
      </button>

      {deliveryStarted && eta !== null && (
        <p>⏱️ ETA to next stop: {eta} sec</p>
      )}

      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
          <Polyline
            path={route.map(([lat, lng]) => ({ lat, lng }))}
            options={{ strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2 }}
          />

          {/* Moving Marker */}
          <Marker position={position} label="📦" />

          {/* School Stops */}
          {route.map(([lat, lng], i) => (
            <Marker key={i} position={{ lat, lng }} label={i === 0 ? '🏠' : `${i}`} />
          ))}

          {/* Info on Arrival */}
          {showInfo && (
            <InfoWindow position={route[routeIndex.current]}>
              <div>
                <strong>Delivered at: Stop {routeIndex.current}</strong>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default DeliverySimulation;