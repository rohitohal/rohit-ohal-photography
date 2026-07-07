import { useMemo, useState } from "react";

import portfolio from "../../data/portfolio";
import PortfolioCard from "./PortfolioCard";
import PortfolioFilter from "./PortfolioFilter";

import "./PortfolioGrid.css";

export default function PortfolioGrid({
  category,
  enableFilter = false,
}) {
  const [activeFilter, setActiveFilter] = useState(
    category || "all"
  );

  const projects = useMemo(() => {
    if (!enableFilter) {
      return portfolio.filter(
        (item) => item.discipline === category
      );
    }

    if (activeFilter === "all") {
      return portfolio;
    }

    return portfolio.filter(
      (item) => item.discipline === activeFilter
    );
  }, [category, activeFilter, enableFilter]);

  return (
    <section className="portfolio-grid">

      {enableFilter && (
        <PortfolioFilter
          active={activeFilter}
          onChange={setActiveFilter}
        />
      )}

      <div className="portfolio-grid-container">

        {projects.length > 0 ? (
          projects.map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
            />
          ))
        ) : (
          <div className="portfolio-empty">
            <h3>No Projects Found</h3>

            <p>
              Portfolio images for this category
              will be available soon.
            </p>
          </div>
        )}

      </div>

    </section>
  );
}