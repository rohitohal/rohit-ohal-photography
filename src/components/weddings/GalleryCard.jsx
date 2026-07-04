import { Link } from "react-router-dom";

export default function GalleryCard({ wedding }) {
  return (
    <Link
      to={`/weddings/${wedding.slug}`}
      className="gallery-card"
    >
      <div className="gallery-image">

        <img
          src={wedding.cover}
          alt={wedding.title}
          loading="lazy"
        />

      </div>

      <div className="gallery-overlay">

        <span>
          {wedding.location} • {wedding.year}
        </span>

        <h3>
          {wedding.title}
        </h3>

        <p>
          {wedding.subtitle}
        </p>

      </div>
    </Link>
  );
}