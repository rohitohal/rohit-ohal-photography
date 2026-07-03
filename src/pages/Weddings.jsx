import portfolio from "../data/portfolio";

import PageHero from "../components/common/PageHero";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";

export default function Weddings() {

  const featured = portfolio.find(
    (item) =>
      item.discipline === "weddings" &&
      item.featured
  );

  return (

    <main>

      <PageHero

        eyebrow="PORTFOLIO"

        title="Wedding Stories"

        description="Elegant wedding stories captured with honesty, emotion and timeless documentary storytelling."

        image={featured.cover}

      />

      <PortfolioGrid category="weddings" />

    </main>

  );

}