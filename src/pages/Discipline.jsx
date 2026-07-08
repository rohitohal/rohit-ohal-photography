import { useParams } from "react-router-dom";

import PageHero from "../components/common/PageHero";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";

import { disciplines } from "../data/disciplines";

export default function Discipline() {
  const { disciplineSlug } = useParams();

  const discipline = disciplines.find(
    (item) => item.slug === disciplineSlug
  );

  if (!discipline) {
    return (
      <div
        style={{
          padding: "200px 20px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1>Discipline not found</h1>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={discipline.title}
        subtitle={discipline.description}
        image={discipline.image}
      />

      <PortfolioGrid
        category={discipline.id}
      />
    </>
  );
}