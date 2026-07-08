import { Link } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="not-found">

      <div className="not-found-content">

        <span>404</span>

        <h1>
          The Story You're
          <br />
          Looking For
          <br />
          Couldn't Be Found
        </h1>

        <p>
          The page may have been moved,
          deleted or perhaps never existed.
        </p>

        <div className="not-found-buttons">

          <Link
            to="/"
            className="not-found-primary"
          >
            Return Home
          </Link>

          <Link
            to="/portfolio"
            className="not-found-secondary"
          >
            Explore Portfolio
          </Link>

        </div>

      </div>

    </section>
  );
}