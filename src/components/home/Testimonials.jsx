import "./Testimonials.css";


/* =========================
   STORAGE KEY
========================= */

const STORAGE_KEY =
  "rohit-photography-homepage-testimonials";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {
  label:
    "KIND WORDS",

  headingLine1:
    "Trusted By",

  headingLine2:
    "Wonderful People",

  testimonials: [
    {
      id: 1,

      name:
        "Aditi & Akshay",

      location:
        "Pune",

      review:
        "Rohit captured our wedding exactly as we lived it. Every photograph feels natural, emotional and timeless.",
    },

    {
      id: 2,

      name:
        "Rahul Sharma",

      location:
        "Corporate Client",

      review:
        "Professional from start to finish. The final images exceeded every expectation and perfectly represented our brand.",
    },

    {
      id: 3,

      name:
        "Chef Arjun",

      location:
        "Restaurant Owner",

      review:
        "His eye for light and composition transformed our menu and social media presence completely.",
    },
  ],
};


export default function Testimonials() {

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

        testimonials:
          Array.isArray(
            parsed.testimonials
          )
            ? parsed.testimonials
            : defaultSettings.testimonials,
      };

    }

  } catch (error) {

    console.error(
      "Failed to load Testimonials settings:",
      error
    );

  }


  /* =========================
     RENDER
  ========================= */

  return (

    <section className="testimonials">

      <div className="testimonials-container">


        {/* =========================
            HEADER
        ========================= */}

        <div className="testimonials-header">


          {/* SECTION LABEL */}

          {settings.label && (

            <span>
              {
                settings.label
              }
            </span>

          )}


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

        </div>


        {/* =========================
            TESTIMONIAL GRID
        ========================= */}

        <div className="testimonial-grid">

          {settings.testimonials.map(
            (
              item,
              index
            ) => (

              <div
                key={
                  item.id ||
                  `${item.name}-${index}`
                }
                className="testimonial-card"
              >


                {/* REVIEW */}

                {item.review && (

                  <p className="testimonial-review">

                    “{item.review}”

                  </p>

                )}


                {/* CLIENT NAME */}

                {item.name && (

                  <h3>
                    {
                      item.name
                    }
                  </h3>

                )}


                {/* LOCATION / CLIENT TYPE */}

                {item.location && (

                  <span>
                    {
                      item.location
                    }
                  </span>

                )}

              </div>

            )
          )}

        </div>

      </div>

    </section>

  );
}