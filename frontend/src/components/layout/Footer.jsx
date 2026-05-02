import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { businessInfo, businessLinks } from "../../constants/businessInfo.js";

const Footer = () => (
  <footer className="footer">
    <div className="container footer-grid">
      <div>
        <h3>{businessInfo.businessName}</h3>
        <p>
          Premium car accessories, installations, and customization with a workshop experience
          built on trust, speed, and detail.
        </p>
      </div>
      <div>
        <h4>Explore</h4>
        <div className="footer-links">
          <Link to="/products">Products</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div>
        <h4>Contact</h4>
        <div className="footer-links">
          <a href={businessLinks.telPrimary}>{businessInfo.phonePrimary}</a>
          <a href={businessLinks.telSecondary}>{businessInfo.phoneSecondary}</a>
          <a href={businessLinks.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={businessLinks.maps} target="_blank" rel="noreferrer">
            Get Directions
          </a>
          <Link to="/contact">Contact Page</Link>
        </div>
      </div>
      <a
        href={businessLinks.maps}
        className="footer-location-cta"
        target="_blank"
        rel="noreferrer"
      >
        <MapPin size={18} />
        <span>Open in Google Maps</span>
      </a>
    </div>
  </footer>
);

export default Footer;
