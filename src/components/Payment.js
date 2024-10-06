import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    location: userLocation, 
    price, 
    fuelType, 
    fuelSubtype, 
    deliveryDate, 
    deliveryTime, 
    customTime 
  } = location.state || {}; 

  const [paymentMethod, setPaymentMethod] = useState('eft');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handleFinalConfirm = () => {
    const orderSummary = {
      dateTime: new Date().toLocaleString(),
      fuelType: fuelType,
      fuelSubtype: fuelSubtype,
      price: totalPrice, 
      location: userLocation,
      deliveryDate, 
      deliveryTime: deliveryTime === 'immediately' ? 'Immediately' : customTime, 
    };

    navigate('/order-tracking', { state: { orderSummary } });
    setShowConfirmation(false);
  };


  const markup = (price * 0.15).toFixed(2); 
  const deliveryFee = 100; 
  const totalPrice = (parseFloat(price) + parseFloat(markup) + deliveryFee).toFixed(2); 

  return (
    <div className="payment-form">
      <h2>Payment Information</h2>

      <div className="form-group">
        <label htmlFor="paymentMethod">Payment Method</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="eft">EFT</option>
          <option value="bankCard">Bank Card</option>
        </select>
      </div>

      {paymentMethod === 'bankCard' && (
        <>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter your card number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="Enter your CVV"
            />
          </div>
        </>
      )}

      {paymentMethod === 'eft' && (
        <>
          <div className="form-group">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter your bank name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter your account number"
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          readOnly
        />
      </div>

      <div className="form-group">
        <label>Markup (15%):</label>
        <input type="text" value={`R${markup}`} readOnly />
      </div>
      <div className="form-group">
        <label>Delivery Fee:</label>
        <input type="text" value={`R${deliveryFee}`} readOnly />
      </div>
      <div className="form-group">
        <label>Total Price:</label>
        <input type="text" value={`R${totalPrice}`} readOnly />
      </div>

      <button onClick={handleConfirm} className="confirm-btn">
        Confirm Payment
      </button>

      {showConfirmation && (
        <div className="modal-overlay" onClick={() => setShowConfirmation(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Your Payment</h3>
            <p><strong>Date & Time:</strong> {new Date().toLocaleString()}</p>
            <p><strong>Fuel Type:</strong> {fuelType}</p>
            <p><strong>Fuel Subtype:</strong> {fuelSubtype}</p>
            <p><strong>Delivery Date:</strong> {deliveryDate}</p>
            <p><strong>Delivery Time:</strong> {deliveryTime === 'immediately' ? 'Immediately' : customTime}</p>
            <p><strong>Total Price:</strong> R{totalPrice}</p>

            <div className="modal-button-container">
              <button onClick={handleFinalConfirm}>Finalize Order</button>
              <button onClick={() => setShowConfirmation(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
