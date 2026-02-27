"use client";

import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: "stocker",
    year: "2025",
    title: "Stocker",
    subtitle: "AI Stock Sentiment Analysis App",
    description: "Real-time stock research app aggregating news, social chatter, and price signals into sentiment scores and portfolio-level insights.",
    period: "Jul – Aug 2025",
    bullets: [
      "Leveraged Groq-hosted LLMs for real-time news summaries and sentiment analysis.",
      "Optimized API paths with streaming responses, batching, and caching for fast time-to-first-token.",
      "Built portfolio-level insight layer translating per-ticker signals into actionable alerts.",
    ],
    tags: ["React", "Flask", "Node.js", "PostgreSQL", "Kubernetes", "LLM", "Python"],
    category: "web",
    href: "https://github.com/eliu76",
    accent: "#c8501a",
  },
  {
    id: "track",
    year: "2024",
    title: "Track.ai",
    subtitle: "Health & Fitness App",
    description: "Full-stack fitness tracking web app with ML-driven workout recommendations and BERT-powered natural language analysis of activity data.",
    period: "Dec 2023 – Feb 2024",
    bullets: [
      "Built React + FastAPI web app for activity tracking and ML-driven fitness recommendations.",
      "Improved data load times 30–50% with server-side caching on visualization APIs.",
      "Integrated Hugging Face BERT model for natural language analysis of activity data.",
    ],
    tags: ["React", "FastAPI", "Python", "ML", "BERT", "HuggingFace"],
    category: "ml",
    href: "https://github.com/eliu76",
    accent: "#2d7a8a",
  },
  {
    id: "portfolio",
    year: "2025",
    title: "this portfolio",
    subtitle: "You are here.",
    description: "The very site you're looking at. Designed from scratch with editorial layout, interactive terminal, and scroll-triggered animations.",
    period: "2025",
    bullets: [
      "Custom-designed from scratch — no templates, no UI kits.",
      "Interactive terminal on the hero page: type commands to explore Evan's background.",
      "Scroll-triggered animations, expandable experience cards, filterable project grid.",
    ],
    tags: ["React", "Next.js", "CSS"],
    category: "web",
    href: "#",
    accent: "#6a4a8a",
    isMeta: true,
  },
];

const FILTERS = [
  { key: "all",  label: "all" },
  { key: "web",  label: "web" },
  { key: "ml",   label: "ml / ai" },
];

function useInView(ref, threshold = 0.1) {
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
  const visible = useInView(ref);

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
    >
      <div className="proj-bar" style={{ background: project.accent }} />
      <div className="proj-inner">
        <div className="proj-head">
          <div>
            <div className="proj-meta">
              <span className="proj-year">{project.year}</span>
              <span className="proj-cat">{project.category}</span>
            </div>
            <h3 className="proj-title">{project.title}</h3>
            <p className="proj-sub">{project.subtitle}</p>
          </div>
          <a
            href={project.href}
            target={project.href === "#" ? "_self" : "_blank"}
            rel="noopener"
            className="proj-link"
            style={{ color: project.accent, borderColor: project.accent + "44" }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <p className="proj-desc">{project.description}</p>
        <ul className="proj-bullets">
          {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <div className="proj-tags">
          {project.tags.map((t) => (
            <span key={t} className="proj-tag" style={{ borderColor: project.accent + "44", color: project.accent }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const headRef = useRef(null);
  const headVis = useInView(headRef, 0.3);
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <style>{`
        .proj-section { padding: 6rem 0; background: var(--bg2); border-top: 1px solid var(--border); }
        .proj-wrap { max-width: 960px; margin: 0 auto; padding: 0 3rem; }

        .proj-head-row {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 3rem; gap: 2rem; flex-wrap: wrap;
        }
        .proj-eyebrow { font-family: var(--mono); font-size: 0.72rem; color: var(--accent); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.6rem; }
        .proj-main-title { font-family: var(--serif); font-size: clamp(2.2rem, 5vw, 3.5rem); line-height: 1; letter-spacing: -0.02em; }
        .proj-main-title em { color: var(--accent); font-style: italic; }

        .proj-filters { display: flex; gap: 0.5rem; align-self: flex-end; }
        .proj-filter {
          font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.06em;
          padding: 0.4rem 0.9rem; border-radius: 2px; border: 1px solid var(--border);
          background: transparent; color: var(--fg2); cursor: pointer; transition: all 0.2s;
        }
        .proj-filter:hover { color: var(--accent); border-color: var(--accent); }
        .proj-filter.active { background: var(--accent); color: #fff; border-color: var(--accent); }

        .proj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }

        .proj-card {
          background: #fff; border: 1px solid var(--border); border-radius: 6px;
          overflow: hidden; display: flex; flex-direction: column;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .proj-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.1); transform: translateY(-3px); }
        .proj-card-meta { border-style: dashed; }

        .proj-bar { height: 3px; width: 100%; flex-shrink: 0; }

        .proj-inner {
          padding: 1.4rem 1.5rem 1.5rem;
          display: flex; flex-direction: column; gap: 0.85rem; flex: 1;
        }
        .proj-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 0.75rem; }
        .proj-meta { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.4rem; }
        .proj-year { font-family: var(--mono); font-size: 0.68rem; color: var(--fg2); }
        .proj-cat { font-family: var(--mono); font-size: 0.65rem; color: var(--fg2); background: var(--bg2); border: 1px solid var(--border); padding: 0.1rem 0.45rem; border-radius: 2px; }
        .proj-title { font-family: var(--serif); font-size: 1.25rem; font-weight: 700; color: var(--fg); line-height: 1.1; }
        .proj-sub { font-family: var(--mono); font-size: 0.72rem; color: var(--fg2); margin-top: 0.2rem; }
        .proj-link {
          display: flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; border: 1px solid; border-radius: 4px;
          flex-shrink: 0; transition: all 0.2s; background: transparent; text-decoration: none;
        }
        .proj-link:hover { background: var(--bg2); }
        .proj-desc { font-size: 0.88rem; line-height: 1.65; color: var(--fg2); }
        .proj-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; flex: 1; }
        .proj-bullets li { font-size: 0.82rem; line-height: 1.6; color: var(--fg2); padding-left: 1rem; position: relative; }
        .proj-bullets li::before { content: '·'; position: absolute; left: 0; color: var(--accent); font-weight: bold; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: auto; padding-top: 0.25rem; }
        .proj-tag { font-family: var(--mono); font-size: 0.65rem; padding: 0.18rem 0.5rem; border-radius: 2px; border: 1px solid; background: transparent; }

        .proj-footer { margin-top: 2.5rem; text-align: center; font-family: var(--mono); font-size: 0.72rem; color: var(--fg2); }
        .proj-footer a { color: var(--accent); text-decoration: none; }
        .proj-footer a:hover { text-decoration: underline; }

        @media (max-width: 640px) {
          .proj-wrap { padding: 0 1.5rem; }
          .proj-head-row { flex-direction: column; align-items: flex-start; }
          .proj-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="proj-section" id="projects">
        <div className="proj-wrap">
          <div
            ref={headRef}
            className="proj-head-row"
            style={{ opacity: headVis ? 1 : 0, transform: headVis ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <div>
              <p className="proj-eyebrow">// selected work</p>
              <h2 className="proj-main-title">things I've<br /><em>built.</em></h2>
            </div>
            <div className="proj-filters">
              {FILTERS.map((f) => (
                <button key={f.key} className={`proj-filter ${filter === f.key ? "active" : ""}`} onClick={() => setFilter(f.key)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="proj-grid">
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>

          <p className="proj-footer">
            more on <a href="https://github.com/eliu76" target="_blank" rel="noopener">github.com/eliu76</a>
          </p>
        </div>
      </section>
    </>
  );
}
