import { Link } from "react-router-dom";
import featuredStories from "../../data/featuredStories";

export default function FeaturedStories() {
  return (
    <section className="featured-stories">
      <div className="container">

        <div className="section-header">
          <span>FEATURED STORIES</span>

          <h2>
            Signature Wedding Collections
          </h2>

          <p>
            Timeless celebrations captured with elegance, emotion and storytelling.
          </p>
        </div>

        <div className="featured-grid">

          {featuredStories.map((story) => (

            <article
              key={story.id}
              className="featured-card"
            >

              <div className="featured-image">

                <img
                  src={story.cover}
                  alt={story.title}
                  loading="lazy"
                />

              </div>

              <div className="featured-content">

                <small>
                  {story.category}
                </small>

                <h3>
                  {story.title}
                </h3>

                <p>
                  {story.location} • {story.year}
                </p>

                <Link
                  to={`/weddings/${story.slug}`}
                  className="featured-btn"
                >
                  View Story →
                </Link>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}