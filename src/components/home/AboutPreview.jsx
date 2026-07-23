import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  supabase,
} from "../../lib/supabase";

import "./AboutPreview.css";


/* =========================
   SUPABASE SETTING KEY
========================= */

const SETTING_KEY =
  "homepage_about";


/* =========================
   DEFAULT ABOUT SETTINGS
========================= */

const defaultAboutSettings = {

  label:
    "ABOUT ROHIT OHAL",

  heading:
    "Fine Art.\nDocumentary.\nTimeless.",

  description:
    "I believe photographs should do more than document a moment. They should preserve emotion, atmosphere and the little details that become priceless with time. My work combines documentary storytelling with a fine art approach to create images that feel authentic, elegant and enduring.",

  yearsValue:
    "10+",

  yearsLabel:
    "Years Experience",

  projectsValue:
    "500+",

  projectsLabel:
    "Projects Delivered",

  educationValue:
    "Fine Arts",

  educationLabel:
    "Graduate",

  image:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80",

  buttonText:
    "Learn More About Me",

  buttonLink:
    "/about",

};


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
      ...defaultAboutSettings,
    };

  }


  return {

    ...defaultAboutSettings,

    ...data,

  };

}


/* =========================
   ABOUT PREVIEW
========================= */

export default function AboutPreview() {

  /* =========================
     SETTINGS
  ========================= */

  const [
    settings,
    setSettings,
  ] =
    useState(
      defaultAboutSettings
    );


  /* =========================
     LOAD FROM SUPABASE
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadAboutSettings() {

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
         * No saved Supabase data.
         * Keep default settings.
         */

        setSettings({
          ...defaultAboutSettings,
        });


      } catch (
        error
      ) {

        console.error(
          "Failed to load Homepage About from Supabase:",
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
            ...defaultAboutSettings,
          });

        }

      }

    }


    loadAboutSettings();


    return () => {

      mounted =
        false;

    };

  }, []);


  /* =========================
     HEADING LINES
  ========================= */

  const headingLines =
    useMemo(
      () => {

        const heading =
          typeof settings.heading ===
          "string"
            ? settings.heading
            : "";


        return heading
          .split(
            "\n"
          )
          .filter(
            (
              line
            ) =>
              line.trim() !==
              ""
          );

      },
      [
        settings.heading,
      ]
    );


  /* =========================
     RENDER
  ========================= */

  return (

    <section className="about-preview">

      <div className="about-preview-container">


        {/* =========================
            CONTENT
        ========================= */}

        <div className="about-preview-content">


          {/* LABEL */}

          {settings.label && (

            <span className="about-label">

              {
                settings.label
              }

            </span>

          )}


          {/* HEADING */}

          {headingLines.length >
            0 && (

            <h2>

              {headingLines.map(
                (
                  line,
                  index
                ) => (

                  <span
                    key={
                      `${line}-${index}`
                    }
                  >

                    {
                      line
                    }


                    {index <
                      headingLines.length -
                        1 && (

                      <br />

                    )}

                  </span>

                )
              )}

            </h2>

          )}


          {/* DESCRIPTION */}

          {settings.description && (

            <p>

              {
                settings.description
              }

            </p>

          )}


          {/* =========================
              STATISTICS
          ========================= */}

          <div className="about-info">


            {/* YEARS */}

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


            {/* PROJECTS */}

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


            {/* EDUCATION */}

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


          {/* =========================
              BUTTON
          ========================= */}

          {settings.buttonText && (

            <Link
              to={
                settings.buttonLink ||
                "/about"
              }
              className="about-button"
            >

              {
                settings.buttonText
              }

            </Link>

          )}

        </div>


        {/* =========================
            IMAGE
        ========================= */}

        {settings.image && (

          <div className="about-preview-image">

            <img
              src={
                settings.image
              }
              alt="Rohit Ohal"
              loading="lazy"
            />

          </div>

        )}

      </div>

    </section>

  );

}