import JournalCard from "./JournalCard";

import "./JournalGrid.css";

export default function JournalGrid({
  posts,
}) {
  if (!posts?.length) {
    return (
      <div className="journal-empty">
        <h2>No Articles Found</h2>

        <p>
          New journal stories will be
          published soon.
        </p>
      </div>
    );
  }

  return (
    <section className="journal-grid">

      {posts.map((post) => (
        <JournalCard
          key={post.id}
          post={post}
        />
      ))}

    </section>
  );
}