import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";
import { disciplines } from "../../data/disciplines";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [megaMenu, setMegaMenu] = useState(false);
  const [active, setActive] = useState(disciplines[0]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={
        scrolled ? "navbar navbar-scrolled" : "navbar"
      }
    >
      <div className="navbar-container">

        <Link
          to="/"
          className="navbar-logo"
        >
          ROHIT OHAL
        </Link>

        <nav
          className={
            mobileMenu
              ? "navbar-links active"
              : "navbar-links"
          }
        >

          <div
            className="portfolio-wrapper"
            onMouseEnter={() => setMegaMenu(true)}
            onMouseLeave={() => setMegaMenu(false)}
          >

            <button className="portfolio-button">

              Portfolio

            </button>

            <div
              className={
                megaMenu
                  ? "mega-menu open"
                  : "mega-menu"
              }
            >

              <div className="mega-left">

                {disciplines.map((item) => (

                  <NavLink
                    key={item.id}
                    to={item.slug}
                    className="mega-item"
                    onMouseEnter={() =>
                      setActive(item)
                    }
                  >

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                  </NavLink>

                ))}

              </div>

              <div className="mega-right">

                <img
                  src={active.image}
                  alt={active.title}
                />

                <div className="mega-image-overlay">

                  <h2>{active.title}</h2>

                  <span>
                    {active.description}
                  </span>

                </div>

              </div>

            </div>

          </div>

          <NavLink to="/journal">
            Journal
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

          <NavLink to="/contact">
            Inquire
          </NavLink>

        </nav>

        <button
          className="mobile-button"
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
        >

          ☰

        </button>

      </div>
    </header>
  );
}