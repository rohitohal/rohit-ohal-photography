import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <h2>ROHIT OHAL</h2>

          <p>
            Fine Art Wedding, Portrait, Commercial &
            Editorial Photography.
          </p>

        </div>

        <div className="footer-links">

          <div>

            <h4>Portfolio</h4>

            <Link to="/weddings">Wedding Stories</Link>

            <Link to="/portraits">Portraits</Link>

            <Link to="/events">Events</Link>

            <Link to="/industrial">Industrial</Link>

            <Link to="/food">Food</Link>

            <Link to="/editorial">Editorial</Link>

          </div>

          <div>

            <h4>Company</h4>

            <Link to="/about">About</Link>

            <Link to="/journal">Journal</Link>

            <Link to="/contact">Contact</Link>

          </div>

          <div>

            <h4>Connect</h4>

            <a href="#">Instagram</a>

            <a href="#">Facebook</a>

            <a href="#">WhatsApp</a>

            <a href="#">Email</a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>

          © 2026 Rohit Ohal Photography. All Rights Reserved.

        </p>

      </div>

    </footer>
  );
}