import { useParams } from "react-router-dom";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";

import { disciplines } from "../data/disciplines";

export default function Discipline() {
  const { disciplineSlug } = useParams();

  /* =========================
     FIND DISCIPLINE
  ========================= */

  const discipline = disciplines.find(
    (item) => item.slug === disciplineSlug
  );

  /* =========================
     DISCIPLINE NOT FOUND
  ========================= */

  if (!discipline) {
    return (
      <>
        <SEOHead
          title="Portfolio Category Not Found | Rohit Ohal Photography"
          description="The photography portfolio category you are looking for could not be found."
        />

        <div
          style={{
            padding: "200px 20px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h1>
            Discipline not found
          </h1>
        </div>
      </>
    );
  }

  /* =========================
     DYNAMIC SEO
  ========================= */

  const seoTitle =
    `${discipline.title} Photography | Rohit Ohal Photography`;

  const seoDescription =
    discipline.description ||
    `Explore ${discipline.title.toLowerCase()} photography by Rohit Ohal, a professional photographer based in Pune, India.`;

  /* =========================
     RENDER
  ========================= */

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        image={discipline.image}
      />

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