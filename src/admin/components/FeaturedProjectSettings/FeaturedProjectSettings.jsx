import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAllProjects,
  updateHomepageProjects,
} from "../../../services/projectService";

import "./FeaturedProjectSettings.css";


/* ==========================================
   LIMIT
========================================== */

const MAX_FEATURED_PROJECTS = 6;


/* ==========================================
   FEATURED PROJECT SETTINGS
========================================== */

export default function FeaturedProjectSettings() {

  /* ========================================
     STATE
  ======================================== */

  const [
    projects,
    setProjects,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    saving,
    setSaving,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  const [
    success,
    setSuccess,
  ] = useState("");


  /* ========================================
     LOAD PROJECTS FROM SUPABASE
  ======================================== */

  useEffect(() => {

    let mounted = true;


    async function loadProjects() {

      try {

        setLoading(true);

        setError("");

        setSuccess("");


        const data =
          await getAllProjects();


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
          "Failed to load homepage projects:",
          loadError
        );


        if (mounted) {

          setError(
            loadError?.message ||
              "Failed to load projects."
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


  /* ========================================
     PUBLISHED PROJECTS
  ======================================== */

  const publishedProjects =
    useMemo(() => {

      return projects.filter(
        (project) =>
          project.status ===
          "Published"
      );

    }, [
      projects,
    ]);


  /* ========================================
     FEATURED PROJECTS
  ======================================== */

  const featuredProjects =
    useMemo(() => {

      return publishedProjects

        .filter(
          (project) =>
            project.featuredHomepage
        )

        .sort(
          (a, b) => {

            const aOrder =
              typeof a.homepageOrder ===
              "number"
                ? a.homepageOrder
                : Number.MAX_SAFE_INTEGER;


            const bOrder =
              typeof b.homepageOrder ===
              "number"
                ? b.homepageOrder
                : Number.MAX_SAFE_INTEGER;


            return (
              aOrder -
              bOrder
            );

          }
        );

    }, [
      publishedProjects,
    ]);


  /* ========================================
     AVAILABLE PROJECTS
  ======================================== */

  const availableProjects =
    useMemo(() => {

      return publishedProjects.filter(
        (project) =>
          !project.featuredHomepage
      );

    }, [
      publishedProjects,
    ]);


  /* ========================================
     APPLY FEATURED ORDER

     Creates a complete project list with
     correct featuredHomepage and
     homepageOrder values.
  ======================================== */

  function applyFeaturedOrder(
    currentProjects,
    orderedFeaturedProjects
  ) {

    const orderMap =
      new Map(
        orderedFeaturedProjects.map(
          (
            project,
            index
          ) => [
            String(project.id),
            index,
          ]
        )
      );


    return currentProjects.map(
      (project) => {

        const homepageOrder =
          orderMap.get(
            String(project.id)
          );


        if (
          typeof homepageOrder ===
          "number"
        ) {

          return {

            ...project,

            featuredHomepage:
              true,

            homepageOrder,

          };

        }


        return {

          ...project,

          featuredHomepage:
            false,

          homepageOrder:
            null,

        };

      }
    );

  }


  /* ========================================
     ADD FEATURED PROJECT
  ======================================== */

  function addFeaturedProject(
    projectId
  ) {

    setError("");

    setSuccess("");


    if (
      !projectId
    ) {

      return;

    }


    if (
      featuredProjects.length >=
      MAX_FEATURED_PROJECTS
    ) {

      setError(
        `You can feature a maximum of ${MAX_FEATURED_PROJECTS} projects on the homepage.`
      );

      return;

    }


    const projectToAdd =
      projects.find(
        (project) =>
          String(project.id) ===
          String(projectId)
      );


    if (
      !projectToAdd
    ) {

      return;

    }


    const alreadyFeatured =
      featuredProjects.some(
        (project) =>
          String(project.id) ===
          String(projectId)
      );


    if (
      alreadyFeatured
    ) {

      return;

    }


    const nextFeatured = [

      ...featuredProjects,

      {
        ...projectToAdd,

        featuredHomepage:
          true,
      },

    ];


    setProjects(
      applyFeaturedOrder(
        projects,
        nextFeatured
      )
    );

  }


  /* ========================================
     REMOVE FEATURED PROJECT
  ======================================== */

  function removeFeaturedProject(
    projectId
  ) {

    setError("");

    setSuccess("");


    const nextFeatured =
      featuredProjects.filter(
        (project) =>
          String(project.id) !==
          String(projectId)
      );


    setProjects(
      applyFeaturedOrder(
        projects,
        nextFeatured
      )
    );

  }


  /* ========================================
     MOVE FEATURED PROJECT
  ======================================== */

  function moveProject(
    projectId,
    direction
  ) {

    setError("");

    setSuccess("");


    const currentIndex =
      featuredProjects.findIndex(
        (project) =>
          String(project.id) ===
          String(projectId)
      );


    if (
      currentIndex === -1
    ) {

      return;

    }


    const targetIndex =
      currentIndex +
      direction;


    if (
      targetIndex < 0 ||
      targetIndex >=
        featuredProjects.length
    ) {

      return;

    }


    const reordered = [
      ...featuredProjects,
    ];


    const [
      movedProject,
    ] =
      reordered.splice(
        currentIndex,
        1
      );


    reordered.splice(
      targetIndex,
      0,
      movedProject
    );


    setProjects(
      applyFeaturedOrder(
        projects,
        reordered
      )
    );

  }


  /* ========================================
     SAVE TO SUPABASE
  ======================================== */

  async function saveSettings() {

    if (
      saving
    ) {

      return;

    }


    try {

      setSaving(true);

      setError("");

      setSuccess("");


      /*
       * updateHomepageProjects()
       * converts:
       *
       * featuredHomepage
       *       ↓
       * featured_homepage
       *
       * homepageOrder
       *       ↓
       * homepage_order
       */

      const updatedProjects =
        await updateHomepageProjects(
          projects
        );


      setProjects(
        Array.isArray(
          updatedProjects
        )
          ? updatedProjects
          : []
      );


      setSuccess(
        "Homepage featured projects saved successfully."
      );


    } catch (saveError) {

      console.error(
        "Failed to save homepage projects:",
        saveError
      );


      setError(
        saveError?.message ||
          "Failed to save homepage featured projects."
      );


    } finally {

      setSaving(false);

    }

  }


  /* ========================================
     LOADING
  ======================================== */

  if (
    loading
  ) {

    return (

      <section className="featured-project-settings">

        <div className="featured-project-settings-header">

          <div>

            <span className="settings-overline">
              HOMEPAGE PROJECTS
            </span>


            <h2>
              Featured Projects
            </h2>


            <p>
              Loading projects...
            </p>

          </div>

        </div>

      </section>

    );

  }


  /* ========================================
     RENDER
  ======================================== */

  return (

    <section className="featured-project-settings">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="featured-project-settings-header">

        <div>

          <span className="settings-overline">
            HOMEPAGE PROJECTS
          </span>


          <h2>
            Featured Projects
          </h2>


          <p>
            Choose and arrange the projects
            displayed on the homepage.
          </p>

        </div>

      </div>


      {/* =====================================
          ERROR
      ===================================== */}

      {error && (

        <div className="admin-error-message">

          {error}

        </div>

      )}


      {/* =====================================
          SUCCESS
      ===================================== */}

      {success && (

        <div className="admin-success-message">

          {success}

        </div>

      )}


      {/* =====================================
          COUNT
      ===================================== */}

      <div className="featured-project-count">

        <strong>
          {
            featuredProjects.length
          }
        </strong>

        {" / "}

        {
          MAX_FEATURED_PROJECTS
        }

        {" projects selected"}

      </div>


      {/* =====================================
          FEATURED PROJECT LIST
      ===================================== */}

      <div className="featured-project-list">

        {featuredProjects.length >
        0 ? (

          featuredProjects.map(
            (
              project,
              index
            ) => (

              <div
                key={
                  project.id
                }
                className="featured-project-item"
              >

                {/* ===========================
                    IMAGE
                =========================== */}

                <div className="featured-project-image">

                  {project.cover ? (

                    <img
                      src={
                        project.cover
                      }
                      alt={
                        project.title ||
                        "Project"
                      }
                    />

                  ) : (

                    <div className="featured-project-image-placeholder">

                      No Image

                    </div>

                  )}

                </div>


                {/* ===========================
                    PROJECT INFORMATION
                =========================== */}

                <div className="featured-project-info">

                  <span className="featured-project-position">

                    {
                      index + 1
                    }

                  </span>


                  <div>

                    <h3>

                      {
                        project.title ||
                        "Untitled Project"
                      }

                    </h3>


                    <p>

                      {
                        project.category ||
                        "Photography"
                      }


                      {project.location
                        ? ` · ${project.location}`
                        : ""}

                    </p>

                  </div>

                </div>


                {/* ===========================
                    CONTROLS
                =========================== */}

                <div className="featured-project-controls">

                  <button
                    type="button"
                    disabled={
                      index ===
                      0
                    }
                    onClick={() =>
                      moveProject(
                        project.id,
                        -1
                      )
                    }
                  >

                    ↑ Move Up

                  </button>


                  <button
                    type="button"
                    disabled={
                      index ===
                      featuredProjects.length -
                        1
                    }
                    onClick={() =>
                      moveProject(
                        project.id,
                        1
                      )
                    }
                  >

                    ↓ Move Down

                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      removeFeaturedProject(
                        project.id
                      )
                    }
                  >

                    Remove

                  </button>

                </div>

              </div>

            )
          )

        ) : (

          <div className="featured-project-empty">

            <h3>
              No Featured Projects
            </h3>


            <p>
              Select published projects below
              to display them on the homepage.
            </p>

          </div>

        )}

      </div>


      {/* =====================================
          ADD PROJECT
      ===================================== */}

      <div className="featured-project-add">

        <h3>
          Add Project
        </h3>


        {availableProjects.length >
        0 ? (

          <select
            value=""
            disabled={
              featuredProjects.length >=
              MAX_FEATURED_PROJECTS
            }
            onChange={(
              event
            ) => {

              const projectId =
                event.target.value;


              if (
                projectId
              ) {

                addFeaturedProject(
                  projectId
                );

              }

            }}
          >

            <option value="">

              Select a published project...

            </option>


            {availableProjects.map(
              (project) => (

                <option
                  key={
                    project.id
                  }
                  value={
                    project.id
                  }
                >

                  {
                    project.title ||
                    "Untitled Project"
                  }


                  {
                    project.category
                      ? ` — ${project.category}`
                      : ""
                  }

                </option>

              )
            )}

          </select>

        ) : (

          <p>

            {
              publishedProjects.length ===
              0

                ? "There are no published projects available."

                : "All published projects are currently featured."
            }

          </p>

        )}

      </div>


      {/* =====================================
          SAVE
      ===================================== */}

      <div className="featured-project-save">

        <button
          type="button"
          disabled={
            saving
          }
          onClick={
            saveSettings
          }
        >

          {
            saving
              ? "Saving..."
              : "Save Featured Projects"
          }

        </button>

      </div>

    </section>

  );

}