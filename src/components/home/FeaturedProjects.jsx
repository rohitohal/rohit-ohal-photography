import { Link } from "react-router-dom";

import "./FeaturedProjects.css";

/* =========================
   CATEGORY → DISCIPLINE MAP
========================= */

const categoryToDiscipline = {
  Wedding: "weddings",
  Portrait: "portraits",
  Events: "events",
  Industrial: "industrial",
  "Food & Beverage": "food-beverage",
  Editorial: "editorial",
};

export default function FeaturedProjects() {
  /* =========================
     LOAD CMS PROJECTS
  ========================= */

  let projects = [];

  try {
    const savedProjects =
      localStorage.getItem(
        "rohit-photography-projects"
      );

    if (savedProjects) {
      const parsedProjects =
        JSON.parse(savedProjects);

      if (
        Array.isArray(
          parsedProjects
        )
      ) {
        projects =
          parsedProjects;
      }
    }
  } catch (error) {
    console.error(
      "Failed to load featured projects:",
      error
    );
  }

  /* =========================
     FEATURED PUBLISHED PROJECTS
  ========================= */

  const featuredProjects =
    projects

      /* ONLY FEATURED + PUBLISHED */

      .filter(
        (project) =>
          project.featuredHomepage ===
            true &&
          project.status ===
            "Published"
      )

      /* SORT BY HOMEPAGE ORDER */

      .sort((a, b) => {
        const orderA =
          typeof a.homepageOrder ===
          "number"
            ? a.homepageOrder
            : Number.MAX_SAFE_INTEGER;

        const orderB =
          typeof b.homepageOrder ===
          "number"
            ? b.homepageOrder
            : Number.MAX_SAFE_INTEGER;

        return (
          orderA -
          orderB
        );
      })

      /* ADD DISCIPLINE */

      .map((project) => ({
        ...project,

        discipline:
          categoryToDiscipline[
            project.category
          ] || "other",
      }));


  /* =========================
     HIDE SECTION IF EMPTY
  ========================= */

  if (
    featuredProjects.length ===
    0
  ) {
    return null;
  }


  /* =========================
     RENDER
  ========================= */

  return (
    <section className="featured-projects">

      <div className="featured-projects-container">

        {/* HEADER */}

        <div className="featured-projects-header">

          <span className="featured-overline">
            FEATURED WORK
          </span>

          <h2>
            Selected Projects
          </h2>

          <p>
            A curated collection of
            stories, campaigns and
            commissions.
          </p>

        </div>


        {/* PROJECT GRID */}

        <div className="featured-projects-grid">

          {featuredProjects.map(
            (project) => (

              <Link
                key={
                  project.id ||
                  project.slug
                }
                to={`/portfolio/${project.discipline}/${project.slug}`}
                className="featured-project-card"
              >

                {/* COVER IMAGE */}

                {project.cover && (
                  <img
                    src={
                      project.cover
                    }
                    alt={
                      project.title
                    }
                    loading="lazy"
                  />
                )}


                {/* PROJECT CONTENT */}

                <div className="featured-project-content">

                  <span>
                    {
                      project.category
                    }
                  </span>

                  <h3>
                    {
                      project.title
                    }
                  </h3>

                  {project.location && (
                    <p>
                      {
                        project.location
                      }
                    </p>
                  )}

                </div>

              </Link>

            )
          )}

        </div>

      </div>

    </section>
  );
}