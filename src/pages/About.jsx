import "../styles/pages/About.css";

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