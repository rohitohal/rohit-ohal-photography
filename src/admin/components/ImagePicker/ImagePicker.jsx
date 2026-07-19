import {
  useMemo,
  useState,
} from "react";

import "../../styles/image-picker.css";

const MEDIA_KEY =
  "rohit-photography-media";

const FOLDERS_KEY =
  "rohit-photography-media-folders";

export default function ImagePicker({
  isOpen,
  onClose,
  onSelect,
}) {
  /* =========================
     SEARCH
  ========================= */

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  /* =========================
     ACTIVE FOLDER
  ========================= */

  const [
    activeFolder,
    setActiveFolder,
  ] = useState("all");

  /* =========================
     LOAD MEDIA LIBRARY
  ========================= */

  const mediaItems =
    useMemo(() => {
      if (!isOpen) {
        return [];
      }

      try {
        const saved =
          localStorage.getItem(
            MEDIA_KEY
          );

        if (!saved) {
          return [];
        }

        const parsed =
          JSON.parse(saved);

        return Array.isArray(
          parsed
        )
          ? parsed
          : [];
      } catch (error) {
        console.error(
          "Failed to load Media Library:",
          error
        );

        return [];
      }
    }, [isOpen]);

  /* =========================
     LOAD FOLDERS
  ========================= */

  const folders =
    useMemo(() => {
      if (!isOpen) {
        return [];
      }

      try {
        const saved =
          localStorage.getItem(
            FOLDERS_KEY
          );

        if (!saved) {
          return [];
        }

        const parsed =
          JSON.parse(saved);

        return Array.isArray(
          parsed
        )
          ? parsed
          : [];
      } catch (error) {
        console.error(
          "Failed to load Media folders:",
          error
        );

        return [];
      }
    }, [isOpen]);

  /* =========================
     FILTER IMAGES
  ========================= */

  const filteredMedia =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      return mediaItems.filter(
        (image) => {
          /*
           * FOLDER FILTER
           */

          const imageFolder =
            image.folder ||
            image.category ||
            "Uncategorized";

          const matchesFolder =
            activeFolder ===
              "all" ||
            imageFolder ===
              activeFolder;

          if (!matchesFolder) {
            return false;
          }

          /*
           * SEARCH FILTER
           */

          if (!query) {
            return true;
          }

          const filename =
            image.filename ||
            "";

          const publicId =
            image.publicId ||
            "";

          return (
            filename
              .toLowerCase()
              .includes(query) ||
            publicId
              .toLowerCase()
              .includes(query)
          );
        }
      );
    }, [
      mediaItems,
      activeFolder,
      searchQuery,
    ]);

  /* =========================
     SELECT IMAGE
  ========================= */

  const handleSelect = (
    imageUrl
  ) => {
    if (!imageUrl) {
      return;
    }

    onSelect(imageUrl);

    handleClose();
  };

  /* =========================
     CHANGE FOLDER
  ========================= */

  const handleFolderChange = (
    folder
  ) => {
    setActiveFolder(
      folder
    );

    setSearchQuery("");
  };

  /* =========================
     CLOSE PICKER
  ========================= */

  const handleClose = () => {
    setSearchQuery("");

    setActiveFolder(
      "all"
    );

    onClose();
  };

  /* =========================
     DO NOT RENDER
  ========================= */

  if (!isOpen) {
    return null;
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <div
      className="image-picker-overlay"
      onClick={
        handleClose
      }
    >

      <div
        className="image-picker-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* =========================
            HEADER
        ========================= */}

        <div className="image-picker-header">

          <div>

            <h2>
              Select Image
            </h2>

            <p
              style={{
                margin:
                  "5px 0 0",
                color:
                  "#777",
                fontSize:
                  "14px",
              }}
            >
              Choose an image
              from your Media
              Library.
            </p>

          </div>

          <button
            type="button"
            className="image-picker-close"
            onClick={
              handleClose
            }
            aria-label="Close Image Picker"
          >
            ×
          </button>

        </div>

        {/* =========================
            FOLDERS
        ========================= */}

        <div
          style={{
            display:
              "flex",

            gap:
              "10px",

            flexWrap:
              "wrap",

            marginBottom:
              "20px",
          }}
        >

          {/* ALL IMAGES */}

          <button
            type="button"
            onClick={() =>
              handleFolderChange(
                "all"
              )
            }
            style={{
              padding:
                "10px 14px",

              borderRadius:
                "10px",

              border:
                activeFolder ===
                "all"
                  ? "1px solid #b58b43"
                  : "1px solid #ddd",

              background:
                activeFolder ===
                "all"
                  ? "#f8f3e9"
                  : "#fff",

              cursor:
                "pointer",
            }}
          >
            All Images
          </button>

          {/* MEDIA FOLDERS */}

          {folders.map(
            (folder) => (

              <button
                type="button"
                key={
                  folder
                }
                onClick={() =>
                  handleFolderChange(
                    folder
                  )
                }
                style={{
                  padding:
                    "10px 14px",

                  borderRadius:
                    "10px",

                  border:
                    activeFolder ===
                    folder
                      ? "1px solid #b58b43"
                      : "1px solid #ddd",

                  background:
                    activeFolder ===
                    folder
                      ? "#f8f3e9"
                      : "#fff",

                  cursor:
                    "pointer",
                }}
              >
                📁{" "}
                {folder}
              </button>

            )
          )}

        </div>

        {/* =========================
            SEARCH
        ========================= */}

        <div
          style={{
            marginBottom:
              "24px",
          }}
        >

          <input
            type="text"
            placeholder={`Search ${
              activeFolder ===
              "all"
                ? "all images"
                : activeFolder
            }...`}
            value={
              searchQuery
            }
            onChange={(event) =>
              setSearchQuery(
                event.target.value
              )
            }
            style={{
              width:
                "100%",

              padding:
                "14px 16px",

              border:
                "1px solid #ddd",

              borderRadius:
                "12px",

              fontSize:
                "15px",

              boxSizing:
                "border-box",
            }}
          />

        </div>

        {/* =========================
            IMAGE GRID
        ========================= */}

        <div className="image-picker-grid">

          {filteredMedia.map(
            (image) => (

              <button
                type="button"
                key={
                  image.id ||
                  image.publicId ||
                  image.url
                }
                className="image-picker-card"
                onClick={() =>
                  handleSelect(
                    image.url
                  )
                }
              >

                <img
                  src={
                    image.url
                  }
                  alt={
                    image.filename ||
                    "Media Library Image"
                  }
                  loading="lazy"
                />

                <span>
                  {image.filename ||
                    image.publicId ||
                    "Untitled Image"}
                </span>

              </button>

            )
          )}

          {/* EMPTY MEDIA LIBRARY */}

          {mediaItems.length ===
            0 && (

            <div className="image-picker-empty">

              No images available.

              <br />

              Upload images first
              from the Media Library.

            </div>

          )}

          {/* EMPTY FOLDER / SEARCH */}

          {mediaItems.length >
            0 &&
            filteredMedia.length ===
              0 && (

              <div className="image-picker-empty">

                {searchQuery
                  ? "No images match your search."
                  : "No images are available in this folder."}

              </div>

            )}

        </div>

      </div>

    </div>
  );
}