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
  "portfolio_page";


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
     SETTINGS
  ========================= */

  const [
    settings,
    setSettings,
  ] = useState({
    ...defaultSettings,
  });


  /* =========================
     LOADING
  ========================= */

  const [
    loading,
    setLoading,
  ] = useState(true);


  /* =========================
     SAVING
  ========================= */

  const [
    saving,
    setSaving,
  ] = useState(false);


  const [
    saved,
    setSaved,
  ] = useState(false);


  /* =========================
     IMAGE PICKER
  ========================= */

  const [
    isPickerOpen,
    setIsPickerOpen,
  ] = useState(false);


  /* =========================
     LOAD SETTINGS
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadSettings() {

      try {

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


        if (error) {
          throw error;
        }


        if (!mounted) {
          return;
        }


        if (
          data?.setting_value &&
          typeof data.setting_value ===
            "object" &&
          !Array.isArray(
            data.setting_value
          )
        ) {

          setSettings({

            ...defaultSettings,

            ...data.setting_value,

          });

        } else {

          /*
           * Temporary migration
           * fallback.
           */

          const legacySaved =
            localStorage.getItem(
              "rohit-photography-portfolio"
            );


          if (legacySaved) {

            const parsed =
              JSON.parse(
                legacySaved
              );


            if (
              parsed &&
              typeof parsed ===
                "object"
            ) {

              setSettings({

                ...defaultSettings,

                ...parsed,

              });

            }

          }

        }


      } catch (error) {

        console.error(
          "Failed to load Portfolio settings:",
          error
        );

      } finally {

        if (mounted) {

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

  const handleChange =
    (event) => {

      const {
        name,
        value,
      } = event.target;


      setSettings(
        (previous) => ({

          ...previous,

          [name]:
            value,

        })
      );


      setSaved(
        false
      );

    };


  /* =========================
     SELECT HERO IMAGE
  ========================= */

  const handleHeroImage =
    (images) => {

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
        (previous) => ({

          ...previous,

          heroImage:
            images[0],

        })
      );


      setIsPickerOpen(
        false
      );


      setSaved(
        false
      );

    };


  /* =========================
     REMOVE HERO IMAGE
  ========================= */

  const removeHeroImage =
    () => {

      setSettings(
        (previous) => ({

          ...previous,

          heroImage:
            "",

        })
      );


      setSaved(
        false
      );

    };


  /* =========================
     SAVE SETTINGS
  ========================= */

  const handleSave =
    async () => {

      try {

        setSaving(
          true
        );


        setSaved(
          false
        );


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
                  settings,

                updated_at:
                  new Date()
                    .toISOString(),

              },
              {

                onConflict:
                  "setting_key",

              }
            );


        if (error) {
          throw error;
        }


        setSaved(
          true
        );


        window.setTimeout(
          () => {

            setSaved(
              false
            );

          },
          3000
        );


      } catch (error) {

        console.error(
          "Failed to save Portfolio settings:",
          error
        );


        alert(
          error?.message ||
          "Unable to save Portfolio settings."
        );


      } finally {

        setSaving(
          false
        );

      }

    };


  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (

      <div className="homepage-settings-card">

        <div className="homepage-settings-header">

          <span className="homepage-overline">
            PORTFOLIO PAGE
          </span>

          <h2>
            Portfolio Hero
          </h2>

          <p>
            Loading Portfolio settings...
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


        <div className="homepage-form">


          {/* HERO TITLE */}

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


          {/* HERO DESCRIPTION */}

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


          {/* HERO IMAGE */}

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
                : "Save Portfolio Settings"
            }

          </button>


          {saved && (

            <div className="settings-success-message">

              Portfolio settings saved successfully.

            </div>

          )}

        </div>

      </div>


      {/* MEDIA LIBRARY PICKER */}

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