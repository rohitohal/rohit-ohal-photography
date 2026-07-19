import JournalCard from "./JournalCard";

import "./JournalGrid.css";

export default function JournalGrid({
  posts = [],
}) {
  /* =========================
     EMPTY STATE
  ========================= */

  if (posts.length === 0) {
    return (
      <div className="journal-empty">

        <h2>
          No Articles Found
        </h2>

        <p>
          New journal stories will be
          published soon.
        </p>

      </div>
    );
  }


  /* =========================
     JOURNAL GRID
  ========================= */

  return (
    <section className="journal-grid">

      {posts.map(
        (post) => (

          <JournalCard
            key={
              post.id ||
              post.slug
            }
            post={
              post
            }
          />

        )
      )}

    </section>
  );
}