import {
  useEffect,
  useRef,
} from "react";

import "./AdvancedLightbox.css";


/* ==========================================
   ADVANCED LIGHTBOX
========================================== */

export default function AdvancedLightbox({

  images = [],

  currentIndex = 0,

  isOpen = false,

  onClose,

  onChange,

  title = "Photography Gallery",

}) {

  /* ========================================
     THUMBNAIL REFERENCES
  ======================================== */

  const thumbnailRefs =
    useRef([]);


  /* ========================================
     VALIDATION
  ======================================== */

  const hasImages =
    Array.isArray(images) &&
    images.length > 0;


  const safeIndex =
    hasImages
      ? Math.min(
          Math.max(
            currentIndex,
            0
          ),
          images.length - 1
        )
      : 0;


  /* ========================================
     PREVIOUS IMAGE
  ======================================== */

  const previousImage =
    () => {

      if (
        !hasImages ||
        typeof onChange !==
          "function"
      ) {

        return;

      }


      const nextIndex =
        safeIndex === 0
          ? images.length - 1
          : safeIndex - 1;


      onChange(
        nextIndex
      );

    };


  /* ========================================
     NEXT IMAGE
  ======================================== */

  const nextImage =
    () => {

      if (
        !hasImages ||
        typeof onChange !==
          "function"
      ) {

        return;

      }


      const nextIndex =
        safeIndex ===
        images.length - 1
          ? 0
          : safeIndex + 1;


      onChange(
        nextIndex
      );

    };


  /* ========================================
     SELECT IMAGE
  ======================================== */

  const selectImage =
    (
      index
    ) => {

      if (
        typeof onChange ===
        "function"
      ) {

        onChange(
          index
        );

      }

    };


  /* ========================================
     CLOSE
  ======================================== */

  const closeLightbox =
    () => {

      if (
        typeof onClose ===
        "function"
      ) {

        onClose();

      }

    };


  /* ========================================
     KEYBOARD NAVIGATION
  ======================================== */

  useEffect(() => {

    if (
      !isOpen ||
      !hasImages
    ) {

      return undefined;

    }


    const handleKeyDown =
      (
        event
      ) => {

        if (
          event.key ===
          "Escape"
        ) {

          event.preventDefault();

          closeLightbox();

        }


        if (
          event.key ===
          "ArrowRight"
        ) {

          event.preventDefault();

          nextImage();

        }


        if (
          event.key ===
          "ArrowLeft"
        ) {

          event.preventDefault();

          previousImage();

        }

      };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  });


  /* ========================================
     LOCK BODY SCROLL
  ======================================== */

  useEffect(() => {

    if (
      !isOpen
    ) {

      return undefined;

    }


    const previousOverflow =
      document.body.style
        .overflow;


    document.body.style.overflow =
      "hidden";


    return () => {

      document.body.style.overflow =
        previousOverflow;

    };

  }, [
    isOpen,
  ]);


  /* ========================================
     AUTO-CENTER ACTIVE THUMBNAIL
  ======================================== */

  useEffect(() => {

    if (
      !isOpen ||
      !hasImages
    ) {

      return;

    }


    const activeThumbnail =
      thumbnailRefs.current[
        safeIndex
      ];


    if (
      activeThumbnail
    ) {

      activeThumbnail.scrollIntoView({

        behavior:
          "smooth",

        block:
          "nearest",

        inline:
          "center",

      });

    }

  }, [
    safeIndex,
    isOpen,
    hasImages,
  ]);


  /* ========================================
     PRELOAD ADJACENT IMAGES
  ======================================== */

  useEffect(() => {

    if (
      !isOpen ||
      !hasImages ||
      images.length <= 1
    ) {

      return;

    }


    const nextIndex =
      safeIndex ===
      images.length - 1
        ? 0
        : safeIndex + 1;


    const previousIndex =
      safeIndex === 0
        ? images.length - 1
        : safeIndex - 1;


    const nextPreload =
      new Image();


    const previousPreload =
      new Image();


    nextPreload.src =
      images[
        nextIndex
      ];


    previousPreload.src =
      images[
        previousIndex
      ];

  }, [
    safeIndex,
    isOpen,
    hasImages,
    images,
  ]);


  /* ========================================
     IMAGE PROTECTION
  ======================================== */

  const preventContextMenu =
    (
      event
    ) => {

      event.preventDefault();

    };


  const preventDrag =
    (
      event
    ) => {

      event.preventDefault();

    };


  /* ========================================
     DON'T RENDER
  ======================================== */

  if (
    !isOpen ||
    !hasImages
  ) {

    return null;

  }


  /* ========================================
     RENDER
  ======================================== */

  return (

    <div
      className="advanced-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={
        title
      }
      onClick={
        closeLightbox
      }
      onContextMenu={
        preventContextMenu
      }
    >


      {/* =====================================
          TOP COUNTER
      ===================================== */}

      <div
        className="advanced-lightbox-topbar"
        onClick={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <div className="advanced-lightbox-counter">

          {String(
            safeIndex + 1
          ).padStart(
            2,
            "0"
          )}

          <span>
            /
          </span>

          {String(
            images.length
          ).padStart(
            2,
            "0"
          )}

        </div>

      </div>


      {/* =====================================
          CLOSE
      ===================================== */}

      <button
        type="button"
        className="advanced-lightbox-close"
        aria-label="Close gallery"
        onClick={(
          event
        ) => {

          event.stopPropagation();

          closeLightbox();

        }}
      >

        ×

      </button>


      {/* =====================================
          PREVIOUS
      ===================================== */}

      {images.length > 1 && (

        <button
          type="button"
          className="advanced-lightbox-prev"
          aria-label="Previous image"
          onClick={(
            event
          ) => {

            event.stopPropagation();

            previousImage();

          }}
        >

          ‹

        </button>

      )}


      {/* =====================================
          MAIN IMAGE
      ===================================== */}

      <div
        className="advanced-lightbox-image-area"
        onClick={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <img
          key={
            `${images[safeIndex]}-${safeIndex}`
          }
          src={
            images[
              safeIndex
            ]
          }
          alt={
            `${title} - Image ${
              safeIndex + 1
            }`
          }
          className="advanced-lightbox-image"
          draggable={
            false
          }
          onContextMenu={
            preventContextMenu
          }
          onDragStart={
            preventDrag
          }
        />

      </div>


      {/* =====================================
          NEXT
      ===================================== */}

      {images.length > 1 && (

        <button
          type="button"
          className="advanced-lightbox-next"
          aria-label="Next image"
          onClick={(
            event
          ) => {

            event.stopPropagation();

            nextImage();

          }}
        >

          ›

        </button>

      )}


      {/* =====================================
          THUMBNAIL FILMSTRIP
      ===================================== */}

      {images.length > 1 && (

        <div
          className="advanced-lightbox-thumbnail-area"
          onClick={(
            event
          ) =>
            event.stopPropagation()
          }
        >

          <div className="advanced-lightbox-thumbnails">

            {images.map(
              (
                image,
                index
              ) => (

                <button
                  type="button"
                  key={
                    `advanced-thumbnail-${image}-${index}`
                  }
                  ref={(
                    element
                  ) => {

                    thumbnailRefs.current[
                      index
                    ] =
                      element;

                  }}
                  className={
                    index ===
                    safeIndex
                      ? "advanced-lightbox-thumbnail active"
                      : "advanced-lightbox-thumbnail"
                  }
                  aria-label={
                    `View image ${
                      index + 1
                    }`
                  }
                  aria-current={
                    index ===
                    safeIndex
                      ? "true"
                      : undefined
                  }
                  onClick={() =>
                    selectImage(
                      index
                    )
                  }
                >

                  <img
                    src={
                      image
                    }
                    alt=""
                    draggable={
                      false
                    }
                    loading="lazy"
                    onContextMenu={
                      preventContextMenu
                    }
                    onDragStart={
                      preventDrag
                    }
                  />

                </button>

              )
            )}

          </div>

        </div>

      )}

    </div>

  );

}