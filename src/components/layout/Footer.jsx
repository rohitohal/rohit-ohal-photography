import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  supabase,
} from "../../lib/supabase";

import "./Footer.css";


/* =========================
   DEFAULT WEBSITE SETTINGS
========================= */

const defaultSettings = {
  businessName:
    "Rohit Ohal Photography",

  email:
    "hello@rohitohal.com",

  phone:
    "+91 70209 98403",

  location:
    "Pune, Maharashtra, India",

  instagram:
    "",

  facebook:
    "",

  workingDays:
    "Monday – Sunday",

  workingHours:
    "10:00 AM – 8:00 PM",
};


/* =========================
   FOOTER
========================= */

export default function Footer() {

  const [
    settings,
    setSettings,
  ] =
    useState(
      defaultSettings
    );


  /* =========================
     LOAD WEBSITE SETTINGS
  ========================= */

  useEffect(() => {

    const loadSettings =
      async () => {

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
                "global"
              )
              .single();


          if (error) {
            throw error;
          }


          if (
            data?.setting_value
          ) {

            const loadedSettings = {
              ...defaultSettings,
              ...data.setting_value,
            };


            setSettings(
              loadedSettings
            );


            /*
             * Keep localStorage
             * synchronized as a
             * temporary fallback.
             */

            localStorage.setItem(
              "rohit-photography-settings",
              JSON.stringify(
                loadedSettings
              )
            );


            return;

          }

        } catch (error) {

          console.error(
            "Failed to load footer settings from Supabase:",
            error
          );


          /*
           * FALLBACK:
           * Load settings from
           * localStorage.
           */

          const savedSettings =
            localStorage.getItem(
              "rohit-photography-settings"
            );


          if (savedSettings) {

            try {

              setSettings({
                ...defaultSettings,
                ...JSON.parse(
                  savedSettings
                ),
              });

            } catch (
              localError
            ) {

              console.error(
                "Failed to load local footer settings:",
                localError
              );

            }

          }

        }

      };


    loadSettings();

  }, []);


  /* =========================
     WHATSAPP LINK
  ========================= */

  const whatsappNumber =
    settings.phone
      ?.replace(
        /\D/g,
        ""
      ) || "";


  const whatsappLink =
    `https://wa.me/${whatsappNumber}`;


  /* =========================
     EMAIL LINK
  ========================= */

  const emailLink =
    `mailto:${settings.email}`;


  /* =========================
     COPYRIGHT YEAR
  ========================= */

  const currentYear =
    new Date()
      .getFullYear();


  /* =========================
     RENDER
  ========================= */

  return (

    <footer className="footer">

      <div className="footer-container">


        {/* =========================
            BRAND
        ========================= */}

        <div className="footer-brand">

          <h2>
            ROHIT OHAL
          </h2>

          <p>
            Fine Art Wedding,
            Portrait, Commercial,
            Industrial and Editorial
            Photography based in{" "}
            {settings.location}.
          </p>

        </div>


        {/* =========================
            FOOTER LINKS
        ========================= */}

        <div className="footer-links">


          {/* PORTFOLIO */}

          <div>

            <h4>
              Portfolio
            </h4>

            <Link to="/portfolio/weddings">
              Wedding Stories
            </Link>

            <Link to="/portfolio/portraits">
              Portraits
            </Link>

            <Link to="/portfolio/events">
              Events
            </Link>

            <Link to="/portfolio/industrial">
              Industrial
            </Link>

            <Link to="/portfolio/food-beverage">
              Food & Beverage
            </Link>

            <Link to="/portfolio/editorial">
              Editorial
            </Link>

          </div>


          {/* COMPANY */}

          <div>

            <h4>
              Company
            </h4>

            <Link to="/about">
              About
            </Link>

            <Link to="/journal">
              Journal
            </Link>

            <Link to="/contact">
              Contact
            </Link>

          </div>


          {/* CONNECT */}

          <div>

            <h4>
              Connect
            </h4>


            {settings.instagram && (

              <a
                href={
                  settings.instagram
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>

            )}


            {settings.facebook && (

              <a
                href={
                  settings.facebook
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>

            )}


            {whatsappNumber && (

              <a
                href={
                  whatsappLink
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>

            )}


            {settings.email && (

              <a
                href={
                  emailLink
                }
              >
                Email
              </a>

            )}

          </div>

        </div>

      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================= */}

      <div className="footer-bottom">

        <p>
          © {currentYear}{" "}
          {settings.businessName}.
          All Rights Reserved.
        </p>

      </div>

    </footer>

  );
}