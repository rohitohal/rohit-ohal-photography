import { useState } from "react";

import "../styles/homepage-settings.css";

const STORAGE_KEY =
  "rohit-photography-about-cta";

const defaultSettings = {
  label:
    "LET'S CREATE SOMETHING BEAUTIFUL",

  headingLine1:
    "Your Story",

  headingLine2:
    "Deserves To Be",

  headingLine3:
    "Remembered.",

  description:
    "Whether you're planning a wedding, portrait session, destination wedding, or a commercial project, I'd love to hear your story and create something unforgettable together.",

  buttonText:
    "Start Your Journey",

  buttonLink:
    "/contact",
};

export default function AboutCTASettings() {
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

        return {
          ...defaultSettings,
          ...JSON.parse(saved),
        };
      } catch (error) {
        console.error(
          "Failed to load About CTA settings:",
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
     HANDLE CHANGE
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
        "Failed to save About CTA settings:",
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
          CALL TO ACTION
        </span>

        <h2>
          About Page CTA
        </h2>

        <p>
          Manage the call to action
          displayed at the bottom of
          your About page.
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
        >
          Save About CTA
        </button>


        {/* SUCCESS MESSAGE */}

        {saved && (

          <div className="settings-success-message">
            About CTA settings saved
            successfully.
          </div>

        )}

      </div>

    </div>
  );
}