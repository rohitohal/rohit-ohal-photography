import {
  useEffect,
  useState,
} from "react";

import GalleryPicker from
  "../GalleryPicker/GalleryPicker";

import {
  getSettings,
  saveSettings,
} from "../../../services/settingsService";

import "../../styles/homepage-settings.css";


/* =========================
   SETTINGS KEY
========================= */

const SETTINGS_KEY =
  "journal";


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
     SETTINGS
  ========================= */

  const [
    settings,
    setSettings,
  ] =
    useState({
      ...defaultSettings,
    });


  /* =========================
     LOADING
  ========================= */

  const [
    isLoading,
    setIsLoading,
  ] =
    useState(true);


  /* =========================
     SAVING
  ========================= */

  const [
    isSaving,
    setIsSaving,
  ] =
    useState(false);


  /* =========================
     MESSAGE
  ========================= */

  const [
    message,
    setMessage,
  ] =
    useState("");


  const [
    hasError,
    setHasError,
  ] =
    useState(false);


  /* =========================
     MEDIA PICKER
  ========================= */

  const [
    isPickerOpen,
    setIsPickerOpen,
  ] =
    useState(false);


  /* =========================
     LOAD SETTINGS
  ========================= */

  useEffect(() => {

    let isMounted =
      true;


    async function loadSettings() {

      try {

        setIsLoading(
          true
        );


        setMessage(
          ""
        );


        setHasError(
          false
        );


        const savedSettings =
          await getSettings(
            SETTINGS_KEY
          );


        if (
          !isMounted
        ) {

          return;

        }


        if (
          savedSettings &&
          typeof savedSettings ===
            "object" &&
          !Array.isArray(
            savedSettings
          )
        ) {

          setSettings({
            ...defaultSettings,
            ...savedSettings,
          });

        } else {

          setSettings({
            ...defaultSettings,
          });

        }

      } catch (
        error
      ) {

        console.error(
          "Failed to load Journal settings:",
          error
        );


        if (
          isMounted
        ) {

          setHasError(
            true
          );


          setMessage(
            "Unable to load Journal settings."
          );

        }

      } finally {

        if (
          isMounted
        ) {

          setIsLoading(
            false
          );

        }

      }

    }


    loadSettings();


    return () => {

      isMounted =
        false;

    };

  }, []);


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


      setMessage(
        ""
      );


      setHasError(
        false
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


      setMessage(
        ""
      );


      setHasError(
        false
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


      setMessage(
        ""
      );


      setHasError(
        false
      );

    };


  /* =========================
     SAVE SETTINGS
  ========================= */

  const handleSave =
    async () => {

      if (
        isSaving
      ) {

        return;

      }


      try {

        setIsSaving(
          true
        );


        setMessage(
          ""
        );


        setHasError(
          false
        );


        const savedSettings =
          await saveSettings(
            SETTINGS_KEY,
            settings
          );


        setSettings({
          ...defaultSettings,
          ...savedSettings,
        });


        setMessage(
          "Journal settings saved successfully."
        );

      } catch (
        error
      ) {

        console.error(
          "Failed to save Journal settings:",
          error
        );


        setHasError(
          true
        );


        setMessage(
          error?.message ||
          "Unable to save Journal settings."
        );

      } finally {

        setIsSaving(
          false
        );

      }

    };


  /* =========================
     RENDER
  ========================= */

  return (

    <>

      <div className="homepage-settings-card">


        {/* =====================
            HEADER
        ===================== */}

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


        {/* =====================
            LOADING
        ===================== */}

        {isLoading ? (

          <div
            style={{
              padding:
                "30px 0",
            }}
          >

            <p>
              Loading Journal settings...
            </p>

          </div>

        ) : (

          <div className="homepage-form">


            {/* =====================
                HERO TITLE
            ===================== */}

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


            {/* =====================
                HERO DESCRIPTION
            ===================== */}

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


            {/* =====================
                HERO IMAGE
            ===================== */}

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
                disabled={
                  isSaving
                }
              >

                {
                  settings.heroImage
                    ? "Change Hero Image"
                    : "Select Hero Image"
                }

              </button>


              {/* =====================
                  IMAGE PREVIEW
              ===================== */}

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
                    disabled={
                      isSaving
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


            {/* =====================
                STATUS MESSAGE
            ===================== */}

            {message && (

              <div
                style={{
                  marginTop:
                    "10px",

                  marginBottom:
                    "18px",

                  padding:
                    "12px 16px",

                  borderRadius:
                    "8px",

                  background:
                    hasError
                      ? "#fff3f3"
                      : "#f3f8f3",

                  color:
                    hasError
                      ? "#a33"
                      : "#35633a",

                  fontSize:
                    "14px",
                }}
              >

                {
                  message
                }

              </div>

            )}


            {/* =====================
                SAVE
            ===================== */}

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
                  handleSave
                }
                disabled={
                  isSaving
                }
              >

                {
                  isSaving
                    ? "Saving..."
                    : "Save Journal Settings"
                }

              </button>

            </div>

          </div>

        )}

      </div>


      {/* =====================
          MEDIA LIBRARY PICKER
      ===================== */}

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