import { useEffect, useMemo, useState } from "react";

import CreateProjectModal from "../components/CreateProjectModal/CreateProjectModal";

import "../styles/projects.css";

const initialProjects = [
  {
    id: 1,
    title: "Aditi & Rahul Wedding",
    category: "Wedding",
    location: "Pune",
    date: "2026-02-12",
    status: "Published",
    cover:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  },

  {
    id: 2,
    title: "Corporate Portrait Series",
    category: "Portrait",
    location: "Mumbai",
    date: "2026-01-05",
    status: "Draft",
    cover:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem(
      "rohit-photography-projects"
    );

    return savedProjects
      ? JSON.parse(savedProjects)
      : initialProjects;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(
      "rohit-photography-projects",
      JSON.stringify(projects)
    );
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        project.location
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        project.category
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        project.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    projects,
    searchQuery,
    statusFilter,
    categoryFilter,
  ]);

  const handleSaveProject = (projectData) => {
    if (editingProject) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                ...projectData,
                id: editingProject.id,
              }
            : project
        )
      );
    } else {
      const newProject = {
        ...projectData,
        id: Date.now(),
      };

      setProjects((prevProjects) => [
        newProject,
        ...prevProjects,
      ]);
    }

    setEditingProject(null);
    setIsModalOpen(false);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    setProjects((prevProjects) =>
      prevProjects.filter(
        (project) => project.id !== projectId
      )
    );
  };

  const handleCloseModal = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="projects-page">

        <div className="projects-header">

          <div>

            <span className="projects-overline">
              PROJECT MANAGEMENT
            </span>

            <h1>
              Manage Projects
            </h1>

            <p>
              Create and manage wedding stories,
              commercial work, portraits and
              editorial projects.
            </p>

          </div>

          <button
            className="new-project-button"
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
          >
            + New Project
          </button>

        </div>

        {/* Search + Filters */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            background: "#fff",
            padding: "25px",
            borderRadius: "20px",
            border: "1px solid #ece8df",
          }}
        >
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          >
            <option>All</option>
            <option>Published</option>
            <option>Draft</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          >
            <option>All</option>
            <option>Wedding</option>
            <option>Portrait</option>
            <option>Events</option>
            <option>Industrial</option>
            <option>Food & Beverage</option>
            <option>Editorial</option>
          </select>
        </div>

        <div className="projects-grid">

          {filteredProjects.length === 0 && (
            <div
              style={{
                background: "#fff",
                padding: "60px",
                borderRadius: "20px",
                textAlign: "center",
                width: "100%",
              }}
            >
              <h2>No projects found</h2>

              <p>
                Try changing your search or filters.
              </p>
            </div>
          )}

          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card"
            >

              <img
                src={
                  project.cover ||
                  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
                }
                alt={project.title}
              />

              <div className="project-content">

                <span className="project-category">
                  {project.category}
                </span>

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.location}
                </p>

                <small>
                  {project.date}
                </small>

                <div className="project-footer">

                  <span
                    className={`status ${project.status.toLowerCase()}`}
                  >
                    {project.status}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() =>
                        handleEditProject(project)
                      }
                    >
                      Edit
                    </button>

                    <button
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
          ))}

        </div>

      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProject}
        initialData={editingProject}
      />
    </>
  );
}