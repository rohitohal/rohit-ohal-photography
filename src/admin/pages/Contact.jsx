import "../styles/homepage-settings.css";

import ContactHeroSettings from "../components/ContactHeroSettings";
import ContactContentSettings from "../components/ContactContentSettings";
import ContactFormSettings from "../components/ContactFormSettings";


export default function Contact() {
  return (
    <div className="homepage-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="homepage-header">

        <div>

          <span className="homepage-overline">
            CONTACT PAGE
          </span>

          <h1>
            Contact Page
          </h1>

          <p>
            Manage the content,
            contact information and
            inquiry form displayed
            on your Contact page.
          </p>

        </div>

      </div>


      {/* =========================
          CONTACT PAGE SETTINGS
      ========================= */}

      <div className="homepage-settings">


        {/* =========================
            CONTACT HERO
        ========================= */}

        <ContactHeroSettings />


        {/* =========================
            CONTACT CONTENT
        ========================= */}

        <ContactContentSettings />


        {/* =========================
            CONTACT FORM
        ========================= */}

        <ContactFormSettings />


      </div>

    </div>
  );
}