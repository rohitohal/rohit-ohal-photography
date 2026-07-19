import { useState } from "react";

import "../styles/homepage-settings.css";

const STORAGE_KEY =
  "rohit-photography-about-philosophy";

const defaultSettings = {
  label: "MY PHILOSOPHY",

  headingLine1:
    "Honest Moments.",

  headingLine2:
    "Elegant Storytelling.",

  description:
    "Great photography is not about directing every pose. It is about observing, anticipating and preserving emotions as they naturally unfold. My work combines documentary storytelling with fine art composition, ensuring every image feels authentic and timeless.",
};

export default function AboutPhilosophySettings() {
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

        return saved
          ? {
              ...defaultSettings,
              ...JSON.parse(saved),
            }
          : defaultSettings;
      } catch (error) {
        console.error(
          "Failed to load About Philosophy settings:",
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
        "Failed to save About Philosophy settings:",
        error
      );
    }
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="homepage-settings-card">

      {/* HEADER */}

      <div className="homepage-settings-header">

        <span className="homepage-overline">
          MY PHILOSOPHY
        </span>

        <h2>
          Philosophy Section
        </h2>

        <p>
          Manage the philosophy
          section displayed on your
          About page.
        </p>

      </div>

      {/* FORM */}

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

        {/* DESCRIPTION */}

        <div className="form-group">

          <label>
            Philosophy Description
          </label>

          <textarea
            rows="7"
            name="description"
            value={
              settings.description
            }
            onChange={
              handleChange
            }
          />

        </div>

        {/* SAVE BUTTON */}

        <button
          type="button"
          className="media-button"
          onClick={
            handleSave
          }
        >
          Save Philosophy
        </button>

        {/* SUCCESS MESSAGE */}

        {saved && (

          <div className="settings-success-message">
            Philosophy settings
            saved successfully.
          </div>

        )}

      </div>

    </div>
  );
}