import {
  useEffect,
  useState,
} from "react";

import ImagePicker from "../ImagePicker/ImagePicker";

import {
  supabase,
} from "../../../lib/supabase";

import "../../styles/homepage-settings.css";


/* =========================
   SUPABASE SETTING KEY
========================= */

const SETTING_KEY =
  "homepage_about";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultAboutSettings = {

  label:
    "ABOUT ROHIT OHAL",

  heading:
    "Fine Art.\nDocumentary.\nTimeless.",

  description:
    "I believe photographs should do more than document a moment. They should preserve emotion, atmosphere and the little details that become priceless with time. My work combines documentary storytelling with a fine art approach to create images that feel authentic, elegant and enduring.",

  yearsValue:
    "10+",

  yearsLabel:
    "Years Experience",

  projectsValue:
    "500+",

  projectsLabel:
    "Projects Delivered",

  educationValue:
    "Fine Arts",

  educationLabel:
    "Graduate",

  image:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80",

  buttonText:
    "Learn More About Me",

  buttonLink:
    "/about",

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
      ...defaultAboutSettings,
    };

  }


  return {

    ...defaultAboutSettings,

    ...data,

  };

}


/* =========================
   ABOUT SETTINGS
========================= */

export default function AboutSettings() {

  /* =========================
     SETTINGS
  ========================= */

  const [
    settings,
    setSettings,
  ] =
    useState(
      defaultAboutSettings
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
     IMAGE PICKER
  ========================= */

  const [
    isImagePickerOpen,
    setIsImagePickerOpen,
  ] =
    useState(false);


  /* =========================
     LOAD SETTINGS
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadSettings() {

      try {

        setLoading(
          true
        );


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
         * of truth for Homepage About.
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
          ...defaultAboutSettings,
        });


      } catch (
        error
      ) {

        console.error(
          "Failed to load Homepage About settings:",
          error
        );


        if (
          mounted
        ) {

          setMessage({

            type:
              "error",

            text:
              "Unable to load Homepage About settings from Supabase.",

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
     HANDLE CHANGE
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
     IMAGE SELECTION
  ========================= */

  function handleImageSelect(
    imageUrl
  ) {

    if (
      !imageUrl
    ) {

      return;

    }


    setSettings(
      (
        previous
      ) => ({

        ...previous,

        image:
          imageUrl,

      })
    );


    setIsImagePickerOpen(
      false
    );


    setMessage({

      type:
        "",

      text:
        "",

    });

  }


  /* =========================
     SAVE SETTINGS
  ========================= */

  async function handleSave() {

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

        label:
          settings.label?.trim() ||
          "",

        heading:
          settings.heading?.trim() ||
          "",

        description:
          settings.description?.trim() ||
          "",

        yearsValue:
          settings.yearsValue?.trim() ||
          "",

        yearsLabel:
          settings.yearsLabel?.trim() ||
          "",

        projectsValue:
          settings.projectsValue?.trim() ||
          "",

        projectsLabel:
          settings.projectsLabel?.trim() ||
          "",

        educationValue:
          settings.educationValue?.trim() ||
          "",

        educationLabel:
          settings.educationLabel?.trim() ||
          "",

        image:
          settings.image ||
          "",

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
          "Homepage About section saved successfully.",

      });


    } catch (
      error
    ) {

      console.error(
        "Failed to save Homepage About settings:",
        error
      );


      setMessage({

        type:
          "error",

        text:
          error?.message ||
          "Unable to save Homepage About section.",

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
            ABOUT SECTION
          </span>


          <h2>
            Homepage About Me
          </h2>


          <p>
            Loading Homepage About settings...
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


        {/* HEADER */}

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


        {/* MESSAGE */}

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
              placeholder={
                "Fine Art.\nDocumentary.\nTimeless."
              }
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


          {/* YEARS EXPERIENCE */}

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


          {/* PROJECTS */}

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


          {/* EDUCATION */}

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


          {/* BUTTON TEXT */}

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


          {/* BUTTON LINK */}

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
            disabled={
              saving
            }
          >

            {
              saving
                ? "Saving..."
                : "Save About Section"
            }

          </button>

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
          handleImageSelect
        }
      />

    </>

  );

}