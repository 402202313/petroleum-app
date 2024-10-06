import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, isLogin, onAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(email, password); 
    onClose();
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
            <div className="password-container"> 
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash color='grey'/> : <FaEye />}
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
