import { useState } from "react";

import "../styles/homepage-settings.css";

const STORAGE_KEY =
  "rohit-photography-about-process";

const defaultSettings = {
  label: "MY PROCESS",

  headingLine1:
    "A Seamless Experience",

  headingLine2:
    "From Start To Finish",

  steps: [
    {
      number: "01",
      title: "Consultation",
      description:
        "Understanding your vision, expectations and story.",
    },
    {
      number: "02",
      title: "Planning",
      description:
        "Creating a timeline and photography approach.",
    },
    {
      number: "03",
      title: "Photography",
      description:
        "Capturing authentic moments with minimal interruption.",
    },
    {
      number: "04",
      title: "Delivery",
      description:
        "Carefully edited photographs delivered in a premium gallery.",
    },
  ],
};

export default function AboutProcessSettings() {
  /* =========================
     LOAD SETTINGS
  ========================= */

  const [settings, setSettings] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            STORAGE_KEY
          );

        if (!saved) {
          return defaultSettings;
        }

        const parsed =
          JSON.parse(saved);

        return {
          ...defaultSettings,
          ...parsed,

          steps:
            Array.isArray(
              parsed.steps
            )
              ? parsed.steps
              : defaultSettings.steps,
        };
      } catch (error) {
        console.error(
          "Failed to load About Process settings:",
          error
        );

        return defaultSettings;
      }
    });

  /* =========================
     SAVED MESSAGE
  ========================= */

  const [saved, setSaved] =
    useState(false);

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
        [name]: value,
      })
    );

    setSaved(false);
  };

  /* =========================
     HANDLE STEP CHANGE
  ========================= */

  const handleStepChange = (
    index,
    field,
    value
  ) => {
    setSettings(
      (prev) => {
        const updatedSteps = [
          ...prev.steps,
        ];

        updatedSteps[index] = {
          ...updatedSteps[index],
          [field]: value,
        };

        return {
          ...prev,
          steps:
            updatedSteps,
        };
      }
    );

    setSaved(false);
  };

  /* =========================
     SAVE SETTINGS
  ========================= */

  const handleSave = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          settings
        )
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error(
        "Failed to save About Process settings:",
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
          PROCESS
        </span>

        <h2>
          Process Section
        </h2>

        <p>
          Manage the process heading
          and steps displayed on your
          About page.
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
            PROCESS STEPS
        ========================= */}

        {settings.steps.map(
          (
            step,
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
                Process Step{" "}
                {index + 1}
              </h3>


              {/* STEP NUMBER */}

              <div className="form-group">

                <label>
                  Step Number
                </label>

                <input
                  type="text"
                  value={
                    step.number
                  }
                  onChange={(
                    event
                  ) =>
                    handleStepChange(
                      index,
                      "number",
                      event.target
                        .value
                    )
                  }
                />

              </div>


              {/* STEP TITLE */}

              <div className="form-group">

                <label>
                  Step Title
                </label>

                <input
                  type="text"
                  value={
                    step.title
                  }
                  onChange={(
                    event
                  ) =>
                    handleStepChange(
                      index,
                      "title",
                      event.target
                        .value
                    )
                  }
                />

              </div>


              {/* STEP DESCRIPTION */}

              <div className="form-group">

                <label>
                  Step Description
                </label>

                <textarea
                  rows="4"
                  value={
                    step.description
                  }
                  onChange={(
                    event
                  ) =>
                    handleStepChange(
                      index,
                      "description",
                      event.target
                        .value
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
          Save Process
        </button>


        {/* SUCCESS MESSAGE */}

        {saved && (

          <div className="settings-success-message">
            Process settings saved
            successfully.
          </div>

        )}

      </div>

    </div>
  );
}