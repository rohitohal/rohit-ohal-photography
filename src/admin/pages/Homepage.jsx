import { useNavigate } from "react-router-dom";

import HomepageSettings from "../components/HomepageSettings/HomepageSettings";
import AboutSettings from "../components/AboutSettings/AboutSettings";
import WhyChooseMeSettings from "../components/WhyChooseMeSettings/WhyChooseMeSettings";
import TestimonialsSettings from "../components/TestimonialsSettings/TestimonialsSettings";
import CTASettings from "../components/CTASettings/CTASettings";
import DisciplineSettings from "../components/DisciplineSettings/DisciplineSettings";
import FeaturedProjectSettings from "../components/FeaturedProjectSettings/FeaturedProjectSettings";
import JournalHighlightSettings from "../components/JournalHighlightSettings/JournalHighlightSettings";

import "../styles/homepage-settings.css";


export default function Homepage() {

  /* =========================
     NAVIGATION
  ========================= */

  const navigate =
    useNavigate();


  /* =========================
     RENDER
  ========================= */

  return (

    <div className="admin-page">


      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="admin-page-header">

        <span className="admin-page-overline">
          HOMEPAGE MANAGEMENT
        </span>


        <h1>
          Homepage Manager
        </h1>


        <p>
          Control everything that
          appears on the public
          homepage from one central
          place.
        </p>

      </div>


      {/* =========================
          HERO SETTINGS
      ========================= */}

      <HomepageSettings />


      {/* =========================
          ABOUT SETTINGS
      ========================= */}

      <div
        style={{
          marginTop:
            "40px",
        }}
      >

        <AboutSettings />

      </div>


      {/* =========================
          WHY CHOOSE ME SETTINGS
      ========================= */}

      <div
        style={{
          marginTop:
            "40px",
        }}
      >

        <WhyChooseMeSettings />

      </div>


      {/* =========================
          TESTIMONIAL SETTINGS
      ========================= */}

      <div
        style={{
          marginTop:
            "40px",
        }}
      >

        <TestimonialsSettings />

      </div>


      {/* =========================
          DISCIPLINE SETTINGS
      ========================= */}

      <div
        style={{
          marginTop:
            "40px",
        }}
      >

        <DisciplineSettings />

      </div>


      {/* =========================
          FEATURED PROJECTS
      ========================= */}

      <div
        style={{
          marginTop:
            "40px",
        }}
      >

        <FeaturedProjectSettings />

      </div>


      {/* =========================
          JOURNAL HIGHLIGHTS
      ========================= */}

      <div
        style={{
          marginTop:
            "40px",
        }}
      >

        <JournalHighlightSettings />

      </div>


      {/* =========================
          CTA SETTINGS
      ========================= */}

      <div
        style={{
          marginTop:
            "40px",
        }}
      >

        <CTASettings />

      </div>


      {/* =========================
          OTHER HOMEPAGE SETTINGS
      ========================= */}

      <div
        className="admin-section-grid"
        style={{
          marginTop:
            "40px",
        }}
      >


        {/* =========================
            SEO
        ========================= */}

        <div className="admin-card">

          <h2>
            SEO Overview
          </h2>


          <p>
            Configure homepage
            metadata and social
            sharing information.
          </p>


          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/seo"
              )
            }
          >
            Open SEO Settings
          </button>

        </div>

      </div>

    </div>

  );
}