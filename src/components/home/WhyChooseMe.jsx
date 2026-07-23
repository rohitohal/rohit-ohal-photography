import {
  useEffect,
  useState,
} from "react";

import {
  supabase,
} from "../../lib/supabase";

import "./WhyChooseMe.css";


/* =========================
   SUPABASE SETTING KEY
========================= */

const SETTING_KEY =
  "homepage_why";


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
      number:
        "01",

      title:
        "Fine Art Foundation",

      text:
        "A background in Fine Arts allows every photograph to be composed with balance, light and emotion rather than simply documenting the moment.",
    },

    {
      number:
        "02",

      title:
        "Story-Driven Approach",

      text:
        "Every wedding, portrait or commercial assignment is captured as a complete visual story with genuine moments and timeless imagery.",
    },

    {
      number:
        "03",

      title:
        "Professional Experience",

      text:
        "More than a decade of experience photographing weddings, portraits, industrial projects and editorial assignments across India.",
    },

    {
      number:
        "04",

      title:
        "Quality Over Quantity",

      text:
        "Every image is individually selected, colour graded and refined to maintain a consistent premium standard throughout the final collection.",
    },

  ],

};


/* =========================
   CLONE DEFAULT FEATURES
========================= */

function getDefaultFeatures() {

  return defaultSettings.features.map(
    (
      feature
    ) => ({

      ...feature,

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

      features:
        getDefaultFeatures(),

    };

  }


  return {

    ...defaultSettings,

    ...data,

    features:
      Array.isArray(
        data.features
      )
        ? data.features.map(
            (
              feature,
              index
            ) => ({

              ...(
                defaultSettings
                  .features[
                    index
                  ] || {}
              ),

              ...feature,

            })
          )
        : getDefaultFeatures(),

  };

}


/* =========================
   WHY CHOOSE ME
========================= */

export default function WhyChooseMe() {

  /* =========================
     SETTINGS
  ========================= */

  const [
    settings,
    setSettings,
  ] =
    useState({

      ...defaultSettings,

      features:
        getDefaultFeatures(),

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

          features:
            getDefaultFeatures(),

        });


      } catch (
        error
      ) {

        console.error(
          "Failed to load Why Choose Me from Supabase:",
          error
        );


        if (
          mounted
        ) {

          setSettings({

            ...defaultSettings,

            features:
              getDefaultFeatures(),

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

    <section className="why">

      <div className="why-container">


        {/* =========================
            HEADER
        ========================= */}

        <div className="why-header">


          {/* LABEL */}

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