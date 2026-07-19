import { useState } from "react";

import ImagePicker from "../ImagePicker/ImagePicker";

import "../../styles/homepage-settings.css";

const defaultAboutSettings = {
  label: "ABOUT ROHIT OHAL",

  heading:
    "Fine Art.\nDocumentary.\nTimeless.",

  description:
    "I believe photographs should do more than document a moment. They should preserve emotion, atmosphere and the little details that become priceless with time. My work combines documentary storytelling with a fine art approach to create images that feel authentic, elegant and enduring.",

  yearsValue: "10+",
  yearsLabel: "Years Experience",

  projectsValue: "500+",
  projectsLabel: "Projects Delivered",

  educationValue: "Fine Arts",
  educationLabel: "Graduate",

  image:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80",

  buttonText:
    "Learn More About Me",

  buttonLink:
    "/about",
};

export default function AboutSettings() {
  const [settings, setSettings] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            "rohit-photography-homepage-about"
          );

        return saved
          ? {
              ...defaultAboutSettings,
              ...JSON.parse(saved),
            }
          : defaultAboutSettings;
      } catch (error) {
        console.error(
          "Failed to load homepage about settings:",
          error
        );

        return defaultAboutSettings;
      }
    });

  const [
    isImagePickerOpen,
    setIsImagePickerOpen,
  ] = useState(false);

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
      "rohit-photography-homepage-about",
      JSON.stringify(
        settings
      )
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <>
      <div className="homepage-settings-card">

        <div className="homepage-settings-header">

          <span className="homepage-overline">
            ABOUT SECTION
          </span>

          <h2>
            Homepage About Me
          </h2>

          <p>
            Manage the introduction,
            biography, statistics and
            portrait displayed on the
            homepage.
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
              Main Heading
            </label>

            <textarea
              rows="4"
              name="heading"
              value={
                settings.heading
              }
              onChange={
                handleChange
              }
              placeholder="Fine Art.&#10;Documentary.&#10;Timeless."
            />

          </div>

          {/* DESCRIPTION */}

          <div className="form-group">

            <label>
              About Description
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

          {/* ABOUT IMAGE */}

          <div className="form-group">

            <label>
              About Photo
            </label>

            <button
              type="button"
              className="media-button secondary"
              onClick={() =>
                setIsImagePickerOpen(
                  true
                )
              }
            >
              Select About Photo
            </button>

            {settings.image && (
              <img
                src={
                  settings.image
                }
                alt="About Preview"
                className="hero-preview-image"
              />
            )}

          </div>

          {/* STATISTICS */}

          <div className="form-group">

            <label>
              Years Experience
            </label>

            <input
              type="text"
              name="yearsValue"
              value={
                settings.yearsValue
              }
              onChange={
                handleChange
              }
              placeholder="10+"
            />

            <input
              type="text"
              name="yearsLabel"
              value={
                settings.yearsLabel
              }
              onChange={
                handleChange
              }
              placeholder="Years Experience"
            />

          </div>

          <div className="form-group">

            <label>
              Projects Delivered
            </label>

            <input
              type="text"
              name="projectsValue"
              value={
                settings.projectsValue
              }
              onChange={
                handleChange
              }
              placeholder="500+"
            />

            <input
              type="text"
              name="projectsLabel"
              value={
                settings.projectsLabel
              }
              onChange={
                handleChange
              }
              placeholder="Projects Delivered"
            />

          </div>

          <div className="form-group">

            <label>
              Education
            </label>

            <input
              type="text"
              name="educationValue"
              value={
                settings.educationValue
              }
              onChange={
                handleChange
              }
              placeholder="Fine Arts"
            />

            <input
              type="text"
              name="educationLabel"
              value={
                settings.educationLabel
              }
              onChange={
                handleChange
              }
              placeholder="Graduate"
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
            Save About Section
          </button>

          {saved && (
            <div className="settings-success-message">
              About section saved
              successfully.
            </div>
          )}

        </div>

      </div>

      {/* IMAGE PICKER */}

      <ImagePicker
        isOpen={
          isImagePickerOpen
        }
        onClose={() =>
          setIsImagePickerOpen(
            false
          )
        }
        onSelect={(
          imageUrl
        ) => {
          setSettings(
            (prev) => ({
              ...prev,
              image:
                imageUrl,
            })
          );

          setIsImagePickerOpen(
            false
          );

          setSaved(false);
        }}
      />
    </>
  );
}