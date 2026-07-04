import weddings from "../../data/weddings";
import GalleryCard from "./GalleryCard";

export default function WeddingGallery() {
  return (
    <section className="wedding-gallery">

      <div className="container">

        <div className="section-header">

          <span>PORTFOLIO</span>

          <h2>
            Signature
            <br />
            Wedding Collection
          </h2>

          <p>
            A curated collection of weddings captured with
            honesty, elegance and timeless storytelling.
          </p>

        </div>

        <div className="gallery-grid">

          {weddings.map((wedding) => (

            <GalleryCard
              key={wedding.id}
              wedding={wedding}
            />

          ))}

        </div>

      </div>

    </section>
  );
}