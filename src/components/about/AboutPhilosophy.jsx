const STORAGE_KEY =
  "rohit-photography-about-philosophy";

const defaultSettings = {
  label: "MY PHILOSOPHY",

  headingLine1:
    "Honest Moments.",

  headingLine2:
    "Elegant Storytelling.",

  description:
    "Great photography is not about directing every pose. It is about observing, anticipating and preserving emotions as they naturally unfold. My work combines documentary storytelling with fine art composition, ensuring every image feels authentic and timeless.",
};

export default function AboutPhilosophy() {
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
      "Failed to load About Philosophy settings:",
      error
    );
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <section className="about-philosophy">

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
              {
                settings.headingLine2
              }
            </>
          )}

        </h2>

        {/* DESCRIPTION */}

        <p>
          {
            settings.description
          }
        </p>

      </div>

    </section>
  );
}