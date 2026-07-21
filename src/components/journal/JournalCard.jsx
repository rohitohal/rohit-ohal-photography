import { Link } from "react-router-dom";

import "./JournalCard.css";


/* =========================
   FALLBACK IMAGE
========================= */

const fallbackImage =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80";


export default function JournalCard({
  post,
}) {
  /* =========================
     SAFETY CHECK
  ========================= */

  if (!post) {
    return null;
  }


  /* =========================
     ARTICLE IMAGE
  ========================= */

  const coverImage =
    post.cover ||
    fallbackImage;


  /* =========================
     ARTICLE DATE
  ========================= */

  const rawDate =
    post.date ||
    post.createdAt;


  let formattedDate = "";


  if (rawDate) {
    try {
      formattedDate =
        new Date(
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

      formattedDate =
        rawDate;
    }
  }


  /* =========================
     ARTICLE LINK
  ========================= */

  const articleUrl =
    post.slug
      ? `/journal/${post.slug}`
      : "/journal";


  /* =========================
     RENDER
  ========================= */

  return (
    <article className="journal-card">

      {/* =========================
          IMAGE COLUMN
      ========================= */}

      <div className="journal-card-media">

        <Link
          to={
            articleUrl
          }
          className="journal-image"
          aria-label={
            `Read ${
              post.title ||
              "journal article"
            }`
          }
        >

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

        </Link>


        {/* =========================
            READ LINK
        ========================= */}

        <Link
          to={
            articleUrl
          }
          className="journal-read"
        >
          READ
          <span aria-hidden="true">
            ↗
          </span>
        </Link>

      </div>


      {/* =========================
          ARTICLE CONTENT
      ========================= */}

      <div className="journal-content">


        {/* CATEGORY */}

        {post.category && (

          <span className="journal-category">

            {
              post.category
            }

          </span>

        )}


        {/* TITLE */}

        <Link
          to={
            articleUrl
          }
          className="journal-title-link"
        >

          <h3>

            {
              post.title ||
              "Untitled Article"
            }

          </h3>

        </Link>


        {/* EXCERPT */}

        {post.excerpt && (

          <p>

            {
              post.excerpt
            }

          </p>

        )}


        {/* DATE */}

        {formattedDate && (

          <small>

            {
              formattedDate
            }

          </small>

        )}

      </div>

    </article>
  );
}