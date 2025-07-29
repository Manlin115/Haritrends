import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Hari Trends</h3>
          <p>
            Your premier destination for elegant and fashionable dresses. 
            We bring you the latest trends in women's fashion with quality, 
            style, and affordability.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
              <FaPinterest />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p><a href="#home">Home</a></p>
          <p><a href="#about">About Us</a></p>
          <p><a href="#gallery">Our Collection</a></p>
          <p><a href="#contact">Contact</a></p>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>87 Konavaikkal Vasavi College Po,</p>
          <p> Konavaikkal Erode - 638316</p>
          <p>Phone: +91 9566046047</p>
          <p>Email: haritrendz22@gmail.com</p>
          <p>Store Hours: Mon-Sat 10AM-8PM</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Hari Trends. All rights reserved. | Designed with ❤️ for fashion lovers</p>
      </div>
    </footer>
  );
};

export default Footer;