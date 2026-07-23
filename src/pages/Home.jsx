import SEOHead from
  "../components/common/SEOHead";

import StructuredData from
  "../components/common/StructuredData";

import Hero from
  "../components/home/Hero";

import SelectedDisciplines from
  "../components/home/SelectedDisciplines";

import FeaturedProjects from
  "../components/home/FeaturedProjects";

import AboutPreview from
  "../components/home/AboutPreview";

import WhyChooseMe from
  "../components/home/WhyChooseMe";

import Testimonials from
  "../components/home/Testimonials";

import JournalPreview from
  "../components/home/JournalPreview";

import CallToAction from
  "../components/home/CallToAction";


/* ==========================================
   HOMEPAGE STRUCTURED DATA
========================================== */

const homeStructuredData = {

  "@context":
    "https://schema.org",

  "@graph": [

    /* ========================================
       PHOTOGRAPHY BUSINESS
    ======================================== */

    {
      "@type":
        "ProfessionalService",

      "@id":
        "https://rohitohal.com/#business",

      name:
        "Rohit Ohal Photography",

      url:
        "https://rohitohal.com/",

      description:
        "Professional wedding, commercial, portrait, industrial, food and editorial photography based in Pune, India.",

      address: {

        "@type":
          "PostalAddress",

        addressLocality:
          "Pune",

        addressRegion:
          "Maharashtra",

        addressCountry:
          "IN",

      },

      areaServed: [

        {
          "@type":
            "City",

          name:
            "Pune",
        },

        {
          "@type":
            "Country",

          name:
            "India",
        },

      ],

      knowsAbout: [
        "Wedding Photography",
        "Commercial Photography",
        "Portrait Photography",
        "Industrial Photography",
        "Food Photography",
        "Editorial Photography",
      ],

    },


    /* ========================================
       WEBSITE
    ======================================== */

    {
      "@type":
        "WebSite",

      "@id":
        "https://rohitohal.com/#website",

      url:
        "https://rohitohal.com/",

      name:
        "Rohit Ohal Photography",

      publisher: {
        "@id":
          "https://rohitohal.com/#business",
      },

      inLanguage:
        "en-IN",

    },

  ],

};


/* ==========================================
   HOME
========================================== */

export default function Home() {

  return (

    <>

      {/* =====================================
          SEO
      ===================================== */}

      <SEOHead
        canonical="/"
        type="website"
        robots="index, follow"
      />


      {/* =====================================
          STRUCTURED DATA
      ===================================== */}

      <StructuredData
        id="homepage-structured-data"
        data={
          homeStructuredData
        }
      />


      {/* =====================================
          HOMEPAGE
      ===================================== */}

      <main>

        <Hero />

        <SelectedDisciplines />

        <FeaturedProjects />

        <AboutPreview />

        <WhyChooseMe />

        <Testimonials />

        <JournalPreview />

        <CallToAction />

      </main>

    </>

  );

}