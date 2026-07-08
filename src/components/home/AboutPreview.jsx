import { Link } from "react-router-dom";
import "./AboutPreview.css";

export default function AboutPreview() {
  return (
    <section className="about-preview">

      <div className="about-preview-container">

        <div className="about-preview-content">

          <span className="about-label">
            ABOUT ROHIT OHAL
          </span>

          <h2>
            Fine Art.
            <br />
            Documentary.
            <br />
            Timeless.
          </h2>

          <p>
            I believe photographs should do more than document a moment.
            They should preserve emotion, atmosphere and the little details
            that become priceless with time. My work combines documentary
            storytelling with a fine art approach to create images that feel
            authentic, elegant and enduring.
          </p>

          <div className="about-info">

            <div>
              <h3>10+</h3>
              <span>Years Experience</span>
            </div>

            <div>
              <h3>500+</h3>
              <span>Projects Delivered</span>
            </div>

            <div>
              <h3>Fine Arts</h3>
              <span>Graduate</span>
            </div>

          </div>

          <Link
            to="/about"
            className="about-button"
          >
            Learn More About Me
          </Link>

        </div>

        <div className="about-preview-image">

          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80"
            alt="Rohit Ohal"
          />

        </div>

      </div>

    </section>
  );
}