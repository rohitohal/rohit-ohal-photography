import {
  useEffect,
  useMemo,
  useState,
} from "react";

import CreateProjectModal from "../components/CreateProjectModal/CreateProjectModal";

import "../styles/projects.css";


/* =========================
   LOCAL STORAGE KEY
========================= */

const PROJECTS_KEY =
  "rohit-photography-projects";


export default function Projects() {

  /* =========================
     LOAD PROJECTS
  ========================= */

  const [projects, setProjects] =
    useState(() => {

      try {

        const savedProjects =
          localStorage.getItem(
            PROJECTS_KEY
          );

        if (!savedProjects) {
          return [];
        }

        const parsedProjects =
          JSON.parse(
            savedProjects
          );

        if (
          !Array.isArray(
            parsedProjects
          )
        ) {
          return [];
        }


        /* =========================
           NORMALIZE PROJECT ORDER
        ========================= */

        return parsedProjects.map(
          (
            project,
            index
          ) => ({
            ...project,

            order:
              typeof project.order ===
              "number"
                ? project.order
                : index,
          })
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
     MODAL STATE
  ========================= */

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const [
    editingProject,
    setEditingProject,
  ] = useState(null);


  /* =========================
     SEARCH + FILTERS
  ========================= */

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState("All");


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
     SORT PROJECTS
  ========================= */

  const orderedProjects =
    useMemo(() => {

      return [...projects].sort(
        (a, b) =>
          (a.order ?? 0) -
          (b.order ?? 0)
      );

    }, [projects]);


  /* =========================
     FILTER PROJECTS
  ========================= */

  const filteredProjects =
    useMemo(() => {

      const query =
        searchQuery
          .trim()
          .toLowerCase();

      return orderedProjects.filter(
        (project) => {

          const matchesSearch =

            !query ||

            project.title
              ?.toLowerCase()
              .includes(
                query
              ) ||

            project.location
              ?.toLowerCase()
              .includes(
                query
              ) ||

            project.category
              ?.toLowerCase()
              .includes(
                query
              );


          const matchesStatus =

            statusFilter ===
              "All" ||

            project.status ===
              statusFilter;


          const matchesCategory =

            categoryFilter ===
              "All" ||

            project.category ===
              categoryFilter;


          return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory
          );

        }
      );

    }, [
      orderedProjects,
      searchQuery,
      statusFilter,
      categoryFilter,
    ]);


  /* =========================
     FILTER ACTIVE
  ========================= */

  const filtersActive =

    searchQuery.trim() !== "" ||

    statusFilter !== "All" ||

    categoryFilter !== "All";


  /* =========================
     NORMALIZE ORDER
  ========================= */

  const normalizeOrder = (
    projectList
  ) => {

    return projectList.map(
      (
        project,
        index
      ) => ({
        ...project,
        order: index,
      })
    );

  };


  /* =========================
     SAVE PROJECT
  ========================= */

  const handleSaveProject = (
    projectData
  ) => {

    /* =========================
       EDIT PROJECT
    ========================= */

    if (editingProject) {

      setProjects(
        (prevProjects) =>

          prevProjects.map(
            (project) =>

              project.id ===
              editingProject.id

                ? {
                    ...project,

                    ...projectData,

                    id:
                      editingProject.id,

                    /*
                     * Preserve existing
                     * project order.
                     */

                    order:
                      project.order,
                  }

                : project
          )
      );

    } else {

      /* =========================
         CREATE NEW PROJECT

         New projects appear first.
      ========================= */

      const newProject = {

        ...projectData,

        id:
          Date.now(),

        order: 0,

      };


      setProjects(
        (prevProjects) => {

          const updatedProjects =
            prevProjects.map(
              (project) => ({
                ...project,

                order:
                  (
                    project.order ??
                    0
                  ) + 1,
              })
            );


          return [
            newProject,
            ...updatedProjects,
          ];

        }
      );

    }


    setEditingProject(
      null
    );

    setIsModalOpen(
      false
    );

  };


  /* =========================
     EDIT PROJECT
  ========================= */

  const handleEditProject = (
    project
  ) => {

    setEditingProject(
      project
    );

    setIsModalOpen(
      true
    );

  };


  /* =========================
     DELETE PROJECT
  ========================= */

  const handleDeleteProject = (
    projectId
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this project?"
      );


    if (!confirmed) {
      return;
    }


    setProjects(
      (prevProjects) => {

        const remainingProjects =
          prevProjects.filter(
            (project) =>
              project.id !==
              projectId
          );


        return normalizeOrder(
          [...remainingProjects].sort(
            (a, b) =>
              (a.order ?? 0) -
              (b.order ?? 0)
          )
        );

      }
    );

  };


  /* =========================
     MOVE PROJECT UP
  ========================= */

  const handleMoveUp = (
    projectId
  ) => {

    if (filtersActive) {
      return;
    }


    setProjects(
      (prevProjects) => {

        const sorted =
          [...prevProjects].sort(
            (a, b) =>
              (a.order ?? 0) -
              (b.order ?? 0)
          );


        const index =
          sorted.findIndex(
            (project) =>
              project.id ===
              projectId
          );


        if (index <= 0) {
          return prevProjects;
        }


        [
          sorted[index - 1],
          sorted[index],
        ] = [
          sorted[index],
          sorted[index - 1],
        ];


        return normalizeOrder(
          sorted
        );

      }
    );

  };


  /* =========================
     MOVE PROJECT DOWN
  ========================= */

  const handleMoveDown = (
    projectId
  ) => {

    if (filtersActive) {
      return;
    }


    setProjects(
      (prevProjects) => {

        const sorted =
          [...prevProjects].sort(
            (a, b) =>
              (a.order ?? 0) -
              (b.order ?? 0)
          );


        const index =
          sorted.findIndex(
            (project) =>
              project.id ===
              projectId
          );


        if (
          index === -1 ||
          index >=
            sorted.length - 1
        ) {
          return prevProjects;
        }


        [
          sorted[index],
          sorted[index + 1],
        ] = [
          sorted[index + 1],
          sorted[index],
        ];


        return normalizeOrder(
          sorted
        );

      }
    );

  };


  /* =========================
     CLOSE MODAL
  ========================= */

  const handleCloseModal = () => {

    setEditingProject(
      null
    );

    setIsModalOpen(
      false
    );

  };


  /* =========================
     RENDER
  ========================= */

  return (
    <>

      <div className="projects-page">


        {/* =========================
            HEADER
        ========================= */}

        <div className="projects-header">

          <div>

            <span className="projects-overline">
              PROJECT MANAGEMENT
            </span>

            <h1>
              Manage Projects
            </h1>

            <p>
              Create, organize and
              manage wedding stories,
              commercial work,
              portraits and editorial
              projects.
            </p>

          </div>


          <button
            type="button"
            className="new-project-button"
            onClick={() => {

              setEditingProject(
                null
              );

              setIsModalOpen(
                true
              );

            }}
          >
            + New Project
          </button>

        </div>


        {/* =========================
            SEARCH + FILTERS
        ========================= */}

        <div
          style={{
            display:
              "flex",

            gap:
              "20px",

            flexWrap:
              "wrap",

            background:
              "#fff",

            padding:
              "25px",

            borderRadius:
              "20px",

            border:
              "1px solid #ece8df",
          }}
        >

          <input
            type="text"
            placeholder="Search projects..."
            value={
              searchQuery
            }
            onChange={(event) =>
              setSearchQuery(
                event.target.value
              )
            }
            style={{
              flex: 1,

              minWidth:
                "250px",

              padding:
                "14px",

              borderRadius:
                "12px",

              border:
                "1px solid #ddd",
            }}
          />


          <select
            value={
              statusFilter
            }
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
            style={{
              padding:
                "14px",

              borderRadius:
                "12px",

              border:
                "1px solid #ddd",
            }}
          >

            <option value="All">
              All Statuses
            </option>

            <option value="Published">
              Published
            </option>

            <option value="Draft">
              Draft
            </option>

          </select>


          <select
            value={
              categoryFilter
            }
            onChange={(event) =>
              setCategoryFilter(
                event.target.value
              )
            }
            style={{
              padding:
                "14px",

              borderRadius:
                "12px",

              border:
                "1px solid #ddd",
            }}
          >

            <option value="All">
              All Disciplines
            </option>

            <option value="Wedding">
              Wedding
            </option>

            <option value="Portrait">
              Portrait
            </option>

            <option value="Events">
              Events
            </option>

            <option value="Industrial">
              Industrial
            </option>

            <option value="Food & Beverage">
              Food & Beverage
            </option>

            <option value="Editorial">
              Editorial
            </option>

          </select>

        </div>


        {/* =========================
            ORDERING MESSAGE
        ========================= */}

        {filtersActive && (

          <div
            style={{
              marginTop:
                "16px",

              padding:
                "14px 18px",

              background:
                "#f8f3e9",

              border:
                "1px solid #ece0c8",

              borderRadius:
                "12px",

              color:
                "#7a6338",

              fontSize:
                "14px",
            }}
          >
            Clear search and filters
            to reorder projects.
          </div>

        )}


        {/* =========================
            PROJECT GRID
        ========================= */}

        <div className="projects-grid">


          {/* EMPTY STATE */}

          {filteredProjects.length ===
            0 && (

            <div
              style={{
                background:
                  "#fff",

                padding:
                  "60px",

                borderRadius:
                  "20px",

                textAlign:
                  "center",

                width:
                  "100%",
              }}
            >

              <h2>
                No projects found
              </h2>

              <p>
                Try changing your
                search or filters.
              </p>

            </div>

          )}


          {/* PROJECT CARDS */}

          {filteredProjects.map(
            (
              project,
              index
            ) => (

              <div
                key={
                  project.id ||
                  project.slug
                }
                className="project-card"
              >


                {/* COVER */}

                {project.cover ? (

                  <img
                    src={
                      project.cover
                    }
                    alt={
                      project.title
                    }
                  />

                ) : (

                  <div
                    style={{
                      width:
                        "100%",

                      height:
                        "220px",

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


                {/* CONTENT */}

                <div className="project-content">

                  <span className="project-category">
                    {
                      project.category
                    }
                  </span>


                  <h3>
                    {
                      project.title
                    }
                  </h3>


                  {project.location && (

                    <p>
                      {
                        project.location
                      }
                    </p>

                  )}


                  {project.date && (

                    <small>
                      {
                        project.date
                      }
                    </small>

                  )}


                  {/* =========================
                      ORDER CONTROLS
                  ========================= */}

                  <div
                    style={{
                      display:
                        "flex",

                      gap:
                        "8px",

                      marginTop:
                        "18px",
                    }}
                  >

                    <button
                      type="button"
                      disabled={
                        filtersActive ||
                        index === 0
                      }
                      onClick={() =>
                        handleMoveUp(
                          project.id
                        )
                      }
                      title="Move project up"
                    >
                      ↑ Move Up
                    </button>


                    <button
                      type="button"
                      disabled={
                        filtersActive ||
                        index ===
                          filteredProjects.length -
                            1
                      }
                      onClick={() =>
                        handleMoveDown(
                          project.id
                        )
                      }
                      title="Move project down"
                    >
                      ↓ Move Down
                    </button>

                  </div>


                  {/* =========================
                      PROJECT FOOTER
                  ========================= */}

                  <div className="project-footer">

                    <span
                      className={`status ${
                        project.status
                          ?.toLowerCase() ||
                        "draft"
                      }`}
                    >
                      {
                        project.status ||
                        "Draft"
                      }
                    </span>


                    <div
                      style={{
                        display:
                          "flex",

                        gap:
                          "10px",
                      }}
                    >

                      <button
                        type="button"
                        onClick={() =>
                          handleEditProject(
                            project
                          )
                        }
                      >
                        Edit
                      </button>


                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteProject(
                            project.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>


      {/* =========================
          CREATE / EDIT MODAL
      ========================= */}

      <CreateProjectModal
        isOpen={
          isModalOpen
        }
        onClose={
          handleCloseModal
        }
        onSave={
          handleSaveProject
        }
        initialData={
          editingProject
        }
      />

    </>
  );
}