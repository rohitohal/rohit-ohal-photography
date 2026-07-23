import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getHomepageProjects,
} from "../../services/projectService";

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


/* =========================
   FEATURED PROJECTS
========================= */

export default function FeaturedProjects() {

  /* =========================
     STATE
  ========================= */

  const [
    projects,
    setProjects,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  /* =========================
     LOAD FROM SUPABASE
  ========================= */

  useEffect(() => {

    let mounted = true;


    async function loadProjects() {

      try {

        setLoading(true);

        setError("");


        const data =
          await getHomepageProjects();


        if (!mounted) {
          return;
        }


        setProjects(
          Array.isArray(data)
            ? data
            : []
        );


      } catch (loadError) {

        console.error(
          "Failed to load featured projects:",
          loadError
        );


        if (mounted) {

          setError(
            loadError?.message ||
              "Failed to load featured projects."
          );

        }


      } finally {

        if (mounted) {

          setLoading(false);

        }

      }

    }


    loadProjects();


    return () => {

      mounted = false;

    };

  }, []);


  /* =========================
     PREPARE PROJECTS
  ========================= */

  const featuredProjects =
    useMemo(() => {

      return projects

        /* =========================
           SAFETY CHECK

           getHomepageProjects()
           already filters these in
           Supabase, but we keep this
           check on the frontend too.
        ========================= */

        .filter(
          (project) =>
            project.featuredHomepage ===
              true &&
            project.status ===
              "Published"
        )


        /* =========================
           SORT BY HOMEPAGE ORDER
        ========================= */

        .sort(
          (a, b) => {

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

          }
        )


        /* =========================
           ADD DISCIPLINE SLUG
        ========================= */

        .map(
          (project) => ({

            ...project,

            discipline:
              categoryToDiscipline[
                project.category
              ] || "other",

          })
        );

    }, [
      projects,
    ]);


  /* =========================
     LOADING

     Keep section hidden while
     Supabase is loading.
  ========================= */

  if (
    loading
  ) {

    return null;

  }


  /* =========================
     ERROR

     Do not break homepage if
     Supabase request fails.
  ========================= */

  if (
    error
  ) {

    return null;

  }


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


        {/* =========================
            HEADER
        ========================= */}

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


        {/* =========================
            PROJECT GRID
        ========================= */}

        <div className="featured-projects-grid">

          {featuredProjects.map(
            (project) => (

              <Link
                key={
                  project.id ||
                  project.slug
                }
                to={
                  `/portfolio/${project.discipline}/${project.slug}`
                }
                className="featured-project-card"
              >


                {/* =====================
                    COVER IMAGE
                ===================== */}

                {project.cover && (

                  <img
                    src={
                      project.cover
                    }
                    alt={
                      project.title ||
                      "Photography Project"
                    }
                    loading="lazy"
                  />

                )}


                {/* =====================
                    PROJECT CONTENT
                ===================== */}

                <div className="featured-project-content">

                  {project.category && (

                    <span>

                      {
                        project.category
                      }

                    </span>

                  )}


                  <h3>

                    {
                      project.title ||
                      "Untitled Project"
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