import {
  useEffect,
  useState,
} from "react";

import GalleryPicker from "../GalleryPicker/GalleryPicker";

import "../../styles/homepage-settings.css";


/* =========================
   STORAGE KEY
========================= */

const PORTFOLIO_KEY =
  "rohit-photography-portfolio";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {

  heroTitle:
    "Selected Work",

  heroDescription:
    "A curated collection of wedding, portrait, commercial, industrial, food and editorial photography.",

  heroImage:
    "",

};


/* =========================
   PORTFOLIO SETTINGS
========================= */

export default function PortfolioSettings() {

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
          PORTFOLIO_KEY
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
        "Failed to load Portfolio settings:",
        error
      );


      return {
        ...defaultSettings,
      };

    }

  });


  /* =========================
     IMAGE PICKER
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
        PORTFOLIO_KEY,
        JSON.stringify(
          settings
        )
      );


    } catch (error) {

      console.error(
        "Failed to save Portfolio settings:",
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


      /*
       * Portfolio Hero only needs
       * one image.
       *
       * GalleryPicker returns an
       * array, so we use the first
       * selected image.
       */

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
            PORTFOLIO PAGE
          </span>

          <h2>
            Portfolio Hero
          </h2>

          <p>
            Manage the main Portfolio
            page hero image, title and
            description.
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
              placeholder="Selected Work"
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
              placeholder="Enter the Portfolio page introduction..."
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
              the title on the public
              Portfolio page.
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
              the Portfolio page.
            </p>


            {/* =========================
                SELECT IMAGE
            ========================= */}

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
                  alt="Portfolio Hero"
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


                {/* =========================
                    REMOVE IMAGE
                ========================= */}

                <button
                  type="button"
                  onClick={
                    removeHeroImage
                  }
                  aria-label="Remove Portfolio Hero Image"
                  title="Remove Portfolio Hero Image"
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