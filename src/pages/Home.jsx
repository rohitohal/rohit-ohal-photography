import Hero from "../components/Hero";
import Featured from "../components/Featured";
import About from "../components/About";
import Journal from "../components/Journal";
import Quote from "../components/Quote";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <About />
      <Journal />
      <Quote />
      <CTA />
      <Footer />
    </>
  );
}