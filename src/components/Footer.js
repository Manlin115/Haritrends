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
          <p><a href="#size-guide">Size Guide</a></p>
        </div>
        
        <div className="footer-section">
          <h3>Customer Service</h3>
          <p><a href="#shipping">Shipping Info</a></p>
          <p><a href="#returns">Returns & Exchanges</a></p>
          <p><a href="#faq">FAQ</a></p>
          <p><a href="#privacy">Privacy Policy</a></p>
          <p><a href="#terms">Terms of Service</a></p>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>123 Fashion Street, Style District</p>
          <p>New York, NY 10001</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Email: info@haritrends.com</p>
          <p>Store Hours: Mon-Sat 10AM-8PM</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Hari Trends. All rights reserved. | Designed with ❤️ for fashion lovers</p>
      </div>
    </footer>
  );
};

export default Footer;