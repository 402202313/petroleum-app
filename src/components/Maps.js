import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Maps.css';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom component to change map center and zoom
const ChangeMapView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom); // Set the map's view to the new center and zoom level
    return null;
};

const Maps = () => {
    const [location, setLocation] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
    const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
    const [zoomLevel, setZoomLevel] = useState(13);

    const navigate = useNavigate(); // Initialize navigate

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const fetchPredictions = async (value) => {
        if (value) {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPredictions(data);
            } catch (error) {
                console.error('Failed to fetch:', error);
                setPredictions([]);
            }
        } else {
            setPredictions([]);
        }
    };

    const debouncedFetchPredictions = debounce(fetchPredictions, 300);

    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocation(value);
        debouncedFetchPredictions(value);
    };

    const handlePredictionClick = (prediction) => {
        const lat = parseFloat(prediction.lat);
        const lon = parseFloat(prediction.lon);
        setMapCenter([lat, lon]);
        setMarkerPosition([lat, lon]);
        setLocation(prediction.display_name);
        setPredictions([]);
        setZoomLevel(18); // Zoom to street level
    };

    const handleConfirmLocation = () => {
        navigate('/order', { state: { location } }); // Navigate to the order page with the location
    };

    return (
        <div className="map-page">
            <h2>Enter Your Location</h2>
            <div className="location-input-container">
                <input
                    type="text"
                    placeholder="Type your location..."
                    value={location}
                    onChange={handleLocationChange}
                    className="location-input"
                />
                <button className="confirm-location-btn" onClick={handleConfirmLocation}>
                    Confirm Location
                </button>
            </div>
            {predictions.length > 0 && (
                <div className="predictions-container">
                    {predictions.map((prediction) => (
                        <div
                            key={prediction.place_id}
                            className="prediction"
                            onClick={() => handlePredictionClick(prediction)}
                        >
                            {prediction.display_name}
                        </div>
                    ))}
                </div>
            )}
            <MapContainer center={mapCenter} zoom={zoomLevel} className="leaflet-container">
                <ChangeMapView center={mapCenter} zoom={zoomLevel} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={markerPosition} />
            </MapContainer>
        </div>
    );
};

export default Maps;
