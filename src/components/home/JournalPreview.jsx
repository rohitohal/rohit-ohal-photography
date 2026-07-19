import { Link } from "react-router-dom";

import "./JournalPreview.css";

export default function JournalPreview() {
  /* =========================
     LOAD CMS JOURNAL POSTS
  ========================= */

  let journalPosts = [];

  try {
    const savedPosts =
      localStorage.getItem(
        "rohit-photography-journal"
      );

    if (savedPosts) {
      const parsedPosts =
        JSON.parse(savedPosts);

      if (Array.isArray(parsedPosts)) {
        journalPosts = parsedPosts;
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
        post.status ===
        "Published"
    );


  /* =========================
     GET FEATURED POSTS
  ========================= */

  const featuredPosts =
    publishedPosts

      /* Only homepage featured posts */

      .filter(
        (post) =>
          post.featured === true
      )

      /* Sort by homepage order */

      .sort((a, b) => {
        const orderA =
          typeof a.homepageOrder ===
          "number"
            ? a.homepageOrder
            : Number.MAX_SAFE_INTEGER;

        const orderB =
          typeof b.homepageOrder ===
          "number"
            ? b.homepageOrder
            : Number.MAX_SAFE_INTEGER;

        return (
          orderA -
          orderB
        );
      })

      /* Maximum 3 homepage posts */

      .slice(0, 3);


  /* =========================
     FALLBACK LATEST POSTS
  ========================= */

  /*
   * If no journal posts are
   * selected for the homepage,
   * show the first 3 published
   * posts instead.
   */

  const previewPosts =
    featuredPosts.length > 0
      ? featuredPosts
      : publishedPosts.slice(
          0,
          3
        );


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
            (post) => (

              <article
                className="journal-card"
                key={
                  post.id ||
                  post.slug
                }
              >


                {/* COVER IMAGE */}

                {post.cover && (

                  <img
                    src={
                      post.cover
                    }
                    alt={
                      post.title ||
                      "Journal Article"
                    }
                    loading="lazy"
                  />

                )}


                {/* CONTENT */}

                <div className="journal-content">

                  {post.category && (

                    <span>
                      {
                        post.category
                      }
                    </span>

                  )}


                  <h3>
                    {
                      post.title
                    }
                  </h3>


                  {post.slug && (

                    <Link
                      to={`/journal/${post.slug}`}
                    >
                      Read Article →
                    </Link>

                  )}

                </div>

              </article>

            )
          )}

        </div>


        {/* =========================
            VIEW ALL
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