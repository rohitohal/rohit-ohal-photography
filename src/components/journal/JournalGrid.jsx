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
      <section className="journal-list-section">

        <div className="journal-empty">

          <h2>
            No Articles Found
          </h2>

          <p>
            New journal stories will be
            published soon.
          </p>

        </div>

      </section>
    );
  }


  /* =========================
     JOURNAL LIST
  ========================= */

  return (
    <section className="journal-list-section">

      <div className="journal-grid">

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

      </div>

    </section>
  );
}