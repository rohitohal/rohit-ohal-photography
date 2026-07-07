import { Link } from "react-router-dom";
import "./PortfolioCard.css";
import useReveal from "../../hooks/useReveal";

export default function PortfolioCard({ project }) {
  const revealRef = useReveal();

  if (!project) return null;

  return (
    <Link
      ref={revealRef}
      to={`/${project.discipline}/${project.slug}`}
      className="portfolio-card reveal"
      aria-label={project.title}
    >
      <div className={`portfolio-image ${project.masonry || "portrait"}`}>
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
        />

        <div className="portfolio-overlay">
          <div className="portfolio-content">
            <span className="portfolio-category">
              {project.category}
            </span>

            <h3>{project.title}</h3>

            <p>{project.location}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}