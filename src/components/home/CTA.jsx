import { Link } from "react-router-dom";

const defaultCTASettings = {
  label: "CONVERSATION",

  headingLine1: "Let's make",
  headingLine2: "something",
  headingLine3: "quiet,",
  headingLine4: "and lasting.",

  description:
    "Every wedding has its own rhythm and story. If you connect with my work, I'd love to hear about your plans and create something timeless together.",

  buttonText:
    "BEGIN A CONVERSATION",

  buttonLink:
    "/contact",
};

export default function CTA() {
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

  return (
    <section className="cta">

      <div className="container cta-container">

        {/* LEFT */}

        <div className="cta-left">

          <span>
            {settings.label}
          </span>

          <h2>

            {settings.headingLine1}

            <br />

            <em>
              {settings.headingLine2}
            </em>

            <br />

            <em>
              {settings.headingLine3}
            </em>

            <br />

            {settings.headingLine4}

          </h2>

        </div>

        {/* RIGHT */}

        <div className="cta-right">

          <p>
            {settings.description}
          </p>

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

      </div>

    </section>
  );
}