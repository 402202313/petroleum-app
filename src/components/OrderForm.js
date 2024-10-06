import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderForm.css';

const OrderForm = () => {
  const [price, setPrice] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [fuelSubtype, setFuelSubtype] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('immediately');
  const [customTime, setCustomTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const location = useLocation(); 
  const navigate = useNavigate();
  const { location: userLocation } = location.state || {};

  const fuelSubtypes = {
    petrol: ['95 unleaded', '93 unleaded'],
    diesel: ['50 ppm', '500 ppm'],
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handlePayment = () => {
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
      <h2>Order Summary</h2>
      <div className="form-group">
        <label htmlFor="fuelType">Fuel Type:</label>
        <select 
          id="fuelType" 
          value={fuelType} 
          onChange={(e) => {
            setFuelType(e.target.value);
            setFuelSubtype('');
          }}
        >
          <option value="">Select Fuel Type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
        </select>
      </div>

      {fuelType && (
        <div className="form-group">
          <label htmlFor="fuelSubtype">Fuel Subtype:</label>
          <select 
            id="fuelSubtype" 
            value={fuelSubtype} 
            onChange={(e) => setFuelSubtype(e.target.value)}
          >
            <option value="">Select Fuel Subtype</option>
            {fuelSubtypes[fuelType].map((subtype) => (
              <option key={subtype} value={subtype}>{subtype}</option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input 
          type="number" 
          id="price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="Enter price"
        />
      </div>

      <div className="form-group">
        <label htmlFor="deliveryDate">Delivery Date:</label>
        <input 
          type="date" 
          id="deliveryDate" 
          value={deliveryDate} 
          onChange={(e) => setDeliveryDate(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label htmlFor="deliveryTime">Delivery Time:</label>
        <select 
          id="deliveryTime" 
          value={deliveryTime} 
          onChange={(e) => setDeliveryTime(e.target.value)}
        >
          <option value="immediately">Immediately</option>
          <option value="custom">Custom Time</option>
        </select>
        {deliveryTime === 'custom' && (
          <input 
            type="time" 
            value={customTime} 
            onChange={(e) => setCustomTime(e.target.value)} 
          />
        )}
      </div>

      <button onClick={handleConfirm} className="confirm-btn">Confirm Order</button>

      {showConfirmation && (
        <div className="modal-overlay" onClick={() => setShowConfirmation(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Your Order</h3>
            <p><strong>Fuel Type:</strong> {fuelType}</p>
            <p><strong>Fuel Subtype:</strong> {fuelSubtype}</p>
            <p><strong>Price:</strong> R{price}</p>
            <p><strong>Delivery Date:</strong> {deliveryDate}</p>
            <p><strong>Delivery Time:</strong> {deliveryTime === 'immediately' ? 'Immediately' : customTime}</p>

            <div className="modal-button-container">
              <button onClick={handlePayment}>Proceed to Payment</button>
              <button onClick={() => setShowConfirmation(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
