import { Link } from "react-router-dom";
import hero from "../../assets/images/hero.jpg";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      <img
        src={hero}
        alt="Rohit Ohal Photography"
        className="hero-image"
      />

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <span className="hero-subtitle">
          FINE ART WEDDING • PORTRAIT • COMMERCIAL
        </span>

        <h1>
          ROHIT OHAL
        </h1>

        <h2>
          PHOTOGRAPHY
        </h2>

        <p>
          Award-worthy storytelling through elegant imagery,
          capturing weddings, portraits and commercial projects
          with authenticity, emotion and timeless craftsmanship.
        </p>

        <div className="hero-buttons">

          <Link
            to="/weddings"
            className="hero-primary"
          >
            Explore Portfolio
          </Link>

          <Link
            to="/contact"
            className="hero-secondary"
          >
            Book a Consultation
          </Link>

        </div>

      </div>

      <div className="hero-scroll">

        <span></span>

        <small>SCROLL</small>

      </div>

    </section>
  );
}