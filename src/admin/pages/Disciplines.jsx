import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  disciplines as defaultDisciplines,
} from "../../data/disciplines";

import PortfolioSettings from "../components/PortfolioSettings/PortfolioSettings";

import "../styles/disciplines.css";


/* =========================
   STORAGE KEYS
========================= */

const DISCIPLINES_KEY =
  "rohit-photography-disciplines";

const MEDIA_KEY =
  "rohit-photography-media";


/* =========================
   DISCIPLINES ADMIN
========================= */

export default function Disciplines() {

  /* =========================
     DISCIPLINES STATE
  ========================= */

  const [
    disciplines,
    setDisciplines,
  ] = useState(() => {

    try {

      const saved =
        localStorage.getItem(
          DISCIPLINES_KEY
        );


      if (!saved) {

        return defaultDisciplines.map(
          (discipline) => ({
            ...discipline,
          })
        );

      }


      const parsed =
        JSON.parse(
          saved
        );


      if (
        !Array.isArray(
          parsed
        )
      ) {

        return defaultDisciplines.map(
          (discipline) => ({
            ...discipline,
          })
        );

      }


      /*
       * Merge saved settings with
       * default discipline data.
       *
       * This ensures newly added
       * disciplines still appear.
       */

      return defaultDisciplines.map(
        (defaultDiscipline) => {

          const savedDiscipline =
            parsed.find(
              (item) =>
                item.id ===
                defaultDiscipline.id
            );


          return {
            ...defaultDiscipline,
            ...savedDiscipline,
          };

        }
      );


    } catch (error) {

      console.error(
        "Failed to load disciplines:",
        error
      );


      return defaultDisciplines.map(
        (discipline) => ({
          ...discipline,
        })
      );

    }

  });


  /* =========================
     MEDIA LIBRARY
  ========================= */

  const [
    mediaItems,
    setMediaItems,
  ] = useState([]);


  /* =========================
     IMAGE PICKER
  ========================= */

  const [
    selectedDisciplineId,
    setSelectedDisciplineId,
  ] = useState(null);


  const [
    imagePickerOpen,
    setImagePickerOpen,
  ] = useState(false);


  /* =========================
     SEARCH
  ========================= */

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");


  /* =========================
     SAVE MESSAGE
  ========================= */

  const [
    savedMessage,
    setSavedMessage,
  ] = useState("");


  /* =========================
     LOAD MEDIA LIBRARY
  ========================= */

  useEffect(() => {

    try {

      const savedMedia =
        localStorage.getItem(
          MEDIA_KEY
        );


      if (!savedMedia) {

        setMediaItems([]);

        return;

      }


      const parsedMedia =
        JSON.parse(
          savedMedia
        );


      if (
        Array.isArray(
          parsedMedia
        )
      ) {

        setMediaItems(
          parsedMedia
        );

      } else {

        setMediaItems([]);

      }


    } catch (error) {

      console.error(
        "Failed to load Media Library:",
        error
      );

      setMediaItems([]);

    }

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
        (item) => {

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

      setSearchQuery("");

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

      setSearchQuery("");

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
        (currentDisciplines) =>

          currentDisciplines.map(
            (discipline) => {

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
          (discipline) =>
            discipline.id ===
            disciplineId
        );


      if (!defaultDiscipline) {

        return;

      }


      setDisciplines(
        (currentDisciplines) =>

          currentDisciplines.map(
            (discipline) => {

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
  ========================= */

  const handleSave =
    () => {

      try {

        localStorage.setItem(
          DISCIPLINES_KEY,
          JSON.stringify(
            disciplines
          )
        );


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
          "Failed to save disciplines:",
          error
        );


        alert(
          "Unable to save disciplines."
        );

      }

    };


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


              {/* =========================
                  IMAGE
              ========================= */}

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


              {/* =========================
                  CONTENT
              ========================= */}

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


                {/* =========================
                    ACTIONS
                ========================= */}

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
          IMAGE PICKER MODAL
      ========================= */}

      {imagePickerOpen && (

        <div className="discipline-picker-backdrop">

          <div className="discipline-picker-modal">


            {/* =========================
                PICKER HEADER
            ========================= */}

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


            {/* =========================
                SEARCH
            ========================= */}

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


            {/* =========================
                MEDIA
            ========================= */}

            {filteredMedia.length >
            0 ? (

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
                          mediaItem.publicId
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

            ) : (

              <div className="discipline-picker-empty">

                <h3>
                  No Images Found
                </h3>

                <p>
                  Upload images to your
                  Media Library first,
                  then select them here.
                </p>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );
}