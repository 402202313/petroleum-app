// src/components/HomePage.js
import React from 'react';
import { FaGasPump } from 'react-icons/fa'; // Importing an icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/HomePage.css'; // Import your CSS file for styling

const HomePage = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleOrderClick = () => {
    navigate('/maps'); // Navigate to the maps page
  };

  return (
    <div className="homepage">
      <div className="left-section">
        <h1>
          <FaGasPump style={{ marginRight: '10px' }} /> Fueling Your Journey
        </h1>
        <p className="slogan">Your reliable source for quality petroleum products.</p>
        <button className="order-button" onClick={handleOrderClick}>
          Order Petrol
        </button>
      </div>
      <div className="right-section">
        {/* You can add your image or other content here */}
      </div>
    </div>
  );
};

export default HomePage;
