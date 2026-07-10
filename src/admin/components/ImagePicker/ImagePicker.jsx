import "../../styles/image-picker.css";

export default function ImagePicker({
  isOpen,
  onClose,
  onSelect,
}) {
  if (!isOpen) return null;

  const mediaItems = JSON.parse(
    localStorage.getItem(
      "rohit-photography-media"
    ) || "[]"
  );

  return (
    <div className="image-picker-overlay">

      <div className="image-picker-modal">

        <div className="image-picker-header">

          <h2>Select Cover Image</h2>

          <button
            className="image-picker-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="image-picker-grid">

          {mediaItems.map((image) => (
            <div
              key={image.id}
              className="image-picker-card"
              onClick={() => {
                onSelect(image.url);
                onClose();
              }}
            >
              <img
                src={image.url}
                alt={image.filename}
              />

              <span>
                {image.filename}
              </span>

            </div>
          ))}

          {mediaItems.length === 0 && (
            <div className="image-picker-empty">
              No images available.
              Upload images first from Media Library.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}