import { Link } from "react-router-dom";

const STORAGE_KEY =
  "rohit-photography-about-cta";

const defaultSettings = {
  label:
    "LET'S CREATE SOMETHING BEAUTIFUL",

  headingLine1:
    "Your Story",

  headingLine2:
    "Deserves To Be",

  headingLine3:
    "Remembered.",

  description:
    "Whether you're planning a wedding, portrait session, destination wedding, or a commercial project, I'd love to hear your story and create something unforgettable together.",

  buttonText:
    "Start Your Journey",

  buttonLink:
    "/contact",
};

export default function AboutCTA() {
  /* =========================
     LOAD SETTINGS
  ========================= */

  let settings =
    defaultSettings;

  try {
    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (saved) {
      settings = {
        ...defaultSettings,
        ...JSON.parse(saved),
      };
    }
  } catch (error) {
    console.error(
      "Failed to load About CTA settings:",
      error
    );
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <section className="about-cta">

      <div className="about-container">

        {/* SECTION LABEL */}

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

        </h2>


        {/* DESCRIPTION */}

        <p>
          {settings.description}
        </p>


        {/* CTA BUTTON */}

        <Link
          to={
            settings.buttonLink ||
            "/contact"
          }
          className="about-cta-button"
        >
          {
            settings.buttonText ||
            "Start Your Journey"
          }
        </Link>

      </div>

    </section>
  );
}