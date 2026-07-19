import {
  useMemo,
  useState,
} from "react";

import PortfolioCard from "./PortfolioCard";
import PortfolioFilter from "./PortfolioFilter";

import "./PortfolioGrid.css";


/* =========================
   CATEGORY → DISCIPLINE MAP
========================= */

const categoryToDiscipline = {
  Wedding: "weddings",
  Portrait: "portraits",
  Events: "events",
  Industrial: "industrial",
  "Food & Beverage":
    "food-beverage",
  Editorial: "editorial",
};


export default function PortfolioGrid({
  category,
  enableFilter = false,
}) {

  const [
    activeFilter,
    setActiveFilter,
  ] = useState(
    category || "all"
  );


  /* =========================
     LOAD CMS PROJECTS
  ========================= */

  const cmsProjects =
    useMemo(() => {

      try {

        const savedProjects =
          localStorage.getItem(
            "rohit-photography-projects"
          );

        if (!savedProjects) {
          return [];
        }

        const parsedProjects =
          JSON.parse(
            savedProjects
          );

        return Array.isArray(
          parsedProjects
        )
          ? parsedProjects
          : [];

      } catch (error) {

        console.error(
          "Failed to load CMS projects:",
          error
        );

        return [];

      }

    }, []);


  /* =========================
     MAP + SORT PROJECTS
  ========================= */

  const allProjects =
    useMemo(() => {

      return cmsProjects

        /* =========================
           ONLY PUBLISHED PROJECTS
        ========================= */

        .filter(
          (project) =>
            project.status ===
            "Published"
        )


        /* =========================
           NORMALIZE PROJECT DATA
        ========================= */

        .map(
          (
            project,
            index
          ) => ({

            ...project,

            discipline:
              categoryToDiscipline[
                project.category
              ] || "other",

            year:
              project.date
                ? new Date(
                    project.date
                  )
                    .getFullYear()
                    .toString()
                : new Date()
                    .getFullYear()
                    .toString(),

            gallery:
              Array.isArray(
                project.gallery
              )
                ? project.gallery
                : [],

            /*
             * Projects created before
             * ordering was added may
             * not have an order value.
             */

            order:
              typeof project.order ===
              "number"
                ? project.order
                : index,

          })
        )


        /* =========================
           SORT PROJECTS

           1. Featured Portfolio first
           2. Custom order second
        ========================= */

        .sort(
          (a, b) => {

            const aFeatured =
              a.featuredPortfolio
                ? 1
                : 0;

            const bFeatured =
              b.featuredPortfolio
                ? 1
                : 0;


            /* Featured first */

            if (
              aFeatured !==
              bFeatured
            ) {

              return (
                bFeatured -
                aFeatured
              );

            }


            /* Custom order */

            return (
              a.order -
              b.order
            );

          }
        );

    }, [
      cmsProjects,
    ]);


  /* =========================
     FILTER PROJECTS
  ========================= */

  const projects =
    useMemo(() => {

      /* =========================
         DISCIPLINE PAGE
      ========================= */

      if (!enableFilter) {

        return allProjects.filter(
          (item) =>
            item.discipline ===
            category
        );

      }


      /* =========================
         MAIN PORTFOLIO
      ========================= */

      if (
        activeFilter ===
        "all"
      ) {

        return allProjects;

      }


      /* =========================
         FILTER BY DISCIPLINE
      ========================= */

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


  /* =========================
     RENDER
  ========================= */

  return (
    <section className="portfolio-grid">


      {/* =========================
          PORTFOLIO FILTER
      ========================= */}

      {enableFilter && (

        <PortfolioFilter
          active={
            activeFilter
          }
          onChange={
            setActiveFilter
          }
        />

      )}


      {/* =========================
          PROJECT GRID
      ========================= */}

      <div className="portfolio-grid-container">

        {projects.length > 0 ? (

          projects.map(
            (project) => (

              <PortfolioCard
                key={
                  project.id ||
                  project.slug
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
              Portfolio projects
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