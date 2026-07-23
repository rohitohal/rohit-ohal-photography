import {
  Link,
} from "react-router-dom";

import SEOHead from
  "../components/common/SEOHead";

import "./NotFound.css";


/* ==========================================
   NOT FOUND
========================================== */

export default function NotFound() {

  return (

    <>

      {/* =====================================
          SEO
      ===================================== */}

      <SEOHead
        title="Page Not Found | Rohit Ohal Photography"
        description="The page you are looking for could not be found. Explore the photography portfolio and wedding stories by Rohit Ohal Photography."
        robots="noindex, nofollow"
      />


      {/* =====================================
          404 PAGE
      ===================================== */}

      <section className="not-found">

        <div className="not-found-content">


          {/* =================================
              ERROR CODE
          ================================= */}

          <span>
            404
          </span>


          {/* =================================
              TITLE
          ================================= */}

          <h1>

            The Story You're

            <br />

            Looking For

            <br />

            Couldn't Be Found

          </h1>


          {/* =================================
              DESCRIPTION
          ================================= */}

          <p>

            The page may have been moved,
            deleted or perhaps never existed.

          </p>


          {/* =================================
              NAVIGATION
          ================================= */}

          <div className="not-found-buttons">

            <Link
              to="/"
              className="not-found-primary"
            >

              Return Home

            </Link>


            <Link
              to="/portfolio"
              className="not-found-secondary"
            >

              Explore Portfolio

            </Link>

          </div>

        </div>

      </section>

    </>

  );

}