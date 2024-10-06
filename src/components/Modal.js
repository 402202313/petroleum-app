// Modal.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons from react-icons
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, isLogin, onAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(email, password); // Call the authentication handler passed from Header
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <div className="password-container"> {/* New container for password input and toggle */}
              <input 
                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash color='grey'/> : <FaEye />} {/* Toggle icon */}
              </span>
            </div>
            <div className="button-container">
              <button type="button" className="close-button" onClick={onClose}>Close</button>
              <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
