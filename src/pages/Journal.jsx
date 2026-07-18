import { useEffect, useState } from "react";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";
import JournalGrid from "../components/journal/JournalGrid";

const defaultHeroImage =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=2000&q=80";

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

  const heroImage =
    publishedPosts[0]?.cover ||
    defaultHeroImage;

  return (
    <>
      <SEOHead
        title="Photography Journal | Rohit Ohal Photography"
        description="Explore photography stories, behind-the-scenes moments, creative insights and experiences from weddings, commercial assignments and photography adventures by Rohit Ohal."
        image={heroImage}
      />

      <PageHero
        title="Journal"
        subtitle="Stories, insights and behind the scenes moments from weddings, commercial work and photography adventures."
        image={heroImage}
      />

      <JournalGrid
        posts={publishedPosts}
      />
    </>
  );
}