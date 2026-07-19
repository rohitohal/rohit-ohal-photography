import { useEffect } from "react";

import "./Lightbox.css";

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow =
      "hidden";

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        "auto";
    };
  }, [
    isOpen,
    onClose,
    onNext,
    onPrevious,
  ]);

  if (!isOpen) {
    return null;
  }

  if (!images?.length) {
    return null;
  }

  return (
    <div
      className="lightbox"
      onClick={onClose}
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ×
      </button>

      <button
        type="button"
        className="lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        aria-label="Previous image"
      >
        ‹
      </button>

      <img
        src={images[currentIndex]}
        alt={`Gallery image ${
          currentIndex + 1
        }`}
        className="lightbox-image"
        onClick={(e) =>
          e.stopPropagation()
        }
      />

      <button
        type="button"
        className="lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
      >
        ›
      </button>

      <div className="lightbox-counter">
        {currentIndex + 1} /{" "}
        {images.length}
      </div>
    </div>
  );
}