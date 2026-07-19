import {
  useEffect,
  useState,
} from "react";

import CreateJournalModal from "../components/CreateJournalModal/CreateJournalModal";

import "../styles/projects.css";

const JOURNAL_KEY =
  "rohit-photography-journal";

export default function Journal() {
  /* =========================
     LOAD JOURNAL POSTS
  ========================= */

  const [posts, setPosts] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            JOURNAL_KEY
          );

        if (!saved) {
          return [];
        }

        const parsed =
          JSON.parse(saved);

        return Array.isArray(parsed)
          ? parsed
          : [];
      } catch (error) {
        console.error(
          "Failed to load journal posts:",
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
    editingPost,
    setEditingPost,
  ] = useState(null);


  /* =========================
     SAVE JOURNAL POSTS
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      JOURNAL_KEY,
      JSON.stringify(posts)
    );
  }, [posts]);


  /* =========================
     CREATE / UPDATE ARTICLE
  ========================= */

  const handleSavePost = (
    postData
  ) => {
    /* =========================
       EDIT EXISTING ARTICLE
    ========================= */

    if (editingPost) {
      setPosts((prev) =>
        prev.map((post) =>
          post.id ===
          editingPost.id
            ? {
                /*
                 * Keep existing fields.
                 *
                 * This preserves:
                 * homepageOrder
                 * createdAt
                 * featured
                 * future metadata
                 */

                ...post,

                /*
                 * Apply edited fields.
                 */

                ...postData,

                /*
                 * Never change ID.
                 */

                id:
                  editingPost.id,

                /*
                 * Track update date.
                 */

                updatedAt:
                  new Date()
                    .toISOString(),
              }
            : post
        )
      );
    }

    /* =========================
       CREATE NEW ARTICLE
    ========================= */

    else {
      const now =
        new Date()
          .toISOString();

      const newPost = {
        ...postData,

        id:
          Date.now(),

        createdAt:
          now,

        updatedAt:
          now,
      };

      setPosts((prev) => [
        newPost,
        ...prev,
      ]);
    }


    /* =========================
       CLOSE MODAL
    ========================= */

    setEditingPost(null);

    setIsModalOpen(false);
  };


  /* =========================
     OPEN NEW ARTICLE
  ========================= */

  const handleNewArticle = () => {
    setEditingPost(null);

    setIsModalOpen(true);
  };


  /* =========================
     EDIT ARTICLE
  ========================= */

  const handleEdit = (
    post
  ) => {
    setEditingPost(post);

    setIsModalOpen(true);
  };


  /* =========================
     DELETE ARTICLE
  ========================= */

  const handleDelete = (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this article?"
      );

    if (!confirmed) {
      return;
    }

    setPosts((prev) =>
      prev.filter(
        (post) =>
          post.id !== id
      )
    );
  };


  /* =========================
     CLOSE MODAL
  ========================= */

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setEditingPost(null);
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
              JOURNAL MANAGEMENT
            </span>

            <h1>
              Manage Journal
            </h1>

            <p>
              Create stories,
              articles and behind
              the scenes content
              for your website.
            </p>

          </div>


          <button
            type="button"
            className="new-project-button"
            onClick={
              handleNewArticle
            }
          >
            + New Article
          </button>

        </div>


        {/* =========================
            JOURNAL GRID
        ========================= */}

        <div className="projects-grid">

          {posts.map(
            (post) => (

              <div
                key={
                  post.id ||
                  post.slug
                }
                className="project-card"
              >

                {/* =========================
                    COVER IMAGE
                ========================= */}

                {post.cover ? (

                  <img
                    src={
                      post.cover
                    }
                    alt={
                      post.title ||
                      "Journal Article"
                    }
                  />

                ) : (

                  <div
                    style={{
                      width:
                        "100%",

                      height:
                        "220px",

                      display:
                        "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      background:
                        "#f3f1ec",

                      color:
                        "#999",
                    }}
                  >
                    No Cover Image
                  </div>

                )}


                {/* =========================
                    ARTICLE CONTENT
                ========================= */}

                <div className="project-content">

                  <span className="project-category">
                    {
                      post.category ||
                      "Journal"
                    }
                  </span>


                  <h3>
                    {
                      post.title ||
                      "Untitled Article"
                    }
                  </h3>


                  {post.excerpt && (

                    <p>
                      {
                        post.excerpt
                      }
                    </p>

                  )}


                  {/* =========================
                      ARTICLE STATUS
                  ========================= */}

                  <div
                    style={{
                      marginTop:
                        "12px",

                      marginBottom:
                        "15px",
                    }}
                  >

                    <span
                      className={`status ${
                        (
                          post.status ||
                          "Draft"
                        ).toLowerCase()
                      }`}
                    >
                      {
                        post.status ||
                        "Draft"
                      }
                    </span>

                  </div>


                  {/* =========================
                      HOMEPAGE FEATURED
                  ========================= */}

                  {post.featured ===
                    true && (

                    <div
                      style={{
                        marginBottom:
                          "15px",

                        color:
                          "#b58b43",

                        fontSize:
                          "12px",

                        fontWeight:
                          "600",

                        letterSpacing:
                          "0.5px",
                      }}
                    >
                      ★ HOMEPAGE FEATURED
                    </div>

                  )}


                  {/* =========================
                      FOOTER
                  ========================= */}

                  <div className="project-footer">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(
                          post
                        )
                      }
                    >
                      Edit
                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          post.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            )
          )}


          {/* =========================
              EMPTY STATE
          ========================= */}

          {posts.length ===
            0 && (

            <div
              style={{
                width:
                  "100%",

                background:
                  "#fff",

                padding:
                  "80px",

                borderRadius:
                  "24px",

                textAlign:
                  "center",
              }}
            >

              <h2>
                No Articles Yet
              </h2>

              <p>
                Create your first
                journal article.
              </p>

            </div>

          )}

        </div>

      </div>


      {/* =========================
          CREATE / EDIT MODAL
      ========================= */}

      <CreateJournalModal
        isOpen={
          isModalOpen
        }
        onClose={
          handleCloseModal
        }
        onSave={
          handleSavePost
        }
        initialData={
          editingPost
        }
      />

    </>
  );
}