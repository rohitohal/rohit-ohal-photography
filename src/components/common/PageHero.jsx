import "./PageHero.css";

export default function PageHero({
  title,
  subtitle,
  description,
  image,
  variant = "",
  showScroll = true,
}) {
  return (
    <section
      className={`page-hero ${
        variant
          ? `page-hero--${variant}`
          : ""
      }`}
      style={{
        background: image
          ? `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.55)), url(${image}) center/cover no-repeat`
          : "#222",
      }}
    >
      <div className="page-hero-content">

        <span className="hero-label">
          ROHIT OHAL PHOTOGRAPHY
        </span>

        <h1>
          {title}
        </h1>

        {(subtitle || description) && (
          <p>
            {subtitle || description}
          </p>
        )}

        {showScroll && (
          <div className="hero-scroll">
            <span></span>
          </div>
        )}

      </div>
    </section>
  );
}