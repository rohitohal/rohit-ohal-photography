import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">

        <NavLink to="/" className="logo">
          Rohit Ohal
        </NavLink>

        <nav>
          <ul className="nav-menu">

            <li>
              <NavLink to="/">HOME</NavLink>
            </li>

            <li>
              <NavLink to="/weddings">WEDDINGS</NavLink>
            </li>

            <li>
              <NavLink to="/journal">JOURNAL</NavLink>
            </li>

            <li>
              <NavLink to="/about">ABOUT</NavLink>
            </li>

            <li>
              <NavLink to="/contact">CONTACT</NavLink>
            </li>

          </ul>
        </nav>

      </div>
    </header>
  );
}