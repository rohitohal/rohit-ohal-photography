import {
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import portfolio from "../data/portfolio";


/* ==========================================
   ADVANCED LIGHTBOX
========================================== */

import AdvancedLightbox from
  "../components/gallery/AdvancedLightbox";


/* ==========================================
   PAGE STYLES
========================================== */

import "./WeddingStory.css";


/* ==========================================
   WEDDING STORY
========================================== */

export default function WeddingStory() {

  /* ========================================
     URL
  ======================================== */

  const {
    slug,
  } =
    useParams();


  /* ========================================
     LIGHTBOX INDEX

     -1 = CLOSED
     0+ = ACTIVE IMAGE
  ======================================== */

  const [
    lightboxIndex,
    setLightboxIndex,
  ] =
    useState(-1);


  /* ========================================
     FIND STORY
  ======================================== */

  const story =
    portfolio.find(
      (
        item
      ) =>
        item.discipline ===
          "weddings" &&
        item.slug ===
          slug
    );


  /* ========================================
     STORY NOT FOUND
  ======================================== */

  if (
    !story
  ) {

    return (

      <main className="story-not-found">

        <h1>

          Wedding Story Not Found

        </h1>


        <Link to="/weddings">

          Back to Wedding Stories

        </Link>

      </main>

    );

  }


  /* ========================================
     OPEN LIGHTBOX
  ======================================== */

  const openLightbox =
    (
      index
    ) => {

      setLightboxIndex(
        index
      );

    };


  /* ========================================
     CLOSE LIGHTBOX
  ======================================== */

  const closeLightbox =
    () => {

      setLightboxIndex(
        -1
      );

    };


  /* ========================================
     CHANGE LIGHTBOX IMAGE
  ======================================== */

  const changeLightboxImage =
    (
      index
    ) => {

      setLightboxIndex(
        index
      );

    };


  /* ========================================
     RENDER
  ======================================== */

  return (

    <main className="wedding-story">


      {/* =====================================
          HERO
      ===================================== */}

      <section
        className="story-hero"
        style={{
          backgroundImage:
            `url(${story.cover})`,
        }}
      >

        <div
          className="story-overlay"
        />


        <div className="story-content">

          <span>

            {story.location}

          </span>


          <h1>

            {story.title}

          </h1>


          <p>

            {story.description}

          </p>

        </div>

      </section>


      {/* =====================================
          GALLERY
      ===================================== */}

      <section className="story-gallery">

        {story.images.map(
          (
            image,
            index
          ) => (

            <div
              className="story-image"
              key={
                `${image}-${index}`
              }
              role="button"
              tabIndex={
                0
              }
              aria-label={
                `Open ${story.title} image ${
                  index + 1
                }`
              }
              onClick={() =>
                openLightbox(
                  index
                )
              }
              onKeyDown={(
                event
              ) => {

                if (
                  event.key ===
                    "Enter" ||
                  event.key ===
                    " "
                ) {

                  event.preventDefault();


                  openLightbox(
                    index
                  );

                }

              }}
            >

              <img
                src={
                  image
                }
                alt={
                  `${story.title} ${
                    index + 1
                  }`
                }
                loading="lazy"
                draggable={
                  false
                }
              />

            </div>

          )
        )}

      </section>


      {/* =====================================
          STORY FOOTER
      ===================================== */}

      <section className="story-footer">

        <Link to="/weddings">

          ← Back to Wedding Stories

        </Link>

      </section>


      {/* =====================================
          ADVANCED LIGHTBOX
      ===================================== */}

      <AdvancedLightbox

        images={
          story.images
        }

        currentIndex={
          lightboxIndex >=
          0
            ? lightboxIndex
            : 0
        }

        isOpen={
          lightboxIndex >=
          0
        }

        onClose={
          closeLightbox
        }

        onChange={
          changeLightboxImage
        }

        title={
          story.title
        }

      />

    </main>

  );

}