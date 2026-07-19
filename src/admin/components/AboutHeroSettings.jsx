import {
  useState,
} from "react";

import ImagePicker from "./ImagePicker/ImagePicker";

import "../styles/homepage-settings.css";


/* =========================
   STORAGE KEY
========================= */

const STORAGE_KEY =
  "rohit-photography-about-hero";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {
  title:
    "About",

  description:
    "The story, philosophy and passion behind Rohit Ohal Photography.",

  image: "",
};


export default function AboutHeroSettings() {

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
        "Failed to load About Hero settings:",
        error
      );

      return {
        ...defaultSettings,
      };

    }

  });


  /* =========================
     IMAGE PICKER STATE
  ========================= */

  const [
    isImagePickerOpen,
    setIsImagePickerOpen,
  ] = useState(false);


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
        "Failed to save About Hero settings:",
        error
      );

    }

  };


  /* =========================
     SELECT HERO IMAGE
  ========================= */

  const handleSelectImage = (
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

  };


  /* =========================
     REMOVE HERO IMAGE
  ========================= */

  const handleRemoveImage =
    () => {

      setSettings(
        (prev) => ({
          ...prev,

          image: "",
        })
      );

      setSaved(false);

    };


  /* =========================
     RENDER
  ========================= */

  return (
    <>

      <div className="homepage-settings-card">

        {/* =========================
            HEADER
        ========================= */}

        <div className="homepage-settings-header">

          <span className="homepage-overline">
            ABOUT HERO
          </span>

          <h2>
            About Page Hero
          </h2>

          <p>
            Manage the title,
            description and hero image
            displayed at the top of
            your About page.
          </p>

        </div>


        {/* =========================
            FORM
        ========================= */}

        <div className="homepage-form">


          {/* =========================
              HERO TITLE
          ========================= */}

          <div className="form-group">

            <label>
              Hero Title
            </label>

            <input
              type="text"
              name="title"
              value={
                settings.title
              }
              onChange={
                handleChange
              }
              placeholder="About"
            />

          </div>


          {/* =========================
              HERO DESCRIPTION
          ========================= */}

          <div className="form-group">

            <label>
              Hero Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={
                settings.description
              }
              onChange={
                handleChange
              }
              placeholder="The story, philosophy and passion behind Rohit Ohal Photography."
            />

          </div>


          {/* =========================
              HERO IMAGE
          ========================= */}

          <div className="form-group">

            <label>
              Hero Image
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

              {settings.image
                ? "Change Hero Image"
                : "Select Hero Image"}

            </button>


            {/* IMAGE PREVIEW */}

            {settings.image && (

              <div
                style={{
                  marginTop:
                    "16px",
                }}
              >

                <img
                  src={
                    settings.image
                  }
                  alt="About hero preview"
                  className="hero-preview-image"
                />


                <button
                  type="button"
                  onClick={
                    handleRemoveImage
                  }
                  style={{
                    display:
                      "block",

                    marginTop:
                      "10px",

                    padding:
                      "8px 12px",

                    border:
                      "1px solid #ddd",

                    borderRadius:
                      "8px",

                    background:
                      "#fff",

                    cursor:
                      "pointer",
                  }}
                >
                  Remove Image
                </button>

              </div>

            )}

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
            Save About Hero
          </button>


          {/* =========================
              SUCCESS MESSAGE
          ========================= */}

          {saved && (

            <div className="settings-success-message">

              About Hero saved successfully.

            </div>

          )}

        </div>

      </div>


      {/* =========================
          IMAGE PICKER
      ========================= */}

      <ImagePicker
        isOpen={
          isImagePickerOpen
        }

        onClose={() =>
          setIsImagePickerOpen(
            false
          )
        }

        onSelect={
          handleSelectImage
        }
      />

    </>
  );
}