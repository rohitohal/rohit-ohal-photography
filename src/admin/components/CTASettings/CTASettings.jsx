import {
  useEffect,
  useState,
} from "react";

import {
  supabase,
} from "../../../lib/supabase";

import "../../styles/homepage-settings.css";


/* =========================
   SUPABASE SETTING KEY
========================= */

const SETTING_KEY =
  "homepage_cta";


/* =========================
   DEFAULT SETTINGS
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
   CTA SETTINGS
========================= */

export default function CTASettings() {

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
     LOADING
  ========================= */

  const [
    loading,
    setLoading,
  ] =
    useState(true);


  /* =========================
     SAVING
  ========================= */

  const [
    saving,
    setSaving,
  ] =
    useState(false);


  /* =========================
     MESSAGE
  ========================= */

  const [
    message,
    setMessage,
  ] =
    useState({

      type:
        "",

      text:
        "",

    });


  /* =========================
     LOAD SETTINGS
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadSettings() {

      try {

        setLoading(
          true
        );


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
         * Supabase is the single source
         * of truth for Homepage CTA.
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
         * No Supabase record exists.
         * Use defaults in the form.
         */

        setSettings({
          ...defaultCTASettings,
        });


      } catch (
        error
      ) {

        console.error(
          "Failed to load CTA settings:",
          error
        );


        if (
          mounted
        ) {

          setMessage({

            type:
              "error",

            text:
              "Unable to load CTA settings from Supabase.",

          });

        }


      } finally {

        if (
          mounted
        ) {

          setLoading(
            false
          );

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
     HANDLE CHANGE
  ========================= */

  function handleChange(
    event
  ) {

    const {
      name,
      value,
    } =
      event.target;


    setSettings(
      (
        previous
      ) => ({

        ...previous,

        [name]:
          value,

      })
    );


    setMessage({

      type:
        "",

      text:
        "",

    });

  }


  /* =========================
     SAVE SETTINGS
  ========================= */

  async function handleSave() {

    if (
      saving
    ) {

      return;

    }


    try {

      setSaving(
        true
      );


      setMessage({

        type:
          "",

        text:
          "",

      });


      const payload = {

        label:
          settings.label?.trim() ||
          "",

        headingLine1:
          settings.headingLine1?.trim() ||
          "",

        headingLine2:
          settings.headingLine2?.trim() ||
          "",

        headingLine3:
          settings.headingLine3?.trim() ||
          "",

        headingLine4:
          settings.headingLine4?.trim() ||
          "",

        description:
          settings.description?.trim() ||
          "",

        buttonText:
          settings.buttonText?.trim() ||
          "",

        buttonLink:
          settings.buttonLink?.trim() ||
          "/contact",

      };


      const {
        error,
      } =
        await supabase
          .from(
            "site_settings"
          )
          .upsert(
            {

              setting_key:
                SETTING_KEY,

              setting_value:
                payload,

              updated_at:
                new Date()
                  .toISOString(),

            },
            {

              onConflict:
                "setting_key",

            }
          );


      if (
        error
      ) {

        throw error;

      }


      setSettings(
        normalizeSettings(
          payload
        )
      );


      setMessage({

        type:
          "success",

        text:
          "CTA saved successfully.",

      });


    } catch (
      error
    ) {

      console.error(
        "Failed to save CTA settings:",
        error
      );


      setMessage({

        type:
          "error",

        text:
          error?.message ||
          "Unable to save CTA settings.",

      });


    } finally {

      setSaving(
        false
      );

    }

  }


  /* =========================
     LOADING
  ========================= */

  if (
    loading
  ) {

    return (

      <div className="homepage-settings-card">

        <div className="homepage-settings-header">

          <span className="homepage-overline">
            CALL TO ACTION
          </span>


          <h2>
            Homepage CTA
          </h2>


          <p>
            Loading CTA settings...
          </p>

        </div>

      </div>

    );

  }


  /* =========================
     RENDER
  ========================= */

  return (

    <div className="homepage-settings-card">


      {/* =========================
          HEADER
      ========================= */}

      <div className="homepage-settings-header">

        <span className="homepage-overline">
          CALL TO ACTION
        </span>


        <h2>
          Homepage CTA
        </h2>


        <p>
          Manage the call to action
          displayed near the bottom
          of your homepage.
        </p>

      </div>


      {/* =========================
          MESSAGE
      ========================= */}

      {message.text && (

        <div
          style={{
            marginBottom:
              "24px",

            padding:
              "12px 16px",

            borderRadius:
              "8px",

            fontSize:
              "14px",

            lineHeight:
              "1.5",

            background:
              message.type ===
              "success"
                ? "#f3faf4"
                : message.type ===
                  "error"
                  ? "#fff4f4"
                  : "#f7f7f7",

            color:
              message.type ===
              "success"
                ? "#347342"
                : message.type ===
                  "error"
                  ? "#b33a3a"
                  : "#555",
          }}
        >

          {
            message.text
          }

        </div>

      )}


      {/* =========================
          FORM
      ========================= */}

      <div className="homepage-form">


        {/* LABEL */}

        <div className="form-group">

          <label>
            Section Label
          </label>


          <input
            type="text"
            name="label"
            value={
              settings.label
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* HEADING LINE 1 */}

        <div className="form-group">

          <label>
            Heading Line 1
          </label>


          <input
            type="text"
            name="headingLine1"
            value={
              settings.headingLine1
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* HEADING LINE 2 */}

        <div className="form-group">

          <label>
            Heading Line 2
          </label>


          <input
            type="text"
            name="headingLine2"
            value={
              settings.headingLine2
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* HEADING LINE 3 */}

        <div className="form-group">

          <label>
            Heading Line 3
          </label>


          <input
            type="text"
            name="headingLine3"
            value={
              settings.headingLine3
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* HEADING LINE 4 */}

        <div className="form-group">

          <label>
            Heading Line 4
          </label>


          <input
            type="text"
            name="headingLine4"
            value={
              settings.headingLine4
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* DESCRIPTION */}

        <div className="form-group">

          <label>
            Description
          </label>


          <textarea
            rows="6"
            name="description"
            value={
              settings.description
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* BUTTON TEXT */}

        <div className="form-group">

          <label>
            Button Text
          </label>


          <input
            type="text"
            name="buttonText"
            value={
              settings.buttonText
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* BUTTON LINK */}

        <div className="form-group">

          <label>
            Button Link
          </label>


          <input
            type="text"
            name="buttonLink"
            value={
              settings.buttonLink
            }
            onChange={
              handleChange
            }
            placeholder="/contact"
          />

        </div>


        {/* =========================
            SAVE
        ========================= */}

        <button
          type="button"
          className="media-button"
          onClick={
            handleSave
          }
          disabled={
            saving
          }
        >

          {
            saving
              ? "Saving..."
              : "Save CTA"
          }

        </button>

      </div>

    </div>

  );

}