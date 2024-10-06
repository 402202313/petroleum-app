import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/OrderTracking.css';

const OrderTracking = () => {
  const location = useLocation();
  const { orderSummary } = location.state || {};

  return (
    <div className="order-tracking">
      <h2>Order History</h2>
      {orderSummary && (
        <div className="order-summary">
          <p><strong>Date & Time:</strong> {orderSummary.dateTime}</p>
          <p><strong>Fuel Type:</strong> {orderSummary.fuelType}</p>
          <p><strong>Fuel Subtype:</strong> {orderSummary.fuelSubtype}</p>
          <p><strong>Price:</strong> R{orderSummary.price}</p>
          <p><strong>Location:</strong> {orderSummary.location}</p>
          <p><strong>Delivery Date:</strong> {orderSummary.deliveryDate}</p>
          <p><strong>Delivery Time:</strong> {orderSummary.deliveryTime}</p> 
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
