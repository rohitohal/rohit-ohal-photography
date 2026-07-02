import "./DisciplinesGrid.css";

import DisciplineCard from "./DisciplineCard";

export default function DisciplinesGrid({ disciplines = [] }) {
  return (
    <section className="disciplines-grid">
      {disciplines.map((discipline) => (
        <DisciplineCard
          key={discipline.id}
          discipline={discipline}
        />
      ))}
    </section>
  );
}