import {
  useEffect,
  useState,
} from "react";

import "../styles/homepage-settings.css";


/* =========================
   STORAGE KEY
========================= */

const STORAGE_KEY =
  "rohit-photography-contact-content";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {
  label:
    "GET IN TOUCH",

  headingLine1:
    "Let's Tell",

  headingLine2:
    "Your Story.",

  description:
    "Every great photograph begins with a conversation. Tell me about your vision, your celebration and the moments that matter most. Together we'll create photographs that you'll cherish for a lifetime.",
};


export default function ContactContentSettings() {

  /* =========================
     SETTINGS STATE
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

      if (saved) {

        return {
          ...defaultSettings,
          ...JSON.parse(
            saved
          ),
        };

      }

    } catch (error) {

      console.error(
        "Failed to load Contact Content settings:",
        error
      );

    }

    return defaultSettings;

  });


  /* =========================
     SAVED MESSAGE
  ========================= */

  const [
    savedMessage,
    setSavedMessage,
  ] = useState("");


  /* =========================
     CLEAR SAVED MESSAGE
  ========================= */

  useEffect(() => {

    if (!savedMessage) {
      return;
    }

    const timer =
      setTimeout(() => {

        setSavedMessage("");

      }, 3000);

    return () =>
      clearTimeout(
        timer
      );

  }, [savedMessage]);


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

        [name]:
          value,
      })
    );

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

        setSavedMessage(
          "Contact content settings saved successfully."
        );

      } catch (error) {

        console.error(
          "Failed to save Contact Content settings:",
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
          CONTACT CONTENT
        </span>

        <h2>
          Contact Introduction
        </h2>

        <p>
          Manage the introduction
          displayed beside your
          contact information and
          inquiry form.
        </p>

      </div>


      {/* =========================
          SAVED MESSAGE
      ========================= */}

      {savedMessage && (

        <div
          className="settings-success-message"
          style={{
            marginBottom:
              "24px",
          }}
        >
          {
            savedMessage
          }
        </div>

      )}


      {/* =========================
          FORM
      ========================= */}

      <div className="settings-form">


        {/* SECTION LABEL */}

        <div className="settings-form-group">

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
            placeholder="GET IN TOUCH"
          />

        </div>


        {/* HEADING LINE 1 */}

        <div className="settings-form-group">

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
            placeholder="Let's Tell"
          />

        </div>


        {/* HEADING LINE 2 */}

        <div className="settings-form-group">

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
            placeholder="Your Story."
          />

        </div>


        {/* DESCRIPTION */}

        <div className="settings-form-group">

          <label>
            Introduction Text
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
            placeholder="Enter your Contact page introduction..."
          />

        </div>


        {/* =========================
            PREVIEW
        ========================= */}

        <div
          style={{
            marginTop:
              "10px",

            padding:
              "28px",

            background:
              "#f8f6f1",

            border:
              "1px solid #ece8df",

            borderRadius:
              "14px",
          }}
        >

          <span
            style={{
              display:
                "block",

              marginBottom:
                "12px",

              color:
                "#b58b43",

              fontSize:
                "12px",

              letterSpacing:
                "1.5px",

              textTransform:
                "uppercase",
            }}
          >
            {
              settings.label
            }
          </span>


          <h2
            style={{
              margin:
                "0 0 18px",
            }}
          >

            {
              settings.headingLine1
            }

            {settings.headingLine2 && (

              <>
                <br />

                {
                  settings.headingLine2
                }
              </>

            )}

          </h2>


          <p
            style={{
              margin:
                0,

              lineHeight:
                "1.7",

              color:
                "#666",
            }}
          >
            {
              settings.description
            }
          </p>

        </div>


        {/* =========================
            SAVE BUTTON
        ========================= */}

        <div
          style={{
            marginTop:
              "24px",
          }}
        >

          <button
            type="button"
            className="settings-save-button"
            onClick={
              handleSave
            }
          >
            Save Contact Content
          </button>

        </div>

      </div>

    </div>

  );
}