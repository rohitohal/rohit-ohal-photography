import { useState } from "react";

import "../../styles/homepage-settings.css";

const defaultCTASettings = {
  label: "CONVERSATION",

  headingLine1: "Let's make",
  headingLine2: "something",
  headingLine3: "quiet,",
  headingLine4: "and lasting.",

  description:
    "Every wedding has its own rhythm and story. If you connect with my work, I'd love to hear about your plans and create something timeless together.",

  buttonText:
    "BEGIN A CONVERSATION",

  buttonLink:
    "/contact",
};

export default function CTASettings() {
  const [settings, setSettings] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            "rohit-photography-homepage-cta"
          );

        return saved
          ? {
              ...defaultCTASettings,
              ...JSON.parse(saved),
            }
          : defaultCTASettings;
      } catch (error) {
        console.error(
          "Failed to load CTA settings:",
          error
        );

        return defaultCTASettings;
      }
    });

  const [saved, setSaved] =
    useState(false);

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

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
    localStorage.setItem(
      "rohit-photography-homepage-cta",
      JSON.stringify(
        settings
      )
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

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
          Manage the call to action displayed
          near the bottom of your homepage.
        </p>

      </div>

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

        {/* HEADING */}

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

        {/* BUTTON */}

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

        {/* SAVE */}

        <button
          type="button"
          className="media-button"
          onClick={
            handleSave
          }
        >
          Save CTA
        </button>

        {saved && (
          <div className="settings-success-message">
            CTA saved successfully.
          </div>
        )}

      </div>

    </div>
  );
}