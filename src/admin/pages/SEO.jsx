import {
  useEffect,
  useState,
} from "react";

import {
  supabase,
} from "../../lib/supabase";

import ImagePicker from "../components/ImagePicker/ImagePicker";

import "../styles/seo.css";


/* =========================
   DEFAULT SEO SETTINGS
========================= */

const defaultSEO = {
  siteTitle:
    "Rohit Ohal Photography | Wedding & Commercial Photographer",

  metaDescription:
    "Rohit Ohal Photography specializes in fine art wedding, commercial, portrait, industrial, food and editorial photography in Pune, India.",

  keywords:
    "Rohit Ohal Photography, Wedding Photographer Pune, Commercial Photographer Pune, Portrait Photographer Pune",

  ogTitle:
    "Rohit Ohal Photography",

  ogDescription:
    "Fine art wedding and commercial photography.",

  ogImage: "",
};


/* =========================
   STORAGE
========================= */

const SEO_KEY =
  "rohit-photography-seo";

const SUPABASE_SETTING_KEY =
  "seo";


export default function SEO() {

  /* =========================
     SEO DATA
  ========================= */

  const [
    seoData,
    setSeoData,
  ] =
    useState({
      ...defaultSEO,
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
     IMAGE PICKER STATE
  ========================= */

  const [
    isImagePickerOpen,
    setIsImagePickerOpen,
  ] =
    useState(false);


  /* =========================
     STATUS MESSAGE
  ========================= */

  const [
    savedMessage,
    setSavedMessage,
  ] =
    useState("");


  /* =========================
     LOAD LOCAL FALLBACK
  ========================= */

  const loadLocalSEO =
    () => {

      try {

        const saved =
          localStorage.getItem(
            SEO_KEY
          );


        if (!saved) {

          return {
            ...defaultSEO,
          };

        }


        const parsed =
          JSON.parse(
            saved
          );


        if (
          !parsed ||
          typeof parsed !==
            "object" ||
          Array.isArray(
            parsed
          )
        ) {

          return {
            ...defaultSEO,
          };

        }


        return {
          ...defaultSEO,
          ...parsed,
        };

      } catch (error) {

        console.error(
          "Failed to load local SEO settings:",
          error
        );


        return {
          ...defaultSEO,
        };

      }

    };


  /* =========================
     SAVE LOCAL CACHE
  ========================= */

  const saveLocalSEO =
    (
      data
    ) => {

      try {

        localStorage.setItem(
          SEO_KEY,
          JSON.stringify(
            data
          )
        );

      } catch (error) {

        console.error(
          "Failed to cache SEO settings locally:",
          error
        );

      }

    };


  /* =========================
     LOAD SEO FROM SUPABASE
  ========================= */

  useEffect(() => {

    let isMounted =
      true;


    const loadSEO =
      async () => {

        setIsLoading(
          true
        );


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
                SUPABASE_SETTING_KEY
              )
              .single();


          if (error) {

            throw error;

          }


          const remoteSEO =
            data?.setting_value;


          if (
            remoteSEO &&
            typeof remoteSEO ===
              "object" &&
            !Array.isArray(
              remoteSEO
            )
          ) {

            const mergedSEO = {
              ...defaultSEO,
              ...remoteSEO,
            };


            if (
              isMounted
            ) {

              setSeoData(
                mergedSEO
              );

            }


            /*
             * Keep localStorage as
             * an offline/cache fallback.
             */

            saveLocalSEO(
              mergedSEO
            );


            return;

          }


          /*
           * Supabase returned no valid
           * SEO object.
           */

          const localSEO =
            loadLocalSEO();


          if (
            isMounted
          ) {

            setSeoData(
              localSEO
            );

          }

        } catch (error) {

          console.error(
            "Failed to load SEO settings from Supabase:",
            error
          );


          /*
           * FALLBACK:
           * use browser cache.
           */

          const localSEO =
            loadLocalSEO();


          if (
            isMounted
          ) {

            setSeoData(
              localSEO
            );

            setSavedMessage(
              "Using locally cached SEO settings."
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

      };


    loadSEO();


    return () => {

      isMounted =
        false;

    };

  }, []);


  /* =========================
     CLEAR STATUS MESSAGE
  ========================= */

  useEffect(() => {

    if (
      !savedMessage
    ) {

      return;

    }


    const timer =
      setTimeout(
        () => {

          setSavedMessage(
            ""
          );

        },
        3000
      );


    return () =>
      clearTimeout(
        timer
      );

  }, [
    savedMessage,
  ]);


  /* =========================
     HANDLE FORM CHANGE
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


      setSeoData(
        (
          prev
        ) => ({

          ...prev,

          [name]:
            value,

        })
      );


      setSavedMessage(
        ""
      );

    };


  /* =========================
     SELECT SOCIAL IMAGE
  ========================= */

  const handleSelectImage =
    (
      imageUrl
    ) => {

      if (
        !imageUrl
      ) {

        return;

      }


      setSeoData(
        (
          prev
        ) => ({

          ...prev,

          ogImage:
            imageUrl,

        })
      );


      setIsImagePickerOpen(
        false
      );


      setSavedMessage(
        ""
      );

    };


  /* =========================
     REMOVE SOCIAL IMAGE
  ========================= */

  const handleRemoveImage =
    () => {

      setSeoData(
        (
          prev
        ) => ({

          ...prev,

          ogImage: "",

        })
      );


      setSavedMessage(
        ""
      );

    };


  /* =========================
     SAVE SEO TO SUPABASE
  ========================= */

  const handleSave =
    async () => {

      if (
        isSaving
      ) {

        return;

      }


      setIsSaving(
        true
      );

      setSavedMessage(
        ""
      );


      try {

        const {
          error,
        } =
          await supabase
            .from(
              "site_settings"
            )
            .update({
              setting_value:
                seoData,

              updated_at:
                new Date()
                  .toISOString(),
            })
            .eq(
              "setting_key",
              SUPABASE_SETTING_KEY
            );


        if (
          error
        ) {

          throw error;

        }


        /*
         * Keep localStorage synchronized
         * as an offline/cache fallback.
         */

        saveLocalSEO(
          seoData
        );


        setSavedMessage(
          "SEO settings saved successfully."
        );

      } catch (error) {

        console.error(
          "Failed to save SEO settings to Supabase:",
          error
        );


        /*
         * Keep a local copy even if
         * Supabase temporarily fails.
         */

        saveLocalSEO(
          seoData
        );


        setSavedMessage(
          "Unable to save SEO settings online. A local copy was saved."
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

      <div className="seo-page">


        {/* =========================
            HEADER
        ========================= */}

        <div className="seo-header">

          <div>

            <span className="seo-overline">
              SEO MANAGEMENT
            </span>


            <h1>
              Search Engine Optimization
            </h1>


            <p>
              Manage your website metadata
              and social sharing
              information.
            </p>

          </div>


          <button
            type="button"
            className="seo-save-button"
            onClick={
              handleSave
            }
            disabled={
              isLoading ||
              isSaving
            }
          >

            {isSaving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>


        {/* =========================
            STATUS MESSAGE
        ========================= */}

        {savedMessage && (

          <div className="seo-success-message">

            {
              savedMessage
            }

          </div>

        )}


        <div className="seo-content">


          {/* =========================
              GENERAL SEO
          ========================= */}

          <section className="seo-card">

            <div className="seo-card-header">

              <span className="seo-section-label">
                GENERAL
              </span>


              <h2>
                Website SEO
              </h2>


              <p>
                Configure the default
                search engine information
                for your website.
              </p>

            </div>


            <div className="seo-form">


              {/* =========================
                  SITE TITLE
              ========================= */}

              <div className="seo-form-group">

                <label>
                  Site Title
                </label>


                <input
                  type="text"
                  name="siteTitle"
                  value={
                    seoData.siteTitle
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Rohit Ohal Photography"
                  disabled={
                    isLoading
                  }
                />


                <span className="seo-help">

                  {
                    seoData
                      .siteTitle
                      .length
                  }{" "}
                  characters

                </span>

              </div>


              {/* =========================
                  META DESCRIPTION
              ========================= */}

              <div className="seo-form-group">

                <label>
                  Meta Description
                </label>


                <textarea
                  rows="4"
                  name="metaDescription"
                  value={
                    seoData
                      .metaDescription
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Describe your photography business..."
                  disabled={
                    isLoading
                  }
                />


                <span className="seo-help">

                  {
                    seoData
                      .metaDescription
                      .length
                  }{" "}
                  characters

                </span>

              </div>


              {/* =========================
                  KEYWORDS
              ========================= */}

              <div className="seo-form-group">

                <label>
                  Keywords
                </label>


                <textarea
                  rows="3"
                  name="keywords"
                  value={
                    seoData.keywords
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Wedding Photographer Pune, Commercial Photography..."
                  disabled={
                    isLoading
                  }
                />


                <span className="seo-help">
                  Separate keywords
                  with commas.
                </span>

              </div>

            </div>

          </section>


          {/* =========================
              SOCIAL SHARING
          ========================= */}

          <section className="seo-card">

            <div className="seo-card-header">

              <span className="seo-section-label">
                SOCIAL
              </span>


              <h2>
                Social Sharing
              </h2>


              <p>
                Control how your website
                appears when shared on
                social media.
              </p>

            </div>


            <div className="seo-form">


              {/* =========================
                  OPEN GRAPH TITLE
              ========================= */}

              <div className="seo-form-group">

                <label>
                  Open Graph Title
                </label>


                <input
                  type="text"
                  name="ogTitle"
                  value={
                    seoData.ogTitle
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Rohit Ohal Photography"
                  disabled={
                    isLoading
                  }
                />

              </div>


              {/* =========================
                  OPEN GRAPH DESCRIPTION
              ========================= */}

              <div className="seo-form-group">

                <label>
                  Open Graph Description
                </label>


                <textarea
                  rows="3"
                  name="ogDescription"
                  value={
                    seoData
                      .ogDescription
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Fine art wedding and commercial photography."
                  disabled={
                    isLoading
                  }
                />

              </div>


              {/* =========================
                  SOCIAL SHARING IMAGE
              ========================= */}

              <div className="seo-form-group">

                <label>
                  Social Sharing Image
                </label>


                <p
                  className="seo-help"
                  style={{
                    marginTop:
                      "0",

                    marginBottom:
                      "14px",
                  }}
                >
                  Select the default image
                  used when your website is
                  shared on social media.
                </p>


                <button
                  type="button"
                  className="seo-save-button"
                  disabled={
                    isLoading
                  }
                  onClick={() =>
                    setIsImagePickerOpen(
                      true
                    )
                  }
                >

                  {seoData.ogImage
                    ? "Change Social Image"
                    : "Select Social Image"}

                </button>


                {/* =========================
                    IMAGE PREVIEW
                ========================= */}

                {seoData.ogImage && (

                  <div
                    className="seo-image-preview"
                    style={{
                      marginTop:
                        "20px",
                    }}
                  >

                    <img
                      src={
                        seoData.ogImage
                      }
                      alt="Social sharing preview"
                    />


                    <button
                      type="button"
                      onClick={
                        handleRemoveImage
                      }
                      disabled={
                        isLoading
                      }
                      style={{
                        display:
                          "block",

                        marginTop:
                          "12px",

                        padding:
                          "9px 14px",

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

            </div>

          </section>


          {/* =========================
              GOOGLE PREVIEW
          ========================= */}

          <section className="seo-card">

            <div className="seo-card-header">

              <span className="seo-section-label">
                PREVIEW
              </span>


              <h2>
                Google Search Preview
              </h2>


              <p>
                Preview how your homepage
                may appear in search
                results.
              </p>

            </div>


            <div className="google-preview">

              <span className="google-url">

                rohitohalphotography.com

              </span>


              <h3>

                {
                  seoData.siteTitle ||
                  "Rohit Ohal Photography"
                }

              </h3>


              <p>

                {
                  seoData
                    .metaDescription ||
                  "Your website description will appear here."
                }

              </p>

            </div>

          </section>


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