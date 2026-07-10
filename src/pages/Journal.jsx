import { useEffect, useState } from "react";

import PageHero from "../components/common/PageHero";
import JournalGrid from "../components/journal/JournalGrid";

export default function Journal() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem(
      "rohit-photography-journal"
    );

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const publishedPosts = posts.filter(
    (post) =>
      post.status === "Published"
  );

  return (
    <>
      <PageHero
        title="Journal"
        subtitle="Stories, insights and behind the scenes moments from weddings, commercial work and photography adventures."
        image={
          publishedPosts[0]?.cover ||
          "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=2000&q=80"
        }
      />

      <JournalGrid
        posts={publishedPosts}
      />
    </>
  );
}