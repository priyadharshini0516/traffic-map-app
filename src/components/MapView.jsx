import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import './MapView.css';

const MapView = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [myLocationVisible, setMyLocationVisible] = useState(false);

  useEffect(() => {
    const map = L.map('map').setView([13.0827, 80.2707], 13);
    setMapInstance(map);

    const trafficZones = [
      { lat: 13.0827, lng: 80.2707, level: 'high' },
      { lat: 13.05, lng: 80.25, level: 'medium' },
    ];

    trafficZones.forEach((zone) => {
      const color = zone.level === 'high' ? 'red' : 'orange';
      L.circle([zone.lat, zone.lng], {
        color,
        fillColor: color,
        fillOpacity: 0.4,
        radius: 300,
      })
        .addTo(map)
        .bindPopup(`Traffic: ${zone.level}`);
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false
    })
      .on('markgeocode', function (e) {
        const center = e.geocode.center;
        map.setView(center, 15);

        L.marker(center, {
          icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          })
        })
          .addTo(map)
          .bindPopup(`📍 ${e.geocode.name}`)
          .openPopup();

        setMyLocationVisible(true);

        // Check if location is near a traffic zone
        if (isNearTrafficZone(center, trafficZones, map)) {
          alert("⚠️ High traffic ahead. Consider an alternate route.");
        }
      })
      .addTo(map);

    axios.get('http://localhost:5000/alerts')
      .then(response => {
        response.data.forEach(alert => {
          L.marker([alert.lat, alert.lng], {
            icon: L.icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
              iconSize: [30, 30],
              iconAnchor: [15, 30],
              popupAnchor: [0, -30],
            })
          })
            .addTo(map)
            .bindPopup(`<b>${alert.type}</b><br>${alert.message}`);
        });
      })
      .catch(error => {
        console.error("Error fetching alerts:", error);
      });

    return () => {
      map.remove();
    };
  }, []);

  function isNearTrafficZone(latlng, trafficZones, map) {
    return trafficZones.some((zone) => {
      const zoneLatLng = L.latLng(zone.lat, zone.lng);
      const distance = map.distance(latlng, zoneLatLng);
      return distance <= 300;
    });
  }

  const handleLocateClick = () => {
    if (mapInstance) {
      mapInstance.locate({ setView: true, maxZoom: 16 });
      mapInstance.once('locationfound', (e) => {
        L.marker(e.latlng, {
          icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          })
        }).addTo(mapInstance).bindPopup('You are here').openPopup();
      });
    }
  };

  return (
    <div>
      <div id="map" style={{ height: '100vh', width: '100%' }} />
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
        {myLocationVisible && (
          <button id="locate-btn" className="map-btn" onClick={handleLocateClick}>
            📍 My Location
          </button>
        )}
      </div>
    </div>
  );
};

export default MapView;
