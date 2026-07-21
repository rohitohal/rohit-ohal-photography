import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useState,
} from "react";

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
     LOAD CMS PROJECTS
  ========================= */

  let cmsProjects = [];


  try {

    const savedProjects =
      localStorage.getItem(
        "rohit-photography-projects"
      );


    if (
      savedProjects
    ) {

      const parsedProjects =
        JSON.parse(
          savedProjects
        );


      if (
        Array.isArray(
          parsedProjects
        )
      ) {

        cmsProjects =
          parsedProjects;

      }

    }

  } catch (
    error
  ) {

    console.error(
      "Failed to load CMS projects:",
      error
    );

  }


  /* =========================
     MAP PUBLISHED PROJECTS
  ========================= */

  const allProjects =
    cmsProjects

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

          let year = "";


          if (
            project.date
          ) {

            const parsedDate =
              new Date(
                project.date
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


          return {

            ...project,

            discipline,

            year,

            description:
              project.description ||
              "",

            gallery:
              Array.isArray(
                project.gallery
              )
                ? project.gallery.filter(
                    Boolean
                  )
                : [],

            order:
              typeof
                project.order ===
              "number"
                ? project.order
                : index,

          };

        }
      );


  /* =========================
     CURRENT DISCIPLINE
     PROJECTS
  ========================= */

  const disciplineProjects =
    allProjects

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

          const aFeatured =
            a.featuredPortfolio
              ? 1
              : 0;


          const bFeatured =
            b.featuredPortfolio
              ? 1
              : 0;


          /* FEATURED FIRST */

          if (
            aFeatured !==
            bFeatured
          ) {

            return (
              bFeatured -
              aFeatured
            );

          }


          /* CUSTOM ORDER */

          return (
            a.order -
            b.order
          );

        }
      );


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
    disciplineProjects[
      projectIndex
    ];


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
                  previousProject
                    .title
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
                  nextProject
                    .title
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