import { Link } from "react-router-dom";

import "./AboutPreview.css";

const defaultAboutSettings = {
  label: "ABOUT ROHIT OHAL",

  heading:
    "Fine Art.\nDocumentary.\nTimeless.",

  description:
    "I believe photographs should do more than document a moment. They should preserve emotion, atmosphere and the little details that become priceless with time. My work combines documentary storytelling with a fine art approach to create images that feel authentic, elegant and enduring.",

  yearsValue: "10+",
  yearsLabel: "Years Experience",

  projectsValue: "500+",
  projectsLabel: "Projects Delivered",

  educationValue: "Fine Arts",
  educationLabel: "Graduate",

  image:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80",

  buttonText:
    "Learn More About Me",

  buttonLink:
    "/about",
};

export default function AboutPreview() {
  /* =========================
     LOAD ABOUT SETTINGS
  ========================= */

  let settings =
    defaultAboutSettings;

  try {
    const saved =
      localStorage.getItem(
        "rohit-photography-homepage-about"
      );

    if (saved) {
      settings = {
        ...defaultAboutSettings,
        ...JSON.parse(saved),
      };
    }
  } catch (error) {
    console.error(
      "Failed to load homepage about settings:",
      error
    );
  }

  /* =========================
     HEADING LINES
  ========================= */

  const headingLines =
    settings.heading
      .split("\n")
      .filter(
        (line) =>
          line.trim() !== ""
      );

  /* =========================
     RENDER
  ========================= */

  return (
    <section className="about-preview">

      <div className="about-preview-container">

        {/* CONTENT */}

        <div className="about-preview-content">

          <span className="about-label">
            {settings.label}
          </span>

          <h2>

            {headingLines.map(
              (line, index) => (
                <span
                  key={index}
                >
                  {line}

                  {index <
                    headingLines.length -
                      1 && (
                    <br />
                  )}
                </span>
              )
            )}

          </h2>

          <p>
            {settings.description}
          </p>

          {/* STATISTICS */}

          <div className="about-info">

            <div>

              <h3>
                {
                  settings.yearsValue
                }
              </h3>

              <span>
                {
                  settings.yearsLabel
                }
              </span>

            </div>

            <div>

              <h3>
                {
                  settings.projectsValue
                }
              </h3>

              <span>
                {
                  settings.projectsLabel
                }
              </span>

            </div>

            <div>

              <h3>
                {
                  settings.educationValue
                }
              </h3>

              <span>
                {
                  settings.educationLabel
                }
              </span>

            </div>

          </div>

          {/* BUTTON */}

          <Link
            to={
              settings.buttonLink ||
              "/about"
            }
            className="about-button"
          >
            {settings.buttonText}
          </Link>

        </div>

        {/* IMAGE */}

        <div className="about-preview-image">

          <img
            src={
              settings.image
            }
            alt="Rohit Ohal"
          />

        </div>

      </div>

    </section>
  );
}