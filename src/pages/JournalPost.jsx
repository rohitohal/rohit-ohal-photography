import {
  Link,
  useParams,
} from "react-router-dom";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";

import "./Project.css";

export default function JournalPost() {
  const { slug } =
    useParams();


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

      if (
        Array.isArray(
          parsedPosts
        )
      ) {
        posts =
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
     FIND PUBLISHED ARTICLE
  ========================= */

  const post =
    posts.find(
      (item) =>
        item.slug ===
          slug &&
        item.status ===
          "Published"
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


        <section className="project-page">

          <div className="project-container">

            <div
              className="project-story"
              style={{
                textAlign:
                  "center",

                paddingTop:
                  "120px",

                paddingBottom:
                  "120px",
              }}
            >

              <h1>
                Article Not Found
              </h1>

              <p>
                The article may have
                been removed or is no
                longer published.
              </p>


              <Link
                to="/journal"
                style={{
                  display:
                    "inline-block",

                  marginTop:
                    "30px",

                  textDecoration:
                    "none",

                  color:
                    "#b58b43",

                  fontWeight:
                    "500",
                }}
              >
                ← Back to Journal
              </Link>

            </div>

          </div>

        </section>

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
      ?.replace(
        /\s+/g,
        " "
      )
      .slice(
        0,
        160
      ) ||
    "Read photography stories, insights and behind-the-scenes articles from Rohit Ohal Photography.";


  /* =========================
     FORMAT ARTICLE CONTENT
  ========================= */

  const contentParagraphs =
    post.content
      ? post.content
          .split(
            /\n\s*\n/
          )
          .map(
            (paragraph) =>
              paragraph.trim()
          )
          .filter(
            Boolean
          )
      : [];


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
          post.category ||
          "Journal"
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


            {/* CATEGORY */}

            {post.category && (

              <span
                style={{
                  display:
                    "block",

                  marginBottom:
                    "16px",

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


            {/* TITLE */}

            <h2>
              {
                post.title
              }
            </h2>


            {/* EXCERPT */}

            {post.excerpt && (

              <p
                style={{
                  fontSize:
                    "20px",

                  lineHeight:
                    "1.7",

                  marginBottom:
                    "40px",

                  color:
                    "#555",
                }}
              >
                {
                  post.excerpt
                }
              </p>

            )}


            {/* ARTICLE CONTENT */}

            {contentParagraphs.length >
            0 ? (

              <div>

                {contentParagraphs.map(
                  (
                    paragraph,
                    index
                  ) => (

                    <p
                      key={
                        index
                      }
                      style={{
                        marginBottom:
                          "24px",

                        lineHeight:
                          "1.8",
                      }}
                    >
                      {
                        paragraph
                      }
                    </p>

                  )
                )}

              </div>

            ) : (

              <p>
                Article content
                coming soon.
              </p>

            )}


            {/* =========================
                BACK TO JOURNAL
            ========================= */}

            <div
              style={{
                marginTop:
                  "60px",

                paddingTop:
                  "30px",

                borderTop:
                  "1px solid #ece8df",
              }}
            >

              <Link
                to="/journal"
                style={{
                  textDecoration:
                    "none",

                  color:
                    "#b58b43",

                  fontWeight:
                    "500",
                }}
              >
                ← Back to Journal
              </Link>

            </div>

          </article>

        </div>

      </section>

    </>
  );
}