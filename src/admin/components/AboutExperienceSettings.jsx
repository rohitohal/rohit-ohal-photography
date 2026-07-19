import { useState } from "react";

import "../styles/homepage-settings.css";

const STORAGE_KEY =
  "rohit-photography-about-experience";

const defaultSettings = {
  label: "EXPERIENCE",

  headingLine1:
    "Built On Experience.",

  headingLine2:
    "Driven By Passion.",

  stats: [
    {
      number: "10+",
      title: "Years of Experience",
      description:
        "Capturing weddings, portraits and commercial stories with consistency and artistic vision.",
    },
    {
      number: "500+",
      title: "Stories Documented",
      description:
        "Every celebration, portrait and project is approached with the same passion and attention to detail.",
    },
    {
      number: "Fine Arts",
      title: "Creative Foundation",
      description:
        "A background in Fine Arts shapes every composition, colour palette and visual narrative.",
    },
    {
      number: "Worldwide",
      title: "Available to Travel",
      description:
        "Based in Pune, India and available for destination weddings and assignments around the world.",
    },
  ],
};

export default function AboutExperienceSettings() {
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

          stats:
            Array.isArray(
              parsed.stats
            )
              ? parsed.stats
              : defaultSettings.stats,
        };
      } catch (error) {
        console.error(
          "Failed to load About Experience settings:",
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
     HANDLE STAT CHANGE
  ========================= */

  const handleStatChange = (
    index,
    field,
    value
  ) => {
    setSettings(
      (prev) => {
        const updatedStats = [
          ...prev.stats,
        ];

        updatedStats[index] = {
          ...updatedStats[index],
          [field]: value,
        };

        return {
          ...prev,
          stats:
            updatedStats,
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
        "Failed to save About Experience settings:",
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
          EXPERIENCE
        </span>

        <h2>
          Experience Section
        </h2>

        <p>
          Manage the experience
          heading and statistics
          displayed on your About
          page.
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
            EXPERIENCE CARDS
        ========================= */}

        {settings.stats.map(
          (
            item,
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
                Experience Card{" "}
                {index + 1}
              </h3>


              {/* NUMBER */}

              <div className="form-group">

                <label>
                  Number / Highlight
                </label>

                <input
                  type="text"
                  value={
                    item.number
                  }
                  onChange={(
                    event
                  ) =>
                    handleStatChange(
                      index,
                      "number",
                      event.target
                        .value
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
                    item.title
                  }
                  onChange={(
                    event
                  ) =>
                    handleStatChange(
                      index,
                      "title",
                      event.target
                        .value
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
                  rows="4"
                  value={
                    item.description
                  }
                  onChange={(
                    event
                  ) =>
                    handleStatChange(
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
            SAVE
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
          Save Experience
        </button>


        {/* SUCCESS MESSAGE */}

        {saved && (

          <div className="settings-success-message">
            Experience settings
            saved successfully.
          </div>

        )}

      </div>

    </div>
  );
}