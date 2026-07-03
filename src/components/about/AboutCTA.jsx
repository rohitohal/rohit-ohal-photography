import { Link } from "react-router-dom";

export default function AboutCTA() {
  return (
    <section className="about-cta">
      <div className="about-container">

        <span>
          LET'S CREATE SOMETHING BEAUTIFUL
        </span>

        <h2>
          Your Story
          <br />
          Deserves To Be
          <br />
          Remembered.
        </h2>

        <p>
          Whether you're planning a wedding,
          portrait session, destination wedding,
          or a commercial project,
          I'd love to hear your story and create
          something unforgettable together.
        </p>

        <Link
          to="/contact"
          className="about-cta-button"
        >
          Start Your Journey
        </Link>

      </div>
    </section>
  );
}