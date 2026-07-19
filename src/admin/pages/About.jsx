import "../styles/homepage-settings.css";

import AboutHeroSettings from "../components/AboutHeroSettings";
import AboutStorySettings from "../components/AboutStorySettings";
import AboutPhilosophySettings from "../components/AboutPhilosophySettings";
import AboutExperienceSettings from "../components/AboutExperienceSettings";
import AboutProcessSettings from "../components/AboutProcessSettings";
import AboutCTASettings from "../components/AboutCTASettings";

export default function About() {
  return (
    <div className="homepage-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="homepage-header">

        <div>

          <span className="homepage-overline">
            ABOUT PAGE
          </span>

          <h1>
            About Page
          </h1>

          <p>
            Manage the story,
            philosophy, experience,
            process and call to action
            displayed on your About
            page.
          </p>

        </div>

      </div>


      {/* =========================
          ABOUT PAGE SETTINGS
      ========================= */}

      <div className="homepage-settings">


        {/* =========================
            ABOUT HERO
        ========================= */}

        <AboutHeroSettings />


        {/* =========================
            ABOUT STORY
        ========================= */}

        <AboutStorySettings />


        {/* =========================
            ABOUT PHILOSOPHY
        ========================= */}

        <AboutPhilosophySettings />


        {/* =========================
            ABOUT EXPERIENCE
        ========================= */}

        <AboutExperienceSettings />


        {/* =========================
            ABOUT PROCESS
        ========================= */}

        <AboutProcessSettings />


        {/* =========================
            ABOUT CTA
        ========================= */}

        <AboutCTASettings />


      </div>

    </div>
  );
}