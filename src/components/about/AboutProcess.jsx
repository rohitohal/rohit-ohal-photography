const STORAGE_KEY =
  "rohit-photography-about-process";

const defaultSettings = {
  label: "MY PROCESS",

  headingLine1:
    "A Seamless Experience",

  headingLine2:
    "From Start To Finish",

  steps: [
    {
      number: "01",
      title: "Consultation",
      description:
        "Understanding your vision, expectations and story.",
    },
    {
      number: "02",
      title: "Planning",
      description:
        "Creating a timeline and photography approach.",
    },
    {
      number: "03",
      title: "Photography",
      description:
        "Capturing authentic moments with minimal interruption.",
    },
    {
      number: "04",
      title: "Delivery",
      description:
        "Carefully edited photographs delivered in a premium gallery.",
    },
  ],
};

export default function AboutProcess() {
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

        steps:
          Array.isArray(
            parsed.steps
          )
            ? parsed.steps
            : defaultSettings.steps,
      };
    }
  } catch (error) {
    console.error(
      "Failed to load About Process settings:",
      error
    );
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <section className="about-process">

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


        {/* =========================
            PROCESS GRID
        ========================= */}

        <div className="process-grid">

          {settings.steps.map(
            (
              step,
              index
            ) => (

              <div
                className="process-card"
                key={
                  `${step.number}-${index}`
                }
              >

                <h3>
                  {
                    step.number
                  }
                </h3>

                <h4>
                  {
                    step.title
                  }
                </h4>

                <p>
                  {
                    step.description
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