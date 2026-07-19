import { Link } from "react-router-dom";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./Hero.css";

export default function Hero() {
  const [currentImage, setCurrentImage] =
    useState(0);

  /* =========================
     LOAD HOMEPAGE SETTINGS
  ========================= */

  const homepageSettings =
    useMemo(() => {
      try {
        const saved =
          localStorage.getItem(
            "rohit-photography-homepage"
          );

        if (!saved) {
          return {};
        }

        return JSON.parse(
          saved
        );
      } catch (error) {
        console.error(
          "Failed to load homepage settings:",
          error
        );

        return {};
      }
    }, []);

  /* =========================
     LOAD ADMIN HERO IMAGES
  ========================= */

  const heroImages =
    useMemo(() => {
      if (
        Array.isArray(
          homepageSettings.heroImages
        )
      ) {
        return homepageSettings.heroImages.filter(
          Boolean
        );
      }

      return [];
    }, [
      homepageSettings,
    ]);

  /* =========================
     RESET CURRENT IMAGE
  ========================= */

  useEffect(() => {
    setCurrentImage(0);
  }, [heroImages]);

  /* =========================
     AUTO SLIDESHOW
  ========================= */

  useEffect(() => {
    if (
      heroImages.length <= 1
    ) {
      return;
    }

    const interval =
      setInterval(() => {
        setCurrentImage(
          (prev) =>
            (prev + 1) %
            heroImages.length
        );
      }, 6000);

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
            src={image}
            alt={`Rohit Ohal Photography ${
              index + 1
            }`}
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

        <h1>
          {homepageSettings.heroTitle ||
            "ROHIT OHAL"}
        </h1>

        <h2>
          {homepageSettings.heroSubtitle ||
            "Fine Art Wedding & Commercial Photography"}
        </h2>

        <p>
          Documentary storytelling
          through timeless imagery,
          capturing emotion,
          atmosphere and moments that
          deserve to be remembered.
        </p>

        <div className="hero-buttons">

          <Link
            to={
              homepageSettings.buttonLink ||
              "/portfolio"
            }
            className="hero-primary"
          >
            {homepageSettings.buttonText ||
              "Explore Portfolio"}
          </Link>

        </div>

      </div>

    </section>
  );
}