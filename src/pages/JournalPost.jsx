import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import SEOHead from
  "../components/common/SEOHead";

import StructuredData from
  "../components/common/StructuredData";

import PageHero from
  "../components/common/PageHero";

import {
  getPublishedPostBySlug,
} from "../services/journalService";

import "./Project.css";


/* ==========================================
   SITE
========================================== */

const SITE_URL =
  "https://rohitohal.com";


/* ==========================================
   JOURNAL POST
========================================== */

export default function JournalPost() {

  const {
    slug,
  } =
    useParams();


  /* ========================================
     POST
  ======================================== */

  const [
    post,
    setPost,
  ] =
    useState(null);


  /* ========================================
     LOADING
  ======================================== */

  const [
    isLoading,
    setIsLoading,
  ] =
    useState(true);


  /* ========================================
     ERROR
  ======================================== */

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState("");


  /* ========================================
     LOAD ARTICLE FROM SUPABASE
  ======================================== */

  useEffect(() => {

    let isMounted =
      true;


    async function loadPost() {

      try {

        setIsLoading(
          true
        );


        setErrorMessage(
          ""
        );


        setPost(
          null
        );


        const article =
          await getPublishedPostBySlug(
            slug
          );


        if (
          isMounted
        ) {

          setPost(
            article
          );

        }

      } catch (
        error
      ) {

        console.error(
          "Failed to load journal article:",
          error
        );


        if (
          isMounted
        ) {

          setErrorMessage(
            "Unable to load this journal article."
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


    loadPost();


    return () => {

      isMounted =
        false;

    };

  }, [
    slug,
  ]);


  /* ========================================
     LOADING
  ======================================== */

  if (
    isLoading
  ) {

    return (

      <main
        style={{
          minHeight:
            "70vh",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          padding:
            "120px 20px",

          textAlign:
            "center",
        }}
      >

        <p>
          Loading article...
        </p>

      </main>

    );

  }


  /* ========================================
     LOAD ERROR
  ======================================== */

  if (
    errorMessage
  ) {

    return (

      <>

        <SEOHead
          title="Journal | Rohit Ohal Photography"
          description="Photography stories and insights from Rohit Ohal Photography."
          canonical={
            `/journal/${slug || ""}`
          }
          robots="noindex, nofollow"
        />


        <main className="project-not-found">

          <h1>
            Unable to load article
          </h1>


          <p>
            {
              errorMessage
            }
          </p>


          <Link to="/journal">

            ← Back to Journal

          </Link>

        </main>

      </>

    );

  }


  /* ========================================
     ARTICLE NOT FOUND
  ======================================== */

  if (
    !post
  ) {

    return (

      <>

        <SEOHead
          title="Article Not Found | Rohit Ohal Photography"
          description="The journal article you are looking for could not be found."
          canonical={
            `/journal/${slug || ""}`
          }
          robots="noindex, nofollow"
        />


        <main className="project-not-found">

          <h1>
            Article not found
          </h1>


          <Link to="/journal">

            ← Back to Journal

          </Link>

        </main>

      </>

    );

  }


  /* ========================================
     SEO
  ======================================== */

  const seoTitle =
    `${post.title} | Rohit Ohal Photography`;


  const seoDescription =
    post.excerpt ||
    createDescription(
      post.content
    ) ||
    "Read photography stories, insights and behind-the-scenes articles from Rohit Ohal Photography.";


  const canonicalPath =
    `/journal/${post.slug}`;


  const canonicalURL =
    `${SITE_URL}${canonicalPath}`;


  const socialImage =
    post.cover ||
    "";


  const absoluteImage =
    createAbsoluteURL(
      socialImage
    );


  /* ========================================
     DATES
  ======================================== */

  const publishedDate =
    normalizeDate(
      post.createdAt
    );


  const modifiedDate =
    normalizeDate(
      post.updatedAt
    );


  /* ========================================
     STRUCTURED DATA
  ======================================== */

  const articleSchema = {

    "@context":
      "https://schema.org",

    "@graph": [

      /* =====================================
         BLOG POSTING
      ===================================== */

      {
        "@type":
          "BlogPosting",

        "@id":
          `${canonicalURL}#article`,

        headline:
          post.title,

        description:
          seoDescription,

        url:
          canonicalURL,

        mainEntityOfPage: {
          "@id":
            `${canonicalURL}#webpage`,
        },

        author: {

          "@type":
            "Person",

          name:
            "Rohit Ohal",

          url:
            `${SITE_URL}/about`,

        },

        publisher: {
          "@id":
            `${SITE_URL}/#business`,
        },

        ...(absoluteImage
          ? {
              image: [
                absoluteImage,
              ],
            }
          : {}),

        ...(publishedDate
          ? {
              datePublished:
                publishedDate,
            }
          : {}),

        ...(modifiedDate
          ? {
              dateModified:
                modifiedDate,
            }
          : {}),

        ...(post.category
          ? {
              articleSection:
                post.category,
            }
          : {}),

        inLanguage:
          "en-IN",

      },


      /* =====================================
         WEB PAGE
      ===================================== */

      {
        "@type":
          "WebPage",

        "@id":
          `${canonicalURL}#webpage`,

        url:
          canonicalURL,

        name:
          seoTitle,

        description:
          seoDescription,

        isPartOf: {
          "@id":
            `${SITE_URL}/#website`,
        },

        breadcrumb: {
          "@id":
            `${canonicalURL}#breadcrumb`,
        },

        ...(absoluteImage
          ? {
              primaryImageOfPage: {

                "@type":
                  "ImageObject",

                url:
                  absoluteImage,

                contentUrl:
                  absoluteImage,

              },
            }
          : {}),

        inLanguage:
          "en-IN",

      },


      /* =====================================
         BREADCRUMBS
      ===================================== */

      {
        "@type":
          "BreadcrumbList",

        "@id":
          `${canonicalURL}#breadcrumb`,

        itemListElement: [

          {
            "@type":
              "ListItem",

            position:
              1,

            name:
              "Home",

            item:
              `${SITE_URL}/`,
          },

          {
            "@type":
              "ListItem",

            position:
              2,

            name:
              "Journal",

            item:
              `${SITE_URL}/journal`,
          },

          {
            "@type":
              "ListItem",

            position:
              3,

            name:
              post.title,

            item:
              canonicalURL,
          },

        ],

      },

    ],

  };


  /* ========================================
     CONTENT
  ======================================== */

  const contentBlocks =
    post.content
      ?.split(
        /\n\s*\n/
      )
      .map(
        (
          block
        ) =>
          block.trim()
      )
      .filter(
        Boolean
      ) ||
    [];


  /* ========================================
     CONTENT RENDERER
  ======================================== */

  const renderContentBlock =
    (
      block,
      index
    ) => {

      if (
        block.startsWith(
          "## "
        )
      ) {

        return (

          <h2
            key={
              index
            }
            style={{
              marginTop:
                "48px",

              marginBottom:
                "18px",
            }}
          >

            {
              block.replace(
                /^##\s+/,
                ""
              )
            }

          </h2>

        );

      }


      if (
        block.startsWith(
          "### "
        )
      ) {

        return (

          <h3
            key={
              index
            }
            style={{
              marginTop:
                "36px",

              marginBottom:
                "14px",
            }}
          >

            {
              block.replace(
                /^###\s+/,
                ""
              )
            }

          </h3>

        );

      }


      return (

        <p
          key={
            index
          }
          style={{
            whiteSpace:
              "pre-line",
          }}
        >

          {
            block
          }

        </p>

      );

    };


  /* ========================================
     RENDER
  ======================================== */

  return (

    <>

      {/* =====================================
          SEO
      ===================================== */}

      <SEOHead
        title={
          seoTitle
        }

        description={
          seoDescription
        }

        image={
          socialImage
        }

        canonical={
          canonicalPath
        }

        type="article"

        robots="index, follow"

        imageAlt={
          post.title
        }
      />


      {/* =====================================
          STRUCTURED DATA
      ===================================== */}

      <StructuredData
        id="journal-post-structured-data"
        data={
          articleSchema
        }
      />


      {/* =====================================
          HERO
      ===================================== */}

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


      {/* =====================================
          ARTICLE
      ===================================== */}

      <section className="project-page">

        <div className="project-container">

          <article className="project-story">


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
                Article content coming soon.
              </p>

            )}


            <div
              style={{
                marginTop:
                  "56px",
              }}
            >

              <Link to="/journal">

                ← Back to Journal

              </Link>

            </div>

          </article>

        </div>

      </section>

    </>

  );

}


/* ==========================================
   DESCRIPTION
========================================== */

function createDescription(
  content
) {

  if (
    !content ||
    typeof content !==
      "string"
  ) {

    return "";

  }


  return content
    .replace(
      /#{1,6}\s*/g,
      ""
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim()
    .slice(
      0,
      160
    );

}


/* ==========================================
   ABSOLUTE URL
========================================== */

function createAbsoluteURL(
  value
) {

  if (
    !value
  ) {

    return "";

  }


  try {

    return new URL(
      value,
      `${SITE_URL}/`
    ).href;

  } catch (
    error
  ) {

    console.error(
      "Failed to create journal image URL:",
      error
    );


    return "";

  }

}


/* ==========================================
   NORMALIZE DATE
========================================== */

function normalizeDate(
  value
) {

  if (
    !value
  ) {

    return "";

  }


  const date =
    new Date(
      value
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "";

  }


  return date.toISOString();

}