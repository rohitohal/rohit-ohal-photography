import "../../styles/gallery-picker.css";

export default function GalleryPicker({
  isOpen,
  onClose,
  selectedImages = [],
  onSelect,
}) {
  if (!isOpen) return null;

  const mediaItems = JSON.parse(
    localStorage.getItem(
      "rohit-photography-media"
    ) || "[]"
  );

  const toggleImage = (imageUrl) => {
    if (selectedImages.includes(imageUrl)) {
      onSelect(
        selectedImages.filter(
          (item) => item !== imageUrl
        )
      );
    } else {
      onSelect([
        ...selectedImages,
        imageUrl,
      ]);
    }
  };

  return (
    <div className="gallery-picker-overlay">

      <div className="gallery-picker-modal">

        <div className="gallery-picker-header">

          <h2>Select Gallery Images</h2>

          <button
            className="gallery-picker-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="gallery-picker-grid">

          {mediaItems.map((image) => (
            <div
              key={image.id}
              className={`gallery-picker-card ${
                selectedImages.includes(image.url)
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                toggleImage(image.url)
              }
            >
              <img
                src={image.url}
                alt={image.filename}
              />

              <span>
                {image.filename}
              </span>

              {selectedImages.includes(
                image.url
              ) && (
                <div className="gallery-selected-badge">
                  ✓
                </div>
              )}

            </div>
          ))}

          {mediaItems.length === 0 && (
            <div className="gallery-picker-empty">
              No images available.
              Upload images first from Media Library.
            </div>
          )}

        </div>

        <div className="gallery-picker-footer">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Done
          </button>

        </div>

      </div>

    </div>
  );
}