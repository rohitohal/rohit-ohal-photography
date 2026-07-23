import {
  useEffect,
  useMemo,
  useState,
} from "react";

import SEOHead from
  "../components/common/SEOHead";

import PageHero from
  "../components/common/PageHero";

import JournalGrid from
  "../components/journal/JournalGrid";

import {
  getPublishedPosts,
} from "../services/journalService";

import {
  getSettings,
} from "../services/settingsService";


/* =========================
   SETTINGS KEY
========================= */

const SETTINGS_KEY =
  "journal";


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
  ] =
    useState([]);


  /* =========================
     JOURNAL SETTINGS
  ========================= */

  const [
    journalSettings,
    setJournalSettings,
  ] =
    useState({
      ...defaultJournalSettings,
    });


  /* =========================
     LOADING
  ========================= */

  const [
    isLoading,
    setIsLoading,
  ] =
    useState(true);


  /* =========================
     ERROR
  ========================= */

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState("");


  /* =========================
     LOAD JOURNAL DATA
     FROM SUPABASE
  ========================= */

  useEffect(() => {

    let isMounted =
      true;


    async function loadJournal() {

      try {

        setIsLoading(
          true
        );


        setErrorMessage(
          ""
        );


        /*
         * Load articles and Journal
         * page settings together.
         */

        const [
          publishedPosts,
          savedSettings,
        ] =
          await Promise.all([

            getPublishedPosts(),

            getSettings(
              SETTINGS_KEY
            ),

          ]);


        if (
          !isMounted
        ) {

          return;

        }


        /* =====================
           POSTS
        ===================== */

        setPosts(
          Array.isArray(
            publishedPosts
          )
            ? publishedPosts
            : []
        );


        /* =====================
           SETTINGS
        ===================== */

        if (
          savedSettings &&
          typeof savedSettings ===
            "object" &&
          !Array.isArray(
            savedSettings
          )
        ) {

          setJournalSettings({

            ...defaultJournalSettings,

            ...savedSettings,

          });

        } else {

          setJournalSettings({
            ...defaultJournalSettings,
          });

        }

      } catch (
        error
      ) {

        console.error(
          "Failed to load Journal:",
          error
        );


        if (
          isMounted
        ) {

          setErrorMessage(
            "Unable to load Journal content."
          );

        }

      } finally {

        if (
          isMounted
        ) {

          setIsLoading(
            false
          );

        }

      }

    }


    loadJournal();


    return () => {

      isMounted =
        false;

    };

  }, []);


  /* =========================
     SORT POSTS

     Supabase already sorts
     newest first, but we keep
     this as a UI safeguard.
  ========================= */

  const publishedPosts =
    useMemo(() => {

      return [
        ...posts,
      ].sort(
        (
          a,
          b
        ) => {

          const dateA =
            new Date(
              a.createdAt ||
              0
            ).getTime();


          const dateB =
            new Date(
              b.createdAt ||
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
   * Priority:
   *
   * 1. Hero selected in Admin
   * 2. First article with cover
   * 3. Empty image
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

      {/* =====================
          SEO
      ===================== */}

      <SEOHead
        title="Photography Journal | Rohit Ohal Photography"

        description="Explore photography stories, behind-the-scenes moments, creative insights and experiences from weddings, commercial assignments and photography adventures by Rohit Ohal."

        image={
          heroImage
        }

        canonical="/journal"

        type="website"

        robots="index, follow"
      />


      {/* =====================
          PAGE HERO
      ===================== */}

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


      {/* =====================
          LOADING
      ===================== */}

      {isLoading && (

        <section
          style={{
            padding:
              "80px 20px",

            textAlign:
              "center",
          }}
        >

          <p>
            Loading journal...
          </p>

        </section>

      )}


      {/* =====================
          ERROR
      ===================== */}

      {!isLoading &&
        errorMessage && (

        <section
          style={{
            padding:
              "80px 20px",

            textAlign:
              "center",
          }}
        >

          <p>
            {
              errorMessage
            }
          </p>

        </section>

      )}


      {/* =====================
          JOURNAL ARTICLES
      ===================== */}

      {!isLoading &&
        !errorMessage && (

        <JournalGrid
          posts={
            publishedPosts
          }
        />

      )}

    </>

  );

}