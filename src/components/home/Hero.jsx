import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Hero.css";

const defaultHeroImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=2200&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=2200&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=2200&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=2200&q=80",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=2200&q=80",
];

export default function Hero() {
  const [currentImage, setCurrentImage] =
    useState(0);

  const homepageSettings = JSON.parse(
    localStorage.getItem(
      "rohit-photography-homepage"
    ) || "{}"
  );

  const heroImages =
    homepageSettings.heroImage
      ? [
          homepageSettings.heroImage,
          ...defaultHeroImages,
        ]
      : defaultHeroImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        (prev) =>
          (prev + 1) %
          heroImages.length
      );
    }, 6000);

    return () =>
      clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="hero">

      {heroImages.map(
        (image, index) => (
          <img
            key={index}
            src={image}
            alt="Rohit Ohal Photography"
            className={
              index === currentImage
                ? "hero-image active"
                : "hero-image"
            }
          />
        )
      )}

      <div className="hero-overlay"></div>

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
          Documentary storytelling through timeless
          imagery, capturing emotion, atmosphere
          and moments that deserve to be remembered.
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