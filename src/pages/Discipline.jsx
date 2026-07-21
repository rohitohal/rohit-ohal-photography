import {
  useMemo,
} from "react";

import {
  useParams,
} from "react-router-dom";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";

import {
  disciplines as defaultDisciplines,
} from "../data/disciplines";


/* =========================
   STORAGE KEY
========================= */

const DISCIPLINES_KEY =
  "rohit-photography-disciplines";


export default function Discipline() {

  const {
    disciplineSlug,
  } = useParams();


  /* =========================
     LOAD SAVED DISCIPLINES
  ========================= */

  const disciplines =
    useMemo(() => {

      try {

        const saved =
          localStorage.getItem(
            DISCIPLINES_KEY
          );


        /*
         * Nothing saved from Admin.
         * Use default data.
         */

        if (!saved) {

          return defaultDisciplines;

        }


        const parsed =
          JSON.parse(
            saved
          );


        /*
         * Invalid saved data.
         * Fall back safely.
         */

        if (
          !Array.isArray(
            parsed
          )
        ) {

          return defaultDisciplines;

        }


        /*
         * Merge Admin discipline
         * settings with defaults.
         *
         * This keeps the original
         * ID and slug available even
         * if older saved data is
         * incomplete.
         */

        return defaultDisciplines.map(
          (
            defaultDiscipline
          ) => {

            const savedDiscipline =
              parsed.find(
                (
                  item
                ) =>
                  item.id ===
                  defaultDiscipline.id
              );


            return {
              ...defaultDiscipline,
              ...savedDiscipline,
            };

          }
        );


      } catch (error) {

        console.error(
          "Failed to load discipline data:",
          error
        );


        return defaultDisciplines;

      }

    }, []);


  /* =========================
     FIND DISCIPLINE
  ========================= */

  const discipline =
    disciplines.find(
      (
        item
      ) =>
        item.slug ===
        disciplineSlug
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
            padding:
              "200px 20px",

            textAlign:
              "center",

            color:
              "#fff",
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

      {/* =========================
          SEO
      ========================= */}

      <SEOHead
        title={
          seoTitle
        }
        description={
          seoDescription
        }
        image={
          discipline.image
        }
      />


      {/* =========================
          DISCIPLINE HERO
      ========================= */}

      <PageHero
        title={
          discipline.title
        }
        subtitle={
          discipline.description
        }
        image={
          discipline.image
        }
      />


      {/* =========================
          DISCIPLINE PROJECTS
      ========================= */}

      <PortfolioGrid
        category={
          discipline.id
        }
      />

    </>

  );

}