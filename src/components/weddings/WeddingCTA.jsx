import { Link } from "react-router-dom";

export default function WeddingCTA() {
  return (
    <section className="wedding-cta">

      <div className="container">

        <span>LET'S CREATE SOMETHING BEAUTIFUL</span>

        <h2>
          Your Story
          <br />
          Starts Here
        </h2>

        <p>
          I'd love to hear about your wedding and create
          timeless memories together.
        </p>

        <Link
          to="/contact"
          className="btn btn-dark"
        >
          Enquire Now
        </Link>

      </div>

    </section>
  );
}