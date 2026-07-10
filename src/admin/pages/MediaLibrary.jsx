import { useEffect, useState } from "react";

import MediaGrid from "../components/MediaGrid/MediaGrid";

import "../styles/media-library.css";
import "../styles/media-grid.css";

export default function MediaLibrary() {
  const [mediaItems, setMediaItems] = useState(() => {
    const savedMedia = localStorage.getItem(
      "rohit-photography-media"
    );

    return savedMedia
      ? JSON.parse(savedMedia)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "rohit-photography-media",
      JSON.stringify(mediaItems)
    );
  }, [mediaItems]);

  const openUploadWidget = () => {
    if (!window.cloudinary) {
      alert("Cloudinary widget not loaded.");
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dmwnh8ebd",

        uploadPreset:
          "rohit_photography_uploads",

        multiple: true,

        folder:
          "rohit-ohal-photography",

        sources: [
          "local",
          "url",
          "camera",
        ],

        resourceType: "image",

        clientAllowedFormats: [
          "jpg",
          "jpeg",
          "png",
          "webp",
        ],

        maxFiles: 200,
      },

      (error, result) => {
        if (
          !error &&
          result &&
          result.event === "success"
        ) {
          console.log(
            "Upload Successful:",
            result.info
          );

          const newMedia = {
            id: result.info.public_id,

            publicId:
              result.info.public_id,

            url:
              result.info.secure_url,

            width:
              result.info.width,

            height:
              result.info.height,

            format:
              result.info.format,

            bytes:
              result.info.bytes,

            createdAt:
              result.info.created_at,

            filename:
              result.info.original_filename,

            category: "Uncategorized",
          };

          setMediaItems((prev) => [
            newMedia,
            ...prev,
          ]);
        }
      }
    );

    widget.open();
  };

  return (
    <div className="media-library-page">

      <div className="media-library-header">

        <div>

          <span className="media-overline">
            MEDIA LIBRARY
          </span>

          <h1>
            Manage Your Images
          </h1>

          <p>
            Upload, organize and manage all images used across
            your portfolio, journal and homepage.
          </p>

        </div>

        <div className="media-actions">

          <button className="media-button secondary">
            Create Folder
          </button>

          <button
            className="media-button primary"
            onClick={openUploadWidget}
          >
            Upload Images
          </button>

        </div>

      </div>

      <div className="media-toolbar">

        <input
          type="text"
          placeholder="Search images..."
        />

        <select defaultValue="newest">

          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="az">
            Name A-Z
          </option>

          <option value="za">
            Name Z-A
          </option>

        </select>

      </div>

      <MediaGrid
        mediaItems={mediaItems}
      />

    </div>
  );
}