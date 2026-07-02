import { Link } from "react-router-dom";

import "./DisciplineCard.css";

export default function DisciplineCard({ discipline }) {
  return (
    <Link
      to={discipline.slug}
      className="discipline-card"
    >
      <img
        src={discipline.image}
        alt={discipline.title}
      />

      <div className="discipline-overlay">
        <span>{discipline.description}</span>

        <h3>{discipline.title}</h3>

        <p>View Portfolio →</p>
      </div>
    </Link>
  );
}