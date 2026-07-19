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
              "numeric",

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
    <Link
      to={
        articleUrl
      }
      className="journal-card"
    >

      {/* =========================
          IMAGE
      ========================= */}

      <div className="journal-image">

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

      </div>


      {/* =========================
          CONTENT
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

        <h3>

          {
            post.title ||
            "Untitled Article"
          }

        </h3>


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

    </Link>
  );
}