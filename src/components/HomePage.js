import React from 'react';
import { FaGasPump } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/maps');
  };

  return (
    <div className="homepage">
      <div className="left-section">
        <h1>
          <FaGasPump style={{ marginRight: '10px' }} /> Fueling Your Journey
        </h1>
        <p className="slogan">Your trusted partner for on-demand petroleum delivery.</p>
        <button className="order-button" onClick={handleOrderClick}>
          Order Petrol
        </button>
      </div>
      <div className="right-section">
      </div>
    </div>
  );
};

export default HomePage;
