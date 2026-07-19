import {
  useMemo,
  useState,
} from "react";

import "../../styles/gallery-picker.css";

const MEDIA_KEY =
  "rohit-photography-media";

const FOLDERS_KEY =
  "rohit-photography-media-folders";

export default function GalleryPicker({
  isOpen,
  onClose,
  selectedImages = [],
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
     LOAD MEDIA FOLDERS
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
     FILTER MEDIA
  ========================= */

  const filteredMedia =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      return mediaItems.filter(
        (image) => {
          /* FOLDER FILTER */

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

          /* SEARCH FILTER */

          if (!query) {
            return true;
          }

          const filename =
            image.filename ||
            "";

          const publicId =
            image.publicId ||
            "";

          const category =
            image.category ||
            "";

          const folder =
            image.folder ||
            "";

          return (
            filename
              .toLowerCase()
              .includes(query) ||
            publicId
              .toLowerCase()
              .includes(query) ||
            category
              .toLowerCase()
              .includes(query) ||
            folder
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
     TOGGLE IMAGE
  ========================= */

  const toggleImage = (
    imageUrl
  ) => {
    if (!imageUrl) {
      return;
    }

    if (
      selectedImages.includes(
        imageUrl
      )
    ) {
      onSelect(
        selectedImages.filter(
          (item) =>
            item !== imageUrl
        )
      );

      return;
    }

    onSelect([
      ...selectedImages,
      imageUrl,
    ]);
  };

  /* =========================
     CLEAR SELECTION
  ========================= */

  const clearSelection =
    () => {
      const confirmed =
        window.confirm(
          "Clear all selected images?"
        );

      if (!confirmed) {
        return;
      }

      onSelect([]);
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
      className="gallery-picker-overlay"
      onClick={
        handleClose
      }
    >

      <div
        className="gallery-picker-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* =========================
            HEADER
        ========================= */}

        <div className="gallery-picker-header">

          <div>

            <h2>
              Select Images
            </h2>

            <p>
              {
                selectedImages.length
              }{" "}
              images selected
            </p>

          </div>

          <button
            type="button"
            className="gallery-picker-close"
            onClick={
              handleClose
            }
            aria-label="Close Gallery Picker"
          >
            ×
          </button>

        </div>

        {/* =========================
            FOLDER NAVIGATION
        ========================= */}

        <div className="gallery-picker-folders">

          {/* ALL IMAGES */}

          <button
            type="button"
            className={
              activeFolder ===
              "all"
                ? "gallery-folder-button active"
                : "gallery-folder-button"
            }
            onClick={() =>
              handleFolderChange(
                "all"
              )
            }
          >
            All Images
          </button>

          {/* FOLDERS */}

          {folders.map(
            (folder) => (

              <button
                type="button"
                key={
                  folder
                }
                className={
                  activeFolder ===
                  folder
                    ? "gallery-folder-button active"
                    : "gallery-folder-button"
                }
                onClick={() =>
                  handleFolderChange(
                    folder
                  )
                }
              >
                📁{" "}
                {folder}
              </button>

            )
          )}

        </div>

        {/* =========================
            SEARCH + CLEAR
        ========================= */}

        <div className="gallery-picker-toolbar">

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
          />

          {selectedImages.length >
            0 && (

            <button
              type="button"
              className="gallery-clear-button"
              onClick={
                clearSelection
              }
            >
              Clear All
            </button>

          )}

        </div>

        {/* =========================
            IMAGE GRID
        ========================= */}

        <div className="gallery-picker-grid">

          {filteredMedia.map(
            (image) => {
              const imageUrl =
                image.url;

              const isSelected =
                selectedImages.includes(
                  imageUrl
                );

              return (
                <button
                  type="button"
                  key={
                    image.id ||
                    image.publicId ||
                    imageUrl
                  }
                  className={`gallery-picker-card ${
                    isSelected
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    toggleImage(
                      imageUrl
                    )
                  }
                >

                  <img
                    src={
                      imageUrl
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

                  {isSelected && (

                    <div className="gallery-selected-badge">
                      ✓
                    </div>

                  )}

                </button>
              );
            }
          )}

          {/* EMPTY MEDIA LIBRARY */}

          {mediaItems.length ===
            0 && (

            <div className="gallery-picker-empty">

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

              <div className="gallery-picker-empty">

                {searchQuery
                  ? "No images match your search."
                  : "No images are available in this folder."}

              </div>

            )}

        </div>

        {/* =========================
            FOOTER
        ========================= */}

        <div className="gallery-picker-footer">

          <span>
            {
              selectedImages.length
            }{" "}
            selected
          </span>

          <button
            type="button"
            className="cancel-btn"
            onClick={
              handleClose
            }
          >
            Done
          </button>

        </div>

      </div>

    </div>
  );
}