import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard/StatCard";

import "../styles/dashboard.css";

/* =========================
   SAFE LOCAL STORAGE READER
========================= */

function getLocalStorageData(key) {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return [];
    }

    const parsedData = JSON.parse(data);

    return Array.isArray(parsedData)
      ? parsedData
      : [];
  } catch (error) {
    console.error(
      `Failed to load ${key}:`,
      error
    );

    return [];
  }
}

export default function Dashboard() {
  const navigate = useNavigate();

  /* =========================
     LOAD CMS DATA
  ========================= */

  const projects = useMemo(
    () =>
      getLocalStorageData(
        "rohit-photography-projects"
      ),
    []
  );

  const media = useMemo(
    () =>
      getLocalStorageData(
        "rohit-photography-media"
      ),
    []
  );

  const journalPosts = useMemo(
    () =>
      getLocalStorageData(
        "rohit-photography-journal"
      ),
    []
  );

  /* =========================
     STATISTICS
  ========================= */

  const totalProjects =
    projects.length;

  const totalImages =
    media.length;

  const totalJournalPosts =
    journalPosts.length;

  const publishedProjects =
    projects.filter(
      (project) =>
        project.status ===
        "Published"
    ).length;

  const publishedJournalPosts =
    journalPosts.filter(
      (post) =>
        post.status ===
        "Published"
    ).length;

  /* =========================
     RECENT CONTENT
  ========================= */

  const recentProjects =
    projects
      .slice()
      .reverse()
      .slice(0, 3);

  const recentJournalPosts =
    journalPosts
      .slice()
      .reverse()
      .slice(0, 3);

  const hasRecentActivity =
    recentProjects.length > 0 ||
    recentJournalPosts.length > 0;

  return (
    <div className="dashboard-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="dashboard-header">

        <div>

          <span className="dashboard-overline">
            ADMIN PANEL
          </span>

          <h1>
            Welcome back, Rohit
          </h1>

          <p>
            Manage projects, media,
            journals and your website
            from one place.
          </p>

        </div>

      </div>

      {/* =========================
          STATISTICS
      ========================= */}

      <div className="stats-grid">

        <StatCard
          title="Projects"
          value={totalProjects}
          type="projects"
          change={`${publishedProjects} published`}
        />

        <StatCard
          title="Images"
          value={totalImages}
          type="images"
          change="Media Library"
        />

        <StatCard
          title="Journal Posts"
          value={totalJournalPosts}
          type="journal"
          change={`${publishedJournalPosts} published`}
        />

        <StatCard
          title="Published Content"
          value={
            publishedProjects +
            publishedJournalPosts
          }
          type="storage"
          change="Projects + Journal"
        />

      </div>

      {/* =========================
          DASHBOARD CONTENT
      ========================= */}

      <div className="dashboard-grid">

        {/* =========================
            RECENT ACTIVITY
        ========================= */}

        <section className="dashboard-panel">

          <h2>
            Recent Activity
          </h2>

          {!hasRecentActivity ? (

            <div className="empty-state">
              Activity will appear here
              once you start adding
              projects and journal posts.
            </div>

          ) : (

            <div className="dashboard-activity-list">

              {/* RECENT PROJECTS */}

              {recentProjects.map(
                (project) => (

                  <button
                    key={
                      project.id ||
                      project.slug
                    }
                    type="button"
                    className="dashboard-activity-item"
                    onClick={() =>
                      navigate(
                        "/admin/projects"
                      )
                    }
                  >

                    <div>

                      <span className="dashboard-activity-type">
                        PROJECT
                      </span>

                      <h3>
                        {project.title ||
                          "Untitled Project"}
                      </h3>

                      <p>
                        {project.category ||
                          "Photography Project"}
                      </p>

                    </div>

                    <span className="dashboard-activity-status">
                      {project.status ||
                        "Draft"}
                    </span>

                  </button>

                )
              )}

              {/* RECENT JOURNAL POSTS */}

              {recentJournalPosts.map(
                (post) => (

                  <button
                    key={
                      post.id ||
                      post.slug
                    }
                    type="button"
                    className="dashboard-activity-item"
                    onClick={() =>
                      navigate(
                        "/admin/journal"
                      )
                    }
                  >

                    <div>

                      <span className="dashboard-activity-type">
                        JOURNAL
                      </span>

                      <h3>
                        {post.title ||
                          "Untitled Article"}
                      </h3>

                      <p>
                        {post.category ||
                          "Journal Post"}
                      </p>

                    </div>

                    <span className="dashboard-activity-status">
                      {post.status ||
                        "Draft"}
                    </span>

                  </button>

                )
              )}

            </div>

          )}

        </section>

        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <section className="dashboard-panel">

          <h2>
            Quick Actions
          </h2>

          <div className="quick-actions">

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/projects"
                )
              }
            >
              New Project
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/media"
                )
              }
            >
              Upload Images
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/journal"
                )
              }
            >
              New Journal Post
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/homepage"
                )
              }
            >
              Homepage Hero
            </button>

          </div>

        </section>

      </div>

    </div>
  );
}