import { Link } from "react-router-dom";
import "./CallToAction.css";

export default function CallToAction() {
  return (
    <section className="cta">

      <div className="cta-container">

        <span>LET'S CREATE SOMETHING BEAUTIFUL</span>

        <h2>
          Every Story Deserves
          <br />
          To Be Remembered.
        </h2>

        <p>
          Whether it's a wedding, portrait, editorial or commercial
          project, let's create imagery that will remain timeless for
          years to come.
        </p>

        <Link
          to="/contact"
          className="cta-button"
        >
          Start Your Journey
        </Link>

      </div>

    </section>
  );
}