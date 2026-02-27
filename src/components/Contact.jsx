import { useState, useRef, useEffect } from "react";

function useIntersection(ref, threshold = 0.2) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

export default function ContactSection() {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("evanliu76@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    {
      label: "email",
      value: "evanliu76@gmail.com",
      action: copyEmail,
      hint: copied ? "copied!" : "click to copy",
      external: false,
    },
    {
      label: "github",
      value: "eliu76",
      href: "https://github.com/eliu76",
      hint: "github.com/eliu76",
      external: true,
    },
    {
      label: "linkedin",
      value: "evan-liu-767429250",
      href: "https://www.linkedin.com/in/evan-liu-767429250/",
      hint: "linkedin.com/in/evan-liu-767429250",
      external: true,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --bg: #f5f2ee;
          --bg2: #eceae5;
          --fg: #1a1814;
          --fg2: #5a5650;
          --accent: #c8501a;
          --border: #d8d4ce;
          --mono: 'DM Mono', monospace;
          --serif: 'Playfair Display', serif;
          --sans: 'DM Sans', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); color: var(--fg); font-family: var(--sans); }

        .contact-section {
          padding: 7rem 0 5rem;
          border-top: 1px solid var(--border);
          background: var(--bg);
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .contact-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 3rem;
          width: 100%;
        }

        /* ── HEADING ── */
        .contact-eyebrow {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--accent);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .contact-title {
          font-family: var(--serif);
          font-size: clamp(2.8rem, 7vw, 5rem);
          line-height: 0.95;
          letter-spacing: -0.02em;
          color: var(--fg);
          margin-bottom: 1.5rem;
        }
        .contact-title em { color: var(--accent); font-style: italic; }

        .contact-sub {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--fg2);
          max-width: 480px;
          margin-bottom: 3.5rem;
        }

        /* ── LINKS ── */
        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-top: 1px solid var(--border);
        }

        .contact-link-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          cursor: pointer;
          background: transparent;
          border-left: none;
          border-right: none;
          width: 100%;
          position: relative;
          overflow: hidden;
          transition: padding-left 0.25s ease;
          gap: 1rem;
        }
        .contact-link-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--accent);
          transform: scaleY(0);
          transition: transform 0.2s ease;
          transform-origin: bottom;
        }
        .contact-link-row:hover { padding-left: 0.75rem; }
        .contact-link-row:hover::before { transform: scaleY(1); }

        .contact-link-left {
          display: flex;
          align-items: baseline;
          gap: 1.25rem;
        }

        .contact-link-label {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--fg2);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          min-width: 70px;
        }

        .contact-link-value {
          font-family: var(--serif);
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          color: var(--fg);
          font-weight: 400;
          letter-spacing: -0.01em;
          transition: color 0.2s;
        }
        .contact-link-row:hover .contact-link-value { color: var(--accent); }

        .contact-link-hint {
          font-family: var(--mono);
          font-size: 0.68rem;
          color: var(--fg2);
          letter-spacing: 0.04em;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s, transform 0.2s;
        }
        .contact-link-row:hover .contact-link-hint {
          opacity: 1;
          transform: translateX(0);
        }
        .contact-link-hint.copied {
          color: #2d7a2d;
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        .contact-link-arrow {
          color: var(--fg2);
          transition: transform 0.2s ease, color 0.2s;
          flex-shrink: 0;
        }
        .contact-link-row:hover .contact-link-arrow {
          transform: translate(3px, -3px);
          color: var(--accent);
        }

        /* ── FOOTER ── */
        .contact-footer {
          margin-top: auto;
          padding: 2.5rem 3rem 0;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .contact-footer-name {
          font-family: var(--serif);
          font-size: 0.95rem;
          color: var(--fg2);
        }
        .contact-footer-name em { color: var(--accent); font-style: italic; }

        .contact-footer-note {
          font-family: var(--mono);
          font-size: 0.68rem;
          color: var(--fg2);
          letter-spacing: 0.05em;
          text-align: right;
        }

        @media (max-width: 640px) {
          .contact-container { padding: 0 1.5rem; }
          .contact-footer { padding: 2rem 1.5rem 0; flex-direction: column; align-items: flex-start; gap: 0.5rem; }
          .contact-link-hint { display: none; }
        }
      `}</style>

      <section className="contact-section" id="contact">
        <div
          ref={ref}
          className="contact-container"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="contact-eyebrow">// get in touch</p>
          <h2 className="contact-title">let's<br /><em>connect.</em></h2>
          <p className="contact-sub">
            Always open to interesting problems, good conversations, and new opportunities. Don't hesitate to reach out.
          </p>

          <div className="contact-links">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="contact-link-row"
                >
                  <div className="contact-link-left">
                    <span className="contact-link-label">{link.label}</span>
                    <span className="contact-link-value">{link.hint}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span className="contact-link-hint">{link.hint}</span>
                    <svg className="contact-link-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3M13 3H7M13 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              ) : (
                <button
                  key={link.label}
                  className="contact-link-row"
                  onClick={link.action}
                >
                  <div className="contact-link-left">
                    <span className="contact-link-label">{link.label}</span>
                    <span className="contact-link-value">{link.value}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span className={`contact-link-hint ${copied ? "copied" : ""}`}>
                      {link.hint}
                    </span>
                    <svg className="contact-link-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5 8h6M8 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
              )
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="contact-footer">
          <p className="contact-footer-name">evan <em>liu.</em></p>
          <p className="contact-footer-note">
            designed & built by evan liu · {new Date().getFullYear()}
          </p>
        </div>
      </section>
    </>
  );
}
