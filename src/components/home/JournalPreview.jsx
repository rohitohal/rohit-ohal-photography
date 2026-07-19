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

      /* Only featured posts */

      .filter(
        (post) =>
          post.featured ===
          true
      )

      /* Homepage custom order */

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

      /* Maximum 3 */

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

  /*
   * If featured posts exist,
   * use the custom featured
   * homepage order.
   *
   * Otherwise show the latest
   * 3 published articles.
   */

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
     RENDER
  ========================= */

  return (
    <section className="journal-preview">

      <div className="journal-container">


        {/* =========================
            HEADER
        ========================= */}

        <div className="journal-header">

          <span>
            FROM THE JOURNAL
          </span>

          <h2>
            Stories Beyond
            <br />
            The Camera
          </h2>

        </div>


        {/* =========================
            JOURNAL POSTS
        ========================= */}

        <div className="journal-grid">

          {previewPosts.map(
            (post) => {

              const coverImage =
                post.cover ||
                fallbackImage;

              return (

                <article
                  className="journal-card"
                  key={
                    post.id ||
                    post.slug
                  }
                >


                  {/* =========================
                      COVER IMAGE
                  ========================= */}

                  <img
                    src={
                      coverImage
                    }
                    alt={
                      post.title ||
                      "Photography Journal"
                    }
                    loading="lazy"
                  />


                  {/* =========================
                      CONTENT
                  ========================= */}

                  <div className="journal-content">


                    {/* CATEGORY */}

                    {post.category && (

                      <span>
                        {
                          post.category
                        }
                      </span>

                    )}


                    {/* TITLE */}

                    <h3>
                      {
                        post.title ||
                        "Untitled Article"
                      }
                    </h3>


                    {/* ARTICLE LINK */}

                    {post.slug && (

                      <Link
                        to={`/journal/${post.slug}`}
                      >
                        Read Article →
                      </Link>

                    )}

                  </div>

                </article>

              );
            }
          )}

        </div>


        {/* =========================
            VIEW ALL ARTICLES
        ========================= */}

        <div className="journal-footer">

          <Link
            to="/journal"
            className="journal-view-all"
          >
            View All Articles →
          </Link>

        </div>

      </div>

    </section>
  );
}