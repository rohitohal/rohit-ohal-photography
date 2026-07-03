import portfolio from "../../data/portfolio";
import PortfolioCard from "./PortfolioCard";

import "./PortfolioGrid.css";

export default function PortfolioGrid({ category }) {

  const projects = portfolio.filter(
    (item) => item.discipline === category
  );

  return (

    <section className="portfolio-grid">

      <div className="portfolio-grid-container">

        {projects.map((project) => (

          <PortfolioCard
            key={project.id}
            project={project}
          />

        ))}

      </div>

    </section>

  );

}