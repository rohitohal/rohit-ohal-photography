import {
  useMemo,
} from "react";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";


/* =========================
   STORAGE KEY
========================= */

const PORTFOLIO_KEY =
  "rohit-photography-portfolio";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {

  heroTitle:
    "Selected Work",

  heroDescription:
    "A curated collection of wedding, portrait, commercial, industrial, food and editorial photography.",

  heroImage:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=2000&q=80",

};


/* =========================
   PORTFOLIO PAGE
========================= */

export default function Portfolio() {

  /* =========================
     LOAD PORTFOLIO SETTINGS
  ========================= */

  const portfolioSettings =
    useMemo(() => {

      try {

        const saved =
          localStorage.getItem(
            PORTFOLIO_KEY
          );


        /*
         * Nothing has been saved
         * from Admin yet.
         */

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
         * Invalid saved settings.
         */

        if (
          !parsed ||
          typeof parsed !==
            "object"
        ) {

          return {
            ...defaultSettings,
          };

        }


        /*
         * Merge saved settings
         * with defaults.
         */

        return {
          ...defaultSettings,
          ...parsed,

          /*
           * If Admin hero image
           * is empty, keep the
           * fallback image.
           */

          heroImage:
            parsed.heroImage ||
            defaultSettings.heroImage,
        };


      } catch (error) {

        console.error(
          "Failed to load Portfolio settings:",
          error
        );


        return {
          ...defaultSettings,
        };

      }

    }, []);


  /* =========================
     HERO VALUES
  ========================= */

  const heroTitle =
    portfolioSettings.heroTitle ||
    defaultSettings.heroTitle;


  const heroDescription =
    portfolioSettings.heroDescription ||
    defaultSettings.heroDescription;


  const heroImage =
    portfolioSettings.heroImage ||
    defaultSettings.heroImage;


  /* =========================
     RENDER
  ========================= */

  return (

    <>

      {/* =========================
          SEO
      ========================= */}

      <SEOHead
        title="Photography Portfolio | Rohit Ohal Photography"
        description="Explore the photography portfolio of Rohit Ohal, featuring weddings, portraits, commercial, industrial, food, events and editorial photography in Pune, India."
        image={
          heroImage
        }
      />


      {/* =========================
          PAGE HERO
      ========================= */}

      <PageHero
        title={
          heroTitle
        }
        subtitle={
          heroDescription
        }
        image={
          heroImage
        }
        variant="portfolio"
        showScroll={
          false
        }
      />


      {/* =========================
          PORTFOLIO GRID
      ========================= */}

      <PortfolioGrid
        enableFilter
      />

    </>

  );

}