import "./PageHero.css";

export default function PageHero({
  eyebrow,
  title,
  description,
  image
}) {
  return (
    <section
      className="page-hero-section"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="page-hero-overlay"></div>

      <div className="page-hero-container">

        <span className="page-hero-eyebrow">
          {eyebrow}
        </span>

        <h1 className="page-hero-title">
          {title}
        </h1>

        <p className="page-hero-description">
          {description}
        </p>

      </div>

    </section>
  );
}