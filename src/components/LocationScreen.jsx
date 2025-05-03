import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LocationScreen.css'; // Make sure this file exists or remove the line

const LocationScreen = () => {
  const navigate = useNavigate();

  // ✅ Declare state variables
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setErrorMsg(error.message);
        }
      );
    } else {
      setErrorMsg('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className="location-screen">
      <h2>Find Your Location</h2>
      <button className="locate-button" onClick={() => navigate('/map')}>
        Locate me
      </button>

      {errorMsg && <p>Error: {errorMsg}</p>}
      {userLocation && (
        <p>
          Your location: {userLocation.lat}, {userLocation.lng}
        </p>
      )}
    </div>
  );
};

export default LocationScreen;
