"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export default function Nav() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["experience", "projects", "contact"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 3rem;
          background: rgba(245,242,238,0);
          backdrop-filter: blur(0px);
          border-bottom: 1px solid transparent;
          opacity: 0; transform: translateY(-8px);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease,
            background 0.4s ease,
            backdrop-filter 0.4s ease,
            border-color 0.4s ease;
        }
        .nav.visible { opacity: 1; transform: translateY(0); }
        .nav.scrolled {
          background: rgba(245,242,238,0.88);
          backdrop-filter: blur(14px);
          border-bottom-color: var(--border);
        }

        .nav-logo {
          font-family: var(--serif);
          font-size: 1.1rem;
          color: var(--fg);
          text-decoration: none;
          letter-spacing: -0.01em;
        }
        .nav-logo span { color: var(--accent); font-style: italic; }

        .nav-center {
          display: flex; gap: 2rem; list-style: none;
          position: absolute; left: 50%; transform: translateX(-50%);
        }
        .nav-center a {
          font-family: var(--mono);
          font-size: 0.78rem;
          color: var(--fg2);
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: color 0.2s;
          position: relative;
          padding-bottom: 2px;
        }
        .nav-center a::after {
          content: '';
          position: absolute; bottom: -2px; left: 0; right: 0;
          height: 1px;
          background: var(--accent);
          transform: scaleX(0);
          transition: transform 0.2s ease;
          transform-origin: left;
        }
        .nav-center a:hover { color: var(--accent); }
        .nav-center a:hover::after { transform: scaleX(1); }
        .nav-center a.active { color: var(--accent); }
        .nav-center a.active::after { transform: scaleX(1); }

        .nav-socials { display: flex; gap: 0.75rem; }
        .nav-socials a {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--fg2);
          text-decoration: none;
          border: 1px solid var(--border);
          padding: 0.3rem 0.7rem;
          border-radius: 2px;
          transition: all 0.2s;
        }
        .nav-socials a:hover { color: var(--accent); border-color: var(--accent); }

        @media (max-width: 768px) {
          .nav { padding: 1rem 1.5rem; }
          .nav-center { position: static; transform: none; gap: 1.25rem; }
          .nav-socials { display: none; }
        }
        @media (max-width: 480px) {
          .nav-center { display: none; }
        }
      `}</style>

      <nav className={`nav ${mounted ? "visible" : ""} ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo">evan <span>liu</span></a>

        <ul className="nav-center">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={activeSection === l.href.slice(1) ? "active" : ""}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-socials">
          <a href="https://github.com/eliu76" target="_blank" rel="noopener">github</a>
          <a href="https://www.linkedin.com/in/evan-liu-767429250/" target="_blank" rel="noopener">linkedin</a>
        </div>
      </nav>
    </>
  );
}
