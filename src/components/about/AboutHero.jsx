import { Link } from "react-router-dom";

export default function AboutHero() {
  return (
    <section className="about-hero">

      <div className="about-hero-overlay"></div>

      <div className="about-hero-content">

        <span>
          ABOUT ROHIT OHAL
        </span>

        <h1>
          Every Photograph
          <br />
          Has A Story.
        </h1>

        <p>
          I believe the most meaningful photographs are created
          through genuine emotion, thoughtful composition and
          timeless storytelling. Every wedding, portrait and
          commercial assignment is approached with the same
          passion for creating images that remain valuable for
          generations.
        </p>

        <Link
          to="/contact"
          className="about-hero-button"
        >
          Let's Create Together
        </Link>

      </div>

    </section>
  );
}