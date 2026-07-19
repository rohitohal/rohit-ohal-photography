import { useState } from "react";
import { Link } from "react-router-dom";

import "./PortfolioCard.css";
import useReveal from "../../hooks/useReveal";

/* =========================
   DISCIPLINE DISPLAY NAMES
========================= */

const disciplineLabels = {
  weddings: "Wedding Stories",
  portraits: "Portraits",
  events: "Events",
  industrial: "Industrial",
  "food-beverage": "Food & Beverage",
  editorial: "Editorial",
};

export default function PortfolioCard({
  project,
}) {
  const revealRef = useReveal();

  const [loaded, setLoaded] =
    useState(false);

  if (!project) {
    return null;
  }

  const disciplineLabel =
    disciplineLabels[
      project.discipline
    ] ||
    project.discipline ||
    "Photography";

  return (
    <Link
      ref={revealRef}
      to={`/portfolio/${project.discipline}/${project.slug}`}
      className="portfolio-card reveal"
      aria-label={`View ${project.title}`}
    >
      <div
        className={`portfolio-image ${
          project.masonry ||
          "portrait"
        }`}
      >

        {!loaded && (
          <div className="portfolio-skeleton" />
        )}

        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          onLoad={() =>
            setLoaded(true)
          }
          className={
            loaded
              ? "loaded"
              : ""
          }
        />

        <div className="portfolio-overlay">

          <div className="portfolio-content">

            <span className="portfolio-category">
              {disciplineLabel}
            </span>

            <h3>
              {project.title}
            </h3>

            {project.location && (
              <p>
                {project.location}
              </p>
            )}

          </div>

        </div>

      </div>

    </Link>
  );
}