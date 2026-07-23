import {
  Link,
} from "react-router-dom";

export default function GalleryCard({
  wedding,
}) {

  return (

    <Link
      to={
        `/portfolio/weddings/${wedding.slug}`
      }
      className="wedding-gallery-card"
      aria-label={
        `View ${wedding.title} wedding story`
      }
    >

      <div className="wedding-gallery-image">

        <img
          src={
            wedding.cover
          }
          alt={
            `${wedding.title} wedding photography in ${wedding.location}`
          }
          loading="lazy"
        />

      </div>


      <div className="wedding-gallery-content">

        <span>
          {wedding.location}
        </span>

        <h3>
          {wedding.title}
        </h3>

      </div>

    </Link>

  );

}