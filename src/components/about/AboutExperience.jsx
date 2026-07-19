const STORAGE_KEY =
  "rohit-photography-about-experience";

const defaultSettings = {
  label: "EXPERIENCE",

  headingLine1:
    "Built On Experience.",

  headingLine2:
    "Driven By Passion.",

  stats: [
    {
      number: "10+",
      title: "Years of Experience",
      description:
        "Capturing weddings, portraits and commercial stories with consistency and artistic vision.",
    },
    {
      number: "500+",
      title: "Stories Documented",
      description:
        "Every celebration, portrait and project is approached with the same passion and attention to detail.",
    },
    {
      number: "Fine Arts",
      title: "Creative Foundation",
      description:
        "A background in Fine Arts shapes every composition, colour palette and visual narrative.",
    },
    {
      number: "Worldwide",
      title: "Available to Travel",
      description:
        "Based in Pune, India and available for destination weddings and assignments around the world.",
    },
  ],
};

export default function AboutExperience() {
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
      const parsed =
        JSON.parse(saved);

      settings = {
        ...defaultSettings,
        ...parsed,

        stats:
          Array.isArray(
            parsed.stats
          )
            ? parsed.stats
            : defaultSettings.stats,
      };
    }
  } catch (error) {
    console.error(
      "Failed to load About Experience settings:",
      error
    );
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <section className="about-experience">

      <div className="about-container">

        {/* SECTION LABEL */}

        <span>
          {settings.label}
        </span>


        {/* HEADING */}

        <h2>

          {
            settings.headingLine1
          }

          {settings.headingLine2 && (
            <>
              <br />

              {
                settings.headingLine2
              }
            </>
          )}

        </h2>


        {/* EXPERIENCE GRID */}

        <div className="experience-grid">

          {settings.stats.map(
            (
              item,
              index
            ) => (

              <div
                className="experience-card"
                key={
                  `${item.title}-${index}`
                }
              >

                <h3>
                  {
                    item.number
                  }
                </h3>

                <h4>
                  {
                    item.title
                  }
                </h4>

                <p>
                  {
                    item.description
                  }
                </p>

              </div>

            )
          )}

        </div>

      </div>

    </section>
  );
}