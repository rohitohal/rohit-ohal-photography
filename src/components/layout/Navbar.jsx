import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import "./Navbar.css";

import {
  disciplines as defaultDisciplines,
} from "../../data/disciplines";


/* =========================
   STORAGE KEY
========================= */

const DISCIPLINES_KEY =
  "rohit-photography-disciplines";


export default function Navbar() {

  /* =========================
     LOAD SAVED DISCIPLINES
  ========================= */

  const disciplines =
    useMemo(() => {

      try {

        const saved =
          localStorage.getItem(
            DISCIPLINES_KEY
          );


        /*
         * No Admin data saved yet.
         * Use default disciplines.
         */

        if (!saved) {

          return defaultDisciplines;

        }


        const parsed =
          JSON.parse(
            saved
          );


        /*
         * Invalid saved data.
         * Fall back safely.
         */

        if (
          !Array.isArray(
            parsed
          )
        ) {

          return defaultDisciplines;

        }


        /*
         * Merge Admin data with
         * default discipline data.
         *
         * This means title,
         * description and image
         * saved from Admin can
         * override the defaults.
         */

        return defaultDisciplines.map(
          (
            defaultDiscipline
          ) => {

            const savedDiscipline =
              parsed.find(
                (
                  item
                ) =>
                  item.id ===
                  defaultDiscipline.id
              );


            return {
              ...defaultDiscipline,
              ...savedDiscipline,
            };

          }
        );


      } catch (error) {

        console.error(
          "Failed to load Navbar disciplines:",
          error
        );


        return defaultDisciplines;

      }

    }, []);


  /* =========================
     MOBILE MENU
  ========================= */

  const [
    mobileMenu,
    setMobileMenu,
  ] = useState(false);


  /* =========================
     MEGA MENU
  ========================= */

  const [
    megaMenu,
    setMegaMenu,
  ] = useState(false);


  /* =========================
     ACTIVE DISCIPLINE
  ========================= */

  const [
    active,
    setActive,
  ] = useState(
    disciplines[0] ||
    defaultDisciplines[0]
  );


  /* =========================
     SCROLL STATE
  ========================= */

  const [
    scrolled,
    setScrolled,
  ] = useState(false);


  const location =
    useLocation();


  /* =========================
     KEEP ACTIVE DISCIPLINE
     SYNCED WITH DATA
  ========================= */

  useEffect(() => {

    if (
      disciplines.length ===
      0
    ) {

      return;

    }


    setActive(
      (
        currentActive
      ) => {

        /*
         * Try to keep the currently
         * active discipline selected.
         */

        const matchingDiscipline =
          disciplines.find(
            (
              discipline
            ) =>
              discipline.id ===
              currentActive?.id
          );


        /*
         * If it exists, use the
         * newest version of it.
         */

        if (
          matchingDiscipline
        ) {

          return matchingDiscipline;

        }


        /*
         * Otherwise use the first
         * available discipline.
         */

        return disciplines[0];

      }
    );

  }, [
    disciplines,
  ]);


  /* =========================
     SCROLL STATE
  ========================= */

  useEffect(() => {

    const handleScroll =
      () => {

        setScrolled(
          window.scrollY >
          50
        );

      };


    handleScroll();


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);


  /* =========================
     CLOSE MENUS ON PAGE CHANGE
  ========================= */

  useEffect(() => {

    setMobileMenu(
      false
    );

    setMegaMenu(
      false
    );

  }, [
    location.pathname,
  ]);


  /* =========================
     RENDER
  ========================= */

  return (

    <header
      className={
        scrolled
          ? "navbar navbar-scrolled"
          : "navbar"
      }
    >

      <div className="navbar-container">


        {/* =========================
            LOGO
        ========================= */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={() => {

            setMegaMenu(
              false
            );

            setMobileMenu(
              false
            );

          }}
        >

          ROHIT OHAL

        </Link>


        {/* =========================
            DESKTOP / MOBILE NAV
        ========================= */}

        <nav
          className={
            mobileMenu
              ? "navbar-links active"
              : "navbar-links"
          }
        >


          {/* =========================
              PORTFOLIO
          ========================= */}

          <div
            className="portfolio-wrapper"
            onMouseEnter={() =>
              setMegaMenu(
                true
              )
            }
            onMouseLeave={() =>
              setMegaMenu(
                false
              )
            }
          >

            <NavLink
              to="/portfolio"
              className={({
                isActive,
              }) =>
                isActive
                  ? "portfolio-button active"
                  : "portfolio-button"
              }
              onClick={() => {

                setMegaMenu(
                  false
                );

                setMobileMenu(
                  false
                );

              }}
            >

              Portfolio

            </NavLink>


            {/* =========================
                PORTFOLIO MEGA MENU
            ========================= */}

            <div
              className={
                megaMenu
                  ? "mega-menu open"
                  : "mega-menu"
              }
            >

              <div className="mega-left">

                <span className="mega-label">
                  SELECTED WORK
                </span>


                {disciplines.map(
                  (
                    item
                  ) => (

                    <NavLink
                      key={
                        item.id
                      }
                      to={
                        `/portfolio/${item.slug}`
                      }
                      className="mega-item"
                      onMouseEnter={() =>
                        setActive(
                          item
                        )
                      }
                      onClick={() => {

                        setMegaMenu(
                          false
                        );

                        setMobileMenu(
                          false
                        );

                      }}
                    >

                      <h3>
                        {
                          item.title
                        }
                      </h3>

                      <p>
                        {
                          item.description
                        }
                      </p>

                    </NavLink>

                  )
                )}

              </div>


              {/* =========================
                  MEGA MENU IMAGE
              ========================= */}

              <div className="mega-right">

                {active?.image && (

                  <img
                    src={
                      active.image
                    }
                    alt={
                      active.title ||
                      "Portfolio"
                    }
                  />

                )}


                <div className="mega-image-overlay">

                  <span>
                    EXPLORE
                  </span>

                  <h2>
                    {
                      active?.title ||
                      "Portfolio"
                    }
                  </h2>

                </div>

              </div>

            </div>

          </div>


          {/* =========================
              JOURNAL
          ========================= */}

          <NavLink
            to="/journal"
            onClick={() =>
              setMobileMenu(
                false
              )
            }
          >

            Journal

          </NavLink>


          {/* =========================
              ABOUT
          ========================= */}

          <NavLink
            to="/about"
            onClick={() =>
              setMobileMenu(
                false
              )
            }
          >

            About

          </NavLink>


          {/* =========================
              INQUIRE
          ========================= */}

          <NavLink
            to="/contact"
            onClick={() =>
              setMobileMenu(
                false
              )
            }
          >

            Inquire

          </NavLink>

        </nav>


        {/* =========================
            MOBILE MENU BUTTON
        ========================= */}

        <button
          type="button"
          className={
            mobileMenu
              ? "mobile-button active"
              : "mobile-button"
          }
          aria-label="Toggle navigation menu"
          onClick={() =>
            setMobileMenu(
              !mobileMenu
            )
          }
        >

          <span></span>

          <span></span>

        </button>

      </div>

    </header>

  );
}