import { Link } from "react-router-dom";

import portfolio from "../../data/portfolio";

import "./FeaturedStories.css";

export default function FeaturedStories() {

  const featuredStories = portfolio
    .filter(
      (item) =>
        item.discipline === "weddings" &&
        item.featured
    )
    .slice(0, 3);

  return (

    <section className="featured-stories">

      <div className="featured-container">

        <div className="featured-heading">

          <span>FEATURED STORIES</span>

          <h2>
            Stories That
            <br />
            Last Forever
          </h2>

          <p>
            Every wedding is different. Every story deserves
            to be remembered with honesty, elegance and emotion.
          </p>

        </div>

        <div className="featured-grid">

          {featuredStories.map((story) => (

            <Link
              key={story.id}
              to={`/weddings/${story.slug}`}
              className="featured-card"
            >

              <img
                src={story.cover}
                alt={story.title}
                loading="lazy"
              />

              <div className="featured-overlay">

                <span>{story.location}</span>

                <h3>{story.title}</h3>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>

  );

}