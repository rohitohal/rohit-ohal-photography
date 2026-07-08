import { Link } from "react-router-dom";

import journal from "../../data/journal";

import "./JournalPreview.css";

export default function JournalPreview() {
  const featuredPosts = journal
    .filter((post) => post.featured)
    .slice(0, 3);

  return (
    <section className="journal-preview">

      <div className="journal-container">

        <div className="journal-header">

          <span>FROM THE JOURNAL</span>

          <h2>
            Stories Beyond
            <br />
            The Camera
          </h2>

        </div>

        <div className="journal-grid">

          {featuredPosts.map((post) => (

            <article
              className="journal-card"
              key={post.id}
            >

              <img
                src={post.cover}
                alt={post.title}
              />

              <div className="journal-content">

                <span>{post.category}</span>

                <h3>{post.title}</h3>

                <Link
                  to={`/journal/${post.slug}`}
                >
                  Read Article →
                </Link>

              </div>

            </article>

          ))}

        </div>

        <div className="journal-footer">

          <Link
            to="/journal"
            className="journal-view-all"
          >
            View All Articles →
          </Link>

        </div>

      </div>

    </section>
  );
}