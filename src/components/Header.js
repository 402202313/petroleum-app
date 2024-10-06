import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import Modal from './Modal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 

  const handleAuth = (email, password) => {
    if (isLogin) {
      alert(`Logging in with ${email}`);
    } else {
      alert(`Signing up with ${email}`);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <span> 
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          >
            PETROLEUM
          </a>
        </span>
      </div>
      <div className="header-right">
        <div className="header-links">
          <a href="#" onClick={() => { setIsLogin(true); setIsModalOpen(true); }}>Login</a>
          <a href="#" onClick={() => { setIsLogin(false); setIsModalOpen(true); }}>Sign Up</a>
          <div className="header-hamburger">
            <button className="hamburger-button">&#9776;</button>
          </div>
        </div>

        <div className="desktop-links">
          <a href="#" onClick={() => { setIsLogin(true); setIsModalOpen(true); }}>Login</a>
          <a href="#" onClick={() => { setIsLogin(false); setIsModalOpen(true); }}>Sign Up</a>
          <a href="#">Business</a>
          <a href="#">Help</a>
          <a href="#">Skibidi</a>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLogin={isLogin}
        onAuth={handleAuth}
      />
    </header>
  );
};

export default Header;
