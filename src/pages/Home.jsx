import Hero from "../components/home/Hero";
import Featured from "../components/home/Featured";
import About from "../components/home/About";
import Journal from "../components/home/Journal";
import Quote from "../components/home/Quote";
import CTA from "../components/home/CTA";
import Footer from "../components/layout/Footer";

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