import Hero from "../components/home/Hero";
import SelectedDisciplines from "../components/home/SelectedDisciplines";
import FeaturedProjects from "../components/home/FeaturedProjects";
import AboutPreview from "../components/home/AboutPreview";
import WhyChooseMe from "../components/home/WhyChooseMe";
import Testimonials from "../components/home/Testimonials";
import JournalPreview from "../components/home/JournalPreview";
import CallToAction from "../components/home/CallToAction";

export default function Home() {
  return (
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
  );
}