import "../styles/pages/About.css";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";

import AboutStory from "../components/about/AboutStory";
import AboutPhilosophy from "../components/about/AboutPhilosophy";
import AboutExperience from "../components/about/AboutExperience";
import AboutProcess from "../components/about/AboutProcess";
import AboutCTA from "../components/about/AboutCTA";

import heroImage from "../assets/images/hero.jpg";

export default function About() {
  return (
    <>
      <SEOHead
        title="About Rohit Ohal | Photographer in Pune"
        description="Learn about Rohit Ohal, a Pune-based photographer specializing in wedding, commercial, portrait, industrial, food and editorial photography."
        image={heroImage}
      />

      <PageHero
        title="About"
        description="The story, philosophy and passion behind Rohit Ohal Photography."
        image={heroImage}
      />

      <AboutStory />

      <AboutPhilosophy />

      <AboutExperience />

      <AboutProcess />

      <AboutCTA />
    </>
  );
}