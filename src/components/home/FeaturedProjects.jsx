import { Link } from "react-router-dom";

import "./FeaturedProjects.css";

export default function FeaturedProjects() {
  const projects = JSON.parse(
    localStorage.getItem(
      "rohit-photography-projects"
    ) || "[]"
  );

  const featuredProjects = projects.filter(
    (project) => project.featuredHomepage
  );

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="featured-projects">

      <div className="featured-projects-container">

        <div className="featured-projects-header">

          <span className="featured-overline">
            FEATURED WORK
          </span>

          <h2>
            Selected Projects
          </h2>

          <p>
            A curated collection of stories,
            campaigns and commissions.
          </p>

        </div>

        <div className="featured-projects-grid">

          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.slug}`}
              className="featured-project-card"
            >

              <img
                src={project.cover}
                alt={project.title}
              />

              <div className="featured-project-content">

                <span>
                  {project.category}
                </span>

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.location}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </div>

    </section>
  );
}