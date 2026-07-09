import MediaGrid from "../components/MediaGrid/MediaGrid";

import "../styles/media-library.css";
import "../styles/media-grid.css";

export default function MediaLibrary() {
  return (
    <div className="media-library-page">

      {/* Header */}

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

          <button className="media-button primary">
            Upload Images
          </button>

        </div>

      </div>

      {/* Toolbar */}

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

      {/* Media Grid */}

      <MediaGrid />

    </div>
  );
}