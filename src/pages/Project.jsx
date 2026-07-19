import { Link, useParams } from "react-router-dom";
import { useState } from "react";

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
  "Food & Beverage": "food-beverage",
  Editorial: "editorial",
};

/* =========================
   DISCIPLINE DISPLAY NAMES
========================= */

const disciplineLabels = {
  weddings: "Wedding Stories",
  portraits: "Portraits",
  events: "Events",
  industrial: "Industrial",
  "food-beverage": "Food & Beverage",
  editorial: "Editorial",
};

export default function Project() {
  const { projectSlug } =
    useParams();

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
        JSON.parse(savedProjects);

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
          project.status ===
          "Published"
      )
      .map((project) => ({
        ...project,

        discipline:
          categoryToDiscipline[
            project.category
          ] || "other",

        year: project.date
          ? new Date(
              project.date
            )
              .getFullYear()
              .toString()
          : new Date()
              .getFullYear()
              .toString(),

        description:
          project.description ||
          "",

        gallery:
          Array.isArray(
            project.gallery
          )
            ? project.gallery
            : [],
      }));

  /* =========================
     FIND CURRENT PROJECT
  ========================= */

  const projectIndex =
    allProjects.findIndex(
      (item) =>
        item.slug ===
        projectSlug
    );

  const project =
    allProjects[
      projectIndex
    ];

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

        </div>
      </>
    );
  }

  /* =========================
     PREVIOUS / NEXT
  ========================= */

  const previousProject =
    projectIndex > 0
      ? allProjects[
          projectIndex - 1
        ]
      : null;

  const nextProject =
    projectIndex <
    allProjects.length - 1
      ? allProjects[
          projectIndex + 1
        ]
      : null;

  /* =========================
     LIGHTBOX
  ========================= */

  const openLightbox = (
    index
  ) => {
    setActiveImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox =
    () => {
      setLightboxOpen(false);
    };

  const nextImage = () => {
    if (
      !project.gallery
        ?.length
    ) {
      return;
    }

    setActiveImage(
      (prev) =>
        (prev + 1) %
        project.gallery
          .length
    );
  };

  const previousImage =
    () => {
      if (
        !project.gallery
          ?.length
      ) {
        return;
      }

      setActiveImage(
        (prev) =>
          prev === 0
            ? project
                .gallery
                .length - 1
            : prev - 1
      );
    };

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
     RENDER
  ========================= */

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={
          seoDescription
        }
        image={
          project.cover
        }
      />

      <PageHero
        title={
          project.title
        }
        subtitle={`${
          project.location ||
          ""
        }${
          project.location &&
          project.year
            ? " • "
            : ""
        }${
          project.year || ""
        }`}
        image={
          project.cover
        }
      />

      <section className="project-page">

        <div className="project-container">

          {/* PROJECT META */}

          <div className="project-meta">

            <div>

              <span>
                Location
              </span>

              <h3>
                {project.location ||
                  "—"}
              </h3>

            </div>

            <div>

              <span>
                Year
              </span>

              <h3>
                {project.year ||
                  "—"}
              </h3>

            </div>

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

          {/* PROJECT STORY */}

          <div className="project-story">

            <h2>
              Project Story
            </h2>

            <p>
              {project.description ||
                "Project description coming soon."}
            </p>

          </div>

          {/* PROJECT GALLERY */}

          {project.gallery
            ?.length > 0 && (

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
                    alt={`${project.title} - Image ${
                      index + 1
                    }`}
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

          {/* PROJECT NAVIGATION */}

          <div className="project-navigation">

            {previousProject ? (

              <Link
                to={`/portfolio/${previousProject.discipline}/${previousProject.slug}`}
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

            {nextProject ? (

              <Link
                to={`/portfolio/${nextProject.discipline}/${nextProject.slug}`}
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

      {/* LIGHTBOX */}

      {lightboxOpen &&
        project.gallery
          ?.length > 0 && (

          <div
            className="lightbox"
            onClick={
              closeLightbox
            }
          >

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

            <button
              type="button"
              className="lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();

                previousImage();
              }}
              aria-label="Previous image"
            >
              ←
            </button>

            <img
              src={
                project.gallery[
                  activeImage
                ]
              }
              alt={`${project.title} - Image ${
                activeImage + 1
              }`}
              className="lightbox-image"
              onClick={(e) =>
                e.stopPropagation()
              }
            />

            <button
              type="button"
              className="lightbox-next"
              onClick={(e) => {
                e.stopPropagation();

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