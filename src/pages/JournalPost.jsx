import { useParams } from "react-router-dom";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";

import "./Project.css";

export default function JournalPost() {
  const { slug } = useParams();

  /* =========================
     LOAD JOURNAL POSTS
  ========================= */

  const posts = JSON.parse(
    localStorage.getItem(
      "rohit-photography-journal"
    ) || "[]"
  );

  /* =========================
     FIND CURRENT ARTICLE
  ========================= */

  const post = posts.find(
    (item) => item.slug === slug
  );

  /* =========================
     ARTICLE NOT FOUND
  ========================= */

  if (!post) {
    return (
      <>
        <SEOHead
          title="Article Not Found | Rohit Ohal Photography"
          description="The journal article you are looking for could not be found."
        />

        <div className="project-not-found">
          <h1>
            Article not found
          </h1>
        </div>
      </>
    );
  }

  /* =========================
     DYNAMIC SEO
  ========================= */

  const seoTitle =
    `${post.title} | Rohit Ohal Photography`;

  const seoDescription =
    post.excerpt ||
    post.content?.slice(0, 160) ||
    "Read the latest photography stories, insights and behind-the-scenes articles from Rohit Ohal Photography.";

  /* =========================
     RENDER
  ========================= */

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        image={post.cover}
      />

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

            <h2>
              {post.title}
            </h2>

            {post.excerpt && (
              <>
                <p>
                  {post.excerpt}
                </p>

                <br />
              </>
            )}

            <p>
              {post.content}
            </p>

          </div>

        </div>

      </section>

    </>
  );
}