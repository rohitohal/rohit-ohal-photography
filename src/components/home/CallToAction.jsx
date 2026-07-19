import { Link } from "react-router-dom";

import "./CallToAction.css";

const defaultCTASettings = {
  label: "LET'S CREATE SOMETHING BEAUTIFUL",

  headingLine1: "Every Story Deserves",
  headingLine2: "To Be Remembered.",
  headingLine3: "",
  headingLine4: "",

  description:
    "Whether it's a wedding, portrait, editorial or commercial project, let's create imagery that will remain timeless for years to come.",

  buttonText:
    "Start Your Journey",

  buttonLink:
    "/contact",
};

export default function CallToAction() {
  /* =========================
     LOAD CTA SETTINGS
  ========================= */

  let settings =
    defaultCTASettings;

  try {
    const saved =
      localStorage.getItem(
        "rohit-photography-homepage-cta"
      );

    if (saved) {
      settings = {
        ...defaultCTASettings,
        ...JSON.parse(saved),
      };
    }
  } catch (error) {
    console.error(
      "Failed to load CTA settings:",
      error
    );
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <section className="cta">

      <div className="cta-container">

        {/* LABEL */}

        <span>
          {settings.label}
        </span>

        {/* HEADING */}

        <h2>

          {settings.headingLine1}

          {settings.headingLine2 && (
            <>
              <br />
              {settings.headingLine2}
            </>
          )}

          {settings.headingLine3 && (
            <>
              <br />
              {settings.headingLine3}
            </>
          )}

          {settings.headingLine4 && (
            <>
              <br />
              {settings.headingLine4}
            </>
          )}

        </h2>

        {/* DESCRIPTION */}

        <p>
          {settings.description}
        </p>

        {/* BUTTON */}

        <Link
          to={
            settings.buttonLink ||
            "/contact"
          }
          className="cta-button"
        >
          {settings.buttonText}
        </Link>

      </div>

    </section>
  );
}