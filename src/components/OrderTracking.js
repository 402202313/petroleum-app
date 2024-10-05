import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/OrderTracking.css';

const OrderTracking = () => {
  const location = useLocation();
  const { orderSummary } = location.state || {}; // Get order summary from location state

  return (
    <div className="order-tracking">
      <h2>Order Tracking</h2>

      {/* Display Order Summary */}
      {orderSummary && (
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p><strong>Date & Time:</strong> {orderSummary.dateTime}</p>
          <p><strong>Fuel Type:</strong> {orderSummary.fuelType}</p>
          <p><strong>Total Price:</strong> {orderSummary.price}</p>
          <p><strong>Last 4 Digits of Card:</strong> {orderSummary.cardLast4}</p>
          <p><strong>Location:</strong> {orderSummary.location}</p>
        </div>
      )}

      {/* Display real-time tracking information */}
      <div className="tracking-info">
        {/* Replace the following with real-time tracking info */}
        <p>Your order is on its way!</p>
        <p>Estimated delivery time: 30 minutes</p>
      </div>
    </div>
  );
};

export default OrderTracking;
