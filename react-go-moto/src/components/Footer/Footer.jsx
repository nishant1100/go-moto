import React from 'react';
import './Footer.css';
import logo from '../../assets/gomoto_logo.png'; // Update path if needed

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column logo-column">
          <img src={logo} alt="Go Moto Logo" className="footer-logo" />
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Cars</a></li>
            <li><a href="#">Our Partner</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Services</h4>
          <ul>
            <li><a href="#">Instant Rent</a></li>
            <li><a href="#">Private Driver</a></li>
            <li><a href="#">Long Trip</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Call Center</a></li>
            <li><a href="#">Partner With Us</a></li>
            <li><a href="#">Terms & Condition</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
