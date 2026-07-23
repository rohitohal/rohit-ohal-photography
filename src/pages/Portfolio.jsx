import {
  useEffect,
  useState,
} from "react";

import SEOHead from "../components/common/SEOHead";
import PageHero from "../components/common/PageHero";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";

import {
  supabase,
} from "../lib/supabase";


/* =========================
   SUPABASE SETTING KEY
========================= */

const SETTING_KEY =
  "portfolio_page";


/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {

  heroTitle:
    "Selected Work",

  heroDescription:
    "A curated collection of wedding, portrait, commercial, industrial, food and editorial photography.",

  heroImage:
    "",

};


/* =========================
   PORTFOLIO PAGE
========================= */

export default function Portfolio() {

  const [
    portfolioSettings,
    setPortfolioSettings,
  ] = useState({
    ...defaultSettings,
  });


  const [
    loading,
    setLoading,
  ] = useState(true);


  /* =========================
     LOAD SETTINGS
  ========================= */

  useEffect(() => {

    let mounted =
      true;


    async function loadSettings() {

      try {

        const {
          data,
          error,
        } =
          await supabase
            .from(
              "site_settings"
            )
            .select(
              "setting_value"
            )
            .eq(
              "setting_key",
              SETTING_KEY
            )
            .maybeSingle();


        if (error) {
          throw error;
        }


        if (!mounted) {
          return;
        }


        if (
          data?.setting_value &&
          typeof data.setting_value ===
            "object" &&
          !Array.isArray(
            data.setting_value
          )
        ) {

          setPortfolioSettings({

            ...defaultSettings,

            ...data.setting_value,

          });

        }


      } catch (error) {

        console.error(
          "Failed to load Portfolio settings:",
          error
        );

      } finally {

        if (mounted) {

          setLoading(
            false
          );

        }

      }

    }


    loadSettings();


    return () => {

      mounted =
        false;

    };

  }, []);


  /* =========================
     VALUES
  ========================= */

  const heroTitle =
    portfolioSettings.heroTitle ||
    defaultSettings.heroTitle;


  const heroDescription =
    portfolioSettings.heroDescription ||
    defaultSettings.heroDescription;


  const heroImage =
    portfolioSettings.heroImage ||
    "";


  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return null;
  }


  /* =========================
     RENDER
  ========================= */

  return (

    <>

      <SEOHead
        title="Photography Portfolio | Rohit Ohal Photography"
        description="Explore the photography portfolio of Rohit Ohal, featuring weddings, portraits, commercial, industrial, food, events and editorial photography in Pune, India."
        image={
          heroImage ||
          undefined
        }
      />


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
        variant="portfolio"
        showScroll={
          false
        }
      />


      <PortfolioGrid
        enableFilter
      />

    </>

  );

}