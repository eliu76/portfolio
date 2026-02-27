import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: "stocker",
    year: "2025",
    title: "Stocker",
    subtitle: "AI Stock Sentiment Analysis App",
    description:
      "Real-time stock research web app that aggregates news, social chatter, and price signals to generate sentiment scores per ticker — then translates them into portfolio-level insights and alerts.",
    period: "Jul 2025 – Aug 2025",
    bullets: [
      "Leveraged Groq-hosted LLMs to power real-time news summaries and sentiment analysis.",
      "Optimized API and inference paths with streaming responses, batching, and caching for fast time-to-first-token.",
      "Built full portfolio-level insight layer translating per-ticker signals into actionable alerts.",
    ],
    tags: ["React", "Flask", "Node.js", "PostgreSQL", "Kubernetes", "LLM", "Python"],
    category: "web",
    link: "https://github.com/eliu76",
    accent: "#c8501a",
  },
  {
    id: "track",
    year: "2024",
    title: "Track.ai",
    subtitle: "Health & Fitness App",
    description:
      "A full-stack fitness tracking web app with ML-driven workout recommendations and natural language analysis of activity data powered by a fine-tuned BERT model.",
    period: "Dec 2023 – Feb 2024",
    bullets: [
      "Built React + FastAPI web app for user activity tracking and ML-driven fitness recommendations.",
      "Improved data load times by 30–50% with activity and progress visualization APIs using server-side caching.",
      "Integrated Hugging Face BERT model for natural language analysis of activity data.",
    ],
    tags: ["React", "FastAPI", "Python", "ML", "BERT", "HuggingFace"],
    category: "ml",
    link: "https://github.com/eliu76",
    accent: "#2d7a8a",
  },
  {
    id: "portfolio",
    year: "2026",
    title: "this portfolio",
    subtitle: "You are here.",
    description:
      "The very site you're looking at. Designed from scratch with a focus on clean typography, editorial layout, and personality. Built piece by piece, section by section.",
    period: "2026",
    bullets: [
      "Custom-designed from scratch — no templates, no UI kits.",
      "Interactive terminal on the hero page lets visitors explore Evan's background through commands.",
      "Scroll-triggered animations, expandable experience cards, filterable project grid.",
    ],
    tags: ["React", "Next.js", "CSS", "Design"],
    category: "web",
    link: "#",
    accent: "#6a4a8a",
    isMeta: true,
  },
];

const ALL_TAGS = ["all", "web", "ml"];

const CATEGORY_LABELS = { web: "web", ml: "ml / ai", all: "all" };

function useIntersection(ref, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`proj-card ${project.isMeta ? "proj-card-meta" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ${index * 0.12}s ease, transform 0.55s ${index * 0.12}s ease`,
        "--card-accent": project.accent,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top bar */}
      <div className="proj-card-bar" style={{ background: project.accent }} />

      <div className="proj-card-inner">
        {/* Header */}
        <div className="proj-card-head">
          <div>
            <div className="proj-meta-row">
              <span className="proj-year">{project.year}</span>
              <span className="proj-category">{CATEGORY_LABELS[project.category]}</span>
            </div>
            <h3 className="proj-title">{project.title}</h3>
            <p className="proj-subtitle">{project.subtitle}</p>
          </div>
          <a
            href={project.link}
            target={project.link === "#" ? "_self" : "_blank"}
            rel="noopener"
            className="proj-link-btn"
            style={{ color: project.accent, borderColor: project.accent + "44" }}
            aria-label={`View ${project.title}`}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Description */}
        <p className="proj-desc">{project.description}</p>

        {/* Bullets */}
        <ul className="proj-bullets">
          {project.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        {/* Tags */}
        <div className="proj-tags">
          {project.tags.map((t) => (
            <span key={t} className="proj-tag" style={{ borderColor: project.accent + "33", color: project.accent }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState("all");
  const headingRef = useRef(null);
  const headingVisible = useIntersection(headingRef, 0.3);

  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

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

        /* ── SECTION ── */
        .proj-section {
          padding: 6rem 0;
          background: var(--bg2);
          border-top: 1px solid var(--border);
        }

        .proj-container {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 3rem;
        }

        /* ── HEADING ── */
        .proj-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3rem;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .proj-eyebrow {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--accent);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .proj-main-title {
          font-family: var(--serif);
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--fg);
        }
        .proj-main-title em { color: var(--accent); font-style: italic; }

        /* ── FILTER PILLS ── */
        .proj-filters {
          display: flex;
          gap: 0.5rem;
          align-self: flex-end;
        }

        .proj-filter-btn {
          font-family: var(--mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          padding: 0.4rem 0.9rem;
          border-radius: 2px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--fg2);
          cursor: pointer;
          transition: all 0.2s;
        }
        .proj-filter-btn:hover { color: var(--accent); border-color: var(--accent); }
        .proj-filter-btn.active {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
        }

        /* ── GRID ── */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        /* ── CARD ── */
        .proj-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          position: relative;
        }
        .proj-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          transform: translateY(-3px);
        }
        .proj-card-meta {
          border-style: dashed;
        }

        .proj-card-bar {
          height: 3px;
          width: 100%;
          flex-shrink: 0;
        }

        .proj-card-inner {
          padding: 1.4rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          flex: 1;
        }

        .proj-card-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .proj-meta-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.4rem;
        }

        .proj-year {
          font-family: var(--mono);
          font-size: 0.68rem;
          color: var(--fg2);
          letter-spacing: 0.05em;
        }

        .proj-category {
          font-family: var(--mono);
          font-size: 0.65rem;
          color: var(--fg2);
          background: var(--bg2);
          border: 1px solid var(--border);
          padding: 0.1rem 0.45rem;
          border-radius: 2px;
          letter-spacing: 0.05em;
        }

        .proj-title {
          font-family: var(--serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--fg);
          letter-spacing: -0.01em;
          line-height: 1.1;
        }

        .proj-subtitle {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--fg2);
          margin-top: 0.2rem;
          letter-spacing: 0.02em;
        }

        .proj-link-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px; height: 30px;
          border: 1px solid;
          border-radius: 4px;
          flex-shrink: 0;
          transition: all 0.2s;
          background: transparent;
          text-decoration: none;
        }
        .proj-link-btn:hover {
          background: var(--bg2);
        }

        .proj-desc {
          font-size: 0.88rem;
          line-height: 1.65;
          color: var(--fg2);
        }

        .proj-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
        }

        .proj-bullets li {
          font-size: 0.82rem;
          line-height: 1.6;
          color: var(--fg2);
          padding-left: 1rem;
          position: relative;
        }
        .proj-bullets li::before {
          content: '·';
          position: absolute; left: 0;
          color: var(--accent);
          font-weight: bold;
        }

        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-top: auto;
          padding-top: 0.25rem;
        }

        .proj-tag {
          font-family: var(--mono);
          font-size: 0.65rem;
          padding: 0.18rem 0.5rem;
          border-radius: 2px;
          border: 1px solid;
          letter-spacing: 0.04em;
          background: transparent;
        }

        /* ── FOOTER NOTE ── */
        .proj-footer-note {
          margin-top: 2.5rem;
          text-align: center;
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--fg2);
          letter-spacing: 0.05em;
        }
        .proj-footer-note a {
          color: var(--accent);
          text-decoration: none;
        }
        .proj-footer-note a:hover { text-decoration: underline; }

        @media (max-width: 640px) {
          .proj-container { padding: 0 1.5rem; }
          .proj-heading-row { flex-direction: column; align-items: flex-start; }
          .proj-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="proj-section" id="projects">
        <div className="proj-container">

          {/* Heading */}
          <div
            ref={headingRef}
            className="proj-heading-row"
            style={{
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div>
              <p className="proj-eyebrow">// selected work</p>
              <h2 className="proj-main-title">things I've<br /><em>built.</em></h2>
            </div>
            <div className="proj-filters">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  className={`proj-filter-btn ${filter === tag ? "active" : ""}`}
                  onClick={() => setFilter(tag)}
                >
                  {CATEGORY_LABELS[tag] || tag}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="proj-grid">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Footer note */}
          <p className="proj-footer-note">
            more on{" "}
            <a href="https://github.com/eliu76" target="_blank" rel="noopener">
              github.com/eliu76
            </a>
          </p>

        </div>
      </section>
    </>
  );
}
