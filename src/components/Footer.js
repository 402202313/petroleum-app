// src/components/Footer.js
import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import '../styles/Footer.css'; // Make sure to create this CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 Petroleum. All rights reserved.</p>
        <div className="social-icons">
          <a href="#" aria-label="Facebook" className="social-icon"><FaFacebookF /></a>
          <a href="#" aria-label="Twitter" className="social-icon"><FaTwitter /></a>
          <a href="#" aria-label="Instagram" className="social-icon"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn" className="social-icon"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
