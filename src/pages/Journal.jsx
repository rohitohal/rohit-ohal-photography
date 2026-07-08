import journal from "../data/journal";

import PageHero from "../components/common/PageHero";
import JournalGrid from "../components/journal/JournalGrid";

export default function Journal() {
  return (
    <>
      <PageHero
        title="Journal"
        subtitle="Stories, insights and behind the scenes moments from weddings, commercial work and photography adventures."
        image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=2000&q=80"
      />

      <JournalGrid posts={journal} />
    </>
  );
}