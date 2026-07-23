import SEOHead from
  "../components/common/SEOHead";

import PageHero from
  "../components/common/PageHero";

import WeddingIntro from
  "../components/weddings/WeddingIntro";

import FeaturedStories from
  "../components/weddings/FeaturedStories";

import WeddingGallery from
  "../components/weddings/WeddingGallery";

import ClientExperience from
  "../components/weddings/ClientExperience";

import WeddingFAQ from
  "../components/weddings/WeddingFAQ";

import WeddingCTA from
  "../components/weddings/WeddingCTA";

import heroImage from
  "../assets/images/hero.jpg";

import "../styles/pages/weddings.css";


/* ==========================================
   WEDDINGS
========================================== */

export default function Weddings() {

  return (

    <>

      {/* =====================================
          SEO
      ===================================== */}

      <SEOHead
        title="Wedding Photographer in Pune | Rohit Ohal Photography"
        description="Fine art wedding photography in Pune and across India by Rohit Ohal Photography. Elegant, emotional and timeless wedding stories captured with honesty and artistry."
        image={
          heroImage
        }
        canonical="/weddings"
        type="website"
        robots="index, follow"
        imageAlt="Wedding photography by Rohit Ohal Photography"
      />


      {/* =====================================
          HERO
      ===================================== */}

      <PageHero
        title="Wedding Stories"
        description="Elegant, emotional and timeless wedding photography captured with honesty and artistry."
        image={
          heroImage
        }
      />


      {/* =====================================
          INTRODUCTION
      ===================================== */}

      <WeddingIntro />


      {/* =====================================
          FEATURED STORIES
      ===================================== */}

      <FeaturedStories />


      {/* =====================================
          WEDDING GALLERY
      ===================================== */}

      <WeddingGallery />


      {/* =====================================
          CLIENT EXPERIENCE
      ===================================== */}

      <ClientExperience />


      {/* =====================================
          FAQ
      ===================================== */}

      <WeddingFAQ />


      {/* =====================================
          CALL TO ACTION
      ===================================== */}

      <WeddingCTA />

    </>

  );

}