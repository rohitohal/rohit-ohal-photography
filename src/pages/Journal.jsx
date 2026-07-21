import {
  useEffect,
  useMemo,
  useState,
} from "react";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";
import JournalGrid from "../components/journal/JournalGrid";


/* =========================
   STORAGE KEYS
========================= */

const JOURNAL_KEY =
  "rohit-photography-journal";

const JOURNAL_SETTINGS_KEY =
  "rohit-photography-journal-settings";


/* =========================
   DEFAULT JOURNAL SETTINGS
========================= */

const defaultJournalSettings = {

  heroTitle:
    "Journal",

  heroDescription:
    "Stories, insights and behind the scenes moments from weddings, commercial work and photography adventures.",

  heroImage:
    "",

};


/* =========================
   JOURNAL PAGE
========================= */

export default function Journal() {

  /* =========================
     JOURNAL POSTS
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
     LOAD JOURNAL PAGE SETTINGS
  ========================= */

  const journalSettings =
    useMemo(() => {

      try {

        const saved =
          localStorage.getItem(
            JOURNAL_SETTINGS_KEY
          );


        if (!saved) {

          return {
            ...defaultJournalSettings,
          };

        }


        const parsed =
          JSON.parse(
            saved
          );


        if (
          !parsed ||
          typeof parsed !==
            "object"
        ) {

          return {
            ...defaultJournalSettings,
          };

        }


        return {
          ...defaultJournalSettings,
          ...parsed,
        };


      } catch (error) {

        console.error(
          "Failed to load Journal page settings:",
          error
        );


        return {
          ...defaultJournalSettings,
        };

      }

    }, []);


  /* =========================
     PUBLISHED JOURNAL POSTS
  ========================= */

  const publishedPosts =
    useMemo(() => {

      return [...posts]

        .filter(
          (
            post
          ) =>
            post &&
            post.status ===
              "Published"
        )


        /* =========================
           NEWEST FIRST
        ========================= */

        .sort(
          (
            a,
            b
          ) => {

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
     HERO VALUES
  ========================= */

  const heroTitle =
    journalSettings.heroTitle ||
    defaultJournalSettings.heroTitle;


  const heroDescription =
    journalSettings.heroDescription ||
    defaultJournalSettings.heroDescription;


  /*
   * Journal Hero now comes
   * directly from Admin.
   *
   * If no Journal Hero has been
   * selected yet, use the first
   * available published article
   * cover as a temporary fallback.
   */

  const heroImage =
    journalSettings.heroImage ||
    publishedPosts.find(
      (
        post
      ) =>
        post.cover
    )?.cover ||
    "";


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
        title={
          heroTitle
        }

        subtitle={
          heroDescription
        }

        image={
          heroImage
        }

        variant="journal"

        showScroll={
          false
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