import "./WhyChooseMe.css";


/* =========================
   STORAGE KEY
========================= */

const STORAGE_KEY =
  "rohit-photography-homepage-why";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {
  label:
    "WHY CHOOSE ROHIT OHAL",

  headingLine1:
    "Photography Built",

  headingLine2:
    "Around Emotion.",

  features: [
    {
      number: "01",

      title:
        "Fine Art Foundation",

      text:
        "A background in Fine Arts allows every photograph to be composed with balance, light and emotion rather than simply documenting the moment.",
    },

    {
      number: "02",

      title:
        "Story-Driven Approach",

      text:
        "Every wedding, portrait or commercial assignment is captured as a complete visual story with genuine moments and timeless imagery.",
    },

    {
      number: "03",

      title:
        "Professional Experience",

      text:
        "More than a decade of experience photographing weddings, portraits, industrial projects and editorial assignments across India.",
    },

    {
      number: "04",

      title:
        "Quality Over Quantity",

      text:
        "Every image is individually selected, colour graded and refined to maintain a consistent premium standard throughout the final collection.",
    },
  ],
};


export default function WhyChooseMe() {

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
        JSON.parse(
          saved
        );


      settings = {
        ...defaultSettings,
        ...parsed,

        features:
          Array.isArray(
            parsed.features
          )
            ? parsed.features
            : defaultSettings.features,
      };

    }

  } catch (error) {

    console.error(
      "Failed to load Why Choose Me settings:",
      error
    );

  }


  /* =========================
     RENDER
  ========================= */

  return (

    <section className="why">

      <div className="why-container">


        {/* =========================
            HEADER
        ========================= */}

        <div className="why-header">

          <span>
            {settings.label}
          </span>


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

        </div>


        {/* =========================
            FEATURES GRID
        ========================= */}

        <div className="why-grid">

          {settings.features.map(
            (
              item,
              index
            ) => (

              <div
                className="why-card"
                key={
                  `${item.number}-${index}`
                }
              >


                {/* NUMBER */}

                {item.number && (

                  <span className="why-number">

                    {
                      item.number
                    }

                  </span>

                )}


                {/* TITLE */}

                {item.title && (

                  <h3>

                    {
                      item.title
                    }

                  </h3>

                )}


                {/* DESCRIPTION */}

                {item.text && (

                  <p>

                    {
                      item.text
                    }

                  </p>

                )}

              </div>

            )
          )}

        </div>

      </div>

    </section>

  );
}