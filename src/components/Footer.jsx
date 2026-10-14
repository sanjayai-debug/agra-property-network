import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">AP</div>
              <span>Agra Property Network</span>
            </div>
            <p>Agra Mein Property Kharidne aur Bechne Ka Smart Network. Your trusted partner for buying, selling, and renting properties in Agra, Uttar Pradesh.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/listings?listing_type=sale">Buy Property</Link>
              <Link to="/listings?listing_type=rent">Rent Property</Link>
              <Link to="/post-property">Post Property</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="footer-title">Property Types</h4>
            <div className="footer-links">
              <Link to="/listings?property_type=Flat+%2F+Apartment">Flats</Link>
              <Link to="/listings?property_type=Independent+House">Houses</Link>
              <Link to="/listings?property_type=Villa">Villas</Link>
              <Link to="/listings?property_type=Plot+%2F+Land">Plots</Link>
              <Link to="/listings?property_type=Commercial+Shop">Shops</Link>
              <Link to="/listings?property_type=Office">Offices</Link>
            </div>
          </div>
          <div>
            <h4 className="footer-title">Contact Us</h4>
            <div className="footer-contact-item">📍 123, MG Road, Agra, Uttar Pradesh 282001</div>
            <div className="footer-contact-item">📞 +91 98765 43210</div>
            <div className="footer-contact-item">✉️ info@agrapropertynetwork.com</div>
            <div className="footer-contact-item">🕐 Mon - Sat: 9:00 AM - 7:00 PM</div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Agra Property Network. All rights reserved.</span>
          <span>
            <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms">Terms</Link> | <Link to="/disclaimer">Disclaimer</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
