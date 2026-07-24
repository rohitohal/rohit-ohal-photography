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
   WHY CHOOSE ME SETTINGS
========================= */

export default function WhyChooseMeSettings() {

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
         * of truth for Why Choose Me.
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

          ...defaultSettings,

          features:
            getDefaultFeatures(),

        });


      } catch (
        error
      ) {

        console.error(
          "Failed to load Why Choose Me settings:",
          error
        );


        if (
          mounted
        ) {

          setMessage({

            type:
              "error",

            text:
              "Unable to load Why Choose Me settings from Supabase.",

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
     HANDLE GENERAL CHANGE
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
     HANDLE FEATURE CHANGE
  ========================= */

  function handleFeatureChange(
    index,
    field,
    value
  ) {

    setSettings(
      (
        previous
      ) => {

        const updatedFeatures =
          previous.features.map(
            (
              feature,
              featureIndex
            ) =>
              featureIndex ===
              index
                ? {

                    ...feature,

                    [field]:
                      value,

                  }
                : feature
          );


        return {

          ...previous,

          features:
            updatedFeatures,

        };

      }
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

        features:
          settings.features.map(
            (
              feature
            ) => ({

              number:
                feature.number?.trim() ||
                "",

              title:
                feature.title?.trim() ||
                "",

              text:
                feature.text?.trim() ||
                "",

            })
          ),

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
          "Why Choose Me settings saved successfully.",

      });


    } catch (
      error
    ) {

      console.error(
        "Failed to save Why Choose Me settings:",
        error
      );


      setMessage({

        type:
          "error",

        text:
          error?.message ||
          "Unable to save Why Choose Me settings.",

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
            WHY CHOOSE ME
          </span>


          <h2>
            Why Choose Me Section
          </h2>


          <p>
            Loading Why Choose Me settings...
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
          WHY CHOOSE ME
        </span>


        <h2>
          Why Choose Me Section
        </h2>


        <p>
          Manage the heading and
          feature cards displayed in
          the Why Choose Me section
          on your homepage.
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


        {/* SECTION LABEL */}

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


        {/* =========================
            FEATURE CARDS
        ========================= */}

        {settings.features.map(
          (
            feature,
            index
          ) => (

            <div
              key={
                index
              }
              style={{
                marginTop:
                  "30px",

                padding:
                  "24px",

                border:
                  "1px solid #ece8df",

                borderRadius:
                  "14px",

                background:
                  "#faf9f6",
              }}
            >

              <h3
                style={{
                  marginTop:
                    0,

                  marginBottom:
                    "20px",
                }}
              >

                Feature Card{" "}
                {
                  index + 1
                }

              </h3>


              {/* NUMBER */}

              <div className="form-group">

                <label>
                  Number
                </label>


                <input
                  type="text"
                  value={
                    feature.number
                  }
                  onChange={(
                    event
                  ) =>
                    handleFeatureChange(
                      index,
                      "number",
                      event.target.value
                    )
                  }
                />

              </div>


              {/* TITLE */}

              <div className="form-group">

                <label>
                  Title
                </label>


                <input
                  type="text"
                  value={
                    feature.title
                  }
                  onChange={(
                    event
                  ) =>
                    handleFeatureChange(
                      index,
                      "title",
                      event.target.value
                    )
                  }
                />

              </div>


              {/* DESCRIPTION */}

              <div className="form-group">

                <label>
                  Description
                </label>


                <textarea
                  rows="5"
                  value={
                    feature.text
                  }
                  onChange={(
                    event
                  ) =>
                    handleFeatureChange(
                      index,
                      "text",
                      event.target.value
                    )
                  }
                />

              </div>

            </div>

          )
        )}


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
          style={{
            marginTop:
              "30px",
          }}
        >

          {
            saving
              ? "Saving..."
              : "Save Why Choose Me"
          }

        </button>

      </div>

    </div>

  );

}