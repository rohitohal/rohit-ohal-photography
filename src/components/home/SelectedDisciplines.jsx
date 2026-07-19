import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

import DisciplinesGrid from "../portfolio/DisciplinesGrid";

import { disciplines } from "../../data/disciplines";

export default function SelectedDisciplines() {
  /* =========================
     LOAD SELECTED DISCIPLINES
  ========================= */

  let selectedIds =
    disciplines.map(
      (discipline) =>
        discipline.id
    );

  try {
    const saved =
      localStorage.getItem(
        "rohit-photography-homepage-disciplines"
      );

    if (saved) {
      const parsed =
        JSON.parse(saved);

      if (
        Array.isArray(
          parsed
        )
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
     FILTER DISCIPLINES
  ========================= */

  const selectedDisciplines =
    disciplines.filter(
      (discipline) =>
        selectedIds.includes(
          discipline.id
        )
    );

  /* =========================
     HIDE SECTION IF EMPTY
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