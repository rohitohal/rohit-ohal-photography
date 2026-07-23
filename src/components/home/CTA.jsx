import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  supabase,
} from "../../lib/supabase";


/* =========================
   SUPABASE SETTING KEY
========================= */

const SETTING_KEY =
  "homepage_cta";


/* =========================
   DEFAULT CTA SETTINGS
========================= */

const defaultCTASettings = {

  label:
    "CONVERSATION",

  headingLine1:
    "Let's make",

  headingLine2:
    "something",

  headingLine3:
    "quiet,",

  headingLine4:
    "and lasting.",

  description:
    "Every wedding has its own rhythm and story. If you connect with my work, I'd love to hear about your plans and create something timeless together.",

  buttonText:
    "BEGIN A CONVERSATION",

  buttonLink:
    "/contact",

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
      ...defaultCTASettings,
    };

  }


  return {

    ...defaultCTASettings,

    ...data,

  };

}


/* =========================
   CTA
========================= */

export default function CTA() {

  /* =========================
     SETTINGS
  ========================= */

  const [
    settings,
    setSettings,
  ] =
    useState({
      ...defaultCTASettings,
    });


  /* =========================
     LOAD FROM SUPABASE
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadCTASettings() {

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
         * Supabase CTA settings exist.
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
         * Keep default CTA.
         */

        setSettings({
          ...defaultCTASettings,
        });


      } catch (
        error
      ) {

        console.error(
          "Failed to load CTA settings from Supabase:",
          error
        );


        /*
         * Keep defaults if Supabase
         * cannot be reached.
         */

        if (
          mounted
        ) {

          setSettings({
            ...defaultCTASettings,
          });

        }

      }

    }


    loadCTASettings();


    return () => {

      mounted =
        false;

    };

  }, []);


  /* =========================
     RENDER
  ========================= */

  return (

    <section className="cta">

      <div className="container cta-container">


        {/* =========================
            LEFT
        ========================= */}

        <div className="cta-left">


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

                <em>

                  {
                    settings.headingLine2
                  }

                </em>

              </>

            )}


            {settings.headingLine3 && (

              <>

                <br />

                <em>

                  {
                    settings.headingLine3
                  }

                </em>

              </>

            )}


            {settings.headingLine4 && (

              <>

                <br />

                {
                  settings.headingLine4
                }

              </>

            )}

          </h2>

        </div>


        {/* =========================
            RIGHT
        ========================= */}

        <div className="cta-right">


          {/* DESCRIPTION */}

          {settings.description && (

            <p>

              {
                settings.description
              }

            </p>

          )}


          {/* BUTTON */}

          {settings.buttonText && (

            <Link
              to={
                settings.buttonLink ||
                "/contact"
              }
              className="cta-button"
            >

              {
                settings.buttonText
              }

            </Link>

          )}

        </div>

      </div>

    </section>

  );

}