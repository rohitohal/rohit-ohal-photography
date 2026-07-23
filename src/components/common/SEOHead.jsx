import {
  useEffect,
} from "react";

import {
  supabase,
} from "../../lib/supabase";


/* ==========================================
   DEFAULT SEO
========================================== */

const defaultSEO = {

  siteTitle:
    "Rohit Ohal Photography | Wedding & Commercial Photographer",

  metaDescription:
    "Rohit Ohal Photography specializes in fine art wedding, commercial, portrait, industrial, food and editorial photography in Pune, India.",

  keywords:
    "Rohit Ohal Photography, Wedding Photographer Pune, Commercial Photographer Pune, Portrait Photographer Pune",

  ogTitle:
    "Rohit Ohal Photography",

  ogDescription:
    "Fine art wedding and commercial photography.",

  ogImage:
    "",

};


/* ==========================================
   STORAGE
========================================== */

const SEO_STORAGE_KEY =
  "rohit-photography-seo";

const SUPABASE_SETTING_KEY =
  "seo";


/* ==========================================
   SEO HEAD
========================================== */

export default function SEOHead({

  title,

  description,

  image,

  canonical,

  type = "website",

  robots = "index, follow",

  imageAlt,

}) {

  useEffect(() => {

    let isMounted =
      true;


    /* ========================================
       APPLY SEO
    ======================================== */

    const applySEO =
      (
        globalSEO
      ) => {

        if (
          !isMounted
        ) {

          return;

        }


        const mergedSEO = {

          ...defaultSEO,

          ...globalSEO,

        };


        /* ====================================
           PAGE TITLE
        ==================================== */

        const pageTitle =
          title ||
          mergedSEO.siteTitle;


        /* ====================================
           PAGE DESCRIPTION
        ==================================== */

        const pageDescription =
          description ||
          mergedSEO.metaDescription;


        /* ====================================
           SOCIAL TITLE
        ==================================== */

        const socialTitle =
          title ||
          mergedSEO.ogTitle ||
          pageTitle;


        /* ====================================
           SOCIAL DESCRIPTION
        ==================================== */

        const socialDescription =
          description ||
          mergedSEO.ogDescription ||
          pageDescription;


        /* ====================================
           CANONICAL URL
        ==================================== */

        const pageURL =
          createCanonicalURL(
            canonical
          );


        /* ====================================
           SOCIAL IMAGE
        ==================================== */

        const selectedImage =
          image ||
          mergedSEO.ogImage;


        const pageImage =
          createAbsoluteURL(
            selectedImage
          );


        const pageImageAlt =
          imageAlt ||
          socialTitle ||
          "Rohit Ohal Photography";


        /* ====================================
           DOCUMENT TITLE
        ==================================== */

        document.title =
          pageTitle;


        /* ====================================
           STANDARD META
        ==================================== */

        updateMetaTag(
          "name",
          "description",
          pageDescription
        );


        updateMetaTag(
          "name",
          "keywords",
          mergedSEO.keywords
        );


        updateMetaTag(
          "name",
          "robots",
          robots
        );


        /* ====================================
           CANONICAL
        ==================================== */

        updateCanonicalLink(
          pageURL
        );


        /* ====================================
           OPEN GRAPH
        ==================================== */

        updateMetaTag(
          "property",
          "og:title",
          socialTitle
        );


        updateMetaTag(
          "property",
          "og:description",
          socialDescription
        );


        updateMetaTag(
          "property",
          "og:type",
          type
        );


        updateMetaTag(
          "property",
          "og:url",
          pageURL
        );


        updateMetaTag(
          "property",
          "og:site_name",
          "Rohit Ohal Photography"
        );


        updateMetaTag(
          "property",
          "og:locale",
          "en_IN"
        );


        /* ====================================
           OPEN GRAPH IMAGE
        ==================================== */

        if (
          pageImage
        ) {

          updateMetaTag(
            "property",
            "og:image",
            pageImage
          );


          updateMetaTag(
            "property",
            "og:image:alt",
            pageImageAlt
          );

        } else {

          removeMetaTag(
            "property",
            "og:image"
          );


          removeMetaTag(
            "property",
            "og:image:alt"
          );

        }


        /* ====================================
           TWITTER / SOCIAL CARD
        ==================================== */

        updateMetaTag(
          "name",
          "twitter:card",
          pageImage
            ? "summary_large_image"
            : "summary"
        );


        updateMetaTag(
          "name",
          "twitter:title",
          socialTitle
        );


        updateMetaTag(
          "name",
          "twitter:description",
          socialDescription
        );


        /* ====================================
           TWITTER IMAGE
        ==================================== */

        if (
          pageImage
        ) {

          updateMetaTag(
            "name",
            "twitter:image",
            pageImage
          );


          updateMetaTag(
            "name",
            "twitter:image:alt",
            pageImageAlt
          );

        } else {

          removeMetaTag(
            "name",
            "twitter:image"
          );


          removeMetaTag(
            "name",
            "twitter:image:alt"
          );

        }

      };


    /* ========================================
       LOAD LOCAL CACHE
    ======================================== */

    const loadLocalSEO =
      () => {

        try {

          const savedSEO =
            localStorage.getItem(
              SEO_STORAGE_KEY
            );


          if (
            !savedSEO
          ) {

            return {
              ...defaultSEO,
            };

          }


          const parsedSEO =
            JSON.parse(
              savedSEO
            );


          if (
            !parsedSEO ||
            typeof parsedSEO !==
              "object" ||
            Array.isArray(
              parsedSEO
            )
          ) {

            return {
              ...defaultSEO,
            };

          }


          return {

            ...defaultSEO,

            ...parsedSEO,

          };

        } catch (
          error
        ) {

          console.error(
            "Failed to load cached SEO settings:",
            error
          );


          return {
            ...defaultSEO,
          };

        }

      };


    /* ========================================
       SAVE LOCAL CACHE
    ======================================== */

    const saveLocalSEO =
      (
        seoData
      ) => {

        try {

          localStorage.setItem(
            SEO_STORAGE_KEY,
            JSON.stringify(
              seoData
            )
          );

        } catch (
          error
        ) {

          console.error(
            "Failed to cache SEO settings:",
            error
          );

        }

      };


    /* ========================================
       LOAD GLOBAL SEO
    ======================================== */

    const loadSEO =
      async () => {

        /*
         * Apply cached/default SEO immediately.
         * This prevents waiting for Supabase
         * before document metadata is updated.
         */

        const cachedSEO =
          loadLocalSEO();


        applySEO(
          cachedSEO
        );


        try {

          const {
            data,
            error,
          } =
            await supabase
              .from(
                "site_settings"
              )
              .select(
                "setting_value"
              )
              .eq(
                "setting_key",
                SUPABASE_SETTING_KEY
              )
              .single();


          if (
            error
          ) {

            throw error;

          }


          const remoteSEO =
            data?.setting_value;


          if (
            remoteSEO &&
            typeof remoteSEO ===
              "object" &&
            !Array.isArray(
              remoteSEO
            )
          ) {

            const mergedSEO = {

              ...defaultSEO,

              ...remoteSEO,

            };


            saveLocalSEO(
              mergedSEO
            );


            applySEO(
              mergedSEO
            );

          }

        } catch (
          error
        ) {

          /*
           * Cached/default SEO has already
           * been applied, so a temporary
           * Supabase failure does not break
           * page metadata.
           */

          console.error(
            "Failed to load SEO settings from Supabase:",
            error
          );

        }

      };


    loadSEO();


    return () => {

      isMounted =
        false;

    };

  }, [

    title,

    description,

    image,

    canonical,

    type,

    robots,

    imageAlt,

  ]);


  return null;

}


/* ==========================================
   CREATE CANONICAL URL
========================================== */

function createCanonicalURL(
  canonical
) {

  try {

    if (
      canonical
    ) {

      return new URL(
        canonical,
        window.location.origin
      ).href;

    }


    /*
     * Deliberately exclude:
     *
     * ?query=params
     * #hash
     */

    return (
      window.location.origin +
      window.location.pathname
    );

  } catch (
    error
  ) {

    console.error(
      "Failed to create canonical URL:",
      error
    );


    return (
      window.location.origin +
      window.location.pathname
    );

  }

}


/* ==========================================
   CREATE ABSOLUTE URL
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
      window.location.origin
    ).href;

  } catch (
    error
  ) {

    console.error(
      "Failed to create absolute URL:",
      error
    );


    return value;

  }

}


/* ==========================================
   CREATE / UPDATE META TAG
========================================== */

function updateMetaTag(
  attribute,
  attributeValue,
  content
) {

  if (
    !content
  ) {

    removeMetaTag(
      attribute,
      attributeValue
    );

    return;

  }


  let element =
    document.querySelector(
      `meta[${attribute}="${attributeValue}"]`
    );


  if (
    !element
  ) {

    element =
      document.createElement(
        "meta"
      );


    element.setAttribute(
      attribute,
      attributeValue
    );


    document.head.appendChild(
      element
    );

  }


  element.setAttribute(
    "content",
    content
  );

}


/* ==========================================
   REMOVE META TAG
========================================== */

function removeMetaTag(
  attribute,
  attributeValue
) {

  const element =
    document.querySelector(
      `meta[${attribute}="${attributeValue}"]`
    );


  if (
    element
  ) {

    element.remove();

  }

}


/* ==========================================
   CREATE / UPDATE CANONICAL
========================================== */

function updateCanonicalLink(
  url
) {

  if (
    !url
  ) {

    return;

  }


  let canonical =
    document.querySelector(
      'link[rel="canonical"]'
    );


  if (
    !canonical
  ) {

    canonical =
      document.createElement(
        "link"
      );


    canonical.setAttribute(
      "rel",
      "canonical"
    );


    document.head.appendChild(
      canonical
    );

  }


  canonical.setAttribute(
    "href",
    url
  );

}