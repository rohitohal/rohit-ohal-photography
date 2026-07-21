import { useEffect } from "react";

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

  ogImage: "",
};

export default function SEOHead({
  title,
  description,
  image,
}) {
  useEffect(() => {
    /* =========================
       LOAD GLOBAL SEO SETTINGS
    ========================= */

    let globalSEO = {
      ...defaultSEO,
    };

    try {
      const savedSEO =
        localStorage.getItem(
          "rohit-photography-seo"
        );

      if (savedSEO) {
        const parsedSEO =
          JSON.parse(
            savedSEO
          );

        if (
          parsedSEO &&
          typeof parsedSEO ===
            "object" &&
          !Array.isArray(
            parsedSEO
          )
        ) {
          globalSEO = {
            ...defaultSEO,
            ...parsedSEO,
          };
        }
      }
    } catch (error) {
      console.error(
        "Failed to load SEO settings:",
        error
      );
    }


    /* =========================
       PAGE SEO VALUES
    ========================= */

    const pageTitle =
      title ||
      globalSEO.siteTitle;

    const pageDescription =
      description ||
      globalSEO.metaDescription;

    const pageImage =
      image ||
      globalSEO.ogImage;


    /* =========================
       CURRENT PAGE URL
    ========================= */

    const pageURL =
      window.location.href;


    /* =========================
       DOCUMENT TITLE
    ========================= */

    document.title =
      pageTitle;


    /* =========================
       STANDARD META TAGS
    ========================= */

    updateMetaTag(
      "name",
      "description",
      pageDescription
    );

    updateMetaTag(
      "name",
      "keywords",
      globalSEO.keywords
    );


    /* =========================
       CANONICAL URL
    ========================= */

    updateCanonicalLink(
      pageURL
    );


    /* =========================
       OPEN GRAPH
    ========================= */

    updateMetaTag(
      "property",
      "og:title",
      title ||
        globalSEO.ogTitle ||
        pageTitle
    );

    updateMetaTag(
      "property",
      "og:description",
      description ||
        globalSEO.ogDescription ||
        pageDescription
    );

    updateMetaTag(
      "property",
      "og:type",
      "website"
    );

    updateMetaTag(
      "property",
      "og:url",
      pageURL
    );


    /* =========================
       OPEN GRAPH IMAGE
    ========================= */

    if (pageImage) {
      updateMetaTag(
        "property",
        "og:image",
        pageImage
      );
    } else {
      removeMetaTag(
        "property",
        "og:image"
      );
    }


    /* =========================
       TWITTER / SOCIAL CARDS
    ========================= */

    updateMetaTag(
      "name",
      "twitter:card",
      "summary_large_image"
    );

    updateMetaTag(
      "name",
      "twitter:title",
      pageTitle
    );

    updateMetaTag(
      "name",
      "twitter:description",
      pageDescription
    );


    /* =========================
       TWITTER IMAGE
    ========================= */

    if (pageImage) {
      updateMetaTag(
        "name",
        "twitter:image",
        pageImage
      );
    } else {
      removeMetaTag(
        "name",
        "twitter:image"
      );
    }

  }, [
    title,
    description,
    image,
  ]);

  return null;
}


/* =========================
   CREATE / UPDATE META TAG
========================= */

function updateMetaTag(
  attribute,
  attributeValue,
  content
) {
  if (!content) {
    return;
  }

  let element =
    document.querySelector(
      `meta[${attribute}="${attributeValue}"]`
    );

  if (!element) {
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


/* =========================
   REMOVE META TAG
========================= */

function removeMetaTag(
  attribute,
  attributeValue
) {
  const element =
    document.querySelector(
      `meta[${attribute}="${attributeValue}"]`
    );

  if (element) {
    element.remove();
  }
}


/* =========================
   CREATE / UPDATE CANONICAL
========================= */

function updateCanonicalLink(
  url
) {
  if (!url) {
    return;
  }

  let canonical =
    document.querySelector(
      'link[rel="canonical"]'
    );

  if (!canonical) {
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