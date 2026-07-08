import { Link } from "react-router-dom";

import "./JournalCard.css";

export default function JournalCard({
  post,
}) {
  if (!post) return null;

  return (
    <Link
      to={`/journal/${post.slug}`}
      className="journal-card"
    >
      <div className="journal-image">

        <img
          src={post.cover}
          alt={post.title}
          loading="lazy"
        />

      </div>

      <div className="journal-content">

        <span className="journal-category">
          {post.category}
        </span>

        <h3>{post.title}</h3>

        <p>{post.excerpt}</p>

        <small>{post.date}</small>

      </div>

    </Link>
  );
}