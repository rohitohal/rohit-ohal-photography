import { useParams } from "react-router-dom";

import PageHero from "../components/common/PageHero";

import "./Project.css";

export default function JournalPost() {
  const { slug } = useParams();

  const posts = JSON.parse(
    localStorage.getItem(
      "rohit-photography-journal"
    ) || "[]"
  );

  const post = posts.find(
    (item) => item.slug === slug
  );

  if (!post) {
    return (
      <div className="project-not-found">
        <h1>Article not found</h1>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={post.title}
        subtitle={`${post.category}${
          post.status
            ? ` • ${post.status}`
            : ""
        }`}
        image={post.cover}
      />

      <section className="project-page">

        <div className="project-container">

          <div className="project-story">

            <h2>{post.title}</h2>

            <p>{post.excerpt}</p>

            <br />

            <p>{post.content}</p>

          </div>

        </div>

      </section>
    </>
  );
}