import {
  useEffect,
  useMemo,
  useState,
} from "react";

import CreateProjectModal from
  "../components/CreateProjectModal/CreateProjectModal";

import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
  updateProjectOrder,
} from "../../services/projectService";

import "../styles/projects.css";


/* =========================
   PROJECTS
========================= */

export default function Projects() {

  /* =========================
     PROJECTS STATE
  ========================= */

  const [
    projects,
    setProjects,
  ] = useState([]);


  /* =========================
     LOADING
  ========================= */

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);


  /* =========================
     SAVING
  ========================= */

  const [
    isSaving,
    setIsSaving,
  ] = useState(false);


  /* =========================
     ERROR
  ========================= */

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");


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
     LOAD PROJECTS
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

        setErrorMessage(
          ""
        );


        const loadedProjects =
          await getAllProjects();


        if (
          !isMounted
        ) {

          return;

        }


        setProjects(
          Array.isArray(
            loadedProjects
          )
            ? loadedProjects
            : []
        );

      } catch (error) {

        console.error(
          "Failed to load Admin projects:",
          error
        );


        if (
          isMounted
        ) {

          setProjects(
            []
          );

          setErrorMessage(
            error?.message ||
            "Unable to load projects."
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
     SORT PROJECTS
  ========================= */

  const orderedProjects =
    useMemo(() => {

      return [
        ...projects,
      ].sort(
        (
          a,
          b
        ) =>
          (
            a.order ??
            0
          ) -
          (
            b.order ??
            0
          )
      );

    }, [
      projects,
    ]);


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
        (
          project
        ) => {

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

    searchQuery.trim() !==
      "" ||

    statusFilter !==
      "All" ||

    categoryFilter !==
      "All";


  /* =========================
     NORMALIZE ORDER
  ========================= */

  const normalizeOrder =
    (
      projectList
    ) => {

      return projectList.map(
        (
          project,
          index
        ) => ({

          ...project,

          order:
            index,

        })
      );

    };


  /* =========================
     SAVE PROJECT
  ========================= */

  const handleSaveProject =
    async (
      projectData
    ) => {

      if (
        isSaving
      ) {

        return;

      }


      try {

        setIsSaving(
          true
        );

        setErrorMessage(
          ""
        );


        /* =====================
           EDIT PROJECT
        ===================== */

        if (
          editingProject
        ) {

          const updatedProject =
            await updateProject(
              editingProject.id,
              {

                ...editingProject,

                ...projectData,

                id:
                  editingProject.id,

                order:
                  editingProject.order,

              }
            );


          setProjects(
            (
              previous
            ) =>
              previous.map(
                (
                  project
                ) =>
                  project.id ===
                    editingProject.id
                    ? updatedProject
                    : project
              )
          );

        } else {

          /* =====================
             CREATE PROJECT
          ===================== */

          const currentOrdered =
            [
              ...orderedProjects,
            ];


          const shiftedProjects =
            currentOrdered.map(
              (
                project,
                index
              ) => ({

                ...project,

                order:
                  index + 1,

              })
            );


          if (
            shiftedProjects.length >
              0
          ) {

            await updateProjectOrder(
              shiftedProjects
            );

          }


          const createdProject =
            await createProject({

              ...projectData,

              order:
                0,

            });


          setProjects(
            normalizeOrder([
              createdProject,
              ...currentOrdered,
            ])
          );

        }


        setEditingProject(
          null
        );

        setIsModalOpen(
          false
        );

      } catch (error) {

        console.error(
          "Failed to save project:",
          error
        );


        setErrorMessage(
          error?.message ||
          "Unable to save project."
        );

      } finally {

        setIsSaving(
          false
        );

      }

    };


  /* =========================
     EDIT PROJECT
  ========================= */

  const handleEditProject =
    (
      project
    ) => {

      if (
        isSaving
      ) {

        return;

      }


      setErrorMessage(
        ""
      );

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

  const handleDeleteProject =
    async (
      projectId
    ) => {

      if (
        isSaving
      ) {

        return;

      }


      const confirmed =
        window.confirm(
          "Are you sure you want to delete this project?"
        );


      if (
        !confirmed
      ) {

        return;

      }


      try {

        setIsSaving(
          true
        );

        setErrorMessage(
          ""
        );


        await deleteProject(
          projectId
        );


        const remainingProjects =
          normalizeOrder(
            orderedProjects.filter(
              (
                project
              ) =>
                project.id !==
                  projectId
            )
          );


        if (
          remainingProjects.length >
            0
        ) {

          const savedProjects =
            await updateProjectOrder(
              remainingProjects
            );


          setProjects(
            savedProjects
          );

        } else {

          setProjects(
            []
          );

        }

      } catch (error) {

        console.error(
          "Failed to delete project:",
          error
        );


        setErrorMessage(
          error?.message ||
          "Unable to delete project."
        );

      } finally {

        setIsSaving(
          false
        );

      }

    };


  /* =========================
     MOVE PROJECT UP
  ========================= */

  const handleMoveUp =
    async (
      projectId
    ) => {

      if (
        filtersActive ||
        isSaving
      ) {

        return;

      }


      const sorted =
        [
          ...orderedProjects,
        ];


      const index =
        sorted.findIndex(
          (
            project
          ) =>
            project.id ===
              projectId
        );


      if (
        index <= 0
      ) {

        return;

      }


      [
        sorted[
          index - 1
        ],
        sorted[
          index
        ],
      ] = [
        sorted[
          index
        ],
        sorted[
          index - 1
        ],
      ];


      const reordered =
        normalizeOrder(
          sorted
        );


      setProjects(
        reordered
      );


      try {

        setIsSaving(
          true
        );

        setErrorMessage(
          ""
        );


        const savedProjects =
          await updateProjectOrder(
            reordered
          );


        setProjects(
          savedProjects
        );

      } catch (error) {

        console.error(
          "Failed to move project:",
          error
        );


        setErrorMessage(
          error?.message ||
          "Unable to update project order."
        );


        try {

          const loadedProjects =
            await getAllProjects();


          setProjects(
            loadedProjects
          );

        } catch (
          reloadError
        ) {

          console.error(
            "Failed to reload projects:",
            reloadError
          );

        }

      } finally {

        setIsSaving(
          false
        );

      }

    };


  /* =========================
     MOVE PROJECT DOWN
  ========================= */

  const handleMoveDown =
    async (
      projectId
    ) => {

      if (
        filtersActive ||
        isSaving
      ) {

        return;

      }


      const sorted =
        [
          ...orderedProjects,
        ];


      const index =
        sorted.findIndex(
          (
            project
          ) =>
            project.id ===
              projectId
        );


      if (
        index ===
          -1 ||
        index >=
          sorted.length -
            1
      ) {

        return;

      }


      [
        sorted[
          index
        ],
        sorted[
          index + 1
        ],
      ] = [
        sorted[
          index + 1
        ],
        sorted[
          index
        ],
      ];


      const reordered =
        normalizeOrder(
          sorted
        );


      setProjects(
        reordered
      );


      try {

        setIsSaving(
          true
        );

        setErrorMessage(
          ""
        );


        const savedProjects =
          await updateProjectOrder(
            reordered
          );


        setProjects(
          savedProjects
        );

      } catch (error) {

        console.error(
          "Failed to move project:",
          error
        );


        setErrorMessage(
          error?.message ||
          "Unable to update project order."
        );


        try {

          const loadedProjects =
            await getAllProjects();


          setProjects(
            loadedProjects
          );

        } catch (
          reloadError
        ) {

          console.error(
            "Failed to reload projects:",
            reloadError
          );

        }

      } finally {

        setIsSaving(
          false
        );

      }

    };


  /* =========================
     CLOSE MODAL
  ========================= */

  const handleCloseModal =
    () => {

      if (
        isSaving
      ) {

        return;

      }


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


        {/* =====================
            HEADER
        ===================== */}

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
            disabled={
              isLoading ||
              isSaving
            }
            onClick={() => {

              setErrorMessage(
                ""
              );

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


        {/* =====================
            ERROR
        ===================== */}

        {errorMessage && (

          <div
            style={{
              marginBottom:
                "20px",

              padding:
                "14px 18px",

              background:
                "#fff3f3",

              border:
                "1px solid #f1cccc",

              borderRadius:
                "12px",

              color:
                "#a33",

              fontSize:
                "14px",
            }}
          >

            {
              errorMessage
            }

          </div>

        )}


        {/* =====================
            SEARCH + FILTERS
        ===================== */}

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
            onChange={
              (
                event
              ) =>
                setSearchQuery(
                  event.target.value
                )
            }
            style={{
              flex:
                1,

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
            onChange={
              (
                event
              ) =>
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
            onChange={
              (
                event
              ) =>
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


        {/* =====================
            ORDERING MESSAGE
        ===================== */}

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


        {/* =====================
            SAVING MESSAGE
        ===================== */}

        {isSaving && (

          <div
            style={{
              marginTop:
                "16px",

              color:
                "#777",

              fontSize:
                "14px",
            }}
          >

            Saving changes...

          </div>

        )}


        {/* =====================
            PROJECT GRID
        ===================== */}

        <div className="projects-grid">


          {isLoading && (

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
                Loading projects...
              </h2>

            </div>

          )}


          {!isLoading &&
          filteredProjects.length ===
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


          {!isLoading &&
          filteredProjects.map(
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


                <div className="project-content">

                  <span className="project-category">

                    {
                      project.category ||
                      "Project"
                    }

                  </span>


                  <h3>

                    {
                      project.title ||
                      "Untitled Project"
                    }

                  </h3>


                  {project.location && (

                    <p>
                      {project.location}
                    </p>

                  )}


                  {project.date && (

                    <small>
                      {project.date}
                    </small>

                  )}


                  {/* ORDER CONTROLS */}

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
                        isSaving ||
                        filtersActive ||
                        index ===
                          0
                      }
                      onClick={() =>
                        handleMoveUp(
                          project.id
                        )
                      }
                    >

                      ↑ Move Up

                    </button>


                    <button
                      type="button"
                      disabled={
                        isSaving ||
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
                    >

                      ↓ Move Down

                    </button>

                  </div>


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
                        disabled={
                          isSaving
                        }
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
                        disabled={
                          isSaving
                        }
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


      {/* =====================
          CREATE / EDIT MODAL
      ===================== */}

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