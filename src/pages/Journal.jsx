import {
  useEffect,
  useMemo,
  useState,
} from "react";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";
import JournalGrid from "../components/journal/JournalGrid";


/* =========================
   CONSTANTS
========================= */

const JOURNAL_KEY =
  "rohit-photography-journal";

const defaultHeroImage =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=2000&q=80";


export default function Journal() {
  /* =========================
     JOURNAL STATE
  ========================= */

  const [
    posts,
    setPosts,
  ] = useState([]);


  /* =========================
     LOAD JOURNAL POSTS
  ========================= */

  useEffect(() => {
    try {
      const savedPosts =
        localStorage.getItem(
          JOURNAL_KEY
        );

      if (!savedPosts) {
        setPosts([]);

        return;
      }

      const parsedPosts =
        JSON.parse(
          savedPosts
        );

      if (
        Array.isArray(
          parsedPosts
        )
      ) {
        setPosts(
          parsedPosts
        );
      } else {
        setPosts([]);
      }

    } catch (error) {
      console.error(
        "Failed to load journal posts:",
        error
      );

      setPosts([]);
    }
  }, []);


  /* =========================
     PUBLISHED JOURNAL POSTS
  ========================= */

  const publishedPosts =
    useMemo(() => {

      return posts

        /* Only show published articles */

        .filter(
          (post) =>
            post &&
            post.status ===
              "Published"
        )


        /* Newest articles first */

        .sort(
          (a, b) => {

            const dateA =
              new Date(
                a.createdAt ||
                a.date ||
                0
              ).getTime();

            const dateB =
              new Date(
                b.createdAt ||
                b.date ||
                0
              ).getTime();

            return (
              dateB -
              dateA
            );
          }
        );

    }, [
      posts,
    ]);


  /* =========================
     HERO IMAGE
  ========================= */

  const heroImage =
    publishedPosts.find(
      (post) =>
        post.cover
    )?.cover ||
    defaultHeroImage;


  /* =========================
     RENDER
  ========================= */

  return (
    <>

      {/* =========================
          SEO
      ========================= */}

      <SEOHead
        title="Photography Journal | Rohit Ohal Photography"
        description="Explore photography stories, behind-the-scenes moments, creative insights and experiences from weddings, commercial assignments and photography adventures by Rohit Ohal."
        image={
          heroImage
        }
      />


      {/* =========================
          PAGE HERO
      ========================= */}

      <PageHero
        title="Journal"
        subtitle="Stories, insights and behind the scenes moments from weddings, commercial work and photography adventures."
        image={
          heroImage
        }
      />


      {/* =========================
          JOURNAL ARTICLES
      ========================= */}

      <JournalGrid
        posts={
          publishedPosts
        }
      />

    </>
  );
}