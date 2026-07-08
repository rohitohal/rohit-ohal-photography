import { Link } from "react-router-dom";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <h2>ROHIT OHAL</h2>

          <p>
            Fine Art Wedding, Portrait, Commercial,
            Industrial and Editorial Photography
            based in Pune, Maharashtra, India.
          </p>

        </div>

        <div className="footer-links">

          <div>

            <h4>Portfolio</h4>

            <Link to="/portfolio/weddings">
              Wedding Stories
            </Link>

            <Link to="/portfolio/portraits">
              Portraits
            </Link>

            <Link to="/portfolio/events">
              Events
            </Link>

            <Link to="/portfolio/industrial">
              Industrial
            </Link>

            <Link to="/portfolio/food-beverage">
              Food & Beverage
            </Link>

            <Link to="/portfolio/editorial">
              Editorial
            </Link>

          </div>

          <div>

            <h4>Company</h4>

            <Link to="/about">
              About
            </Link>

            <Link to="/journal">
              Journal
            </Link>

            <Link to="/contact">
              Contact
            </Link>

          </div>

          <div>

            <h4>Connect</h4>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>

            <a
              href="mailto:hello@rohitohal.com"
            >
              Email
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Rohit Ohal Photography.
          All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}