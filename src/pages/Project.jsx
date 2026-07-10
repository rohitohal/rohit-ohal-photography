import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import portfolio from "../data/portfolio";

import PageHero from "../components/common/PageHero";

import "./Project.css";

export default function Project() {
  const { projectSlug } = useParams();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const cmsProjects = JSON.parse(
    localStorage.getItem(
      "rohit-photography-projects"
    ) || "[]"
  );

  const mappedCmsProjects = cmsProjects.map(
    (project) => ({
      ...project,

      discipline:
        project.category
          ?.toLowerCase()
          .replace(/\s+/g, "-") || "other",

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

  const allProjects = [
    ...mappedCmsProjects,
    ...portfolio,
  ];

  const projectIndex =
    allProjects.findIndex(
      (item) =>
        item.slug === projectSlug
    );

  const project =
    allProjects[projectIndex];

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

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>
          Project not found
        </h1>
      </div>
    );
  }

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
    setActiveImage(
      (prev) =>
        (prev + 1) %
        project.gallery.length
    );
  };

  const previousImage = () => {
    setActiveImage(
      (prev) =>
        prev === 0
          ? project.gallery
              .length - 1
          : prev - 1
    );
  };

  return (
    <>
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
                {
                  project.location
                }
              </h3>
            </div>

            <div>
              <span>
                Year
              </span>
              <h3>
                {
                  project.year
                }
              </h3>
            </div>

            <div>
              <span>
                Discipline
              </span>
              <h3>
                {
                  project.discipline
                }
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

          {project.gallery && (
            <div className="project-gallery">

              {project.gallery.map(
                (
                  image,
                  index
                ) => (
                  <img
                    key={
                      index
                    }
                    src={
                      image
                    }
                    alt={
                      project.title
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

          <div className="project-navigation">

            {previousProject ? (
              <Link
                to={`/portfolio/${previousProject.discipline}/${previousProject.slug}`}
                className="project-nav-link"
              >
                ← {
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
                } →
              </Link>
            ) : (
              <div />
            )}

          </div>

        </div>

      </section>

      {lightboxOpen && (
        <div
          className="lightbox"
          onClick={closeLightbox}
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
            onClick={(
              e
            ) => {
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
            alt={
              project.title
            }
            className="lightbox-image"
            onClick={(
              e
            ) =>
              e.stopPropagation()
            }
          />

          <button
            className="lightbox-next"
            onClick={(
              e
            ) => {
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