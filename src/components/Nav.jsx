import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LampMark from "./LampMark";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";
import "./Nav.css";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/the-team", label: "The Team" },
  { to: "/statistics", label: "Statistics" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact-us", label: "Contact Us" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on resize back to desktop width
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 760) setOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="site-nav">
      <div className="wrap site-nav-inner">
        <NavLink to="/" className="brand" aria-label="Crowd Genie, home">
          <LampMark />
          <span>
            crowd-genie<span className="brand-dim">.com</span>
          </span>
        </NavLink>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <Button to="/signin" variant="ghost" size="sm">
            Sign In
          </Button>
          <Button to="/signup" variant="primary" size="sm">
            Sign Up
          </Button>
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="mobile-nav">
          <nav aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-nav-actions">
            <ThemeToggle />
            <Button to="/signin" variant="ghost" onClick={() => setOpen(false)}>
              Sign In
            </Button>
            <Button to="/signup" variant="primary" onClick={() => setOpen(false)}>
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
