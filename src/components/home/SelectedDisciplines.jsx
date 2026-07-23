import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

import DisciplinesGrid from "../portfolio/DisciplinesGrid";

import {
  disciplines as defaultDisciplines,
} from "../../data/disciplines";

import {
  supabase,
} from "../../lib/supabase";


/* =========================
   SUPABASE SETTING KEYS
========================= */

const DISCIPLINES_SETTING_KEY =
  "portfolio_disciplines";

const HOMEPAGE_SETTING_KEY =
  "homepage_disciplines";


/* =========================
   SELECTED DISCIPLINES
========================= */

export default function SelectedDisciplines() {

  /* =========================
     DISCIPLINE CONTENT
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
     SELECTED IDS
  ========================= */

  const [
    selectedIds,
    setSelectedIds,
  ] = useState([]);


  /* =========================
     LOADING
  ========================= */

  const [
    loading,
    setLoading,
  ] = useState(true);


  /* =========================
     LOAD HOMEPAGE DATA
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadHomepageDisciplines() {

      try {

        setLoading(
          true
        );


        /* =========================
           LOAD BOTH SETTINGS
        ========================= */

        const [
          disciplinesResult,
          selectionResult,
        ] =
          await Promise.all([

            supabase
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
              .maybeSingle(),

            supabase
              .from(
                "site_settings"
              )
              .select(
                "setting_value"
              )
              .eq(
                "setting_key",
                HOMEPAGE_SETTING_KEY
              )
              .maybeSingle(),

          ]);


        /* =========================
           CHECK ERRORS
        ========================= */

        if (
          disciplinesResult.error
        ) {

          throw disciplinesResult.error;

        }


        if (
          selectionResult.error
        ) {

          throw selectionResult.error;

        }


        if (
          !mounted
        ) {

          return;

        }


        /* =========================
           DISCIPLINE CONTENT
        ========================= */

        const savedDisciplines =
          disciplinesResult
            .data
            ?.setting_value;


        let mergedDisciplines =
          defaultDisciplines.map(
            (
              discipline
            ) => ({
              ...discipline,
            })
          );


        if (
          Array.isArray(
            savedDisciplines
          )
        ) {

          mergedDisciplines =
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

        }


        setDisciplines(
          mergedDisciplines
        );


        /* =========================
           HOMEPAGE SELECTION
        ========================= */

        const selectionValue =
          selectionResult
            .data
            ?.setting_value;


        /*
         * Current format:
         *
         * [
         *   "weddings",
         *   "portraits"
         * ]
         */

        if (
          Array.isArray(
            selectionValue
          )
        ) {

          setSelectedIds(
            selectionValue
          );


          return;

        }


        /*
         * Support older object
         * format:
         *
         * {
         *   selected: [...]
         * }
         */

        if (
          selectionValue &&
          typeof selectionValue ===
            "object" &&
          Array.isArray(
            selectionValue.selected
          )
        ) {

          setSelectedIds(
            selectionValue.selected
          );


          return;

        }


        /*
         * No homepage selection
         * saved.
         *
         * Show all disciplines.
         */

        setSelectedIds(
          mergedDisciplines.map(
            (
              discipline
            ) =>
              discipline.id
          )
        );


      } catch (
        error
      ) {

        console.error(
          "Failed to load homepage disciplines:",
          error
        );


        /*
         * Safe fallback.
         */

        if (
          mounted
        ) {

          const fallback =
            defaultDisciplines.map(
              (
                discipline
              ) => ({
                ...discipline,
              })
            );


          setDisciplines(
            fallback
          );


          setSelectedIds(
            fallback.map(
              (
                discipline
              ) =>
                discipline.id
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


    loadHomepageDisciplines();


    return () => {

      mounted =
        false;

    };

  }, []);


  /* =========================
     FILTER DISCIPLINES
  ========================= */

  const selectedDisciplines =
    useMemo(
      () =>
        disciplines.filter(
          (
            discipline
          ) =>
            selectedIds.includes(
              discipline.id
            )
        ),
      [
        disciplines,
        selectedIds,
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
     EMPTY
  ========================= */

  if (
    selectedDisciplines.length ===
    0
  ) {

    return null;

  }


  /* =========================
     RENDER
  ========================= */

  return (

    <section className="selected-disciplines">

      <Container>

        <SectionTitle
          label="PORTFOLIO"
          title="Selected"
          highlight="Disciplines"
        />


        <DisciplinesGrid
          disciplines={
            selectedDisciplines
          }
        />

      </Container>

    </section>

  );

}