import { Link } from "react-router-dom";

import "./DisciplineCard.css";

export default function DisciplineCard({ discipline }) {
  if (!discipline) return null;

  return (
    <Link
      to={`/portfolio/${discipline.slug}`}
      className="discipline-card"
    >
      <div className="discipline-image">
        <img
          src={discipline.image}
          alt={discipline.title}
          loading="lazy"
        />
      </div>

      <div className="discipline-content">
        <span className="discipline-label">
          PORTFOLIO
        </span>

        <h3>{discipline.title}</h3>

        <p>{discipline.description}</p>
      </div>
    </Link>
  );
}