import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./Hero.css";


/* =========================
   CONSTANTS
========================= */

const HOMEPAGE_KEY =
  "rohit-photography-homepage";


/*
 * Fallback image shown if
 * no Hero images have been
 * selected from Admin.
 */

const fallbackHeroImage =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=2000&q=85";


/* =========================
   DEFAULT HERO SETTINGS
========================= */

const defaultSettings = {
  heroTitle:
    "Capturing Timeless Stories",

  heroSubtitle:
    "Luxury Wedding Photographer based in Pune, India.",

  heroDescription:
    "Documentary storytelling through timeless imagery, capturing emotion, atmosphere and moments that deserve to be remembered.",

  heroImages: [],
};


export default function Hero() {
  /* =========================
     CURRENT SLIDE
  ========================= */

  const [
    currentImage,
    setCurrentImage,
  ] = useState(0);


  /* =========================
     LOAD HOMEPAGE SETTINGS
  ========================= */

  const homepageSettings =
    useMemo(() => {
      try {
        const saved =
          localStorage.getItem(
            HOMEPAGE_KEY
          );

        if (!saved) {
          return {
            ...defaultSettings,
          };
        }

        const parsed =
          JSON.parse(
            saved
          );


        /*
         * Support both the new
         * heroImages array and
         * the old heroImage field.
         */

        const migratedHeroImages =
          Array.isArray(
            parsed.heroImages
          )
            ? parsed.heroImages
            : parsed.heroImage
            ? [
                parsed.heroImage,
              ]
            : [];


        return {
          ...defaultSettings,
          ...parsed,

          heroImages:
            migratedHeroImages,
        };

      } catch (error) {
        console.error(
          "Failed to load homepage settings:",
          error
        );

        return {
          ...defaultSettings,
        };
      }
    }, []);


  /* =========================
     HERO IMAGES
  ========================= */

  const heroImages =
    useMemo(() => {

      const savedImages =
        Array.isArray(
          homepageSettings.heroImages
        )
          ? homepageSettings.heroImages.filter(
              Boolean
            )
          : [];


      /*
       * If Admin has not selected
       * any Hero images, use the
       * fallback image.
       */

      if (
        savedImages.length ===
        0
      ) {
        return [
          fallbackHeroImage,
        ];
      }

      return savedImages;

    }, [
      homepageSettings,
    ]);


  /* =========================
     RESET CURRENT IMAGE
  ========================= */

  useEffect(() => {
    setCurrentImage(
      0
    );
  }, [
    heroImages,
  ]);


  /* =========================
     AUTO SLIDESHOW
  ========================= */

  useEffect(() => {

    /*
     * No slideshow required
     * when only one image exists.
     */

    if (
      heroImages.length <=
      1
    ) {
      return undefined;
    }


    const interval =
      setInterval(
        () => {

          setCurrentImage(
            (prev) =>
              (
                prev +
                1
              ) %
              heroImages.length
          );

        },
        6000
      );


    return () => {
      clearInterval(
        interval
      );
    };

  }, [
    heroImages.length,
  ]);


  /* =========================
     RENDER
  ========================= */

  return (
    <section className="hero">


      {/* =========================
          HERO IMAGES
      ========================= */}

      {heroImages.map(
        (
          image,
          index
        ) => (

          <img
            key={`${image}-${index}`}
            src={
              image
            }
            alt={
              index === 0
                ? "Rohit Ohal Photography"
                : ""
            }
            aria-hidden={
              index !==
              currentImage
            }
            className={
              index ===
              currentImage
                ? "hero-image active"
                : "hero-image"
            }
          />

        )
      )}


      {/* =========================
          OVERLAY
      ========================= */}

      <div className="hero-overlay" />


      {/* =========================
          HERO CONTENT
      ========================= */}

      <div className="hero-content">


        {/* HERO TITLE */}

        <h1>
          {
            homepageSettings
              .heroTitle
          }
        </h1>


        {/* HERO SUBTITLE */}

        <h2>
          {
            homepageSettings
              .heroSubtitle
          }
        </h2>


        {/* HERO DESCRIPTION */}

        {homepageSettings
          .heroDescription && (

          <p>
            {
              homepageSettings
                .heroDescription
            }
          </p>

        )}

      </div>

    </section>
  );
}