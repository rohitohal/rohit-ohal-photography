import { Link } from "react-router-dom";
import "./JournalPreview.css";

const posts = [
  {
    id: 1,
    title: "How To Choose Your Wedding Photographer",
    category: "Wedding",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  },
  {
    id: 2,
    title: "Creating Timeless Portraits With Natural Light",
    category: "Portrait",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80",
  },
  {
    id: 3,
    title: "Behind The Scenes Of A Commercial Shoot",
    category: "Editorial",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80",
  },
];

export default function JournalPreview() {
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

          {posts.map((post) => (

            <article
              className="journal-card"
              key={post.id}
            >

              <img
                src={post.image}
                alt={post.title}
              />

              <div className="journal-content">

                <span>{post.category}</span>

                <h3>{post.title}</h3>

                <Link to="/journal">

                  Read Article →

                </Link>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}