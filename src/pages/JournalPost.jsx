import { useParams } from "react-router-dom";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";

import "./Project.css";

export default function JournalPost() {
  const { slug } = useParams();

  /* =========================
     LOAD JOURNAL POSTS
  ========================= */

  let posts = [];

  try {
    const savedPosts =
      localStorage.getItem(
        "rohit-photography-journal"
      );

    if (savedPosts) {
      const parsedPosts =
        JSON.parse(savedPosts);

      if (Array.isArray(parsedPosts)) {
        posts = parsedPosts;
      }
    }
  } catch (error) {
    console.error(
      "Failed to load journal posts:",
      error
    );
  }

  /* =========================
     FIND PUBLISHED ARTICLE
  ========================= */

  const post = posts.find(
    (item) =>
      item.slug === slug &&
      item.status === "Published"
  );

  /* =========================
     ARTICLE NOT FOUND
  ========================= */

  if (!post) {
    return (
      <>
        <SEOHead
          title="Article Not Found | Rohit Ohal Photography"
          description="The journal article you are looking for could not be found."
        />

        <div className="project-not-found">
          <h1>
            Article not found
          </h1>
        </div>
      </>
    );
  }

  /* =========================
     DYNAMIC SEO
  ========================= */

  const seoTitle =
    `${post.title} | Rohit Ohal Photography`;

  const seoDescription =
    post.excerpt ||
    post.content
      ?.replace(/\n/g, " ")
      .slice(0, 160) ||
    "Read the latest photography stories, insights and behind-the-scenes articles from Rohit Ohal Photography.";

  /* =========================
     FORMAT ARTICLE CONTENT
  ========================= */

  const contentBlocks =
    post.content
      ?.split(/\n\s*\n/)
      .map((block) =>
        block.trim()
      )
      .filter(Boolean) || [];

  /* =========================
     RENDER CONTENT BLOCK
  ========================= */

  const renderContentBlock = (
    block,
    index
  ) => {
    /*
     * Heading format:
     *
     * ## Heading
     */

    if (
      block.startsWith(
        "## "
      )
    ) {
      return (
        <h2
          key={index}
          style={{
            marginTop:
              "48px",
            marginBottom:
              "18px",
          }}
        >
          {block.replace(
            /^##\s+/,
            ""
          )}
        </h2>
      );
    }

    /*
     * Subheading format:
     *
     * ### Subheading
     */

    if (
      block.startsWith(
        "### "
      )
    ) {
      return (
        <h3
          key={index}
          style={{
            marginTop:
              "36px",
            marginBottom:
              "14px",
          }}
        >
          {block.replace(
            /^###\s+/,
            ""
          )}
        </h3>
      );
    }

    /*
     * Normal paragraph
     */

    return (
      <p
        key={index}
        style={{
          whiteSpace:
            "pre-line",
        }}
      >
        {block}
      </p>
    );
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <>
      {/* =========================
          SEO
      ========================= */}

      <SEOHead
        title={
          seoTitle
        }
        description={
          seoDescription
        }
        image={
          post.cover
        }
      />

      {/* =========================
          HERO
      ========================= */}

      <PageHero
        title={
          post.title
        }
        subtitle={
          post.category
        }
        image={
          post.cover
        }
      />

      {/* =========================
          ARTICLE
      ========================= */}

      <section className="project-page">

        <div className="project-container">

          <article className="project-story">

            {/* ARTICLE TITLE */}

            <h1
              style={{
                marginBottom:
                  "24px",
              }}
            >
              {
                post.title
              }
            </h1>


            {/* CATEGORY */}

            {post.category && (

              <span
                style={{
                  display:
                    "inline-block",

                  marginBottom:
                    "24px",

                  color:
                    "#b58b43",

                  fontSize:
                    "12px",

                  letterSpacing:
                    "1.5px",

                  textTransform:
                    "uppercase",
                }}
              >
                {
                  post.category
                }
              </span>

            )}


            {/* EXCERPT */}

            {post.excerpt && (

              <p
                style={{
                  fontSize:
                    "20px",

                  lineHeight:
                    "1.7",

                  color:
                    "#555",

                  marginBottom:
                    "40px",
                }}
              >
                {
                  post.excerpt
                }
              </p>

            )}


            {/* ARTICLE CONTENT */}

            {contentBlocks.length >
            0 ? (

              <div
                className="journal-article-content"
                style={{
                  lineHeight:
                    "1.9",
                }}
              >

                {contentBlocks.map(
                  (
                    block,
                    index
                  ) =>
                    renderContentBlock(
                      block,
                      index
                    )
                )}

              </div>

            ) : (

              <p>
                Article content
                coming soon.
              </p>

            )}

          </article>

        </div>

      </section>
    </>
  );
}