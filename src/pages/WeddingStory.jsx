import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import { supabase } from
  "../lib/supabase";


/* ==========================================
   SEO
========================================== */

import SEOHead from
  "../components/common/SEOHead";

import StructuredData from
  "../components/common/StructuredData";


/* ==========================================
   ADVANCED LIGHTBOX
========================================== */

import AdvancedLightbox from
  "../components/gallery/AdvancedLightbox";


/* ==========================================
   PAGE STYLES
========================================== */

import "./WeddingStory.css";


/* ==========================================
   SITE
========================================== */

const SITE_URL =
  "https://rohitohal.com";


/* ==========================================
   WEDDING STORY
========================================== */

export default function WeddingStory() {

  /* ========================================
     URL
  ======================================== */

  const {
    slug,
  } =
    useParams();


  /* ========================================
     STORY
  ======================================== */

  const [
    story,
    setStory,
  ] = useState(null);


  /* ========================================
     LOADING
  ======================================== */

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);


  /* ========================================
     ERROR
  ======================================== */

  const [
    loadError,
    setLoadError,
  ] = useState("");


  /* ========================================
     LIGHTBOX
  ======================================== */

  const [
    lightboxIndex,
    setLightboxIndex,
  ] =
    useState(-1);


  /* ========================================
     LOAD WEDDING STORY
     FROM SUPABASE
  ======================================== */

  useEffect(() => {

    let isMounted =
      true;


    async function loadStory() {

      try {

        setIsLoading(
          true
        );

        setLoadError(
          ""
        );


        const {
          data,
          error,
        } =
          await supabase
            .from(
              "projects"
            )
            .select(
              "*"
            )
            .eq(
              "slug",
              slug
            )
            .eq(
              "category",
              "Wedding"
            )
            .eq(
              "status",
              "Published"
            )
            .maybeSingle();


        if (
          error
        ) {

          throw error;

        }


        if (
          !isMounted
        ) {

          return;

        }


        if (
          !data
        ) {

          setStory(
            null
          );

          return;

        }


        /* ====================================
           NORMALIZE SUPABASE PROJECT
        ==================================== */

        const gallery =

          Array.isArray(
            data.gallery
          )

            ? data.gallery.filter(
                Boolean
              )

            : Array.isArray(
                data.images
              )

              ? data.images.filter(
                  Boolean
                )

              : [];


        setStory({

          ...data,

          /*
           * WeddingStory previously
           * expected `images`.
           *
           * Our Projects CMS stores the
           * gallery primarily as `gallery`.
           */

          images:
            gallery,

          gallery,

          title:
            data.title ||
            "",

          slug:
            data.slug ||
            "",

          location:
            data.location ||
            "",

          description:
            data.description ||
            "",

          cover:
            data.cover ||
            gallery[0] ||
            "",

        });


      } catch (error) {

        console.error(
          "Failed to load Wedding Story:",
          error
        );


        if (
          isMounted
        ) {

          setStory(
            null
          );

          setLoadError(
            error?.message ||
            "Unable to load Wedding Story."
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


    if (
      slug
    ) {

      loadStory();

    } else {

      setStory(
        null
      );

      setIsLoading(
        false
      );

    }


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

      <main className="story-not-found">

        <h1>
          Loading Wedding Story...
        </h1>

      </main>

    );

  }


  /* ========================================
     LOAD ERROR
  ======================================== */

  if (
    loadError
  ) {

    return (

      <>

        <SEOHead
          title="Unable to Load Wedding Story | Rohit Ohal Photography"
          description="The wedding photography story could not be loaded."
          canonical={
            `/portfolio/weddings/${slug || ""}`
          }
          robots="noindex, nofollow"
        />


        <main className="story-not-found">

          <h1>
            Unable to Load Wedding Story
          </h1>


          <p>
            {loadError}
          </p>


          <Link
            to="/portfolio/weddings"
          >

            ← Back to Wedding Stories

          </Link>

        </main>

      </>

    );

  }


  /* ========================================
     STORY NOT FOUND
  ======================================== */

  if (
    !story
  ) {

    return (

      <>

        <SEOHead
          title="Wedding Story Not Found | Rohit Ohal Photography"
          description="The wedding photography story you are looking for could not be found."
          canonical={
            `/portfolio/weddings/${slug || ""}`
          }
          robots="noindex, nofollow"
        />


        <main className="story-not-found">

          <h1>
            Wedding Story Not Found
          </h1>


          <Link
            to="/portfolio/weddings"
          >

            ← Back to Wedding Stories

          </Link>

        </main>

      </>

    );

  }


  /* ========================================
     SAFE IMAGE LIST
  ======================================== */

  const storyImages =
    Array.isArray(
      story.images
    )
      ? story.images.filter(
          Boolean
        )
      : [];


  /* ========================================
     SEO
  ======================================== */

  const seoTitle =
    `${story.title} | Wedding Photography | Rohit Ohal Photography`;


  const seoDescription =
    story.description ||
    `Explore ${story.title}, a wedding photography story${
      story.location
        ? ` from ${story.location}`
        : ""
    } captured by Rohit Ohal Photography.`;


  const canonicalPath =
    `/portfolio/weddings/${story.slug}`;


  const canonicalURL =
    `${SITE_URL}${canonicalPath}`;


  const socialImage =
    story.cover ||
    storyImages[0] ||
    "";


  const absoluteSocialImage =
    createAbsoluteURL(
      socialImage
    );


  const socialImageAlt =
    `${story.title}${
      story.location
        ? ` wedding photography in ${story.location}`
        : " wedding photography"
    }`;


  /* ========================================
     STRUCTURED DATA
  ======================================== */

  const structuredData = {

    "@context":
      "https://schema.org",

    "@graph": [

      /* =====================================
         WEDDING STORY PAGE
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

        about: {

          "@id":
            `${SITE_URL}/#business`,

        },

        breadcrumb: {

          "@id":
            `${canonicalURL}#breadcrumb`,

        },

        inLanguage:
          "en-IN",

        ...(absoluteSocialImage
          ? {

              primaryImageOfPage: {

                "@type":
                  "ImageObject",

                url:
                  absoluteSocialImage,

                contentUrl:
                  absoluteSocialImage,

                caption:
                  socialImageAlt,

              },

            }
          : {}),

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
              "Portfolio",

            item:
              `${SITE_URL}/portfolio`,

          },

          {

            "@type":
              "ListItem",

            position:
              3,

            name:
              "Weddings",

            item:
              `${SITE_URL}/portfolio/weddings`,

          },

          {

            "@type":
              "ListItem",

            position:
              4,

            name:
              story.title,

            item:
              canonicalURL,

          },

        ],

      },

    ],

  };


  /* ========================================
     LIGHTBOX FUNCTIONS
  ======================================== */

  const openLightbox =
    (
      index
    ) => {

      setLightboxIndex(
        index
      );

    };


  const closeLightbox =
    () => {

      setLightboxIndex(
        -1
      );

    };


  const changeLightboxImage =
    (
      index
    ) => {

      setLightboxIndex(
        index
      );

    };


  /* ========================================
     IMAGE PROTECTION
  ======================================== */

  const preventImageContextMenu =
    (
      event
    ) => {

      event.preventDefault();

    };


  const preventImageDrag =
    (
      event
    ) => {

      event.preventDefault();

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
          socialImageAlt
        }
      />


      {/* =====================================
          STRUCTURED DATA
      ===================================== */}

      <StructuredData
        id="wedding-story-structured-data"
        data={
          structuredData
        }
      />


      {/* =====================================
          PAGE
      ===================================== */}

      <main className="wedding-story">


        {/* ===================================
            HERO
        =================================== */}

        <section
          className="story-hero"
          style={{
            backgroundImage:
              `url(${story.cover})`,
          }}
        >

          <div
            className="story-overlay"
          />


          <div className="story-content">

            {story.location && (

              <span>

                {
                  story.location
                }

              </span>

            )}


            <h1>

              {
                story.title
              }

            </h1>


            {story.description && (

              <p>

                {
                  story.description
                }

              </p>

            )}

          </div>

        </section>


        {/* ===================================
            GALLERY
        =================================== */}

        {storyImages.length >
          0 && (

          <section className="story-gallery">

            {storyImages.map(
              (
                image,
                index
              ) => (

                <div
                  className="story-image"
                  key={
                    `${story.slug}-${index}`
                  }
                  role="button"
                  tabIndex={
                    0
                  }
                  aria-label={
                    `Open ${story.title} photograph ${
                      index + 1
                    }`
                  }
                  onClick={() =>
                    openLightbox(
                      index
                    )
                  }
                  onKeyDown={(
                    event
                  ) => {

                    if (
                      event.key ===
                        "Enter" ||
                      event.key ===
                        " "
                    ) {

                      event.preventDefault();


                      openLightbox(
                        index
                      );

                    }

                  }}
                >

                  <img
                    src={
                      image
                    }
                    alt={
                      `${story.title}${
                        story.location
                          ? ` wedding photography in ${story.location}`
                          : " wedding photography"
                      } - Photograph ${
                        index + 1
                      }`
                    }
                    loading="lazy"
                    draggable={
                      false
                    }
                    onContextMenu={
                      preventImageContextMenu
                    }
                    onDragStart={
                      preventImageDrag
                    }
                  />

                </div>

              )
            )}

          </section>

        )}


        {/* ===================================
            STORY FOOTER
        =================================== */}

        <section className="story-footer">

          <Link
            to="/portfolio/weddings"
          >

            ← Back to Wedding Stories

          </Link>

        </section>


        {/* ===================================
            ADVANCED LIGHTBOX
        =================================== */}

        {storyImages.length >
          0 && (

          <AdvancedLightbox

            images={
              storyImages
            }

            currentIndex={
              lightboxIndex >=
                0
                ? lightboxIndex
                : 0
            }

            isOpen={
              lightboxIndex >=
                0
            }

            onClose={
              closeLightbox
            }

            onChange={
              changeLightboxImage
            }

            title={
              story.title
            }

          />

        )}

      </main>

    </>

  );

}


/* ==========================================
   ABSOLUTE IMAGE URL
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
      "Failed to create structured data image URL:",
      error
    );


    return "";

  }

}