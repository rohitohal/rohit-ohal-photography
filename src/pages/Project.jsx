import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import portfolio from "../data/portfolio";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";

import "./Project.css";

export default function Project() {
  const { projectSlug } = useParams();

  const [lightboxOpen, setLightboxOpen] =
    useState(false);

  const [activeImage, setActiveImage] =
    useState(0);

  /* =========================
     LOAD CMS PROJECTS
  ========================= */

  const cmsProjects = JSON.parse(
    localStorage.getItem(
      "rohit-photography-projects"
    ) || "[]"
  );

  /* =========================
     MAP CMS PROJECTS
  ========================= */

  const mappedCmsProjects = cmsProjects.map(
    (project) => ({
      ...project,

      discipline:
        project.category
          ?.toLowerCase()
          .replace(/\s+/g, "-") ||
        "other",

      year: project.date
        ? new Date(project.date)
            .getFullYear()
            .toString()
        : new Date()
            .getFullYear()
            .toString(),

      description:
        project.description,
    })
  );

  /* =========================
     COMBINE PROJECTS
  ========================= */

  const allProjects = [
    ...mappedCmsProjects,
    ...portfolio,
  ];

  /* =========================
     FIND CURRENT PROJECT
  ========================= */

  const projectIndex =
    allProjects.findIndex(
      (item) =>
        item.slug === projectSlug
    );

  const project =
    allProjects[projectIndex];

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
     PREVIOUS / NEXT PROJECT
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

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (
      !project.gallery?.length
    ) {
      return;
    }

    setActiveImage(
      (prev) =>
        (prev + 1) %
        project.gallery.length
    );
  };

  const previousImage = () => {
    if (
      !project.gallery?.length
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
     DYNAMIC SEO
  ========================= */

  const seoTitle =
    `${project.title} | Rohit Ohal Photography`;

  const seoDescription =
    project.description ||
    `${project.title}, a ${project.discipline} photography project by Rohit Ohal Photography.`;

  /* =========================
     RENDER
  ========================= */

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        image={project.cover}
      />

      <PageHero
        title={project.title}
        subtitle={`${project.location} • ${project.year}`}
        image={project.cover}
      />

      <section className="project-page">

        <div className="project-container">

          <div className="project-meta">

            <div>
              <span>
                Location
              </span>

              <h3>
                {project.location}
              </h3>
            </div>

            <div>
              <span>
                Year
              </span>

              <h3>
                {project.year}
              </h3>
            </div>

            <div>
              <span>
                Discipline
              </span>

              <h3>
                {project.discipline}
              </h3>
            </div>

          </div>

          <div className="project-story">

            <h2>
              Project Story
            </h2>

            <p>
              {project.description ||
                "Project description coming soon."}
            </p>

          </div>

          {project.gallery &&
            project.gallery.length >
              0 && (
              <div className="project-gallery">

                {project.gallery.map(
                  (
                    image,
                    index
                  ) => (
                    <img
                      key={index}
                      src={image}
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

      {lightboxOpen &&
        project.gallery?.length >
          0 && (
          <div
            className="lightbox"
            onClick={
              closeLightbox
            }
          >

            <button
              className="lightbox-close"
              onClick={
                closeLightbox
              }
            >
              ×
            </button>

            <button
              className="lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
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
              className="lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              →
            </button>

          </div>
        )}

    </>
  );
}