import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from
  "../../lib/supabase";

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


/* =========================
   PORTFOLIO GRID
========================= */

export default function PortfolioGrid({
  category,
  enableFilter = false,
}) {

  /* =========================
     FILTER
  ========================= */

  const [
    activeFilter,
    setActiveFilter,
  ] = useState(
    category || "all"
  );


  /* =========================
     PROJECT DATA
  ========================= */

  const [
    cmsProjects,
    setCmsProjects,
  ] = useState([]);


  const [
    isLoading,
    setIsLoading,
  ] = useState(true);


  const [
    loadError,
    setLoadError,
  ] = useState("");


  /* =========================
     LOAD PROJECTS
     FROM SUPABASE
  ========================= */

  useEffect(() => {

    let isMounted =
      true;


    async function loadProjects() {

      setIsLoading(
        true
      );

      setLoadError(
        ""
      );


      try {

        const {
          data,
          error,
        } =
          await supabase
            .from(
              "projects"
            )
            .select(
              "*"
            )
            .eq(
              "status",
              "Published"
            );


        if (error) {

          throw error;

        }


        if (
          isMounted
        ) {

          setCmsProjects(
            Array.isArray(
              data
            )
              ? data
              : []
          );

        }


      } catch (error) {

        console.error(
          "Failed to load portfolio projects:",
          error
        );


        if (
          isMounted
        ) {

          setCmsProjects(
            []
          );

          setLoadError(
            error?.message ||
              "Unable to load portfolio projects."
          );

        }


      } finally {

        if (
          isMounted
        ) {

          setIsLoading(
            false
          );

        }

      }

    }


    loadProjects();


    return () => {

      isMounted =
        false;

    };

  }, []);


  /* =========================
     NORMALIZE + SORT PROJECTS
  ========================= */

  const allProjects =
    useMemo(() => {

      return cmsProjects

        /* =========================
           SAFETY CHECK

           Supabase already filters
           Published projects, but
           keeping this prevents an
           accidental draft display.
        ========================= */

        .filter(
          (project) =>
            project.status ===
            "Published"
        )


        /* =========================
           NORMALIZE SUPABASE DATA
        ========================= */

        .map(
          (
            project,
            index
          ) => {

            const projectDate =
              project.date
                ? new Date(
                    `${project.date}T00:00:00`
                  )
                : null;


            const hasValidDate =
              projectDate &&
              !Number.isNaN(
                projectDate.getTime()
              );


            return {

              ...project,


              /* =========================
                 DISCIPLINE
              ========================= */

              discipline:
                categoryToDiscipline[
                  project.category
                ] || "other",


              /* =========================
                 YEAR
              ========================= */

              year:
                hasValidDate
                  ? projectDate
                      .getFullYear()
                      .toString()
                  : "",


              /* =========================
                 GALLERY
              ========================= */

              gallery:
                Array.isArray(
                  project.gallery
                )
                  ? project.gallery
                  : Array.isArray(
                      project.images
                    )
                    ? project.images
                    : [],


              /* =========================
                 FEATURED PORTFOLIO

                 Database:
                 featured_portfolio

                 React:
                 featuredPortfolio
              ========================= */

              featuredPortfolio:
                Boolean(
                  project.featured_portfolio
                ),


              /* =========================
                 PORTFOLIO ORDER
              ========================= */

              portfolioOrder:
                typeof project.portfolio_order ===
                "number"
                  ? project.portfolio_order
                  : null,


              /* =========================
                 GENERAL PROJECT ORDER
              ========================= */

              projectOrder:
                typeof project.project_order ===
                "number"
                  ? project.project_order
                  : index,

            };

          }
        )


        /* =========================
           SORT PROJECTS

           1. Featured Portfolio
           2. Portfolio Order
           3. Project Order
        ========================= */

        .sort(
          (
            a,
            b
          ) => {

            /* =========================
               FEATURED FIRST
            ========================= */

            const aFeatured =
              a.featuredPortfolio
                ? 1
                : 0;

            const bFeatured =
              b.featuredPortfolio
                ? 1
                : 0;


            if (
              aFeatured !==
              bFeatured
            ) {

              return (
                bFeatured -
                aFeatured
              );

            }


            /* =========================
               FEATURED PORTFOLIO ORDER
            ========================= */

            if (
              a.featuredPortfolio &&
              b.featuredPortfolio
            ) {

              const aPortfolioOrder =
                typeof a.portfolioOrder ===
                "number"
                  ? a.portfolioOrder
                  : Number.MAX_SAFE_INTEGER;


              const bPortfolioOrder =
                typeof b.portfolioOrder ===
                "number"
                  ? b.portfolioOrder
                  : Number.MAX_SAFE_INTEGER;


              if (
                aPortfolioOrder !==
                bPortfolioOrder
              ) {

                return (
                  aPortfolioOrder -
                  bPortfolioOrder
                );

              }

            }


            /* =========================
               GENERAL PROJECT ORDER
            ========================= */

            return (
              a.projectOrder -
              b.projectOrder
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

      if (
        !enableFilter
      ) {

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


        {/* =========================
            LOADING
        ========================= */}

        {isLoading ? (

          <div className="portfolio-empty">

            <h3>
              Loading Portfolio
            </h3>

            <p>
              Please wait while the
              projects are loaded.
            </p>

          </div>


        ) : loadError ? (


          /* =========================
             ERROR
          ========================= */

          <div className="portfolio-empty">

            <h3>
              Unable to Load Projects
            </h3>

            <p>
              {loadError}
            </p>

          </div>


        ) : projects.length > 0 ? (


          /* =========================
             PROJECTS
          ========================= */

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


          /* =========================
             EMPTY
          ========================= */

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