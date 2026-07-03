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

      if (event.key === "Escape") onClose();

      if (event.key === "ArrowRight") onNext();

      if (event.key === "ArrowLeft") onPrevious();

    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {

      window.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = "auto";

    };

  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen) return null;

  return (

    <div
      className="lightbox"
      onClick={onClose}
    >

      <button
        className="lightbox-close"
        onClick={onClose}
      >
        ✕
      </button>

      <button
        className="lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
      >
        ‹
      </button>

      <img
        src={images[currentIndex]}
        alt=""
        className="lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        ›
      </button>

      <div className="lightbox-counter">

        {currentIndex + 1} / {images.length}

      </div>

    </div>

  );

}