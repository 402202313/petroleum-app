import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { location: userLocation, price } = location.state || {}; // Get price from location state

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
    // Prepare order summary
    const orderSummary = {
      dateTime: new Date().toLocaleString(),
      fuelType: paymentMethod === 'eft' ? 'Diesel' : 'Petrol',
      price: (price * 1.2).toFixed(2), // Assuming the price includes a 20% markup
      cardLast4: paymentMethod === 'bankCard' ? cardNumber.slice(-4) : '',
      location: userLocation,
      maskedCard: paymentMethod === 'bankCard' ? `************${cardNumber.slice(-4)}` : '',
    };

    // Navigate to OrderTracking component
    navigate('/order-tracking', { state: { orderSummary } });

    setShowConfirmation(false);
  };

  const markup = (price * 0.2).toFixed(2);
  const totalPrice = (parseFloat(price) + parseFloat(markup)).toFixed(2);

  return (
    <div className="payment-form">
      <h2>Payment Information</h2>

      {/* Payment Method Selection */}
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

      {/* Price Display */}
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          readOnly
        />
      </div>

      {/* Markup and Total Price */}
      <div className="form-group">
        <label>Markup (20%):</label>
        <input type="text" value={`R${markup}`} readOnly />
      </div>
      <div className="form-group">
        <label>Total Price:</label>
        <input type="text" value={`R${totalPrice}`} readOnly />
      </div>

      {/* EFT Payment Inputs */}
      {paymentMethod === 'eft' && (
        <>
          <div className="form-group">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter bank name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
            />
          </div>
        </>
      )}

      {/* Bank Card Payment Inputs */}
      {paymentMethod === 'bankCard' && (
        <>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter card number"
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
              placeholder="Enter CVV"
            />
          </div>
        </>
      )}

      {/* Confirm Button */}
      <button onClick={handleConfirm} className="confirm-btn">
        Confirm Payment
      </button>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay" onClick={() => setShowConfirmation(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Your Payment</h3>
            <p><strong>Date & Time:</strong> {new Date().toLocaleString()}</p>
            <p><strong>Fuel Type:</strong> {paymentMethod === 'eft' ? 'Diesel' : 'Petrol'}</p>
            <p><strong>Markup:</strong> R{markup}</p>
            <p><strong>Total Price:</strong> R{totalPrice}</p>
            {paymentMethod === 'eft' ? (
              <>
                <p><strong>Payment Method:</strong> EFT</p>
                <p><strong>Bank Name:</strong> {bankName}</p>
                <p><strong>Account Number:</strong> {accountNumber}</p>
              </>
            ) : (
              <>
                <p><strong>Payment Method:</strong> Bank Card</p>
                <p><strong>Card Number:</strong> {`************${cardNumber.slice(-4)}`}</p>
                <p><strong>Expiry Date:</strong> {expiryDate}</p>
                <p><strong>CVV:</strong> {cvv}</p>
              </>
            )}
            <div className='button-container'>
              <button onClick={handleFinalConfirm} className="confirm-btn">
                Confirm
              </button>
              <button onClick={() => setShowConfirmation(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
