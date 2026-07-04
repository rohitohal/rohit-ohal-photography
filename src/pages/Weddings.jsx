import PageHero from "../components/common/PageHero";

import WeddingIntro from "../components/weddings/WeddingIntro";
import FeaturedStories from "../components/weddings/FeaturedStories";
import WeddingGallery from "../components/weddings/WeddingGallery";
import ClientExperience from "../components/weddings/ClientExperience";
import WeddingFAQ from "../components/weddings/WeddingFAQ";
import WeddingCTA from "../components/weddings/WeddingCTA";

import heroImage from "../assets/images/hero.jpg";

import "../styles/pages/weddings.css";

export default function Weddings() {
  return (
    <>
      <PageHero
        title="Wedding Stories"
        subtitle="Elegant, emotional and timeless wedding photography captured with honesty and artistry."
        image={heroImage}
      />

      <WeddingIntro />

      <FeaturedStories />

      <WeddingGallery />

      <ClientExperience />

      <WeddingFAQ />

      <WeddingCTA />
    </>
  );
}