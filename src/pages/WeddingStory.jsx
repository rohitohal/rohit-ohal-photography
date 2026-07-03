import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import portfolio from "../data/portfolio";
import Lightbox from "../components/lightbox/Lightbox";

import "./WeddingStory.css";

export default function WeddingStory() {

  const { slug } = useParams();

  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [currentImage, setCurrentImage] = useState(0);

  const story = portfolio.find(
    (item) =>
      item.discipline === "weddings" &&
      item.slug === slug
  );

  if (!story) {

    return (

      <main className="story-not-found">

        <h1>Wedding Story Not Found</h1>

        <Link to="/weddings">
          Back to Wedding Stories
        </Link>

      </main>

    );

  }

  const openLightbox = (index) => {

    setCurrentImage(index);

    setLightboxOpen(true);

  };

  const closeLightbox = () => {

    setLightboxOpen(false);

  };

  const nextImage = () => {

    setCurrentImage((prev) =>
      prev === story.images.length - 1 ? 0 : prev + 1
    );

  };

  const previousImage = () => {

    setCurrentImage((prev) =>
      prev === 0 ? story.images.length - 1 : prev - 1
    );

  };

  return (

    <main className="wedding-story">

      <section
        className="story-hero"
        style={{
          backgroundImage: `url(${story.cover})`
        }}
      >

        <div className="story-overlay" />

        <div className="story-content">

          <span>{story.location}</span>

          <h1>{story.title}</h1>

          <p>{story.description}</p>

        </div>

      </section>

      <section className="story-gallery">

        {story.images.map((image, index) => (

          <div
            className="story-image"
            key={index}
            onClick={() => openLightbox(index)}
          >

            <img
              src={image}
              alt={`${story.title} ${index + 1}`}
            />

          </div>

        ))}

      </section>

      <section className="story-footer">

        <Link to="/weddings">

          ← Back to Wedding Stories

        </Link>

      </section>

      <Lightbox

        images={story.images}

        currentIndex={currentImage}

        isOpen={lightboxOpen}

        onClose={closeLightbox}

        onNext={nextImage}

        onPrevious={previousImage}

      />

    </main>

  );

}