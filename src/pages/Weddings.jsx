import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import SectionTitle from "../components/common/SectionTitle";
import Container from "../components/common/Container";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";

import { api } from "../services/api";

export default function Weddings() {
  const [weddings, setWeddings] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await api.getWeddings();
      setWeddings(data);
    }

    loadData();
  }, []);

  return (
    <>
      <PageHeader
        image="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
        subtitle="LUXURY WEDDINGS"
        title="Wedding Stories"
      />

      <section className="weddings-intro">
        <Container>
          <SectionTitle
            label="WEDDINGS"
            title="Stories filled"
            highlight="with emotion."
          />

          <p>
            Every wedding is unique. My approach is to document genuine
            emotions, timeless moments, and beautiful stories.
          </p>

          <PortfolioGrid
            items={weddings}
            featured={true}
            onSelect={(item) => console.log(item)}
          />
        </Container>
      </section>
    </>
  );
}