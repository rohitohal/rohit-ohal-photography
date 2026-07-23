import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import StatCard from
  "../components/StatCard/StatCard";

import {
  getAllProjects,
} from "../../services/projectService";

import {
  getAllPosts,
} from "../../services/journalService";

import {
  getAllMedia,
} from "../../services/mediaService";

import "../styles/dashboard.css";


/* =========================
   DASHBOARD
========================= */

export default function Dashboard() {

  const navigate =
    useNavigate();


  /* =========================
     PROJECTS
     SUPABASE
  ========================= */

  const [
    projects,
    setProjects,
  ] =
    useState([]);


  const [
    isProjectsLoading,
    setIsProjectsLoading,
  ] =
    useState(true);


  /* =========================
     MEDIA
     SUPABASE METADATA

     Actual image files remain
     stored in Cloudinary.
  ========================= */

  const [
    media,
    setMedia,
  ] =
    useState([]);


  const [
    isMediaLoading,
    setIsMediaLoading,
  ] =
    useState(true);


  /* =========================
     JOURNAL
     SUPABASE
  ========================= */

  const [
    journalPosts,
    setJournalPosts,
  ] =
    useState([]);


  const [
    isJournalLoading,
    setIsJournalLoading,
  ] =
    useState(true);


  /* =========================
     LOAD PROJECTS
  ========================= */

  useEffect(() => {

    let isMounted =
      true;


    async function loadProjects() {

      try {

        setIsProjectsLoading(
          true
        );


        const projectData =
          await getAllProjects();


        if (!isMounted) {
          return;
        }


        setProjects(
          Array.isArray(
            projectData
          )
            ? projectData
            : []
        );


      } catch (error) {

        console.error(
          "Failed to load Dashboard projects:",
          error
        );


        if (isMounted) {

          setProjects(
            []
          );

        }


      } finally {

        if (isMounted) {

          setIsProjectsLoading(
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
     LOAD MEDIA
     FROM SUPABASE
  ========================= */

  useEffect(() => {

    let isMounted =
      true;


    async function loadMedia() {

      try {

        setIsMediaLoading(
          true
        );


        const mediaData =
          await getAllMedia();


        if (!isMounted) {
          return;
        }


        setMedia(
          Array.isArray(
            mediaData
          )
            ? mediaData
            : []
        );


      } catch (error) {

        console.error(
          "Failed to load Dashboard media:",
          error
        );


        if (isMounted) {

          setMedia(
            []
          );

        }


      } finally {

        if (isMounted) {

          setIsMediaLoading(
            false
          );

        }

      }

    }


    loadMedia();


    return () => {

      isMounted =
        false;

    };

  }, []);


  /* =========================
     LOAD JOURNAL
  ========================= */

  useEffect(() => {

    let isMounted =
      true;


    async function loadJournal() {

      try {

        setIsJournalLoading(
          true
        );


        const posts =
          await getAllPosts();


        if (!isMounted) {
          return;
        }


        setJournalPosts(
          Array.isArray(
            posts
          )
            ? posts
            : []
        );


      } catch (error) {

        console.error(
          "Failed to load Dashboard Journal posts:",
          error
        );


        if (isMounted) {

          setJournalPosts(
            []
          );

        }


      } finally {

        if (isMounted) {

          setIsJournalLoading(
            false
          );

        }

      }

    }


    loadJournal();


    return () => {

      isMounted =
        false;

    };

  }, []);


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
      (
        project
      ) =>
        project.status ===
        "Published"
    ).length;


  const publishedJournalPosts =
    journalPosts.filter(
      (
        post
      ) =>
        post.status ===
        "Published"
    ).length;


  /* =========================
     RECENT PROJECTS
  ========================= */

  const recentProjects =
    projects.slice(
      0,
      3
    );


  /* =========================
     RECENT JOURNAL
  ========================= */

  const recentJournalPosts =
    journalPosts.slice(
      0,
      3
    );


  const isContentLoading =
    isProjectsLoading ||
    isJournalLoading;


  const hasRecentActivity =
    recentProjects.length >
      0 ||
    recentJournalPosts.length >
      0;


  /* =========================
     RENDER
  ========================= */

  return (

    <div className="dashboard-page">


      {/* =====================
          HEADER
      ===================== */}

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


      {/* =====================
          STATISTICS
      ===================== */}

      <div className="stats-grid">

        <StatCard
          title="Projects"
          value={
            isProjectsLoading
              ? "..."
              : totalProjects
          }
          type="projects"
          change={
            isProjectsLoading
              ? "Loading..."
              : `${publishedProjects} published`
          }
        />


        <StatCard
          title="Images"
          value={
            isMediaLoading
              ? "..."
              : totalImages
          }
          type="images"
          change={
            isMediaLoading
              ? "Loading..."
              : "Media Library"
          }
        />


        <StatCard
          title="Journal Posts"
          value={
            isJournalLoading
              ? "..."
              : totalJournalPosts
          }
          type="journal"
          change={
            isJournalLoading
              ? "Loading..."
              : `${publishedJournalPosts} published`
          }
        />


        <StatCard
          title="Published Content"
          value={
            isContentLoading
              ? "..."
              : publishedProjects +
                publishedJournalPosts
          }
          type="storage"
          change="Projects + Journal"
        />

      </div>


      {/* =====================
          DASHBOARD CONTENT
      ===================== */}

      <div className="dashboard-grid">


        {/* =====================
            RECENT ACTIVITY
        ===================== */}

        <section className="dashboard-panel">

          <h2>
            Recent Activity
          </h2>


          {isContentLoading &&
          !hasRecentActivity ? (

            <div className="empty-state">

              Loading recent activity...

            </div>

          ) : !hasRecentActivity ? (

            <div className="empty-state">

              Activity will appear here
              once you start adding
              projects and journal posts.

            </div>

          ) : (

            <div className="dashboard-activity-list">


              {/* =====================
                  RECENT PROJECTS
              ===================== */}

              {recentProjects.map(
                (
                  project
                ) => (

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

                        {
                          project.title ||
                          "Untitled Project"
                        }

                      </h3>


                      <p>

                        {
                          project.category ||
                          "Photography Project"
                        }

                      </p>

                    </div>


                    <span className="dashboard-activity-status">

                      {
                        project.status ||
                        "Draft"
                      }

                    </span>

                  </button>

                )
              )}


              {/* =====================
                  RECENT JOURNAL
              ===================== */}

              {recentJournalPosts.map(
                (
                  post
                ) => (

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

                        {
                          post.title ||
                          "Untitled Article"
                        }

                      </h3>


                      <p>

                        {
                          post.category ||
                          "Journal Post"
                        }

                      </p>

                    </div>


                    <span className="dashboard-activity-status">

                      {
                        post.status ||
                        "Draft"
                      }

                    </span>

                  </button>

                )
              )}

            </div>

          )}

        </section>


        {/* =====================
            QUICK ACTIONS
        ===================== */}

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