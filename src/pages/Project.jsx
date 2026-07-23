import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from
  "../lib/supabase";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";

import AdvancedLightbox from
  "../components/gallery/AdvancedLightbox";

import "./Project.css";


/* =========================
   CATEGORY → DISCIPLINE MAP
========================= */

const categoryToDiscipline = {

  Wedding:
    "weddings",

  Portrait:
    "portraits",

  Events:
    "events",

  Industrial:
    "industrial",

  "Food & Beverage":
    "food-beverage",

  Editorial:
    "editorial",

};


/* =========================
   DISCIPLINE DISPLAY NAMES
========================= */

const disciplineLabels = {

  weddings:
    "Wedding Stories",

  portraits:
    "Portraits",

  events:
    "Events",

  industrial:
    "Industrial",

  "food-beverage":
    "Food & Beverage",

  editorial:
    "Editorial",

};


/* =========================
   PROJECT
========================= */

export default function Project() {

  /* =========================
     ROUTE PARAMETERS
  ========================= */

  const {
    disciplineSlug,
    projectSlug,
  } =
    useParams();


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
     LIGHTBOX INDEX

     -1 = CLOSED
     0+ = ACTIVE IMAGE
  ========================= */

  const [
    lightboxIndex,
    setLightboxIndex,
  ] =
    useState(-1);


  /* =========================
     LOAD PUBLISHED PROJECTS
     FROM SUPABASE
  ========================= */

  useEffect(() => {

    let isMounted =
      true;


    async function loadProjects() {

      try {

        setIsLoading(
          true
        );

        setLoadError(
          ""
        );


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


        if (
          error
        ) {

          throw error;

        }


        if (
          !isMounted
        ) {

          return;

        }


        setCmsProjects(
          Array.isArray(
            data
          )
            ? data
            : []
        );


      } catch (error) {

        console.error(
          "Failed to load project:",
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
            "Unable to load project."
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
     NORMALIZE PUBLISHED
     PROJECTS
  ========================= */

  const allProjects =
    useMemo(() => {

      return cmsProjects

        .filter(
          (
            project
          ) =>
            project &&
            project.status ===
              "Published"
        )

        .map(
          (
            project,
            index
          ) => {

            const discipline =
              categoryToDiscipline[
                project.category
              ] ||
              "other";


            /* =========================
               PROJECT YEAR
            ========================= */

            let year =
              "";


            if (
              project.date
            ) {

              const parsedDate =
                new Date(
                  `${project.date}T00:00:00`
                );


              if (
                !Number.isNaN(
                  parsedDate.getTime()
                )
              ) {

                year =
                  parsedDate
                    .getFullYear()
                    .toString();

              }

            }


            /* =========================
               GALLERY
            ========================= */

            const gallery =

              Array.isArray(
                project.gallery
              )

                ? project.gallery.filter(
                    Boolean
                  )

                : Array.isArray(
                    project.images
                  )

                  ? project.images.filter(
                      Boolean
                    )

                  : [];


            return {

              ...project,

              discipline,

              year,

              description:
                project.description ||
                "",

              gallery,


              /* =========================
                 FEATURED PORTFOLIO
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
                 PROJECT ORDER
              ========================= */

              projectOrder:
                typeof project.project_order ===
                  "number"
                  ? project.project_order
                  : index,

            };

          }
        );

    }, [
      cmsProjects,
    ]);


  /* =========================
     CURRENT DISCIPLINE
     PROJECTS
  ========================= */

  const disciplineProjects =
    useMemo(() => {

      return allProjects

        .filter(
          (
            project
          ) =>
            project.discipline ===
            disciplineSlug
        )

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
               PORTFOLIO ORDER
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
               PROJECT ORDER
            ========================= */

            return (
              a.projectOrder -
              b.projectOrder
            );

          }
        );

    }, [
      allProjects,
      disciplineSlug,
    ]);


  /* =========================
     FIND CURRENT PROJECT
  ========================= */

  const projectIndex =
    disciplineProjects.findIndex(
      (
        item
      ) =>
        item.slug ===
        projectSlug
    );


  const project =
    projectIndex >=
      0
      ? disciplineProjects[
          projectIndex
        ]
      : null;


  /* =========================
     PREVIOUS PROJECT
  ========================= */

  const previousProject =
    projectIndex > 0
      ? disciplineProjects[
          projectIndex - 1
        ]
      : null;


  /* =========================
     NEXT PROJECT
  ========================= */

  const nextProject =
    projectIndex >= 0 &&
    projectIndex <
      disciplineProjects.length -
        1
      ? disciplineProjects[
          projectIndex + 1
        ]
      : null;


  /* =========================
     OPEN LIGHTBOX
  ========================= */

  const openLightbox =
    (
      index
    ) => {

      setLightboxIndex(
        index
      );

    };


  /* =========================
     CLOSE LIGHTBOX
  ========================= */

  const closeLightbox =
    () => {

      setLightboxIndex(
        -1
      );

    };


  /* =========================
     CHANGE LIGHTBOX IMAGE
  ========================= */

  const changeLightboxImage =
    (
      index
    ) => {

      setLightboxIndex(
        index
      );

    };


  /* =========================
     IMAGE PROTECTION
  ========================= */

  const preventImageContextMenu =
    (
      event
    ) => {

      event.preventDefault();

    };


  const preventImageDrag =
    (
      event
    ) => {

      event.preventDefault();

    };


  /* =========================
     LOADING
  ========================= */

  if (
    isLoading
  ) {

    return (

      <div className="project-not-found">

        <h1>
          Loading project...
        </h1>

      </div>

    );

  }


  /* =========================
     LOAD ERROR
  ========================= */

  if (
    loadError
  ) {

    return (

      <>

        <SEOHead
          title="Unable to Load Project | Rohit Ohal Photography"
          description="The photography project could not be loaded."
        />


        <div className="project-not-found">

          <h1>
            Unable to load project
          </h1>


          <p>
            {loadError}
          </p>


          <Link
            to="/portfolio"
            className="project-nav-link"
          >

            ← Back to Portfolio

          </Link>

        </div>

      </>

    );

  }


  /* =========================
     PROJECT NOT FOUND
  ========================= */

  if (
    !project
  ) {

    return (

      <>

        <SEOHead
          title="Project Not Found | Rohit Ohal Photography"
          description="The photography project you are looking for could not be found."
        />


        <div className="project-not-found">

          <h1>

            Project not found

          </h1>


          <Link
            to="/portfolio"
            className="project-nav-link"
          >

            ← Back to Portfolio

          </Link>

        </div>

      </>

    );

  }


  /* =========================
     DISCIPLINE LABEL
  ========================= */

  const disciplineLabel =
    disciplineLabels[
      project.discipline
    ] ||
    project.discipline ||
    "Photography";


  /* =========================
     SEO
  ========================= */

  const seoTitle =
    `${project.title} | Rohit Ohal Photography`;


  const seoDescription =
    project.description ||
    `${project.title}, a ${disciplineLabel} photography project by Rohit Ohal Photography.`;


  /* =========================
     HERO SUBTITLE
  ========================= */

  const heroSubtitle =
    [
      project.location,
      project.year,
    ]
      .filter(
        Boolean
      )
      .join(
        " • "
      );


  /* =========================
     RENDER
  ========================= */

  return (

    <>

      {/* =========================
          SEO
      ========================= */}

      <SEOHead
        title={
          seoTitle
        }
        description={
          seoDescription
        }
        image={
          project.cover
        }
      />


      {/* =========================
          HERO
      ========================= */}

      <PageHero
        title={
          project.title
        }
        subtitle={
          heroSubtitle
        }
        image={
          project.cover
        }
      />


      {/* =========================
          PROJECT PAGE
      ========================= */}

      <section className="project-page">

        <div className="project-container">


          {/* =========================
              PROJECT META
          ========================= */}

          <div className="project-meta">


            {/* LOCATION */}

            <div>

              <span>
                Location
              </span>


              <h3>

                {
                  project.location ||
                  "—"
                }

              </h3>

            </div>


            {/* YEAR */}

            <div>

              <span>
                Year
              </span>


              <h3>

                {
                  project.year ||
                  "—"
                }

              </h3>

            </div>


            {/* DISCIPLINE */}

            <div>

              <span>
                Discipline
              </span>


              <h3>

                {
                  disciplineLabel
                }

              </h3>

            </div>

          </div>


          {/* =========================
              PROJECT STORY
          ========================= */}

          <div className="project-story">

            <h2>
              Project Story
            </h2>


            <p>

              {
                project.description ||
                "Project description coming soon."
              }

            </p>

          </div>


          {/* =========================
              PROJECT GALLERY
          ========================= */}

          {project.gallery.length >
            0 && (

            <div className="project-gallery">

              {project.gallery.map(
                (
                  image,
                  index
                ) => (

                  <img
                    key={
                      `${image}-${index}`
                    }
                    src={
                      image
                    }
                    alt={
                      `${project.title} - Image ${
                        index + 1
                      }`
                    }
                    loading="lazy"
                    draggable={
                      false
                    }
                    onContextMenu={
                      preventImageContextMenu
                    }
                    onDragStart={
                      preventImageDrag
                    }
                    onClick={() =>
                      openLightbox(
                        index
                      )
                    }
                  />

                )
              )}

            </div>

          )}


          {/* =========================
              PROJECT NAVIGATION
          ========================= */}

          <div className="project-navigation">


            {/* PREVIOUS PROJECT */}

            {previousProject ? (

              <Link
                to={
                  `/portfolio/${previousProject.discipline}/${previousProject.slug}`
                }
                className="project-nav-link"
              >

                ←{" "}
                {
                  previousProject.title
                }

              </Link>

            ) : (

              <div />

            )}


            {/* NEXT PROJECT */}

            {nextProject ? (

              <Link
                to={
                  `/portfolio/${nextProject.discipline}/${nextProject.slug}`
                }
                className="project-nav-link"
              >

                {
                  nextProject.title
                }{" "}
                →

              </Link>

            ) : (

              <div />

            )}

          </div>

        </div>

      </section>


      {/* =========================
          SHARED ADVANCED LIGHTBOX
      ========================= */}

      <AdvancedLightbox

        images={
          project.gallery
        }

        currentIndex={
          lightboxIndex >=
            0
            ? lightboxIndex
            : 0
        }

        isOpen={
          lightboxIndex >=
            0
        }

        onClose={
          closeLightbox
        }

        onChange={
          changeLightboxImage
        }

        title={
          project.title
        }

      />

    </>

  );

}