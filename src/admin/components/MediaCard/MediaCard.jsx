import {
  useState,
} from "react";

import {
  Trash2,
  Copy,
  Eye,
  Check,
  FolderInput,
} from "lucide-react";

export default function MediaCard({
  image,
  folders = [],
  onDelete,
  onMove,
}) {
  const [
    copied,
    setCopied,
  ] = useState(false);

  const [
    showFolderMenu,
    setShowFolderMenu,
  ] = useState(false);


  /* =========================
     PREVIEW IMAGE
  ========================= */

  const handlePreview = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    window.open(
      image.image,
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* =========================
     COPY IMAGE URL
  ========================= */

  const handleCopy = async (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await navigator.clipboard
        .writeText(
          image.image
        );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {
      console.error(
        "Failed to copy image URL:",
        error
      );

      alert(
        "Unable to copy image URL."
      );
    }
  };


  /* =========================
     TOGGLE FOLDER MENU
  ========================= */

  const handleFolderButton = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setShowFolderMenu(
      (prev) => !prev
    );
  };


  /* =========================
     MOVE IMAGE
  ========================= */

  const handleMove = (
    event,
    destinationFolder
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!onMove) {
      console.error(
        "Move function is not available."
      );

      alert(
        "Unable to move image. Move function is not connected."
      );

      return;
    }

    if (
      !destinationFolder
    ) {
      return;
    }

    if (
      destinationFolder ===
      image.folder
    ) {
      setShowFolderMenu(
        false
      );

      return;
    }

    onMove(
      image.id,
      destinationFolder
    );

    setShowFolderMenu(
      false
    );
  };


  /* =========================
     DELETE IMAGE
  ========================= */

  const handleDelete = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!onDelete) {
      console.error(
        "Delete function is not available."
      );

      return;
    }

    onDelete(
      image.id
    );
  };


  /* =========================
     BUILD FOLDER LIST
  ========================= */

  const availableFolders = [
    "Uncategorized",

    ...folders.filter(
      (folder) =>
        folder &&
        folder !==
          "Uncategorized"
    ),
  ];


  /* =========================
     REMOVE DUPLICATE FOLDERS
  ========================= */

  const uniqueFolders = [
    ...new Set(
      availableFolders
    ),
  ];


  /* =========================
     RENDER
  ========================= */

  return (
    <div className="media-card">

      {/* =========================
          IMAGE
      ========================= */}

      <div
        className="media-image-wrapper"
        style={{
          position:
            "relative",

          overflow:
            "visible",
        }}
      >

        <img
          src={
            image.image
          }
          alt={
            image.name
          }
          loading="lazy"
        />


        {/* =========================
            ACTION BUTTONS
        ========================= */}

        <div className="media-overlay">


          {/* PREVIEW */}

          <button
            type="button"
            onClick={
              handlePreview
            }
            title="Preview Image"
            aria-label="Preview Image"
          >
            <Eye
              size={18}
            />
          </button>


          {/* COPY URL */}

          <button
            type="button"
            onClick={
              handleCopy
            }
            title={
              copied
                ? "Copied"
                : "Copy Image URL"
            }
            aria-label="Copy Image URL"
          >

            {copied ? (

              <Check
                size={18}
              />

            ) : (

              <Copy
                size={18}
              />

            )}

          </button>


          {/* MOVE TO FOLDER */}

          <button
            type="button"
            onClick={
              handleFolderButton
            }
            title="Move to Folder"
            aria-label="Move to Folder"
          >
            <FolderInput
              size={18}
            />
          </button>


          {/* DELETE */}

          <button
            type="button"
            onClick={
              handleDelete
            }
            title="Remove from Media Library"
            aria-label="Remove from Media Library"
          >
            <Trash2
              size={18}
            />
          </button>

        </div>


        {/* =========================
            FOLDER MENU
        ========================= */}

        {showFolderMenu && (

          <div
            className="media-folder-menu"
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              position:
                "absolute",

              top:
                "55px",

              right:
                "15px",

              width:
                "220px",

              maxHeight:
                "280px",

              overflowY:
                "auto",

              background:
                "#ffffff",

              border:
                "1px solid #ece8df",

              borderRadius:
                "12px",

              boxShadow:
                "0 12px 35px rgba(0,0,0,0.22)",

              zIndex:
                9999,
            }}
          >

            {/* MENU HEADER */}

            <div
              style={{
                padding:
                  "12px 14px",

                fontSize:
                  "11px",

                color:
                  "#777",

                borderBottom:
                  "1px solid #ece8df",

                textTransform:
                  "uppercase",

                letterSpacing:
                  "1px",

                fontWeight:
                  "600",
              }}
            >
              Move to Folder
            </div>


            {/* FOLDER OPTIONS */}

            {uniqueFolders.map(
              (folder) => {

                const isCurrent =
                  folder ===
                  image.folder;

                return (

                  <button
                    type="button"
                    key={
                      folder
                    }
                    onClick={(
                      event
                    ) =>
                      handleMove(
                        event,
                        folder
                      )
                    }
                    disabled={
                      isCurrent
                    }
                    style={{
                      display:
                        "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "space-between",

                      gap:
                        "10px",

                      width:
                        "100%",

                      padding:
                        "12px 14px",

                      border:
                        "none",

                      borderBottom:
                        "1px solid #f1f1f1",

                      background:
                        isCurrent
                          ? "#f8f3e9"
                          : "#ffffff",

                      color:
                        isCurrent
                          ? "#b58b43"
                          : "#222222",

                      textAlign:
                        "left",

                      cursor:
                        isCurrent
                          ? "default"
                          : "pointer",

                      fontSize:
                        "13px",
                    }}
                  >

                    <span>
                      📁{" "}
                      {
                        folder
                      }
                    </span>

                    {isCurrent && (

                      <span>
                        ✓
                      </span>

                    )}

                  </button>

                );
              }
            )}

          </div>

        )}

      </div>


      {/* =========================
          IMAGE INFORMATION
      ========================= */}

      <div className="media-card-info">

        <h3>
          {
            image.name
          }
        </h3>


        {/* CURRENT FOLDER */}

        <span>
          📁{" "}
          {
            image.folder ||
            "Uncategorized"
          }
        </span>


        {/* FILE SIZE */}

        <p>
          {
            image.size
          }
        </p>


        {/* DIMENSIONS */}

        {image.width &&
          image.height && (

          <p>
            {
              image.width
            }
            {" × "}
            {
              image.height
            }
          </p>

        )}

      </div>

    </div>
  );
}