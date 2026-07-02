import "./PortfolioCard.css";
import Image from "../common/Image";

export default function PortfolioCard({
  image,
  title,
  category,
  onClick,
  featured = false,
}) {
  return (
    <article
      className={`portfolio-card ${featured ? "featured" : ""}`}
      onClick={onClick}
    >
      <Image src={image} alt={title} className="portfolio-image" />

      <div className="portfolio-overlay">
        <span>{category}</span>
        <h3>{title}</h3>
      </div>
    </article>
  );
}