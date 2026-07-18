import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";

const heroImage =
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=2000&q=80";

export default function Portfolio() {
  return (
    <>
      <SEOHead
        title="Photography Portfolio | Rohit Ohal Photography"
        description="Explore the photography portfolio of Rohit Ohal, featuring weddings, portraits, commercial, industrial, food, events and editorial photography in Pune, India."
        image={heroImage}
      />

      <PageHero
        title="Selected Work"
        subtitle="A curated collection of wedding, portrait, commercial, industrial, food and editorial photography."
        image={heroImage}
      />

      <PortfolioGrid enableFilter />
    </>
  );
}