import {
  useEffect,
  useState,
} from "react";

import ImagePicker from "../components/ImagePicker/ImagePicker";

import "../styles/seo.css";


/* =========================
   DEFAULT SEO SETTINGS
========================= */

const defaultSEO = {
  siteTitle:
    "Rohit Ohal Photography",

  metaDescription:
    "Fine art wedding, commercial, portrait and editorial photography by Rohit Ohal.",

  keywords:
    "Rohit Ohal Photography, Wedding Photographer Pune, Commercial Photographer Pune",

  ogTitle:
    "Rohit Ohal Photography",

  ogDescription:
    "Fine art wedding and commercial photography.",

  ogImage: "",
};


/* =========================
   STORAGE KEY
========================= */

const SEO_KEY =
  "rohit-photography-seo";


export default function SEO() {

  /* =========================
     LOAD SEO SETTINGS
  ========================= */

  const [
    seoData,
    setSeoData,
  ] = useState(() => {

    try {

      const saved =
        localStorage.getItem(
          SEO_KEY
        );


      /*
       * No saved SEO settings.
       * Use defaults.
       */

      if (!saved) {

        return {
          ...defaultSEO,
        };

      }


      /*
       * Merge saved settings
       * with default settings.
       */

      const parsed =
        JSON.parse(saved);


      if (
        !parsed ||
        typeof parsed !==
          "object" ||
        Array.isArray(parsed)
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
        "Failed to load SEO settings:",
        error
      );


      return {
        ...defaultSEO,
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
      clearTimeout(
        timer
      );

  }, [
    savedMessage,
  ]);


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


    setSeoData(
      (prev) => ({

        ...prev,

        [name]:
          value,

      })
    );


    setSavedMessage("");

  };


  /* =========================
     SELECT SOCIAL IMAGE
  ========================= */

  const handleSelectImage = (
    imageUrl
  ) => {

    if (!imageUrl) {
      return;
    }


    setSeoData(
      (prev) => ({

        ...prev,

        ogImage:
          imageUrl,

      })
    );


    setIsImagePickerOpen(
      false
    );


    setSavedMessage("");

  };


  /* =========================
     REMOVE SOCIAL IMAGE
  ========================= */

  const handleRemoveImage =
    () => {

      setSeoData(
        (prev) => ({

          ...prev,

          ogImage: "",

        })
      );


      setSavedMessage("");

    };


  /* =========================
     SAVE SEO SETTINGS
  ========================= */

  const handleSave = () => {

    try {

      localStorage.setItem(
        SEO_KEY,
        JSON.stringify(
          seoData
        )
      );


      setSavedMessage(
        "SEO settings saved successfully."
      );

    } catch (error) {

      console.error(
        "Failed to save SEO settings:",
        error
      );


      setSavedMessage(
        "Unable to save SEO settings."
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
          >
            Save Changes
          </button>

        </div>


        {/* =========================
            SAVED MESSAGE
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