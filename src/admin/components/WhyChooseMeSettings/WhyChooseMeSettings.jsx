import {
  useState,
} from "react";

import "../../styles/homepage-settings.css";


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


export default function WhyChooseMeSettings() {

  /* =========================
     LOAD SETTINGS
  ========================= */

  const [
    settings,
    setSettings,
  ] = useState(() => {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );


      if (!saved) {

        return {
          ...defaultSettings,

          features:
            defaultSettings.features.map(
              (item) => ({
                ...item,
              })
            ),
        };

      }


      const parsed =
        JSON.parse(
          saved
        );


      return {
        ...defaultSettings,
        ...parsed,

        features:
          Array.isArray(
            parsed.features
          )
            ? parsed.features
            : defaultSettings.features,
      };

    } catch (error) {

      console.error(
        "Failed to load Why Choose Me settings:",
        error
      );


      return {
        ...defaultSettings,

        features:
          defaultSettings.features.map(
            (item) => ({
              ...item,
            })
          ),
      };

    }

  });


  /* =========================
     SAVED MESSAGE
  ========================= */

  const [
    saved,
    setSaved,
  ] = useState(false);


  /* =========================
     HANDLE GENERAL CHANGE
  ========================= */

  const handleChange = (
    event
  ) => {

    const {
      name,
      value,
    } = event.target;


    setSettings(
      (prev) => ({
        ...prev,

        [name]:
          value,
      })
    );


    setSaved(false);

  };


  /* =========================
     HANDLE FEATURE CHANGE
  ========================= */

  const handleFeatureChange = (
    index,
    field,
    value
  ) => {

    setSettings(
      (prev) => {

        const updatedFeatures =
          prev.features.map(
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
          ...prev,

          features:
            updatedFeatures,
        };

      }
    );


    setSaved(false);

  };


  /* =========================
     SAVE SETTINGS
  ========================= */

  const handleSave =
    () => {

      try {

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(
            settings
          )
        );


        setSaved(true);


        setTimeout(
          () => {

            setSaved(false);

          },
          3000
        );

      } catch (error) {

        console.error(
          "Failed to save Why Choose Me settings:",
          error
        );

      }

    };


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
              key={index}
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
                {index + 1}
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
            SAVE BUTTON
        ========================= */}

        <button
          type="button"
          className="media-button"
          onClick={
            handleSave
          }
          style={{
            marginTop:
              "30px",
          }}
        >
          Save Why Choose Me
        </button>


        {/* =========================
            SUCCESS MESSAGE
        ========================= */}

        {saved && (

          <div className="settings-success-message">

            Why Choose Me settings
            saved successfully.

          </div>

        )}

      </div>

    </div>

  );
}