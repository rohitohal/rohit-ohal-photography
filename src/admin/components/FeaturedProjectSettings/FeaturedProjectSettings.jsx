import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "../../styles/homepage-settings.css";

const PROJECTS_KEY =
  "rohit-photography-projects";

/* =========================
   INITIALIZE HOMEPAGE ORDER
========================= */

function initializeHomepageOrder(
  projects
) {
  if (!Array.isArray(projects)) {
    return [];
  }

  const featuredProjects =
    projects
      .filter(
        (project) =>
          project.status ===
            "Published" &&
          project.featuredHomepage ===
            true
      )
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

        return orderA - orderB;
      });

  const orderMap =
    new Map();

  featuredProjects.forEach(
    (project, index) => {
      orderMap.set(
        project.id,
        index
      );
    }
  );

  return projects.map(
    (project) => {
      if (
        orderMap.has(
          project.id
        )
      ) {
        return {
          ...project,

          homepageOrder:
            orderMap.get(
              project.id
            ),
        };
      }

      return project;
    }
  );
}


/* =========================
   GET ORDERED FEATURED
========================= */

function getOrderedFeaturedProjects(
  projects
) {
  return projects
    .filter(
      (project) =>
        project.status ===
          "Published" &&
        project.featuredHomepage ===
          true
    )
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

      return orderA - orderB;
    });
}


/* =========================
   APPLY HOMEPAGE ORDER
========================= */

function applyHomepageOrder(
  allProjects,
  orderedFeatured
) {
  const orderMap =
    new Map();

  orderedFeatured.forEach(
    (project, index) => {
      orderMap.set(
        project.id,
        index
      );
    }
  );

  return allProjects.map(
    (project) => {
      if (
        !orderMap.has(
          project.id
        )
      ) {
        return project;
      }

      return {
        ...project,

        homepageOrder:
          orderMap.get(
            project.id
          ),
      };
    }
  );
}


/* =========================
   NORMALIZE HOMEPAGE ORDER
========================= */

function normalizeHomepageOrder(
  projects
) {
  const featured =
    getOrderedFeaturedProjects(
      projects
    );

  return applyHomepageOrder(
    projects,
    featured
  );
}


export default function FeaturedProjectSettings() {
  /* =========================
     LOAD PROJECTS
  ========================= */

  const [projects, setProjects] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            PROJECTS_KEY
          );

        if (!saved) {
          return [];
        }

        const parsed =
          JSON.parse(saved);

        if (
          !Array.isArray(parsed)
        ) {
          return [];
        }

        return initializeHomepageOrder(
          parsed
        );
      } catch (error) {
        console.error(
          "Failed to load projects:",
          error
        );

        return [];
      }
    });


  /* =========================
     SAVE PROJECTS
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      PROJECTS_KEY,
      JSON.stringify(
        projects
      )
    );
  }, [projects]);


  /* =========================
     PUBLISHED PROJECTS
  ========================= */

  const publishedProjects =
    useMemo(() => {
      return projects.filter(
        (project) =>
          project.status ===
          "Published"
      );
    }, [projects]);


  /* =========================
     FEATURED PROJECTS
  ========================= */

  const featuredProjects =
    useMemo(() => {
      return getOrderedFeaturedProjects(
        projects
      );
    }, [projects]);


  /* =========================
     NON FEATURED PROJECTS
  ========================= */

  const nonFeaturedProjects =
    useMemo(() => {
      return publishedProjects.filter(
        (project) =>
          project.featuredHomepage !==
          true
      );
    }, [
      publishedProjects,
    ]);


  /* =========================
     TOGGLE FEATURED
  ========================= */

  const toggleFeatured = (
    projectId
  ) => {
    setProjects((prev) => {
      const projectToUpdate =
        prev.find(
          (project) =>
            project.id ===
            projectId
        );

      if (!projectToUpdate) {
        return prev;
      }


      /* REMOVE FEATURED */

      if (
        projectToUpdate
          .featuredHomepage ===
        true
      ) {
        const updated =
          prev.map(
            (project) =>
              project.id ===
              projectId
                ? {
                    ...project,

                    featuredHomepage:
                      false,

                    homepageOrder:
                      undefined,
                  }
                : project
          );

        return normalizeHomepageOrder(
          updated
        );
      }


      /* ADD FEATURED */

      const currentFeatured =
        getOrderedFeaturedProjects(
          prev
        );

      const updated =
        prev.map(
          (project) =>
            project.id ===
            projectId
              ? {
                  ...project,

                  featuredHomepage:
                    true,

                  homepageOrder:
                    currentFeatured.length,
                }
              : project
        );

      return normalizeHomepageOrder(
        updated
      );
    });
  };


  /* =========================
     MOVE PROJECT UP
  ========================= */

  const handleMoveUp = (
    projectId
  ) => {
    setProjects((prev) => {
      const featured =
        getOrderedFeaturedProjects(
          prev
        );

      const index =
        featured.findIndex(
          (project) =>
            project.id ===
            projectId
        );

      if (index <= 0) {
        return prev;
      }

      const reordered = [
        ...featured,
      ];

      [
        reordered[index - 1],
        reordered[index],
      ] = [
        reordered[index],
        reordered[index - 1],
      ];

      return applyHomepageOrder(
        prev,
        reordered
      );
    });
  };


  /* =========================
     MOVE PROJECT DOWN
  ========================= */

  const handleMoveDown = (
    projectId
  ) => {
    setProjects((prev) => {
      const featured =
        getOrderedFeaturedProjects(
          prev
        );

      const index =
        featured.findIndex(
          (project) =>
            project.id ===
            projectId
        );

      if (
        index === -1 ||
        index ===
          featured.length - 1
      ) {
        return prev;
      }

      const reordered = [
        ...featured,
      ];

      [
        reordered[index],
        reordered[index + 1],
      ] = [
        reordered[index + 1],
        reordered[index],
      ];

      return applyHomepageOrder(
        prev,
        reordered
      );
    });
  };


  /* =========================
     PROJECT CARD
  ========================= */

  const renderProjectCard = (
    project,
    isFeatured,
    featuredIndex = -1
  ) => {
    return (
      <div
        key={
          project.id ||
          project.slug
        }
        style={{
          border:
            isFeatured
              ? "2px solid #b58b43"
              : "1px solid #ece8df",

          borderRadius:
            "16px",

          overflow:
            "hidden",

          background:
            "#fff",
        }}
      >

        {/* COVER IMAGE */}

        {project.cover ? (
          <img
            src={
              project.cover
            }
            alt={
              project.title
            }
            style={{
              display:
                "block",

              width:
                "100%",

              height:
                "160px",

              objectFit:
                "cover",
            }}
          />
        ) : (
          <div
            style={{
              width:
                "100%",

              height:
                "160px",

              background:
                "#f3f1ec",

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              color:
                "#999",
            }}
          >
            No Cover Image
          </div>
        )}


        {/* PROJECT INFO */}

        <div
          style={{
            padding:
              "16px",
          }}
        >

          <span
            style={{
              color:
                "#b58b43",

              fontSize:
                "11px",

              letterSpacing:
                "1px",

              textTransform:
                "uppercase",
            }}
          >
            {project.category}
          </span>


          <h3
            style={{
              margin:
                "8px 0 5px",

              fontSize:
                "18px",
            }}
          >
            {project.title}
          </h3>


          {project.location && (
            <p
              style={{
                margin:
                  "0 0 15px",

                color:
                  "#777",

                fontSize:
                  "13px",
              }}
            >
              {project.location}
            </p>
          )}


          {/* ORDER NUMBER */}

          {isFeatured && (
            <p
              style={{
                margin:
                  "0 0 10px",

                color:
                  "#999",

                fontSize:
                  "12px",
              }}
            >
              Homepage position:{" "}
              {featuredIndex + 1}
            </p>
          )}


          {/* UP / DOWN */}

          {isFeatured && (
            <div
              style={{
                display:
                  "flex",

                gap:
                  "8px",

                marginBottom:
                  "10px",
              }}
            >

              <button
                type="button"
                disabled={
                  featuredIndex ===
                  0
                }
                onClick={() =>
                  handleMoveUp(
                    project.id
                  )
                }
                style={{
                  flex: 1,

                  padding:
                    "10px",

                  border:
                    "1px solid #ddd",

                  borderRadius:
                    "8px",

                  background:
                    "#fff",

                  cursor:
                    featuredIndex ===
                    0
                      ? "not-allowed"
                      : "pointer",

                  opacity:
                    featuredIndex ===
                    0
                      ? 0.4
                      : 1,
                }}
              >
                ↑ Move Up
              </button>


              <button
                type="button"
                disabled={
                  featuredIndex ===
                  featuredProjects.length -
                    1
                }
                onClick={() =>
                  handleMoveDown(
                    project.id
                  )
                }
                style={{
                  flex: 1,

                  padding:
                    "10px",

                  border:
                    "1px solid #ddd",

                  borderRadius:
                    "8px",

                  background:
                    "#fff",

                  cursor:
                    featuredIndex ===
                    featuredProjects.length -
                      1
                      ? "not-allowed"
                      : "pointer",

                  opacity:
                    featuredIndex ===
                    featuredProjects.length -
                      1
                      ? 0.4
                      : 1,
                }}
              >
                ↓ Move Down
              </button>

            </div>
          )}


          {/* FEATURE BUTTON */}

          <button
            type="button"
            onClick={() =>
              toggleFeatured(
                project.id
              )
            }
            style={{
              width:
                "100%",

              padding:
                "11px 14px",

              border:
                isFeatured
                  ? "1px solid #b58b43"
                  : "1px solid #ddd",

              borderRadius:
                "10px",

              background:
                isFeatured
                  ? "#f8f3e9"
                  : "#fff",

              color:
                isFeatured
                  ? "#8a672f"
                  : "#222",

              cursor:
                "pointer",

              fontWeight:
                "500",
            }}
          >
            {isFeatured
              ? "✓ Featured"
              : "Feature on Homepage"}
          </button>

        </div>

      </div>
    );
  };


  /* =========================
     RENDER
  ========================= */

  return (
    <div className="homepage-settings-card">

      {/* HEADER */}

      <div className="homepage-settings-header">

        <span className="homepage-overline">
          FEATURED WORK
        </span>

        <h2>
          Featured Projects
        </h2>

        <p>
          Select which published
          projects appear on your
          homepage and control their
          display order.
        </p>

        <p
          style={{
            marginTop:
              "10px",

            color:
              "#777",

            fontSize:
              "14px",
          }}
        >
          {featuredProjects.length}{" "}
          projects currently featured
        </p>

      </div>


      {/* EMPTY STATE */}

      {publishedProjects.length ===
        0 && (
        <div
          style={{
            padding:
              "40px",

            background:
              "#f8f8f8",

            borderRadius:
              "16px",

            textAlign:
              "center",
          }}
        >
          <h3>
            No Published Projects
          </h3>

          <p>
            Publish a project first
            before featuring it on
            the homepage.
          </p>
        </div>
      )}


      {/* FEATURED PROJECTS */}

      {featuredProjects.length >
        0 && (
        <div
          style={{
            marginBottom:
              "40px",
          }}
        >

          <h3
            style={{
              margin:
                "0 0 8px",

              fontSize:
                "20px",
            }}
          >
            Homepage Order
          </h3>

          <p
            style={{
              margin:
                "0 0 20px",

              color:
                "#777",

              fontSize:
                "14px",
            }}
          >
            Use Move Up and Move Down
            to change the order shown
            on your homepage.
          </p>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fill, minmax(220px, 1fr))",

              gap:
                "20px",
            }}
          >

            {featuredProjects.map(
              (
                project,
                index
              ) =>
                renderProjectCard(
                  project,
                  true,
                  index
                )
            )}

          </div>

        </div>
      )}


      {/* AVAILABLE PROJECTS */}

      {nonFeaturedProjects.length >
        0 && (
        <div>

          <h3
            style={{
              margin:
                "0 0 20px",

              fontSize:
                "20px",
            }}
          >
            Available Projects
          </h3>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fill, minmax(220px, 1fr))",

              gap:
                "20px",
            }}
          >

            {nonFeaturedProjects.map(
              (project) =>
                renderProjectCard(
                  project,
                  false
                )
            )}

          </div>

        </div>
      )}

    </div>
  );
}