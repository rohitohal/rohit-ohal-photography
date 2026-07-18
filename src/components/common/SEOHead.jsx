import { useEffect } from "react";

const defaultSEO = {
  siteTitle:
    "Rohit Ohal Photography | Wedding & Commercial Photographer",

  metaDescription:
    "Rohit Ohal Photography specializes in fine art wedding, commercial, portrait, industrial, food and editorial photography in Pune, India.",

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
    const savedSEO = localStorage.getItem(
      "rohit-photography-seo"
    );

    let globalSEO = defaultSEO;

    if (savedSEO) {
      try {
        globalSEO = {
          ...defaultSEO,
          ...JSON.parse(savedSEO),
        };
      } catch (error) {
        console.error(
          "Failed to load SEO settings:",
          error
        );
      }
    }

    const pageTitle =
      title || globalSEO.siteTitle;

    const pageDescription =
      description ||
      globalSEO.metaDescription;

    const pageImage =
      image ||
      globalSEO.ogImage;

    document.title = pageTitle;

    updateMetaTag(
      "name",
      "description",
      pageDescription
    );

    updateMetaTag(
      "property",
      "og:title",
      title || globalSEO.ogTitle || pageTitle
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

    if (pageImage) {
      updateMetaTag(
        "property",
        "og:image",
        pageImage
      );
    }

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

    if (pageImage) {
      updateMetaTag(
        "name",
        "twitter:image",
        pageImage
      );
    }
  }, [title, description, image]);

  return null;
}

function updateMetaTag(
  attribute,
  attributeValue,
  content
) {
  if (!content) return;

  let element = document.querySelector(
    `meta[${attribute}="${attributeValue}"]`
  );

  if (!element) {
    element =
      document.createElement("meta");

    element.setAttribute(
      attribute,
      attributeValue
    );

    document.head.appendChild(element);
  }

  element.setAttribute(
    "content",
    content
  );
}