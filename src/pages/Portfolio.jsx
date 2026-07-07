import PageHero from "../components/common/PageHero";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";

import heroImage from "../assets/images/hero.jpg";

export default function Portfolio() {
  return (
    <>
      <PageHero
        title="Portfolio"
        description="A curated collection of wedding, portrait, commercial, industrial, food and editorial photography."
        image={heroImage}
      />

      <PortfolioGrid enableFilter />
    </>
  );
}