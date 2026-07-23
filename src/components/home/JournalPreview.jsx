import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  getPublishedPosts,
} from "../../services/journalService";

import "./JournalPreview.css";


/* =========================
   CONSTANTS
========================= */

const fallbackImage =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80";


/* =========================
   JOURNAL PREVIEW
========================= */

export default function JournalPreview() {

  /* =========================
     POSTS
  ========================= */

  const [
    journalPosts,
    setJournalPosts,
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
     LOAD FROM SUPABASE
  ========================= */

  useEffect(() => {

    let isMounted =
      true;


    async function loadPosts() {

      try {

        setIsLoading(
          true
        );


        const posts =
          await getPublishedPosts();


        if (
          isMounted
        ) {

          setJournalPosts(
            Array.isArray(posts)
              ? posts
              : []
          );

        }

      } catch (error) {

        console.error(
          "Failed to load homepage journal posts:",
          error
        );


        if (
          isMounted
        ) {

          setJournalPosts(
            []
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
     FEATURED POSTS
  ========================= */

  const featuredPosts =
    useMemo(() => {

      return journalPosts

        .filter(
          (post) =>
            post &&
            post.featured ===
              true
        )

        .sort(
          (a, b) => {

            const orderA =
              typeof
                a.homepageOrder ===
              "number"
                ? a.homepageOrder
                : Number.MAX_SAFE_INTEGER;


            const orderB =
              typeof
                b.homepageOrder ===
              "number"
                ? b.homepageOrder
                : Number.MAX_SAFE_INTEGER;


            return (
              orderA -
              orderB
            );

          }
        )

        .slice(
          0,
          3
        );

    }, [
      journalPosts,
    ]);


  /* =========================
     LATEST POSTS
  ========================= */

  const latestPosts =
    useMemo(() => {

      return [
        ...journalPosts,
      ]

        .sort(
          (a, b) => {

            const dateA =
              new Date(
                a.createdAt ||
                a.date ||
                0
              ).getTime();


            const dateB =
              new Date(
                b.createdAt ||
                b.date ||
                0
              ).getTime();


            return (
              dateB -
              dateA
            );

          }
        )

        .slice(
          0,
          3
        );

    }, [
      journalPosts,
    ]);


  /* =========================
     HOMEPAGE PREVIEW POSTS
  ========================= */

  const previewPosts =
    featuredPosts.length >
      0
      ? featuredPosts
      : latestPosts;


  /* =========================
     LOADING / EMPTY
  ========================= */

  if (
    isLoading ||
    previewPosts.length ===
      0
  ) {

    return null;

  }


  /* =========================
     FEATURED + SIDE POSTS
  ========================= */

  const mainPost =
    previewPosts[0];


  const sidePosts =
    previewPosts.slice(
      1,
      3
    );


  /* =========================
     FORMAT DATE
  ========================= */

  const formatDate =
    (
      post
    ) => {

      const rawDate =
        post?.date ||
        post?.createdAt;


      if (
        !rawDate
      ) {

        return "";

      }


      try {

        return new Date(
          rawDate
        ).toLocaleDateString(
          "en-IN",
          {
            day:
              "2-digit",

            month:
              "long",

            year:
              "numeric",
          }
        );

      } catch (error) {

        console.error(
          "Failed to format journal date:",
          error
        );


        return "";

      }

    };


  /* =========================
     RENDER
  ========================= */

  return (

    <section className="journal-preview">

      <div className="journal-preview-container">


        {/* =====================
            HEADER
        ===================== */}

        <div className="journal-preview-header">

          <h2>
            Field Notes
          </h2>


          <Link
            to="/journal"
            className="journal-preview-all"
          >

            READ THE JOURNAL

            <span aria-hidden="true">
              ↗
            </span>

          </Link>

        </div>


        {/* =====================
            EDITORIAL LAYOUT
        ===================== */}

        <div className="journal-preview-layout">


          {/* =====================
              MAIN ARTICLE
          ===================== */}

          {mainPost && (

            <article className="journal-preview-featured">

              <Link
                to={
                  mainPost.slug
                    ? `/journal/${mainPost.slug}`
                    : "/journal"
                }
                className="journal-preview-featured-image"
              >

                <img
                  src={
                    mainPost.cover ||
                    fallbackImage
                  }
                  alt={
                    mainPost.title ||
                    "Photography Journal"
                  }
                  loading="lazy"
                />


                {mainPost.category && (

                  <span className="journal-preview-image-category">

                    {
                      mainPost.category
                    }

                  </span>

                )}

              </Link>


              <div className="journal-preview-featured-content">

                {formatDate(
                  mainPost
                ) && (

                  <span className="journal-preview-date">

                    {
                      formatDate(
                        mainPost
                      )
                    }

                  </span>

                )}


                <Link
                  to={
                    mainPost.slug
                      ? `/journal/${mainPost.slug}`
                      : "/journal"
                  }
                  className="journal-preview-title-link"
                >

                  <h3>

                    {
                      mainPost.title ||
                      "Untitled Article"
                    }

                  </h3>

                </Link>


                {mainPost.excerpt && (

                  <p>

                    {
                      mainPost.excerpt
                    }

                  </p>

                )}


                <Link
                  to={
                    mainPost.slug
                      ? `/journal/${mainPost.slug}`
                      : "/journal"
                  }
                  className="journal-preview-read"
                >

                  READ

                  <span aria-hidden="true">
                    ↗
                  </span>

                </Link>

              </div>

            </article>

          )}


          {/* =====================
              SIDE ARTICLES
          ===================== */}

          <div className="journal-preview-side">

            {sidePosts.map(
              (post) => (

                <article
                  className="journal-preview-side-card"
                  key={
                    post.id ||
                    post.slug
                  }
                >

                  <Link
                    to={
                      post.slug
                        ? `/journal/${post.slug}`
                        : "/journal"
                    }
                    className="journal-preview-side-image"
                  >

                    <img
                      src={
                        post.cover ||
                        fallbackImage
                      }
                      alt={
                        post.title ||
                        "Photography Journal"
                      }
                      loading="lazy"
                    />

                  </Link>


                  <div className="journal-preview-side-content">

                    {post.category && (

                      <span className="journal-preview-category">

                        {
                          post.category
                        }

                      </span>

                    )}


                    <Link
                      to={
                        post.slug
                          ? `/journal/${post.slug}`
                          : "/journal"
                      }
                      className="journal-preview-title-link"
                    >

                      <h3>

                        {
                          post.title ||
                          "Untitled Article"
                        }

                      </h3>

                    </Link>


                    {formatDate(
                      post
                    ) && (

                      <span className="journal-preview-date">

                        {
                          formatDate(
                            post
                          )
                        }

                      </span>

                    )}


                    {post.excerpt && (

                      <p>

                        {
                          post.excerpt
                        }

                      </p>

                    )}


                    <Link
                      to={
                        post.slug
                          ? `/journal/${post.slug}`
                          : "/journal"
                      }
                      className="journal-preview-read"
                    >

                      READ

                      <span aria-hidden="true">
                        ↗
                      </span>

                    </Link>

                  </div>

                </article>

              )
            )}

          </div>

        </div>

      </div>

    </section>

  );

}