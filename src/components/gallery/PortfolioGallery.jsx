import { useState } from "react";

import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

import "react-photo-album/styles.css";
import "yet-another-react-lightbox/styles.css";

export default function PortfolioGallery({ images }) {
  const [index, setIndex] = useState(-1);

  const photos = images.map((image) => ({
    src: image,
    width: 1200,
    height: 800,
  }));

  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={photos}
        spacing={16}
        padding={0}
        columns={(containerWidth) => {
          if (containerWidth < 640) return 1;
          if (containerWidth < 900) return 2;
          return 3;
        }}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={photos}
        index={index}
      />
    </>
  );
}