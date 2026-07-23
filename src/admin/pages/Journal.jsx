import {
  useEffect,
  useState,
} from "react";

import CreateJournalModal from
  "../components/CreateJournalModal/CreateJournalModal";

import JournalSettings from
  "../components/JournalSettings/JournalSettings";

import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../../services/journalService";

import "../styles/projects.css";


/* =========================
   JOURNAL ADMIN
========================= */

export default function Journal() {

  /* =========================
     POSTS
  ========================= */

  const [
    posts,
    setPosts,
  ] =
    useState([]);


  /* =========================
     LOADING
  ========================= */

  const [
    isLoading,
    setIsLoading,
  ] =
    useState(true);


  /* =========================
     ERROR
  ========================= */

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState("");


  /* =========================
     SAVING
  ========================= */

  const [
    isSaving,
    setIsSaving,
  ] =
    useState(false);


  /* =========================
     MODAL
  ========================= */

  const [
    isModalOpen,
    setIsModalOpen,
  ] =
    useState(false);


  const [
    editingPost,
    setEditingPost,
  ] =
    useState(null);


  /* =========================
     LOAD POSTS FROM SUPABASE
  ========================= */

  useEffect(() => {

    let isMounted =
      true;


    async function loadPosts() {

      try {

        setIsLoading(
          true
        );


        setErrorMessage(
          ""
        );


        const journalPosts =
          await getAllPosts();


        if (
          isMounted
        ) {

          setPosts(
            journalPosts
          );

        }

      } catch (
        error
      ) {

        console.error(
          "Failed to load Admin Journal:",
          error
        );


        if (
          isMounted
        ) {

          setErrorMessage(
            "Unable to load journal articles from Supabase."
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


    loadPosts();


    return () => {

      isMounted =
        false;

    };

  }, []);


  /* =========================
     CREATE / UPDATE ARTICLE
  ========================= */

  const handleSavePost =
    async (
      postData
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
           UPDATE
        ===================== */

        if (
          editingPost
        ) {

          const updatedPost =
            await updatePost(
              editingPost.id,
              {
                ...editingPost,
                ...postData,
              }
            );


          setPosts(
            (
              previousPosts
            ) =>
              previousPosts.map(
                (
                  post
                ) =>
                  post.id ===
                  updatedPost.id
                    ? updatedPost
                    : post
              )
          );

        }


        /* =====================
           CREATE
        ===================== */

        else {

          const newPost =
            await createPost(
              postData
            );


          setPosts(
            (
              previousPosts
            ) => [

              newPost,

              ...previousPosts,

            ]
          );

        }


        /* =====================
           CLOSE MODAL
        ===================== */

        setEditingPost(
          null
        );


        setIsModalOpen(
          false
        );

      } catch (
        error
      ) {

        console.error(
          "Failed to save journal article:",
          error
        );


        /*
         * PostgreSQL unique constraint
         * error.
         */

        if (
          error?.code ===
          "23505"
        ) {

          setErrorMessage(
            "An article with this slug already exists. Please use a different slug."
          );

        } else {

          setErrorMessage(
            error?.message ||
            "Unable to save the journal article."
          );

        }

      } finally {

        setIsSaving(
          false
        );

      }

    };


  /* =========================
     NEW ARTICLE
  ========================= */

  const handleNewArticle =
    () => {

      setErrorMessage(
        ""
      );


      setEditingPost(
        null
      );


      setIsModalOpen(
        true
      );

    };


  /* =========================
     EDIT ARTICLE
  ========================= */

  const handleEdit =
    (
      post
    ) => {

      setErrorMessage(
        ""
      );


      setEditingPost(
        post
      );


      setIsModalOpen(
        true
      );

    };


  /* =========================
     DELETE ARTICLE
  ========================= */

  const handleDelete =
    async (
      id
    ) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this article?"
        );


      if (
        !confirmed
      ) {

        return;

      }


      try {

        setErrorMessage(
          ""
        );


        await deletePost(
          id
        );


        setPosts(
          (
            previousPosts
          ) =>
            previousPosts.filter(
              (
                post
              ) =>
                post.id !==
                id
            )
        );

      } catch (
        error
      ) {

        console.error(
          "Failed to delete journal article:",
          error
        );


        setErrorMessage(
          error?.message ||
          "Unable to delete the journal article."
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


      setIsModalOpen(
        false
      );


      setEditingPost(
        null
      );

    };


  /* =========================
     RENDER
  ========================= */

  return (

    <>

      <div className="projects-page">


        {/* =====================
            JOURNAL SETTINGS
        ===================== */}

        <div
          style={{
            marginBottom:
              "50px",
          }}
        >

          <JournalSettings />

        </div>


        {/* =====================
            HEADER
        ===================== */}

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
            disabled={
              isLoading ||
              isSaving
            }
          >

            + New Article

          </button>

        </div>


        {/* =====================
            ERROR
        ===================== */}

        {errorMessage && (

          <div
            style={{
              marginBottom:
                "30px",

              padding:
                "16px 20px",

              background:
                "#fff3f3",

              borderRadius:
                "10px",

              color:
                "#a33",
            }}
          >

            {
              errorMessage
            }

          </div>

        )}


        {/* =====================
            LOADING
        ===================== */}

        {isLoading ? (

          <div
            style={{
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
              Loading Journal
            </h2>


            <p>
              Loading articles from Supabase...
            </p>

          </div>

        ) : (


          /* =====================
             JOURNAL GRID
          ===================== */

          <div className="projects-grid">

            {posts.map(
              (
                post
              ) => (

                <div
                  key={
                    post.id ||
                    post.slug
                  }
                  className="project-card"
                >


                  {/* COVER */}

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


                  {/* CONTENT */}

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


                    {/* STATUS */}

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


                    {/* FEATURED */}

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


                    {/* FOOTER */}

                    <div className="project-footer">

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(
                            post
                          )
                        }
                        disabled={
                          isSaving
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
                        disabled={
                          isSaving
                        }
                      >

                        Delete

                      </button>

                    </div>

                  </div>

                </div>

              )
            )}


            {/* EMPTY STATE */}

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

        )}

      </div>


      {/* =====================
          CREATE / EDIT MODAL
      ===================== */}

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