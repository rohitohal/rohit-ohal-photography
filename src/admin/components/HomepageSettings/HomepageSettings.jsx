import {
  useEffect,
  useState,
} from "react";

import GalleryPicker from "../GalleryPicker/GalleryPicker";

import {
  supabase,
} from "../../../lib/supabase";

import "../../styles/homepage-settings.css";


/* =========================
   SUPABASE SETTING KEY
========================= */

const SETTING_KEY =
  "homepage_hero";


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

  heroImages:
    [],

  buttonText:
    "View Portfolio",

  buttonLink:
    "/portfolio",

};


/* =========================
   NORMALIZE SETTINGS
========================= */

function normalizeSettings(
  data
) {

  if (
    !data ||
    typeof data !==
      "object"
  ) {

    return {
      ...defaultSettings,
    };

  }


  /*
   * Support old single
   * heroImage format.
   */

  const heroImages =
    Array.isArray(
      data.heroImages
    )
      ? data.heroImages
      : data.heroImage
        ? [
            data.heroImage,
          ]
        : [];


  return {

    ...defaultSettings,

    ...data,

    heroImages,

  };

}


/* =========================
   HOMEPAGE SETTINGS
========================= */

export default function HomepageSettings() {

  /* =========================
     SETTINGS
  ========================= */

  const [
    settings,
    setSettings,
  ] =
    useState(
      defaultSettings
    );


  /* =========================
     LOADING
  ========================= */

  const [
    loading,
    setLoading,
  ] =
    useState(true);


  /* =========================
     SAVING
  ========================= */

  const [
    saving,
    setSaving,
  ] =
    useState(false);


  /* =========================
     MESSAGE
  ========================= */

  const [
    message,
    setMessage,
  ] =
    useState({

      type:
        "",

      text:
        "",

    });


  /* =========================
     GALLERY PICKER
  ========================= */

  const [
    isHeroPickerOpen,
    setIsHeroPickerOpen,
  ] =
    useState(false);


  /* =========================
     LOAD FROM SUPABASE
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadSettings() {

      try {

        setLoading(
          true
        );


        setMessage({

          type:
            "",

          text:
            "",

        });


        const {
          data,
          error,
        } =
          await supabase
            .from(
              "site_settings"
            )
            .select(
              "setting_value"
            )
            .eq(
              "setting_key",
              SETTING_KEY
            )
            .maybeSingle();


        if (
          error
        ) {

          throw error;

        }


        if (
          !mounted
        ) {

          return;

        }


        /*
         * Supabase is the single source
         * of truth for Homepage Hero.
         */

        if (
          data?.setting_value
        ) {

          setSettings(
            normalizeSettings(
              data.setting_value
            )
          );


          return;

        }


        /*
         * No Supabase record exists.
         * Use defaults in the form.
         */

        setSettings({
          ...defaultSettings,
        });


      } catch (
        error
      ) {

        console.error(
          "Failed to load homepage hero settings:",
          error
        );


        if (
          mounted
        ) {

          setMessage({

            type:
              "error",

            text:
              "Unable to load Homepage Hero settings from Supabase.",

          });

        }


      } finally {

        if (
          mounted
        ) {

          setLoading(
            false
          );

        }

      }

    }


    loadSettings();


    return () => {

      mounted =
        false;

    };

  }, []);


  /* =========================
     INPUT CHANGE
  ========================= */

  function handleChange(
    event
  ) {

    const {
      name,
      value,
    } =
      event.target;


    setSettings(
      (
        previous
      ) => ({

        ...previous,

        [name]:
          value,

      })
    );


    setMessage({

      type:
        "",

      text:
        "",

    });

  }


  /* =========================
     HERO IMAGE SELECTION
  ========================= */

  function handleHeroImages(
    images
  ) {

    if (
      !Array.isArray(
        images
      )
    ) {

      return;

    }


    setSettings(
      (
        previous
      ) => ({

        ...previous,

        heroImages:
          images,

      })
    );


    setMessage({

      type:
        "",

      text:
        "",

    });


    setIsHeroPickerOpen(
      false
    );

  }


  /* =========================
     REMOVE HERO IMAGE
  ========================= */

  function removeHeroImage(
    imageUrl
  ) {

    setSettings(
      (
        previous
      ) => ({

        ...previous,

        heroImages:
          (
            previous.heroImages ||
            []
          ).filter(
            (
              image
            ) =>
              image !==
              imageUrl
          ),

      })
    );


    setMessage({

      type:
        "",

      text:
        "",

    });

  }


  /* =========================
     SAVE TO SUPABASE
  ========================= */

  async function saveSettings() {

    if (
      saving
    ) {

      return;

    }


    try {

      setSaving(
        true
      );


      setMessage({

        type:
          "",

        text:
          "",

      });


      const payload = {

        heroTitle:
          settings.heroTitle?.trim() ||
          "",

        heroSubtitle:
          settings.heroSubtitle?.trim() ||
          "",

        heroDescription:
          settings.heroDescription?.trim() ||
          "",

        heroImages:
          Array.isArray(
            settings.heroImages
          )
            ? settings.heroImages
            : [],

        buttonText:
          settings.buttonText?.trim() ||
          "",

        buttonLink:
          settings.buttonLink?.trim() ||
          "",

      };


      const {
        error,
      } =
        await supabase
          .from(
            "site_settings"
          )
          .upsert(
            {

              setting_key:
                SETTING_KEY,

              setting_value:
                payload,

              updated_at:
                new Date()
                  .toISOString(),

            },
            {

              onConflict:
                "setting_key",

            }
          );


      if (
        error
      ) {

        throw error;

      }


      setSettings(
        payload
      );


      setMessage({

        type:
          "success",

        text:
          "Homepage Hero settings saved successfully.",

      });


    } catch (
      error
    ) {

      console.error(
        "Failed to save homepage hero settings:",
        error
      );


      setMessage({

        type:
          "error",

        text:
          error?.message ||
          "Unable to save Homepage Hero settings.",

      });


    } finally {

      setSaving(
        false
      );

    }

  }


  /* =========================
     LOADING
  ========================= */

  if (
    loading
  ) {

    return (

      <div className="homepage-settings-card">

        <div className="homepage-settings-header">

          <span className="homepage-overline">
            HERO SETTINGS
          </span>


          <h2>
            Homepage Hero
          </h2>


          <p>
            Loading Homepage Hero settings...
          </p>

        </div>

      </div>

    );

  }


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


        {/* =========================
            MESSAGE
        ========================= */}

        {message.text && (

          <div
            style={{
              marginBottom:
                "24px",

              padding:
                "12px 16px",

              borderRadius:
                "8px",

              fontSize:
                "14px",

              lineHeight:
                "1.5",

              background:
                message.type ===
                "success"
                  ? "#f3faf4"
                  : message.type ===
                    "error"
                    ? "#fff4f4"
                    : "#f7f7f7",

              color:
                message.type ===
                "success"
                  ? "#347342"
                  : message.type ===
                    "error"
                    ? "#b33a3a"
                    : "#555",
            }}
          >

            {
              message.text
            }

          </div>

        )}


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
              for the homepage slideshow.

            </p>


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
                IMAGE PREVIEWS
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
                      key={
                        `${image}-${index}`
                      }
                      style={{
                        position:
                          "relative",
                      }}
                    >

                      <img
                        src={
                          image
                        }
                        alt={
                          `Hero ${index + 1}`
                        }
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


          {/* =========================
              SAVE
          ========================= */}

          <div
            style={{
              marginTop:
                "24px",
            }}
          >

            <button
              type="button"
              className="media-button"
              onClick={
                saveSettings
              }
              disabled={
                saving
              }
            >

              {
                saving
                  ? "Saving..."
                  : "Save Hero Settings"
              }

            </button>

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