import {
  useEffect,
  useMemo,
  useState,
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

import {
  supabase,
} from "../lib/supabase";


/* =========================
   SUPABASE SETTING KEY
========================= */

const DISCIPLINES_SETTING_KEY =
  "portfolio_disciplines";


/* =========================
   DISCIPLINE PAGE
========================= */

export default function Discipline() {

  const {
    disciplineSlug,
  } = useParams();


  /* =========================
     DISCIPLINES
  ========================= */

  const [
    disciplines,
    setDisciplines,
  ] = useState(() =>
    defaultDisciplines.map(
      (discipline) => ({
        ...discipline,
      })
    )
  );


  /* =========================
     LOADING
  ========================= */

  const [
    loading,
    setLoading,
  ] = useState(true);


  /* =========================
     LOAD DISCIPLINES
     FROM SUPABASE
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadDisciplines() {

      try {

        setLoading(
          true
        );


        const {
          data,
          error,
        } =
          await supabase
            .from(
              "site_settings"
            )
            .select(
              "setting_value"
            )
            .eq(
              "setting_key",
              DISCIPLINES_SETTING_KEY
            )
            .maybeSingle();


        if (
          error
        ) {

          throw error;

        }


        if (
          !mounted
        ) {

          return;

        }


        const savedDisciplines =
          data?.setting_value;


        /*
         * No Supabase settings yet.
         * Keep default disciplines.
         */

        if (
          !Array.isArray(
            savedDisciplines
          )
        ) {

          setDisciplines(
            defaultDisciplines.map(
              (discipline) => ({
                ...discipline,
              })
            )
          );


          return;

        }


        /*
         * Merge Supabase content
         * with default definitions.
         *
         * This keeps IDs/slugs safe
         * if saved data is incomplete.
         */

        const mergedDisciplines =
          defaultDisciplines.map(
            (
              defaultDiscipline
            ) => {

              const savedDiscipline =
                savedDisciplines.find(
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


        setDisciplines(
          mergedDisciplines
        );


      } catch (
        error
      ) {

        console.error(
          "Failed to load discipline data from Supabase:",
          error
        );


        /*
         * Safe fallback.
         */

        if (
          mounted
        ) {

          setDisciplines(
            defaultDisciplines.map(
              (discipline) => ({
                ...discipline,
              })
            )
          );

        }


      } finally {

        if (
          mounted
        ) {

          setLoading(
            false
          );

        }

      }

    }


    loadDisciplines();


    return () => {

      mounted =
        false;

    };

  }, []);


  /* =========================
     FIND DISCIPLINE
  ========================= */

  const discipline =
    useMemo(
      () =>
        disciplines.find(
          (
            item
          ) =>
            item.slug ===
            disciplineSlug
        ),
      [
        disciplines,
        disciplineSlug,
      ]
    );


  /* =========================
     LOADING
  ========================= */

  if (
    loading
  ) {

    return null;

  }


  /* =========================
     DISCIPLINE NOT FOUND
  ========================= */

  if (
    !discipline
  ) {

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