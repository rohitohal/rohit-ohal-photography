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

import "./CallToAction.css";


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
    "LET'S CREATE SOMETHING BEAUTIFUL",

  headingLine1:
    "Every Story Deserves",

  headingLine2:
    "To Be Remembered.",

  headingLine3:
    "",

  headingLine4:
    "",

  description:
    "Whether it's a wedding, portrait, editorial or commercial project, let's create imagery that will remain timeless for years to come.",

  buttonText:
    "Start Your Journey",

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
   CALL TO ACTION
========================= */

export default function CallToAction() {

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
         * CTA settings exist
         * in Supabase.
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
         * No CTA settings exist.
         * Keep defaults.
         */

        setSettings({
          ...defaultCTASettings,
        });


      } catch (
        error
      ) {

        console.error(
          "Failed to load Homepage CTA from Supabase:",
          error
        );


        /*
         * Keep default content
         * if Supabase fails.
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

      <div className="cta-container">


        {/* =========================
            LABEL
        ========================= */}

        {settings.label && (

          <span>

            {
              settings.label
            }

          </span>

        )}


        {/* =========================
            HEADING
        ========================= */}

        <h2>


          {/* LINE 1 */}

          {
            settings.headingLine1
          }


          {/* LINE 2 */}

          {settings.headingLine2 && (

            <>

              <br />

              {
                settings.headingLine2
              }

            </>

          )}


          {/* LINE 3 */}

          {settings.headingLine3 && (

            <>

              <br />

              {
                settings.headingLine3
              }

            </>

          )}


          {/* LINE 4 */}

          {settings.headingLine4 && (

            <>

              <br />

              {
                settings.headingLine4
              }

            </>

          )}

        </h2>


        {/* =========================
            DESCRIPTION
        ========================= */}

        {settings.description && (

          <p>

            {
              settings.description
            }

          </p>

        )}


        {/* =========================
            BUTTON
        ========================= */}

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

    </section>

  );

}