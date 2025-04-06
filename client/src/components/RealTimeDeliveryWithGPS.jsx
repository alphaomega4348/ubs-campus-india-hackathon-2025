import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline
} from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCliTDgdPUC04xTYS6RDXsbbKIYR5Ir5W0';

const RealTimeDeliveryWithGPS = () => {
  const [currentPos, setCurrentPos] = useState(null);
  const [watchId, setWatchId] = useState(null);

  // Define delivery route (can be TSP or fixed)
  const route = [
    [18.7041, 77.1025],
    [18.552789, 73.893750],
    [18.518344, 73.855417],
    [18.537778, 73.820278],
    [18.511143, 73.683479],
  ];

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setCurrentPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error('GPS error:', err),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    setWatchId(id);

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const containerStyle = { width: '100%', height: '500px' };
  const center = currentPos || { lat: 18.5669, lng: 73.9072 };

  return (
    <div>
      <h2>📍 Real-Time Delivery Tracking (GPS)</h2>

      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {currentPos && <Marker position={currentPos} label="🚴" />}

          <Polyline
            path={route.map(([lat, lng]) => ({ lat, lng }))}
            options={{ strokeColor: '#FF0000', strokeOpacity: 0.7, strokeWeight: 2 }}
          />

          {route.map(([lat, lng], i) => (
            <Marker
              key={i}
              position={{ lat, lng }}
              label={i === 0 ? '🏠' : `${i}`}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default RealTimeDeliveryWithGPS;