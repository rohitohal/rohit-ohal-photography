import {
  Link,
} from "react-router-dom";

import weddings from
  "../../data/weddings";


/* ==========================================
   FEATURED STORIES
========================================== */

export default function FeaturedStories() {

  /* ========================================
     FEATURED WEDDINGS
  ======================================== */

  const featuredWeddings =
    weddings.filter(
      (
        wedding
      ) =>
        wedding.featured
    );


  /* ========================================
     RENDER
  ======================================== */

  return (

    <section className="featured-stories">

      <div className="container">


        {/* ===================================
            SECTION HEADER
        =================================== */}

        <div className="section-header">

          <span>
            FEATURED STORIES
          </span>


          <h2>
            Signature Wedding Collections
          </h2>


          <p>
            Timeless celebrations captured
            with elegance, emotion and
            storytelling.
          </p>

        </div>


        {/* ===================================
            FEATURED GRID
        =================================== */}

        <div className="featured-grid">

          {featuredWeddings.map(
            (
              story
            ) => (

              <article
                key={
                  story.id
                }
                className="featured-card"
              >

                {/* ===========================
                    IMAGE
                =========================== */}

                <div className="featured-image">

                  <img
                    src={
                      story.cover
                    }
                    alt={
                      `${story.title} wedding photography in ${story.location}`
                    }
                    loading="lazy"
                  />

                </div>


                {/* ===========================
                    CONTENT
                =========================== */}

                <div className="featured-content">

                  <small>

                    {
                      story.category
                    }

                  </small>


                  <h3>

                    {
                      story.title
                    }

                  </h3>


                  <p>

                    {
                      story.location
                    }

                    {" • "}

                    {
                      story.year
                    }

                  </p>


                  <Link
                    to={
                      `/weddings/${story.slug}`
                    }
                    className="featured-btn"
                    aria-label={
                      `View ${story.title} wedding story`
                    }
                  >

                    View Story →

                  </Link>

                </div>

              </article>

            )
          )}

        </div>

      </div>

    </section>

  );

}