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

  const cmsProjects = JSON.parse(
    localStorage.getItem(
      "rohit-photography-projects"
    ) || "[]"
  );

  const mappedCmsProjects = cmsProjects.map(
    (project) => ({
      ...project,

      discipline:
        project.category
          ?.toLowerCase()
          .replace(/\s+/g, "-") || "other",

      year:
        project.date
          ? new Date(project.date)
              .getFullYear()
              .toString()
          : new Date()
              .getFullYear()
              .toString(),
    })
  );

  const allProjects = [
    ...mappedCmsProjects,
    ...portfolio,
  ];

  const projects = useMemo(() => {
    if (!enableFilter) {
      return allProjects.filter(
        (item) =>
          item.discipline === category
      );
    }

    if (activeFilter === "all") {
      return allProjects;
    }

    return allProjects.filter(
      (item) =>
        item.discipline ===
        activeFilter
    );
  }, [
    category,
    activeFilter,
    enableFilter,
    allProjects,
  ]);

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
          projects.map(
            (project) => (
              <PortfolioCard
                key={
                  project.id
                }
                project={
                  project
                }
              />
            )
          )
        ) : (
          <div className="portfolio-empty">

            <h3>
              No Projects Found
            </h3>

            <p>
              Portfolio images
              for this category
              will be available
              soon.
            </p>

          </div>
        )}

      </div>

    </section>
  );
}