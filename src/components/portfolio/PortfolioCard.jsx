import { Link } from "react-router-dom";

import "./PortfolioCard.css";

export default function PortfolioCard({ project }) {
  return (
    <Link
      to={`/${project.discipline}/${project.slug}`}
      className="portfolio-card"
    >
      <div className="portfolio-image">

        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
        />

      </div>

      <div className="portfolio-content">

        <span>

          {project.location}

        </span>

        <h2>

          {project.title}

        </h2>

        <p>

          {project.description}

        </p>

      </div>

    </Link>
  );
}