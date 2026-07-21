import {
  useEffect,
  useState,
} from "react";

import GalleryPicker from "../GalleryPicker/GalleryPicker";

import "../../styles/homepage-settings.css";


/* =========================
   STORAGE KEY
========================= */

const JOURNAL_SETTINGS_KEY =
  "rohit-photography-journal-settings";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {

  heroTitle:
    "Journal",

  heroDescription:
    "Stories, insights and behind the scenes moments from weddings, commercial work and photography adventures.",

  heroImage:
    "",

};


/* =========================
   JOURNAL SETTINGS
========================= */

export default function JournalSettings() {

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
          JOURNAL_SETTINGS_KEY
        );


      if (!saved) {

        return {
          ...defaultSettings,
        };

      }


      const parsed =
        JSON.parse(
          saved
        );


      if (
        !parsed ||
        typeof parsed !==
          "object"
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
        "Failed to load Journal settings:",
        error
      );


      return {
        ...defaultSettings,
      };

    }

  });


  /* =========================
     MEDIA PICKER
  ========================= */

  const [
    isPickerOpen,
    setIsPickerOpen,
  ] = useState(false);


  /* =========================
     SAVE SETTINGS
  ========================= */

  useEffect(() => {

    try {

      localStorage.setItem(
        JOURNAL_SETTINGS_KEY,
        JSON.stringify(
          settings
        )
      );


    } catch (error) {

      console.error(
        "Failed to save Journal settings:",
        error
      );

    }

  }, [
    settings,
  ]);


  /* =========================
     INPUT CHANGE
  ========================= */

  const handleChange =
    (
      event
    ) => {

      const {
        name,
        value,
      } = event.target;


      setSettings(
        (
          previous
        ) => ({

          ...previous,

          [name]:
            value,

        })
      );

    };


  /* =========================
     SELECT HERO IMAGE
  ========================= */

  const handleHeroImage =
    (
      images
    ) => {

      if (
        !Array.isArray(
          images
        ) ||
        images.length ===
          0
      ) {

        return;

      }


      setSettings(
        (
          previous
        ) => ({

          ...previous,

          heroImage:
            images[0],

        })
      );


      setIsPickerOpen(
        false
      );

    };


  /* =========================
     REMOVE HERO IMAGE
  ========================= */

  const removeHeroImage =
    () => {

      setSettings(
        (
          previous
        ) => ({

          ...previous,

          heroImage:
            "",

        })
      );

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
            JOURNAL PAGE
          </span>

          <h2>
            Journal Hero
          </h2>

          <p>
            Manage the title,
            description and hero image
            displayed on the public
            Journal page.
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
              name="heroTitle"
              value={
                settings.heroTitle
              }
              onChange={
                handleChange
              }
              placeholder="Journal"
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
              name="heroDescription"
              value={
                settings.heroDescription
              }
              onChange={
                handleChange
              }
              placeholder="Enter the Journal page introduction..."
            />

            <p
              style={{
                margin:
                  "8px 0 0",

                color:
                  "#777",

                fontSize:
                  "13px",

                lineHeight:
                  "1.5",
              }}
            >
              This text appears below
              the Journal title on the
              public page.
            </p>

          </div>


          {/* =========================
              HERO IMAGE
          ========================= */}

          <div className="form-group">

            <label>
              Hero Image
            </label>

            <p
              style={{
                margin:
                  "0 0 12px",

                color:
                  "#777",

                fontSize:
                  "14px",

                lineHeight:
                  "1.6",
              }}
            >
              Select the main image
              displayed at the top of
              the Journal page.
            </p>


            <button
              type="button"
              className="media-button secondary"
              onClick={() =>
                setIsPickerOpen(
                  true
                )
              }
            >

              {
                settings.heroImage
                  ? "Change Hero Image"
                  : "Select Hero Image"
              }

            </button>


            {/* =========================
                IMAGE PREVIEW
            ========================= */}

            {settings.heroImage && (

              <div
                style={{
                  position:
                    "relative",

                  width:
                    "100%",

                  maxWidth:
                    "600px",

                  marginTop:
                    "18px",
                }}
              >

                <img
                  src={
                    settings.heroImage
                  }
                  alt="Journal Hero"
                  style={{
                    display:
                      "block",

                    width:
                      "100%",

                    height:
                      "300px",

                    objectFit:
                      "cover",

                    borderRadius:
                      "14px",

                    border:
                      "1px solid #ece8df",
                  }}
                />


                <button
                  type="button"
                  onClick={
                    removeHeroImage
                  }
                  aria-label="Remove Journal Hero Image"
                  title="Remove Journal Hero Image"
                  style={{
                    position:
                      "absolute",

                    top:
                      "12px",

                    right:
                      "12px",

                    width:
                      "36px",

                    height:
                      "36px",

                    border:
                      "none",

                    borderRadius:
                      "50%",

                    background:
                      "#111",

                    color:
                      "#fff",

                    cursor:
                      "pointer",

                    fontSize:
                      "20px",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",
                  }}
                >
                  ×
                </button>

              </div>

            )}

          </div>

        </div>

      </div>


      {/* =========================
          MEDIA LIBRARY PICKER
      ========================= */}

      <GalleryPicker
        isOpen={
          isPickerOpen
        }

        onClose={() =>
          setIsPickerOpen(
            false
          )
        }

        selectedImages={
          settings.heroImage
            ? [
                settings.heroImage,
              ]
            : []
        }

        onSelect={
          handleHeroImage
        }
      />

    </>

  );

}