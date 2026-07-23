import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  supabase,
} from "../../lib/supabase";

import "./Hero.css";


/* =========================
   SUPABASE SETTING KEY
========================= */

const SETTING_KEY =
  "homepage_hero";


/* =========================
   FALLBACK HERO IMAGE
========================= */

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

  heroImages:
    [],

  buttonText:
    "View Portfolio",

  buttonLink:
    "/portfolio",

};


/* =========================
   NORMALIZE SETTINGS
========================= */

function normalizeSettings(
  data
) {

  if (
    !data ||
    typeof data !==
      "object"
  ) {

    return {
      ...defaultSettings,
    };

  }


  /*
   * Support old single
   * heroImage format.
   */

  const heroImages =
    Array.isArray(
      data.heroImages
    )
      ? data.heroImages
      : data.heroImage
        ? [
            data.heroImage,
          ]
        : [];


  return {

    ...defaultSettings,

    ...data,

    heroImages,

  };

}


/* =========================
   HERO
========================= */

export default function Hero() {

  /* =========================
     CURRENT SLIDE
  ========================= */

  const [
    currentImage,
    setCurrentImage,
  ] =
    useState(0);


  /* =========================
     HOMEPAGE SETTINGS
  ========================= */

  const [
    homepageSettings,
    setHomepageSettings,
  ] =
    useState(
      defaultSettings
    );


  /* =========================
     LOAD FROM SUPABASE
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadHomepageHero() {

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
              SETTING_KEY
            )
            .maybeSingle();


        if (
          error
        ) {

          throw error;

        }


        if (
          !mounted
        ) {

          return;

        }


        if (
          data?.setting_value
        ) {

          setHomepageSettings(
            normalizeSettings(
              data.setting_value
            )
          );


          return;

        }


        /*
         * No Supabase settings exist.
         * Use defaults.
         */

        setHomepageSettings({
          ...defaultSettings,
        });


      } catch (
        error
      ) {

        console.error(
          "Failed to load Homepage Hero from Supabase:",
          error
        );


        if (
          mounted
        ) {

          setHomepageSettings({
            ...defaultSettings,
          });

        }

      }

    }


    loadHomepageHero();


    return () => {

      mounted =
        false;

    };

  }, []);


  /* =========================
     HERO IMAGES
  ========================= */

  const heroImages =
    useMemo(
      () => {

        const savedImages =
          Array.isArray(
            homepageSettings.heroImages
          )
            ? homepageSettings
                .heroImages
                .filter(
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

      },
      [
        homepageSettings
          .heroImages,
      ]
    );


  /* =========================
     RESET CURRENT IMAGE
  ========================= */

  useEffect(
    () => {

      setCurrentImage(
        0
      );

    },
    [
      heroImages,
    ]
  );


  /* =========================
     AUTO SLIDESHOW
  ========================= */

  useEffect(
    () => {

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
              (
                previous
              ) =>
                (
                  previous +
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

    },
    [
      heroImages.length,
    ]
  );


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
            key={
              `${image}-${index}`
            }
            src={
              image
            }
            alt={
              index ===
              0
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