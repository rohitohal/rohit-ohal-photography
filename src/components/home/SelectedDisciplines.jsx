import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

import DisciplinesGrid from "../portfolio/DisciplinesGrid";

import { disciplines } from "../../data/disciplines";

export default function SelectedDisciplines() {
  return (
    <section className="selected-disciplines">
      <Container>
        <SectionTitle
          label="PORTFOLIO"
          title="Selected"
          highlight="Disciplines"
        />

        <DisciplinesGrid disciplines={disciplines} />
      </Container>
    </section>
  );
}