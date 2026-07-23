import {
  Link,
} from "react-router-dom";

import weddings from
  "../../data/weddings";

import "./FeaturedStories.css";


/* ==========================================
   HOME FEATURED STORIES
========================================== */

export default function FeaturedStories() {

  /* ========================================
     FEATURED WEDDINGS
  ======================================== */

  const featuredStories =
    weddings
      .filter(
        (
          wedding
        ) =>
          wedding.featured
      )
      .slice(
        0,
        3
      );


  /* ========================================
     RENDER
  ======================================== */

  return (

    <section className="featured-stories">

      <div className="featured-container">


        {/* ===================================
            HEADING
        =================================== */}

        <div className="featured-heading">

          <span>
            FEATURED STORIES
          </span>


          <h2>

            Stories That

            <br />

            Last Forever

          </h2>


          <p>

            Every wedding is different.
            Every story deserves to be
            remembered with honesty,
            elegance and emotion.

          </p>

        </div>


        {/* ===================================
            STORIES
        =================================== */}

        <div className="featured-grid">

          {featuredStories.map(
            (
              story
            ) => (

              <Link
                key={
                  story.id
                }
                to={
                  `/weddings/${story.slug}`
                }
                className="featured-card"
                aria-label={
                  `View ${story.title} wedding story`
                }
              >

                <img
                  src={
                    story.cover
                  }
                  alt={
                    `${story.title} wedding photography in ${story.location}`
                  }
                  loading="lazy"
                />


                <div className="featured-overlay">

                  <span>

                    {
                      story.location
                    }

                  </span>


                  <h3>

                    {
                      story.title
                    }

                  </h3>

                </div>

              </Link>

            )
          )}

        </div>

      </div>

    </section>

  );

}