import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/OrderForm.css';

const OrderForm = () => {
  const [price, setPrice] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [fuelSubtype, setFuelSubtype] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('immediately');
  const [customTime, setCustomTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const location = useLocation(); // Get the location object
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { location: userLocation } = location.state || {}; // Extract the location from state

  const fuelSubtypes = {
    petrol: ['95 unleaded', '93 unleaded'],
    diesel: ['50 ppm', '500 ppm'],
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handlePayment = () => {
    // Navigate to the Payment page, passing the order details
    navigate('/payment', {
      state: {
        price,
        fuelType,
        fuelSubtype,
        deliveryDate,
        deliveryTime,
        customTime,
        location: userLocation,
      },
    });
  };

  return (
    <div className="order-form">
      <h2>Order Fuel</h2>

      {/* Price Input */}
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        />
      </div>

      {/* Fuel Type Dropdown */}
      <div className="form-group">
        <label htmlFor="fuelType">Fuel Type</label>
        <select
          id="fuelType"
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
        >
          <option value="">Select fuel type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
        </select>
      </div>

      {/* Fuel Subtype Dropdown */}
      {fuelType && (
        <div className="form-group">
          <label htmlFor="fuelSubtype">Fuel Subtype</label>
          <select
            id="fuelSubtype"
            value={fuelSubtype}
            onChange={(e) => setFuelSubtype(e.target.value)}
          >
            <option value="">Select subtype</option>
            {fuelSubtypes[fuelType].map((subtype) => (
              <option key={subtype} value={subtype}>
                {subtype}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Delivery Date */}
      <div className="form-group">
        <label htmlFor="deliveryDate">Delivery Date</label>
        <input
          type="date"
          id="deliveryDate"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
      </div>

      {/* Delivery Time Dropdown */}
      <div className="form-group">
        <label htmlFor="deliveryTime">Delivery Time</label>
        <select
          id="deliveryTime"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
        >
          <option value="immediately">Immediately</option>
          <option value="custom">Custom Time</option>
        </select>
      </div>

      {/* Custom Time Input */}
      {deliveryTime === 'custom' && (
        <div className="form-group">
          <label htmlFor="customTime">Custom Delivery Time</label>
          <input
            type="time"
            id="customTime"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
          />
        </div>
      )}

      {/* Confirm Button */}
      <button onClick={handleConfirm} className="confirm-btn">
        Confirm Order
      </button>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay" onClick={() => setShowConfirmation(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Your Order</h3>
            <p>Price: {price}</p>
            <p>Fuel Type: {fuelType}</p>
            <p>Fuel Subtype: {fuelSubtype}</p>
            <p>Delivery Date: {deliveryDate}</p>
            <p>
              Delivery Time: {deliveryTime === 'immediately' ? 'Immediately' : customTime}
            </p>
            <p>Location: {userLocation}</p> {/* Display the passed location */}

            {/* Button Container */}
            <div className="modal-button-container">
              <button onClick={handlePayment}>Confirm Payment</button>
              <button onClick={() => setShowConfirmation(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
