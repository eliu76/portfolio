import { useState, useEffect, useRef } from "react";

const EXPERIENCE = [
  {
    company: "Capital One",
    role: "Software Engineer",
    team: "API Gateway · Technology Development Program",
    period: "Feb 2026 – Present",
    location: "Richmond, VA",
    type: "full-time",
    tags: ["Python", "Java", "AWS"],
    bullets: [
      "Part of the Technology Development Program building internal tooling on the API Gateway team.",
      "Leveraging Python, Java, and AWS for internal platform development and service reliability.",
    ],
  },
  {
    company: "Parsons Corporation",
    role: "AI Fullstack Engineer Intern",
    team: "AI Research & Engineering",
    period: "Jun 2025 – Dec 2025",
    location: "APG, MD",
    type: "internship",
    tags: ["PyTorch", "TensorFlow", "CUDA", "Flask", "Docker", "Kubernetes", "GitLab CI/CD"],
    bullets: [
      "Designed a domain-agnostic reinforcement learning framework for training AI agents at scale.",
      "Built an AlphaZero-style self-play infrastructure in PyTorch/TensorFlow combining Monte Carlo Tree Search with Residual Neural Networks for scalable policy learning.",
      "Optimized the AI training pipeline through tree reuse, CUDA-based multiprocessing, state hashing, and caching — reducing training time by more than 10×.",
      "Delivered a production-ready Flask + RESTful API web service, containerized via Docker and deployed on GPU-enabled Kubernetes clusters through GitLab CI/CD in an Agile workflow.",
    ],
  },
  {
    company: "NIST",
    role: "Software Development Intern",
    team: "National Institute of Standards and Technology",
    period: "Jun 2024 – Aug 2024",
    location: "Gaithersburg, MD",
    type: "internship",
    tags: ["Python", "C++", "React", "ML", "RESTful APIs"],
    bullets: [
      "Developed a nanometer-scale bioparticle measurement system in Python/C++.",
      "Integrated Prophesee event-based camera output and ML classification, improving analysis throughput by 25% with automated feature extraction.",
      "Exposed results via RESTful APIs and React dashboards for real-time visualization, improving researcher workflow and data accessibility.",
    ],
  },
  {
    company: "Gemstone Honors College",
    role: "Research Lead",
    team: "AI-Driven Nanoparticle Drug Delivery",
    period: "Apr 2023 – Present",
    location: "College Park, MD",
    type: "research",
    tags: ["AI", "ML", "Research", "Python"],
    bullets: [
      "Lead research on an AI-driven nanoparticle drug-conjugate system with microfluidic technologies.",
      "Investigated natural vesicle formation as an alternative to antibody-drug conjugates, improving targeting efficiency.",
      "Applied AI-based molecular dynamics simulations to investigate protein flexibility, informing drug design and efficacy optimization.",
    ],
  },
  {
    company: "University of Maryland",
    role: "Resident Assistant",
    period: "May 2023 – Dec 2025",
    location: "College Park, MD",
    type: "part-time",
    tags: ["teamwork", "leadership", "organization"],
    bullets: [
      "Student leader in charge of 40-50 undergraduate students.",
      "Managed the floor, established relationships, held events, peformed duty-related tasks.",
    ],
  },
];

const EDUCATION = {
  school: "University of Maryland, College Park",
  degree: "B.S. Computer Science",
  period: "Aug 2022 – Dec 2025",
  gpa: "3.7 / 4.0",
  honors: "Gemstone Honors Program",
  courses: [
    "Algorithms", "Artificial Intelligence", "Data Science",
    "Web App Development", "Network Security", "Android Development",
    "Parallel Processing", "Advanced Data Structures", "Systems",
  ],
};

const TYPE_COLORS = {
  "full-time": { bg: "#e8f5e8", color: "#2d7a2d", label: "full-time" },
  internship: { bg: "#e8f0f8", color: "#2d5a8a", label: "internship" },
  research: { bg: "#f5ede8", color: "#8a4a2d", label: "research" },
};

function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function ExperienceCard({ job, index }) {
  const [open, setOpen] = useState(index === 0);
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const typeStyle = TYPE_COLORS[job.type];

  return (
    <div
      ref={ref}
      className="exp-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ${index * 0.1}s ease, transform 0.5s ${index * 0.1}s ease`,
      }}
    >
      <div className="exp-card-header" onClick={() => setOpen((o) => !o)}>
        <div className="exp-card-left">
          <div className="exp-meta-row">
            <span
              className="exp-type-badge"
              style={{ background: typeStyle.bg, color: typeStyle.color }}
            >
              {typeStyle.label}
            </span>
            <span className="exp-period">{job.period}</span>
            <span className="exp-location">{job.location}</span>
          </div>
          <h3 className="exp-role">{job.role}</h3>
          <p className="exp-company">{job.company}</p>
          <p className="exp-team">{job.team}</p>
        </div>
        <button className="exp-toggle" aria-label="toggle details">
          <span style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.25s ease", fontSize: "1.2rem", color: "var(--accent)" }}>+</span>
        </button>
      </div>

      <div
        className="exp-card-body"
        style={{
          maxHeight: open ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <ul className="exp-bullets">
          {job.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="exp-tags">
          {job.tags.map((t) => (
            <span key={t} className="exp-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const headingRef = useRef(null);
  const headingVisible = useIntersection(headingRef, 0.3);
  const eduRef = useRef(null);
  const eduVisible = useIntersection(eduRef, 0.2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --bg: #f5f2ee;
          --bg2: #eceae5;
          --fg: #1a1814;
          --fg2: #5a5650;
          --accent: #12c1d8ff;
          --accent2: #e8d5c4;
          --border: #d8d4ce;
          --mono: 'DM Mono', monospace;
          --serif: 'Playfair Display', serif;
          --sans: 'DM Sans', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); color: var(--fg); font-family: var(--sans); }

        /* ── SECTION SHELL ── */
        .exp-section {
          padding: 6rem 0;
          background: var(--bg);
          border-top: 1px solid var(--border);
        }

        .exp-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 3rem;
        }

        /* ── HEADING ── */
        .exp-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          gap: 2rem;
        }

        .exp-eyebrow {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--accent);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .exp-title {
          font-family: var(--serif);
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--fg);
        }
        .exp-title em { color: var(--accent); font-style: italic; }

        .exp-resume-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: var(--fg2);
          text-decoration: none;
          border: 1px solid var(--border);
          padding: 0.55rem 1rem;
          border-radius: 2px;
          white-space: nowrap;
          transition: all 0.2s;
          background: transparent;
          cursor: pointer;
        }
        .exp-resume-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: rgba(200, 80, 26, 0.04);
        }
        .exp-resume-btn svg { transition: transform 0.2s; }
        .exp-resume-btn:hover svg { transform: translateY(2px); }

        /* ── TIMELINE TRACK ── */
        .exp-timeline {
          position: relative;
          padding-left: 1.5rem;
        }
        .exp-timeline::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, var(--accent), var(--border));
        }

        /* ── CARD ── */
        .exp-card {
          margin-bottom: 1.25rem;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 6px;
          overflow: hidden;
          transition: box-shadow 0.2s;
          position: relative;
        }
        .exp-card::before {
          content: '';
          position: absolute;
          left: -1.5rem;
          top: 1.75rem;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--accent);
          border: 2px solid var(--bg);
          z-index: 1;
        }
        .exp-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.08); }

        .exp-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 1.4rem 1.5rem;
          cursor: pointer;
          gap: 1rem;
        }

        .exp-card-left { flex: 1; }

        .exp-meta-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.6rem;
          flex-wrap: wrap;
        }

        .exp-type-badge {
          font-family: var(--mono);
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          padding: 0.2rem 0.55rem;
          border-radius: 2px;
          font-weight: 500;
        }

        .exp-period, .exp-location {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--fg2);
          letter-spacing: 0.03em;
        }
        .exp-location::before { content: '·'; margin-right: 0.75rem; color: var(--border); }

        .exp-role {
          font-family: var(--serif);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--fg);
          letter-spacing: -0.01em;
          margin-bottom: 0.2rem;
        }

        .exp-company {
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--accent);
          margin-bottom: 0.1rem;
        }

        .exp-team {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--fg2);
          letter-spacing: 0.03em;
        }

        .exp-toggle {
          background: none; border: none; cursor: pointer;
          padding: 0; width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 0.2rem;
        }

        /* ── CARD BODY ── */
        .exp-card-body {
          padding: 0 1.5rem;
          border-top: 0px solid var(--border);
          transition: padding 0.3s ease, border-top-color 0.3s;
        }
        .exp-card-body[style*="max-height: 500px"] {
          padding: 0 1.5rem 1.4rem;
          border-top: 1px solid var(--border);
        }

        .exp-bullets {
          list-style: none;
          padding: 1rem 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .exp-bullets li {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--fg2);
          padding-left: 1.1rem;
          position: relative;
        }
        .exp-bullets li::before {
          content: '→';
          position: absolute; left: 0;
          color: var(--accent);
          font-family: var(--mono);
          font-size: 0.75rem;
          top: 0.1rem;
        }

        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 1rem;
        }

        .exp-tag {
          font-family: var(--mono);
          font-size: 0.68rem;
          color: var(--fg2);
          background: var(--bg2);
          border: 1px solid var(--border);
          padding: 0.2rem 0.55rem;
          border-radius: 2px;
          letter-spacing: 0.04em;
        }

        /* ── DIVIDER ── */
        .exp-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 4rem 0 3rem;
        }
        .exp-divider-line { flex: 1; height: 1px; background: var(--border); }
        .exp-divider-label {
          font-family: var(--mono);
          font-size: 0.7rem;
          color: var(--fg2);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── EDUCATION CARD ── */
        .edu-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          transition: box-shadow 0.2s;
        }
        .edu-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.08); }

        .edu-left {}

        .edu-school {
          font-family: var(--serif);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--fg);
          letter-spacing: -0.01em;
          margin-bottom: 0.3rem;
        }

        .edu-degree {
          font-size: 0.92rem;
          color: var(--accent);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .edu-meta {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--fg2);
          letter-spacing: 0.03em;
          margin-bottom: 0.3rem;
        }

        .edu-honors {
          display: inline-block;
          font-family: var(--mono);
          font-size: 0.68rem;
          color: #8a6a2d;
          background: #f5ede8;
          border: 1px solid #e8d5c4;
          padding: 0.2rem 0.6rem;
          border-radius: 2px;
          margin-top: 0.5rem;
          letter-spacing: 0.05em;
        }

        .edu-right {}

        .edu-courses-label {
          font-family: var(--mono);
          font-size: 0.68rem;
          color: var(--fg2);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .edu-courses {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .edu-course {
          font-family: var(--mono);
          font-size: 0.68rem;
          color: var(--fg2);
          background: var(--bg2);
          border: 1px solid var(--border);
          padding: 0.2rem 0.55rem;
          border-radius: 2px;
          letter-spacing: 0.03em;
        }

        /* ── SKILLS ROW ── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .skills-group {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 1.1rem 1.25rem;
        }

        .skills-group-label {
          font-family: var(--mono);
          font-size: 0.65rem;
          color: var(--accent);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .skills-group-items {
          font-size: 0.82rem;
          color: var(--fg2);
          line-height: 1.7;
        }

        @media (max-width: 640px) {
          .exp-container { padding: 0 1.5rem; }
          .exp-heading-row { flex-direction: column; align-items: flex-start; }
          .edu-card { grid-template-columns: 1fr; gap: 1.25rem; }
          .skills-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <section className="exp-section" id="experience">
        <div className="exp-container">

          {/* Heading */}
          <div
            ref={headingRef}
            className="exp-heading-row"
            style={{
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div>
              <p className="exp-eyebrow">// work history</p>
              <h2 className="exp-title">where I've<br /><em>worked.</em></h2>
            </div>
            <a className="exp-resume-btn" href="#" download>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v7M3 5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              download résumé
            </a>
          </div>

          {/* Timeline */}
          <div className="exp-timeline">
            {EXPERIENCE.map((job, i) => (
              <ExperienceCard key={job.company} job={job} index={i} />
            ))}
          </div>

          {/* Divider → Education */}
          <div className="exp-divider">
            <div className="exp-divider-line" />
            <span className="exp-divider-label">education</span>
            <div className="exp-divider-line" />
          </div>

          <div
            ref={eduRef}
            style={{
              opacity: eduVisible ? 1 : 0,
              transform: eduVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="edu-card">
              <div className="edu-left">
                <p className="edu-school">{EDUCATION.school}</p>
                <p className="edu-degree">{EDUCATION.degree}</p>
                <p className="edu-meta">{EDUCATION.period}</p>
                <p className="edu-meta">GPA: {EDUCATION.gpa}</p>
                <span className="edu-honors">🏅 {EDUCATION.honors}</span>
              </div>
              <div className="edu-right">
                <p className="edu-courses-label">// relevant coursework</p>
                <div className="edu-courses">
                  {EDUCATION.courses.map((c) => (
                    <span key={c} className="edu-course">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider → Skills */}
          <div className="exp-divider" style={{ marginTop: "3.5rem" }}>
            <div className="exp-divider-line" />
            <span className="exp-divider-label">skills</span>
            <div className="exp-divider-line" />
          </div>

          <div className="skills-grid">
            {[
              { label: "languages", items: "Python · Java · C/C++ · JavaScript · SQL · Kotlin · Go · R" },
              { label: "frameworks", items: "React · Node.js · Flask · FastAPI · Spring Boot · PyTorch · TensorFlow" },
              { label: "devops & cloud", items: "AWS · Docker · Kubernetes · GitLab CI/CD · PostgreSQL" },
              { label: "practices", items: "Agile/Scrum · Unit & Integration Testing · Code Review · RESTful APIs" },
            ].map((g) => (
              <div key={g.label} className="skills-group">
                <p className="skills-group-label">{g.label}</p>
                <p className="skills-group-items">{g.items}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
