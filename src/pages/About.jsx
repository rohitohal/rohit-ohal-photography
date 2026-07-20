import { useState } from "react";

import "../styles/pages/About.css";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";

import AboutStory from "../components/about/AboutStory";
import AboutPhilosophy from "../components/about/AboutPhilosophy";
import AboutExperience from "../components/about/AboutExperience";
import AboutProcess from "../components/about/AboutProcess";
import AboutCTA from "../components/about/AboutCTA";

import heroImage from "../assets/images/hero.jpg";


/* =========================
   STORAGE KEY
========================= */

const ABOUT_HERO_KEY =
  "rohit-photography-about-hero";


/* =========================
   DEFAULT ABOUT HERO
========================= */

const defaultAboutHero = {
  title:
    "About",

  description:
    "The story, philosophy and passion behind Rohit Ohal Photography.",

  image:
    "",
};


/* =========================
   ABOUT PAGE
========================= */

export default function About() {

  /* =========================
     LOAD ABOUT HERO
  ========================= */

  const [aboutHero] =
    useState(() => {

      try {

        const savedHero =
          localStorage.getItem(
            ABOUT_HERO_KEY
          );

        if (!savedHero) {

          return {
            ...defaultAboutHero,
          };

        }

        const parsedHero =
          JSON.parse(
            savedHero
          );

        if (
          !parsedHero ||
          typeof parsedHero !==
            "object"
        ) {

          return {
            ...defaultAboutHero,
          };

        }

        return {
          ...defaultAboutHero,
          ...parsedHero,
        };

      } catch (error) {

        console.error(
          "Failed to load About Hero settings:",
          error
        );

        return {
          ...defaultAboutHero,
        };

      }

    });


  /* =========================
     HERO VALUES
  ========================= */

  const aboutHeroTitle =
    aboutHero.title ||
    defaultAboutHero.title;

  const aboutHeroDescription =
    aboutHero.description ||
    defaultAboutHero.description;

  const aboutHeroImage =
    aboutHero.image ||
    heroImage;


  /* =========================
     RENDER
  ========================= */

  return (
    <>

      {/* =========================
          SEO
      ========================= */}

      <SEOHead
        title="About Rohit Ohal | Photographer in Pune"
        description="Learn about Rohit Ohal, a Pune-based photographer specializing in wedding, commercial, portrait, industrial, food and editorial photography."
        image={
          aboutHeroImage
        }
      />


      {/* =========================
          ABOUT HERO
      ========================= */}

      <PageHero
        title={
          aboutHeroTitle
        }
        description={
          aboutHeroDescription
        }
        image={
          aboutHeroImage
        }
      />


      {/* =========================
          ABOUT STORY
      ========================= */}

      <AboutStory />


      {/* =========================
          ABOUT PHILOSOPHY
      ========================= */}

      <AboutPhilosophy />


      {/* =========================
          ABOUT EXPERIENCE
      ========================= */}

      <AboutExperience />


      {/* =========================
          ABOUT PROCESS
      ========================= */}

      <AboutProcess />


      {/* =========================
          ABOUT CTA
      ========================= */}

      <AboutCTA />

    </>
  );
}