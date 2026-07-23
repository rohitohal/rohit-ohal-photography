import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  disciplines as defaultDisciplines,
} from "../../data/disciplines";

import {
  supabase,
} from "../../lib/supabase";

import {
  getAllMedia,
} from "../../services/mediaService";

import PortfolioSettings from "../components/PortfolioSettings/PortfolioSettings";

import "../styles/disciplines.css";


/* =========================
   SUPABASE SETTING KEY
========================= */

const DISCIPLINES_SETTING_KEY =
  "portfolio_disciplines";


/* =========================
   LEGACY STORAGE KEY

   Kept temporarily only as
   fallback for old discipline
   settings.

   Media Library no longer
   uses localStorage.
========================= */

const LEGACY_DISCIPLINES_KEY =
  "rohit-photography-disciplines";


/* =========================
   DISCIPLINES ADMIN
========================= */

export default function Disciplines() {

  /* =========================
     DISCIPLINES
  ========================= */

  const [
    disciplines,
    setDisciplines,
  ] =
    useState(
      () =>
        defaultDisciplines.map(
          (
            discipline
          ) => ({
            ...discipline,
          })
        )
    );


  /* =========================
     DISCIPLINES LOADING
  ========================= */

  const [
    disciplinesLoading,
    setDisciplinesLoading,
  ] =
    useState(true);


  /* =========================
     MEDIA LIBRARY

     Metadata comes from
     Supabase.

     Actual image files remain
     stored in Cloudinary.
  ========================= */

  const [
    mediaItems,
    setMediaItems,
  ] =
    useState([]);


  const [
    mediaLoading,
    setMediaLoading,
  ] =
    useState(true);


  const [
    mediaError,
    setMediaError,
  ] =
    useState("");


  /* =========================
     IMAGE PICKER
  ========================= */

  const [
    selectedDisciplineId,
    setSelectedDisciplineId,
  ] =
    useState(null);


  const [
    imagePickerOpen,
    setImagePickerOpen,
  ] =
    useState(false);


  /* =========================
     SEARCH
  ========================= */

  const [
    searchQuery,
    setSearchQuery,
  ] =
    useState("");


  /* =========================
     SAVE MESSAGE
  ========================= */

  const [
    savedMessage,
    setSavedMessage,
  ] =
    useState("");


  /* =========================
     LOAD DISCIPLINES
     FROM SUPABASE
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadDisciplines() {

      try {

        setDisciplinesLoading(
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
              DISCIPLINES_SETTING_KEY
            )
            .maybeSingle();


        if (error) {

          throw error;

        }


        if (!mounted) {

          return;

        }


        /* =========================
           SUPABASE DATA EXISTS
        ========================= */

        if (
          data &&
          Array.isArray(
            data.setting_value
          )
        ) {

          const savedDisciplines =
            data.setting_value;


          const mergedDisciplines =
            defaultDisciplines.map(
              (
                defaultDiscipline
              ) => {

                const savedDiscipline =
                  savedDisciplines.find(
                    (
                      item
                    ) =>
                      item.id ===
                      defaultDiscipline.id
                  );


                return {

                  ...defaultDiscipline,

                  ...savedDiscipline,

                };

              }
            );


          setDisciplines(
            mergedDisciplines
          );


          return;

        }


        /* =========================
           LEGACY FALLBACK

           Only discipline settings
           use this fallback.

           Media Library does NOT.
        ========================= */

        const legacySaved =
          localStorage.getItem(
            LEGACY_DISCIPLINES_KEY
          );


        if (legacySaved) {

          const parsed =
            JSON.parse(
              legacySaved
            );


          if (
            Array.isArray(
              parsed
            )
          ) {

            const mergedDisciplines =
              defaultDisciplines.map(
                (
                  defaultDiscipline
                ) => {

                  const savedDiscipline =
                    parsed.find(
                      (
                        item
                      ) =>
                        item.id ===
                        defaultDiscipline.id
                    );


                  return {

                    ...defaultDiscipline,

                    ...savedDiscipline,

                  };

                }
              );


            setDisciplines(
              mergedDisciplines
            );


            setSavedMessage(
              "Existing disciplines loaded. Click Save Changes to migrate them to Supabase."
            );


            return;

          }

        }


        /* =========================
           NOTHING SAVED
        ========================= */

        setDisciplines(
          defaultDisciplines.map(
            (
              discipline
            ) => ({

              ...discipline,

            })
          )
        );


      } catch (error) {

        console.error(
          "Failed to load disciplines from Supabase:",
          error
        );


        if (mounted) {

          setDisciplines(
            defaultDisciplines.map(
              (
                discipline
              ) => ({

                ...discipline,

              })
            )
          );

        }


      } finally {

        if (mounted) {

          setDisciplinesLoading(
            false
          );

        }

      }

    }


    loadDisciplines();


    return () => {

      mounted =
        false;

    };

  }, []);


  /* =========================
     LOAD MEDIA LIBRARY
     FROM SUPABASE

     IMPORTANT:
     Supabase stores metadata
     and Cloudinary URLs only.

     The actual photographs
     remain in Cloudinary.
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadMediaLibrary() {

      try {

        setMediaLoading(
          true
        );


        setMediaError(
          ""
        );


        const mediaData =
          await getAllMedia();


        if (!mounted) {

          return;

        }


        setMediaItems(
          Array.isArray(
            mediaData
          )
            ? mediaData
            : []
        );


      } catch (error) {

        console.error(
          "Failed to load Media Library from Supabase:",
          error
        );


        if (mounted) {

          setMediaItems(
            []
          );


          setMediaError(
            "Unable to load the Media Library."
          );

        }


      } finally {

        if (mounted) {

          setMediaLoading(
            false
          );

        }

      }

    }


    loadMediaLibrary();


    return () => {

      mounted =
        false;

    };

  }, []);


  /* =========================
     FILTER MEDIA
  ========================= */

  const filteredMedia =
    useMemo(() => {

      const query =
        searchQuery
          .trim()
          .toLowerCase();


      if (!query) {

        return mediaItems;

      }


      return mediaItems.filter(
        (
          item
        ) => {

          const filename =
            item.filename ||
            "";


          const publicId =
            item.publicId ||
            "";


          const folder =
            item.folder ||
            item.category ||
            "";


          return (

            filename
              .toLowerCase()
              .includes(
                query
              ) ||

            publicId
              .toLowerCase()
              .includes(
                query
              ) ||

            folder
              .toLowerCase()
              .includes(
                query
              )

          );

        }
      );

    }, [
      mediaItems,
      searchQuery,
    ]);


  /* =========================
     OPEN IMAGE PICKER
  ========================= */

  const handleOpenImagePicker =
    (
      disciplineId
    ) => {

      setSelectedDisciplineId(
        disciplineId
      );


      setSearchQuery(
        ""
      );


      setImagePickerOpen(
        true
      );

    };


  /* =========================
     CLOSE IMAGE PICKER
  ========================= */

  const handleCloseImagePicker =
    () => {

      setImagePickerOpen(
        false
      );


      setSelectedDisciplineId(
        null
      );


      setSearchQuery(
        ""
      );

    };


  /* =========================
     SELECT IMAGE
  ========================= */

  const handleSelectImage =
    (
      mediaItem
    ) => {

      if (
        !selectedDisciplineId ||
        !mediaItem
      ) {

        return;

      }


      const imageUrl =
        mediaItem.url ||
        mediaItem.secure_url;


      if (!imageUrl) {

        alert(
          "This Media Library item does not contain a valid image URL."
        );


        return;

      }


      setDisciplines(
        (
          currentDisciplines
        ) =>

          currentDisciplines.map(
            (
              discipline
            ) => {

              if (
                discipline.id !==
                selectedDisciplineId
              ) {

                return discipline;

              }


              return {

                ...discipline,

                image:
                  imageUrl,

                imagePublicId:
                  mediaItem.publicId ||
                  mediaItem.id ||
                  "",

              };

            }
          )
      );


      handleCloseImagePicker();

    };


  /* =========================
     RESET IMAGE
  ========================= */

  const handleResetImage =
    (
      disciplineId
    ) => {

      const defaultDiscipline =
        defaultDisciplines.find(
          (
            discipline
          ) =>
            discipline.id ===
            disciplineId
        );


      if (!defaultDiscipline) {

        return;

      }


      setDisciplines(
        (
          currentDisciplines
        ) =>

          currentDisciplines.map(
            (
              discipline
            ) => {

              if (
                discipline.id !==
                disciplineId
              ) {

                return discipline;

              }


              return {

                ...discipline,

                image:
                  defaultDiscipline.image,

                imagePublicId:
                  "",

              };

            }
          )
      );

    };


  /* =========================
     SAVE DISCIPLINES
     TO SUPABASE
  ========================= */

  const handleSave =
    async () => {

      try {

        setSavedMessage(
          "Saving..."
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
                  DISCIPLINES_SETTING_KEY,

                setting_value:
                  disciplines,

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


        setSavedMessage(
          "Disciplines saved successfully."
        );


        window.setTimeout(
          () => {

            setSavedMessage(
              ""
            );

          },
          3000
        );


      } catch (error) {

        console.error(
          "Failed to save disciplines to Supabase:",
          error
        );


        setSavedMessage(
          ""
        );


        alert(
          error?.message ||
          "Unable to save disciplines."
        );

      }

    };


  /* =========================
     LOADING
  ========================= */

  if (disciplinesLoading) {

    return (

      <div className="disciplines-admin-page">

        <div className="disciplines-admin-header">

          <div>

            <span className="disciplines-admin-overline">
              PORTFOLIO
            </span>


            <h1>
              Portfolio Disciplines
            </h1>


            <p>
              Loading disciplines...
            </p>

          </div>

        </div>

      </div>

    );

  }


  /* =========================
     RENDER
  ========================= */

  return (

    <div className="disciplines-admin-page">


      {/* =========================
          HEADER
      ========================= */}

      <div className="disciplines-admin-header">

        <div>

          <span className="disciplines-admin-overline">
            PORTFOLIO
          </span>


          <h1>
            Portfolio Disciplines
          </h1>


          <p>
            Manage the images used for
            your portfolio disciplines
            across the homepage and
            navigation menu.
          </p>

        </div>


        <div className="disciplines-admin-actions">

          {savedMessage && (

            <span className="disciplines-save-message">

              {savedMessage}

            </span>

          )}


          <button
            type="button"
            className="disciplines-save-button"
            onClick={
              handleSave
            }
          >

            Save Changes

          </button>

        </div>

      </div>


      {/* =========================
          PORTFOLIO HERO SETTINGS
      ========================= */}

      <div
        style={{
          marginBottom:
            "50px",
        }}
      >

        <PortfolioSettings />

      </div>


      {/* =========================
          DISCIPLINES GRID
      ========================= */}

      <div className="disciplines-admin-grid">

        {disciplines.map(
          (
            discipline
          ) => (

            <article
              key={
                discipline.id
              }
              className="discipline-admin-card"
            >


              {/* IMAGE */}

              <div className="discipline-admin-image">

                <img
                  src={
                    discipline.image
                  }
                  alt={
                    discipline.title
                  }
                />

              </div>


              {/* CONTENT */}

              <div className="discipline-admin-content">

                <span className="discipline-admin-slug">

                  /portfolio/
                  {
                    discipline.slug
                  }

                </span>


                <h2>

                  {
                    discipline.title
                  }

                </h2>


                <p>

                  {
                    discipline.description
                  }

                </p>


                {/* ACTIONS */}

                <div className="discipline-admin-buttons">

                  <button
                    type="button"
                    className="discipline-image-button primary"
                    onClick={() =>
                      handleOpenImagePicker(
                        discipline.id
                      )
                    }
                  >

                    Choose Image

                  </button>


                  <button
                    type="button"
                    className="discipline-image-button secondary"
                    onClick={() =>
                      handleResetImage(
                        discipline.id
                      )
                    }
                  >

                    Reset

                  </button>

                </div>

              </div>

            </article>

          )
        )}

      </div>


      {/* =========================
          IMAGE PICKER
      ========================= */}

      {imagePickerOpen && (

        <div className="discipline-picker-backdrop">

          <div className="discipline-picker-modal">


            {/* PICKER HEADER */}

            <div className="discipline-picker-header">

              <div>

                <span>
                  MEDIA LIBRARY
                </span>


                <h2>
                  Choose an Image
                </h2>

              </div>


              <button
                type="button"
                className="discipline-picker-close"
                onClick={
                  handleCloseImagePicker
                }
                aria-label="Close image picker"
              >

                ×

              </button>

            </div>


            {/* SEARCH */}

            <div className="discipline-picker-search">

              <input
                type="text"
                placeholder="Search images..."
                value={
                  searchQuery
                }
                onChange={(
                  event
                ) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
              />

            </div>


            {/* MEDIA LOADING */}

            {mediaLoading && (

              <div className="discipline-picker-empty">

                <h3>
                  Loading Images...
                </h3>


                <p>
                  Loading your Media
                  Library from Supabase.
                </p>

              </div>

            )}


            {/* MEDIA ERROR */}

            {!mediaLoading &&
              mediaError && (

              <div className="discipline-picker-empty">

                <h3>
                  Unable to Load Images
                </h3>


                <p>
                  {mediaError}
                </p>

              </div>

            )}


            {/* MEDIA GRID */}

            {!mediaLoading &&
              !mediaError &&
              filteredMedia.length >
                0 && (

              <div className="discipline-picker-grid">

                {filteredMedia.map(
                  (
                    mediaItem
                  ) => {

                    const imageUrl =
                      mediaItem.url ||
                      mediaItem.secure_url;


                    if (!imageUrl) {

                      return null;

                    }


                    return (

                      <button
                        type="button"
                        key={
                          mediaItem.id ||
                          mediaItem.publicId ||
                          imageUrl
                        }
                        className="discipline-picker-item"
                        onClick={() =>
                          handleSelectImage(
                            mediaItem
                          )
                        }
                      >

                        <img
                          src={
                            imageUrl
                          }
                          alt={
                            mediaItem.filename ||
                            "Media Library"
                          }
                          loading="lazy"
                        />


                        <span>

                          {
                            mediaItem.filename ||
                            mediaItem.publicId ||
                            "Image"
                          }

                        </span>

                      </button>

                    );

                  }
                )}

              </div>

            )}


            {/* EMPTY MEDIA */}

            {!mediaLoading &&
              !mediaError &&
              filteredMedia.length ===
                0 && (

              <div className="discipline-picker-empty">

                <h3>
                  No Images Found
                </h3>


                <p>

                  {searchQuery
                    ? "No images match your search."
                    : "Upload images to your Media Library first, then select them here."}

                </p>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

}