import {
  useEffect,
  useState,
} from "react";

import GalleryPicker from "../GalleryPicker/GalleryPicker";

import "../../styles/homepage-settings.css";


/* =========================
   STORAGE KEY
========================= */

const HOMEPAGE_KEY =
  "rohit-photography-homepage";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {
  heroTitle:
    "Capturing Timeless Stories",

  heroSubtitle:
    "Luxury Wedding Photographer based in Pune, India.",

  heroDescription:
    "Documentary storytelling through timeless imagery, capturing emotion, atmosphere and moments that deserve to be remembered.",

  heroImages: [],

  buttonText:
    "View Portfolio",

  buttonLink:
    "/portfolio",
};


export default function HomepageSettings() {
  /* =========================
     HOMEPAGE SETTINGS
  ========================= */

  const [
    settings,
    setSettings,
  ] = useState(() => {
    try {
      const saved =
        localStorage.getItem(
          HOMEPAGE_KEY
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


      /* =========================
         MIGRATE OLD SINGLE
         HERO IMAGE
      ========================= */

      const migratedHeroImages =
        Array.isArray(
          parsed.heroImages
        )
          ? parsed.heroImages
          : parsed.heroImage
          ? [
              parsed.heroImage,
            ]
          : [];


      /* =========================
         MERGE SAVED SETTINGS
         WITH NEW DEFAULTS
      ========================= */

      return {
        ...defaultSettings,
        ...parsed,

        heroImages:
          migratedHeroImages,
      };

    } catch (error) {
      console.error(
        "Failed to load homepage settings:",
        error
      );

      return {
        ...defaultSettings,
      };
    }
  });


  /* =========================
     GALLERY PICKER
  ========================= */

  const [
    isHeroPickerOpen,
    setIsHeroPickerOpen,
  ] = useState(false);


  /* =========================
     SAVE SETTINGS
  ========================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        HOMEPAGE_KEY,
        JSON.stringify(
          settings
        )
      );
    } catch (error) {
      console.error(
        "Failed to save homepage settings:",
        error
      );
    }
  }, [
    settings,
  ]);


  /* =========================
     INPUT CHANGE
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
     HERO IMAGE SELECTION
  ========================= */

  const handleHeroImages =
    (images) => {

      if (
        !Array.isArray(
          images
        )
      ) {
        return;
      }

      setSettings(
        (prev) => ({
          ...prev,

          heroImages:
            images,
        })
      );

      setIsHeroPickerOpen(
        false
      );
    };


  /* =========================
     REMOVE HERO IMAGE
  ========================= */

  const removeHeroImage =
    (imageUrl) => {

      setSettings(
        (prev) => ({
          ...prev,

          heroImages:
            (
              prev.heroImages ||
              []
            ).filter(
              (image) =>
                image !==
                imageUrl
            ),
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
            HERO SETTINGS
          </span>

          <h2>
            Homepage Hero
          </h2>

          <p>
            Manage the homepage
            hero slideshow, text
            and portfolio button.
          </p>

        </div>


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
              placeholder="Enter hero title"
            />

          </div>


          {/* =========================
              HERO SUBTITLE
          ========================= */}

          <div className="form-group">

            <label>
              Hero Subtitle
            </label>

            <textarea
              rows="3"
              name="heroSubtitle"
              value={
                settings.heroSubtitle
              }
              onChange={
                handleChange
              }
              placeholder="Enter hero subtitle"
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
              placeholder="Enter a short introduction for the homepage hero..."
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
              the hero title and subtitle
              on the public homepage.
            </p>

          </div>


          {/* =========================
              HERO IMAGES
          ========================= */}

          <div className="form-group">

            <label>
              Hero Slideshow Images
            </label>

            <p
              style={{
                margin:
                  "0 0 12px",

                color:
                  "#777",

                fontSize:
                  "14px",
              }}
            >
              Select multiple images
              from your Media Library
              for the homepage
              slideshow.
            </p>


            {/* SELECT IMAGES */}

            <button
              type="button"
              className="media-button secondary"
              onClick={() =>
                setIsHeroPickerOpen(
                  true
                )
              }
            >
              Select Hero Images
            </button>


            {/* IMAGE COUNT */}

            {settings.heroImages
              .length > 0 && (

              <p
                style={{
                  margin:
                    "12px 0 0",

                  color:
                    "#777",

                  fontSize:
                    "14px",
                }}
              >
                {
                  settings
                    .heroImages
                    .length
                }{" "}
                images selected
              </p>

            )}


            {/* =========================
                HERO IMAGE PREVIEWS
            ========================= */}

            {settings.heroImages
              .length > 0 && (

              <div
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(150px, 1fr))",

                  gap:
                    "16px",

                  marginTop:
                    "16px",
                }}
              >

                {settings.heroImages.map(
                  (
                    image,
                    index
                  ) => (

                    <div
                      key={`${image}-${index}`}
                      style={{
                        position:
                          "relative",
                      }}
                    >

                      <img
                        src={
                          image
                        }
                        alt={`Hero ${
                          index +
                          1
                        }`}
                        style={{
                          width:
                            "100%",

                          height:
                            "120px",

                          objectFit:
                            "cover",

                          borderRadius:
                            "12px",

                          border:
                            "1px solid #ece8df",
                        }}
                      />


                      {/* REMOVE IMAGE */}

                      <button
                        type="button"
                        onClick={() =>
                          removeHeroImage(
                            image
                          )
                        }
                        style={{
                          position:
                            "absolute",

                          top:
                            "8px",

                          right:
                            "8px",

                          width:
                            "30px",

                          height:
                            "30px",

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
                            "18px",

                          display:
                            "flex",

                          alignItems:
                            "center",

                          justifyContent:
                            "center",
                        }}
                        aria-label="Remove Hero Image"
                        title="Remove Hero Image"
                      >
                        ×
                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </div>


          {/* =========================
              BUTTON TEXT
          ========================= */}

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
              placeholder="View Portfolio"
            />

          </div>


          {/* =========================
              BUTTON LINK
          ========================= */}

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
              placeholder="/portfolio"
            />

            <p
              style={{
                margin:
                  "8px 0 0",

                color:
                  "#777",

                fontSize:
                  "13px",
              }}
            >
              Example: /portfolio
            </p>

          </div>

        </div>

      </div>


      {/* =========================
          HERO IMAGE PICKER
      ========================= */}

      <GalleryPicker
        isOpen={
          isHeroPickerOpen
        }

        onClose={() =>
          setIsHeroPickerOpen(
            false
          )
        }

        selectedImages={
          settings.heroImages
        }

        onSelect={
          handleHeroImages
        }
      />

    </>
  );
}