import {
  useEffect,
  useState,
} from "react";

import ImagePicker from "./ImagePicker/ImagePicker";

import "../styles/homepage-settings.css";


/* =========================
   STORAGE KEY
========================= */

const STORAGE_KEY =
  "rohit-photography-contact-hero";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {
  title:
    "Let's Create Something Beautiful",

  description:
    "Whether you're planning a wedding, portrait session, commercial project or destination wedding, I'd love to hear your story.",

  image: "",
};


export default function ContactHeroSettings() {

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
          ...JSON.parse(saved),
        };

      }

    } catch (error) {

      console.error(
        "Failed to load Contact Hero settings:",
        error
      );

    }

    return defaultSettings;

  });


  /* =========================
     IMAGE PICKER STATE
  ========================= */

  const [
    isImagePickerOpen,
    setIsImagePickerOpen,
  ] = useState(false);


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
      clearTimeout(timer);

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

  };


  /* =========================
     REMOVE HERO IMAGE
  ========================= */

  const handleRemoveImage =
    () => {

      setSettings(
        (prev) => ({
          ...prev,

          image:
            "",
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
          "Contact hero settings saved successfully."
        );

      } catch (error) {

        console.error(
          "Failed to save Contact Hero settings:",
          error
        );

      }

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
            CONTACT HERO
          </span>

          <h2>
            Hero Section
          </h2>

          <p>
            Manage the title,
            description and background
            image displayed at the top
            of your Contact page.
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
            {savedMessage}
          </div>

        )}


        {/* =========================
            FORM
        ========================= */}

        <div className="settings-form">


          {/* HERO TITLE */}

          <div className="settings-form-group">

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
              placeholder="Let's Create Something Beautiful"
            />

          </div>


          {/* HERO DESCRIPTION */}

          <div className="settings-form-group">

            <label>
              Hero Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={
                settings.description
              }
              onChange={
                handleChange
              }
              placeholder="Enter the Contact page hero description..."
            />

          </div>


          {/* HERO IMAGE */}

          <div className="settings-form-group">

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
                  alt="Contact hero preview"
                  style={{
                    display:
                      "block",

                    width:
                      "100%",

                    maxWidth:
                      "600px",

                    height:
                      "260px",

                    objectFit:
                      "cover",

                    borderRadius:
                      "12px",
                  }}
                />


                <button
                  type="button"
                  onClick={
                    handleRemoveImage
                  }
                  style={{
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
              Save Hero Settings
            </button>

          </div>

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