import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        Rohit Ohal
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/weddings">Weddings</Link>

        <Link to="/journal">Journal</Link>

        <Link to="/about">About</Link>

        <Link to="/contact">Contact</Link>

      </div>

    </nav>
  );
}