import { Link } from "react-router-dom";

import "./JournalPreview.css";


/* =========================
   CONSTANTS
========================= */

const JOURNAL_KEY =
  "rohit-photography-journal";

const fallbackImage =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80";


export default function JournalPreview() {
  /* =========================
     LOAD CMS JOURNAL POSTS
  ========================= */

  let journalPosts = [];

  try {
    const savedPosts =
      localStorage.getItem(
        JOURNAL_KEY
      );

    if (savedPosts) {
      const parsedPosts =
        JSON.parse(
          savedPosts
        );

      if (
        Array.isArray(
          parsedPosts
        )
      ) {
        journalPosts =
          parsedPosts;
      }
    }
  } catch (error) {
    console.error(
      "Failed to load journal posts:",
      error
    );
  }


  /* =========================
     GET PUBLISHED POSTS
  ========================= */

  const publishedPosts =
    journalPosts.filter(
      (post) =>
        post &&
        post.status ===
          "Published"
    );


  /* =========================
     GET FEATURED POSTS
  ========================= */

  const featuredPosts =
    publishedPosts

      .filter(
        (post) =>
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


  /* =========================
     GET LATEST POSTS
  ========================= */

  const latestPosts =
    [...publishedPosts]

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


  /* =========================
     HOMEPAGE PREVIEW POSTS
  ========================= */

  const previewPosts =
    featuredPosts.length >
    0
      ? featuredPosts
      : latestPosts;


  /* =========================
     HIDE SECTION IF EMPTY
  ========================= */

  if (
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

  const formatDate = (
    post
  ) => {

    const rawDate =
      post?.date ||
      post?.createdAt;

    if (!rawDate) {
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

      return rawDate;
    }
  };


  /* =========================
     RENDER
  ========================= */

  return (
    <section className="journal-preview">

      <div className="journal-preview-container">


        {/* =========================
            HEADER
        ========================= */}

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


        {/* =========================
            EDITORIAL LAYOUT
        ========================= */}

        <div className="journal-preview-layout">


          {/* =========================
              MAIN FEATURED ARTICLE
          ========================= */}

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


          {/* =========================
              SIDE ARTICLES
          ========================= */}

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


                  {/* IMAGE */}

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


                  {/* CONTENT */}

                  <div className="journal-preview-side-content">


                    {/* CATEGORY */}

                    {post.category && (

                      <span className="journal-preview-category">
                        {
                          post.category
                        }
                      </span>

                    )}


                    {/* TITLE */}

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


                    {/* DATE */}

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


                    {/* EXCERPT */}

                    {post.excerpt && (

                      <p>
                        {
                          post.excerpt
                        }
                      </p>

                    )}


                    {/* READ */}

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