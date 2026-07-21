import { useMemo } from "react";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

import DisciplinesGrid from "../portfolio/DisciplinesGrid";

import {
  disciplines as defaultDisciplines,
} from "../../data/disciplines";


const DISCIPLINES_KEY =
  "rohit-photography-disciplines";

const HOMEPAGE_KEY =
  "rohit-photography-homepage-disciplines";


export default function SelectedDisciplines() {

  /* =========================
     LOAD DISCIPLINES
  ========================= */

  const disciplines =
    useMemo(() => {

      try {

        const saved =
          localStorage.getItem(
            DISCIPLINES_KEY
          );

        if (!saved) {
          return defaultDisciplines;
        }

        const parsed =
          JSON.parse(saved);

        if (
          !Array.isArray(parsed)
        ) {
          return defaultDisciplines;
        }

        return defaultDisciplines.map(
          (discipline) => {

            const savedDiscipline =
              parsed.find(
                (item) =>
                  item.id ===
                  discipline.id
              );

            return {
              ...discipline,
              ...savedDiscipline,
            };

          }
        );

      } catch (error) {

        console.error(
          "Failed to load saved disciplines:",
          error
        );

        return defaultDisciplines;

      }

    }, []);


  /* =========================
     LOAD SELECTED IDS
  ========================= */

  let selectedIds =
    disciplines.map(
      (discipline) =>
        discipline.id
    );

  try {

    const saved =
      localStorage.getItem(
        HOMEPAGE_KEY
      );

    if (saved) {

      const parsed =
        JSON.parse(saved);

      if (
        Array.isArray(parsed)
      ) {

        selectedIds =
          parsed;

      }

    }

  } catch (error) {

    console.error(
      "Failed to load homepage disciplines:",
      error
    );

  }


  /* =========================
     FILTER
  ========================= */

  const selectedDisciplines =
    disciplines.filter(
      (discipline) =>
        selectedIds.includes(
          discipline.id
        )
    );


  /* =========================
     EMPTY
  ========================= */

  if (
    selectedDisciplines.length ===
    0
  ) {
    return null;
  }


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