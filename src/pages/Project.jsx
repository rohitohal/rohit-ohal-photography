import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";

import "./Project.css";


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


export default function Project() {
  /* =========================
     ROUTE PARAMETERS
  ========================= */

  const {
    disciplineSlug,
    projectSlug,
  } = useParams();


  /* =========================
     LIGHTBOX STATE
  ========================= */

  const [
    lightboxOpen,
    setLightboxOpen,
  ] = useState(false);

  const [
    activeImage,
    setActiveImage,
  ] = useState(0);


  /* =========================
     LOAD CMS PROJECTS
  ========================= */

  let cmsProjects = [];

  try {
    const savedProjects =
      localStorage.getItem(
        "rohit-photography-projects"
      );

    if (savedProjects) {
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

  } catch (error) {
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
        (project) =>
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


          /* PROJECT YEAR */

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
        (project) =>
          project.discipline ===
          disciplineSlug
      )

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
      (item) =>
        item.slug ===
        projectSlug
    );


  const project =
    disciplineProjects[
      projectIndex
    ];


  /* =========================
     PREVIOUS / NEXT PROJECT
  ========================= */

  const previousProject =
    projectIndex > 0
      ? disciplineProjects[
          projectIndex - 1
        ]
      : null;


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
     LIGHTBOX FUNCTIONS
  ========================= */

  const openLightbox = (
    index
  ) => {

    setActiveImage(
      index
    );

    setLightboxOpen(
      true
    );

  };


  const closeLightbox =
    () => {

      setLightboxOpen(
        false
      );

      setActiveImage(
        0
      );

    };


  /* =========================
     NEXT IMAGE
  ========================= */

  const nextImage = () => {

    if (
      !project ||
      project.gallery.length ===
        0
    ) {
      return;
    }

    setActiveImage(
      (prev) =>
        (
          prev +
          1
        ) %
        project.gallery.length
    );

  };


  /* =========================
     PREVIOUS IMAGE
  ========================= */

  const previousImage =
    () => {

      if (
        !project ||
        project.gallery.length ===
          0
      ) {
        return;
      }

      setActiveImage(
        (prev) =>
          prev === 0
            ? project.gallery
                .length - 1
            : prev - 1
      );

    };


  /* =========================
     KEYBOARD NAVIGATION
  ========================= */

  useEffect(() => {

    /*
     * Keyboard controls should
     * only work while the
     * lightbox is open.
     */

    if (
      !lightboxOpen
    ) {
      return undefined;
    }


    const handleKeyDown =
      (event) => {

        /* NEXT IMAGE */

        if (
          event.key ===
          "ArrowRight"
        ) {
          event.preventDefault();

          setActiveImage(
            (prev) => {

              if (
                !project ||
                project.gallery
                  .length === 0
              ) {
                return prev;
              }

              return (
                prev +
                1
              ) %
                project.gallery
                  .length;

            }
          );
        }


        /* PREVIOUS IMAGE */

        if (
          event.key ===
          "ArrowLeft"
        ) {
          event.preventDefault();

          setActiveImage(
            (prev) => {

              if (
                !project ||
                project.gallery
                  .length === 0
              ) {
                return prev;
              }

              return prev ===
                0
                ? project
                    .gallery
                    .length -
                    1
                : prev -
                    1;

            }
          );
        }


        /* CLOSE LIGHTBOX */

        if (
          event.key ===
          "Escape"
        ) {
          event.preventDefault();

          setLightboxOpen(
            false
          );

          setActiveImage(
            0
          );
        }

      };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [
    lightboxOpen,
    project,
  ]);


  /* =========================
     PREVENT PAGE SCROLL
     WHILE LIGHTBOX IS OPEN
  ========================= */

  useEffect(() => {

    if (
      !lightboxOpen
    ) {
      return undefined;
    }

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";


    return () => {

      document.body.style.overflow =
        previousOverflow;

    };

  }, [
    lightboxOpen,
  ]);


  /* =========================
     IMAGE PROTECTION
  ========================= */

  const preventImageContextMenu =
    (event) => {

      event.preventDefault();

    };


  const preventImageDrag =
    (event) => {

      event.preventDefault();

    };


  /* =========================
     PROJECT NOT FOUND
  ========================= */

  if (!project) {
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
                    key={`${image}-${index}`}
                    src={
                      image
                    }
                    alt={`${project.title} - Image ${
                      index +
                      1
                    }`}
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
                to={`/portfolio/${previousProject.discipline}/${previousProject.slug}`}
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
                to={`/portfolio/${nextProject.discipline}/${nextProject.slug}`}
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
          LIGHTBOX
      ========================= */}

      {lightboxOpen &&
        project.gallery.length >
          0 && (

        <div
          className="lightbox"

          onClick={
            closeLightbox
          }

          onContextMenu={
            preventImageContextMenu
          }

          role="dialog"

          aria-modal="true"

          aria-label={`${project.title} image gallery`}
        >


          {/* =========================
              CLOSE
          ========================= */}

          <button
            type="button"
            className="lightbox-close"
            onClick={
              closeLightbox
            }
            aria-label="Close lightbox"
          >
            ×
          </button>


          {/* =========================
              PREVIOUS IMAGE
          ========================= */}

          <button
            type="button"
            className="lightbox-prev"

            onClick={(
              event
            ) => {

              event.stopPropagation();

              previousImage();

            }}

            aria-label="Previous image"
          >
            ←
          </button>


          {/* =========================
              ACTIVE IMAGE
          ========================= */}

          <img
            src={
              project.gallery[
                activeImage
              ]
            }

            alt={`${project.title} - Image ${
              activeImage +
              1
            }`}

            className="lightbox-image"

            draggable={
              false
            }

            onContextMenu={
              preventImageContextMenu
            }

            onDragStart={
              preventImageDrag
            }

            onClick={(
              event
            ) => {

              event.stopPropagation();

            }}
          />


          {/* =========================
              NEXT IMAGE
          ========================= */}

          <button
            type="button"
            className="lightbox-next"

            onClick={(
              event
            ) => {

              event.stopPropagation();

              nextImage();

            }}

            aria-label="Next image"
          >
            →
          </button>

        </div>

      )}

    </>
  );
}