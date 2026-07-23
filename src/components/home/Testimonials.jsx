import {
  useEffect,
  useState,
} from "react";

import {
  supabase,
} from "../../lib/supabase";

import "./Testimonials.css";


/* =========================
   SUPABASE SETTING KEY
========================= */

const SETTING_KEY =
  "homepage_testimonials";


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


/* =========================
   CLONE DEFAULT TESTIMONIALS
========================= */

function getDefaultTestimonials() {

  return defaultSettings.testimonials.map(
    (
      testimonial
    ) => ({

      ...testimonial,

    })
  );

}


/* =========================
   NORMALIZE SETTINGS
========================= */

function normalizeSettings(
  data
) {

  if (
    !data ||
    typeof data !==
      "object"
  ) {

    return {

      ...defaultSettings,

      testimonials:
        getDefaultTestimonials(),

    };

  }


  return {

    ...defaultSettings,

    ...data,

    testimonials:
      Array.isArray(
        data.testimonials
      )
        ? data.testimonials.map(
            (
              testimonial,
              index
            ) => ({

              id:
                testimonial.id ||
                `testimonial-${index}`,

              name:
                testimonial.name ||
                "",

              location:
                testimonial.location ||
                "",

              review:
                testimonial.review ||
                "",

            })
          )
        : getDefaultTestimonials(),

  };

}


/* =========================
   TESTIMONIALS
========================= */

export default function Testimonials() {

  /* =========================
     SETTINGS
  ========================= */

  const [
    settings,
    setSettings,
  ] =
    useState({

      ...defaultSettings,

      testimonials:
        getDefaultTestimonials(),

    });


  /* =========================
     LOAD FROM SUPABASE
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadSettings() {

      try {

        const {
          data,
          error,
        } =
          await supabase
            .from(
              "site_settings"
            )
            .select(
              "setting_value"
            )
            .eq(
              "setting_key",
              SETTING_KEY
            )
            .maybeSingle();


        if (
          error
        ) {

          throw error;

        }


        if (
          !mounted
        ) {

          return;

        }


        /*
         * Supabase settings exist.
         */

        if (
          data?.setting_value
        ) {

          setSettings(
            normalizeSettings(
              data.setting_value
            )
          );


          return;

        }


        /*
         * No Supabase record.
         * Keep default content.
         */

        setSettings({

          ...defaultSettings,

          testimonials:
            getDefaultTestimonials(),

        });


      } catch (
        error
      ) {

        console.error(
          "Failed to load Testimonials from Supabase:",
          error
        );


        /*
         * Keep default content if
         * Supabase cannot be reached.
         */

        if (
          mounted
        ) {

          setSettings({

            ...defaultSettings,

            testimonials:
              getDefaultTestimonials(),

          });

        }

      }

    }


    loadSettings();


    return () => {

      mounted =
        false;

    };

  }, []);


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

          {(settings.headingLine1 ||
            settings.headingLine2) && (

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

          )}

        </div>


        {/* =========================
            TESTIMONIAL GRID
        ========================= */}

        {settings.testimonials.length >
          0 && (

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


                  {/* LOCATION */}

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

        )}

      </div>

    </section>

  );

}