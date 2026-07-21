import {
  useState,
} from "react";

import PhotoAlbum from
  "react-photo-album";


/* =========================
   ADVANCED LIGHTBOX
========================= */

import AdvancedLightbox from
  "./AdvancedLightbox";


/* =========================
   PHOTO ALBUM STYLES
========================= */

import "react-photo-album/styles.css";


/* =========================
   PORTFOLIO GALLERY
========================= */

export default function PortfolioGallery({
  images = [],
}) {

  /* =========================
     LIGHTBOX INDEX

     -1 = CLOSED
     0+ = ACTIVE IMAGE
  ========================= */

  const [
    lightboxIndex,
    setLightboxIndex,
  ] =
    useState(-1);


  /* =========================
     VALID IMAGES
  ========================= */

  const galleryImages =
    Array.isArray(
      images
    )
      ? images.filter(
          Boolean
        )
      : [];


  /* =========================
     CREATE PHOTO DATA
  ========================= */

  const photos =
    galleryImages.map(
      (
        image,
        photoIndex
      ) => ({

        src:
          image,

        width:
          1200,

        height:
          800,

        alt:
          `Portfolio photograph ${
            photoIndex + 1
          }`,

      })
    );


  /* =========================
     OPEN LIGHTBOX
  ========================= */

  const openLightbox =
    (
      index
    ) => {

      setLightboxIndex(
        index
      );

    };


  /* =========================
     CLOSE LIGHTBOX
  ========================= */

  const closeLightbox =
    () => {

      setLightboxIndex(
        -1
      );

    };


  /* =========================
     CHANGE LIGHTBOX IMAGE
  ========================= */

  const changeLightboxImage =
    (
      index
    ) => {

      setLightboxIndex(
        index
      );

    };


  /* =========================
     NO IMAGES
  ========================= */

  if (
    galleryImages.length ===
    0
  ) {

    return null;

  }


  /* =========================
     RENDER
  ========================= */

  return (

    <>

      {/* =========================
          MASONRY GALLERY
      ========================= */}

      <PhotoAlbum

        layout="masonry"

        photos={
          photos
        }

        spacing={
          16
        }

        padding={
          0
        }

        columns={(
          containerWidth
        ) => {

          if (
            containerWidth <
            640
          ) {

            return 1;

          }


          if (
            containerWidth <
            900
          ) {

            return 2;

          }


          return 3;

        }}

        onClick={({
          index,
        }) => {

          openLightbox(
            index
          );

        }}

      />


      {/* =========================
          ADVANCED LIGHTBOX
      ========================= */}

      <AdvancedLightbox

        images={
          galleryImages
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

        title="Portfolio Gallery"

      />

    </>

  );

}