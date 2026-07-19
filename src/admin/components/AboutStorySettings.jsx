import {
  useState,
} from "react";

import "../styles/homepage-settings.css";


/* =========================
   STORAGE KEY
========================= */

const STORAGE_KEY =
  "rohit-photography-about-story";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {

  label:
    "MY STORY",

  heading:
    "Turning Moments Into\nTimeless Memories",

  paragraph1:
    "Photography is more than taking beautiful photographs. It is about preserving genuine emotions, relationships, and moments that can never be recreated.",

  paragraph2:
    "With over 10 years of experience and a background in Fine Arts, I approach every assignment with creativity, technical precision, and a passion for storytelling.",

  paragraph3:
    "Every wedding, portrait, and commercial project is treated with the same commitment—to create timeless images that remain meaningful for generations.",

};


export default function AboutStorySettings() {

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
        };

      }


      const parsed =
        JSON.parse(saved);


      if (
        !parsed ||
        typeof parsed !==
          "object" ||
        Array.isArray(parsed)
      ) {

        return {
          ...defaultSettings,
        };

      }


      return {
        ...defaultSettings,
        ...parsed,
      };

    } catch (error) {

      console.error(
        "Failed to load About Story settings:",
        error
      );


      return {
        ...defaultSettings,
      };

    }

  });


  /* =========================
     SAVED MESSAGE STATE
  ========================= */

  const [
    saved,
    setSaved,
  ] = useState(false);


  /* =========================
     HANDLE FORM CHANGE
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
        "Failed to save About Story settings:",
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
          MY STORY
        </span>


        <h2>
          About Story
        </h2>


        <p>
          Manage the personal
          introduction and story
          displayed on your About page.
        </p>

      </div>


      {/* =========================
          FORM
      ========================= */}

      <div className="homepage-form">


        {/* =========================
            SECTION LABEL
        ========================= */}

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
            placeholder="MY STORY"
          />

        </div>


        {/* =========================
            SECTION HEADING
        ========================= */}

        <div className="form-group">

          <label>
            Section Heading
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
            placeholder={`Turning Moments Into
Timeless Memories`}
          />


          <small
            style={{
              display:
                "block",

              marginTop:
                "7px",

              color:
                "#777",

              fontSize:
                "12px",
            }}
          >
            Use a new line to
            control where the
            heading breaks.
          </small>

        </div>


        {/* =========================
            PARAGRAPH 1
        ========================= */}

        <div className="form-group">

          <label>
            Paragraph 1
          </label>


          <textarea
            rows="5"
            name="paragraph1"
            value={
              settings.paragraph1
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* =========================
            PARAGRAPH 2
        ========================= */}

        <div className="form-group">

          <label>
            Paragraph 2
          </label>


          <textarea
            rows="5"
            name="paragraph2"
            value={
              settings.paragraph2
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* =========================
            PARAGRAPH 3
        ========================= */}

        <div className="form-group">

          <label>
            Paragraph 3
          </label>


          <textarea
            rows="5"
            name="paragraph3"
            value={
              settings.paragraph3
            }
            onChange={
              handleChange
            }
          />

        </div>


        {/* =========================
            SAVE BUTTON
        ========================= */}

        <button
          type="button"
          className="media-button"
          onClick={
            handleSave
          }
        >
          Save About Story
        </button>


        {/* =========================
            SUCCESS MESSAGE
        ========================= */}

        {saved && (

          <div className="settings-success-message">

            About Story saved successfully.

          </div>

        )}

      </div>

    </div>

  );
}