import { useEffect, useState } from "react";

import CreateJournalModal from "../components/CreateJournalModal/CreateJournalModal";

import "../styles/projects.css";

export default function Journal() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem(
      "rohit-photography-journal"
    );

    return saved
      ? JSON.parse(saved)
      : [];
  });

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingPost, setEditingPost] =
    useState(null);

  useEffect(() => {
    localStorage.setItem(
      "rohit-photography-journal",
      JSON.stringify(posts)
    );
  }, [posts]);

  const handleSavePost = (postData) => {
    if (editingPost) {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === editingPost.id
            ? {
                ...postData,
                id: editingPost.id,
              }
            : post
        )
      );
    } else {
      const newPost = {
        ...postData,
        id: Date.now(),
        createdAt:
          new Date().toISOString(),
      };

      setPosts((prev) => [
        newPost,
        ...prev,
      ]);
    }

    setEditingPost(null);
    setIsModalOpen(false);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Delete this article?"
      )
    ) {
      setPosts((prev) =>
        prev.filter(
          (post) =>
            post.id !== id
        )
      );
    }
  };

  return (
    <>
      <div className="projects-page">

        <div className="projects-header">

          <div>

            <span className="projects-overline">
              JOURNAL MANAGEMENT
            </span>

            <h1>
              Manage Journal
            </h1>

            <p>
              Create stories,
              articles and behind
              the scenes content
              for your website.
            </p>

          </div>

          <button
            className="new-project-button"
            onClick={() => {
              setEditingPost(
                null
              );
              setIsModalOpen(
                true
              );
            }}
          >
            + New Article
          </button>

        </div>

        <div className="projects-grid">

          {posts.map((post) => (
            <div
              key={post.id}
              className="project-card"
            >

              <img
                src={
                  post.cover ||
                  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80"
                }
                alt={
                  post.title
                }
              />

              <div className="project-content">

                <span className="project-category">
                  {
                    post.category
                  }
                </span>

                <h3>
                  {
                    post.title
                  }
                </h3>

                <p>
                  {
                    post.excerpt
                  }
                </p>

                <div className="project-footer">

                  <button
                    onClick={() =>
                      handleEdit(
                        post
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        post.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

          {posts.length ===
            0 && (
            <div
              style={{
                width:
                  "100%",
                background:
                  "#fff",
                padding:
                  "80px",
                borderRadius:
                  "24px",
                textAlign:
                  "center",
              }}
            >
              <h2>
                No Articles Yet
              </h2>

              <p>
                Create your
                first journal
                article.
              </p>
            </div>
          )}

        </div>

      </div>

      <CreateJournalModal
        isOpen={
          isModalOpen
        }
        onClose={() => {
          setIsModalOpen(
            false
          );
          setEditingPost(
            null
          );
        }}
        onSave={
          handleSavePost
        }
        initialData={
          editingPost
        }
      />
    </>
  );
}