"use client";

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
      "Built an AlphaZero-style self-play infrastructure combining Monte Carlo Tree Search with Residual Neural Networks.",
      "Reduced overall training time by more than 10× through tree reuse, CUDA-based multiprocessing, state hashing, and caching.",
      "Delivered a production-ready Flask + RESTful API service, containerized via Docker on GPU-enabled Kubernetes clusters through GitLab CI/CD.",
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
      "Improved analysis throughput by 25% by integrating Prophesee event-based camera output with ML classification.",
      "Built RESTful APIs and React dashboards for real-time visualization, improving researcher workflow and data accessibility.",
    ],
  },
  {
    company: "Gemstone Honors College",
    role: "Research Lead",
    team: "AI-Driven Nanoparticle Drug Delivery",
    period: "Apr 2023 – Present",
    location: "College Park, MD",
    type: "research",
    tags: ["AI", "ML", "Python", "Research"],
    bullets: [
      "Lead research on an AI-driven nanoparticle drug-conjugate system with microfluidic technologies.",
      "Investigated natural vesicle formation as an alternative to antibody-drug conjugates, improving targeting efficiency.",
      "Applied AI-based molecular dynamics simulations to investigate protein flexibility, informing drug design.",
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
  courses: ["Algorithms", "Artificial Intelligence", "Data Science", "Web App Development", "Network Security", "Android Development", "Parallel Processing", "Advanced Data Structures", "Systems"],
};

const SKILLS = [
  { label: "languages",     items: "Python · Java · C/C++ · JavaScript · SQL · Kotlin · Go · R" },
  { label: "frameworks",    items: "React · Node.js · Flask · FastAPI · Spring Boot · PyTorch · TensorFlow" },
  { label: "devops & cloud", items: "AWS · Docker · Kubernetes · GitLab CI/CD · PostgreSQL" },
  { label: "practices",     items: "Agile/Scrum · Unit & Integration Testing · Code Review · RESTful APIs" },
];

const TYPE_COLORS = {
  "full-time": { bg: "#e8f5e8", color: "#2d7a2d" },
  internship:  { bg: "#e8f0f8", color: "#2d5a8a" },
  research:    { bg: "#f5ede8", color: "#8a4a2d" },
};

function useInView(ref, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function Card({ job, index }) {
  const [open, setOpen] = useState(index === 0);
  const ref = useRef(null);
  const visible = useInView(ref);
  const tc = TYPE_COLORS[job.type];

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
            <span className="exp-badge" style={{ background: tc.bg, color: tc.color }}>{job.type}</span>
            <span className="exp-period">{job.period}</span>
            <span className="exp-location">{job.location}</span>
          </div>
          <h3 className="exp-role">{job.role}</h3>
          <p className="exp-company">{job.company}</p>
          <p className="exp-team">{job.team}</p>
        </div>
        <span className="exp-toggle-icon" style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
      </div>

      <div className="exp-body" style={{ maxHeight: open ? "600px" : "0" }}>
        <ul className="exp-bullets">
          {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <div className="exp-tags">
          {job.tags.map((t) => <span key={t} className="exp-tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const headRef = useRef(null);
  const headVis = useInView(headRef, 0.3);
  const eduRef = useRef(null);
  const eduVis = useInView(eduRef, 0.2);
  const skillsRef = useRef(null);
  const skillsVis = useInView(skillsRef, 0.2);

  return (
    <>
      <style>{`
        .exp-section { padding: 6rem 0; background: var(--bg); border-top: 1px solid var(--border); }
        .exp-wrap { max-width: 900px; margin: 0 auto; padding: 0 3rem; }

        .exp-head-row {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 3.5rem; gap: 2rem; flex-wrap: wrap;
        }
        .exp-eyebrow { font-family: var(--mono); font-size: 0.72rem; color: var(--accent); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.6rem; }
        .exp-title { font-family: var(--serif); font-size: clamp(2.2rem, 5vw, 3.5rem); line-height: 1; letter-spacing: -0.02em; }
        .exp-title em { color: var(--accent); font-style: italic; }

        .resume-btn {
          display: flex; align-items: center; gap: 0.5rem;
          font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.06em;
          color: var(--fg2); text-decoration: none; border: 1px solid var(--border);
          padding: 0.55rem 1rem; border-radius: 2px; white-space: nowrap;
          transition: all 0.2s; background: transparent; cursor: pointer;
        }
        .resume-btn:hover { color: var(--accent); border-color: var(--accent); background: rgba(200,80,26,0.04); }
        .resume-btn svg { transition: transform 0.2s; }
        .resume-btn:hover svg { transform: translateY(2px); }

        .exp-timeline { position: relative; padding-left: 1.5rem; }
        .exp-timeline::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 1px; background: linear-gradient(to bottom, var(--accent), var(--border));
        }

        .exp-card {
          margin-bottom: 1.25rem; background: #fff;
          border: 1px solid var(--border); border-radius: 6px;
          overflow: hidden; transition: box-shadow 0.2s; position: relative;
        }
        .exp-card::before {
          content: ''; position: absolute; left: -1.5rem; top: 1.75rem;
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent); border: 2px solid var(--bg); z-index: 1;
        }
        .exp-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.08); }

        .exp-card-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 1.4rem 1.5rem; cursor: pointer; gap: 1rem;
        }
        .exp-card-left { flex: 1; }
        .exp-meta-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.6rem; flex-wrap: wrap; }
        .exp-badge { font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.06em; padding: 0.2rem 0.55rem; border-radius: 2px; }
        .exp-period, .exp-location { font-family: var(--mono); font-size: 0.72rem; color: var(--fg2); }
        .exp-location::before { content: '·'; margin-right: 0.75rem; color: var(--border); }
        .exp-role { font-family: var(--serif); font-size: 1.2rem; font-weight: 700; color: var(--fg); margin-bottom: 0.2rem; }
        .exp-company { font-size: 0.92rem; font-weight: 500; color: var(--accent); margin-bottom: 0.1rem; }
        .exp-team { font-family: var(--mono); font-size: 0.72rem; color: var(--fg2); }
        .exp-toggle-icon { font-size: 1.2rem; color: var(--accent); display: inline-block; transition: transform 0.25s ease; flex-shrink: 0; margin-top: 0.2rem; }

        .exp-body { overflow: hidden; transition: max-height 0.4s ease; border-top: 1px solid transparent; }
        .exp-body[style*="600px"] { border-top-color: var(--border); padding: 0 1.5rem 1.4rem; }
        .exp-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; padding-top: 1rem; }
        .exp-bullets li { font-size: 0.9rem; line-height: 1.65; color: var(--fg2); padding-left: 1.1rem; position: relative; }
        .exp-bullets li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-family: var(--mono); font-size: 0.75rem; top: 0.1rem; }
        .exp-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1rem; }
        .exp-tag { font-family: var(--mono); font-size: 0.68rem; color: var(--fg2); background: var(--bg2); border: 1px solid var(--border); padding: 0.2rem 0.55rem; border-radius: 2px; }

        .exp-divider { display: flex; align-items: center; gap: 1rem; margin: 4rem 0 3rem; }
        .exp-divider-line { flex: 1; height: 1px; background: var(--border); }
        .exp-divider-label { font-family: var(--mono); font-size: 0.7rem; color: var(--fg2); letter-spacing: 0.1em; text-transform: uppercase; }

        .edu-card {
          background: #fff; border: 1px solid var(--border); border-radius: 6px;
          padding: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
          transition: box-shadow 0.2s;
        }
        .edu-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .edu-school { font-family: var(--serif); font-size: 1.3rem; font-weight: 700; color: var(--fg); margin-bottom: 0.3rem; }
        .edu-degree { font-size: 0.92rem; color: var(--accent); font-weight: 500; margin-bottom: 0.5rem; }
        .edu-meta { font-family: var(--mono); font-size: 0.72rem; color: var(--fg2); margin-bottom: 0.3rem; }
        .edu-honors { display: inline-block; font-family: var(--mono); font-size: 0.68rem; color: #8a6a2d; background: #f5ede8; border: 1px solid #e8d5c4; padding: 0.2rem 0.6rem; border-radius: 2px; margin-top: 0.5rem; }
        .edu-courses-label { font-family: var(--mono); font-size: 0.68rem; color: var(--fg2); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
        .edu-courses { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .edu-course { font-family: var(--mono); font-size: 0.68rem; color: var(--fg2); background: var(--bg2); border: 1px solid var(--border); padding: 0.2rem 0.55rem; border-radius: 2px; }

        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }
        .skills-group { background: #fff; border: 1px solid var(--border); border-radius: 6px; padding: 1.1rem 1.25rem; }
        .skills-group-label { font-family: var(--mono); font-size: 0.65rem; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.6rem; }
        .skills-group-items { font-size: 0.82rem; color: var(--fg2); line-height: 1.7; }

        @media (max-width: 640px) {
          .exp-wrap { padding: 0 1.5rem; }
          .exp-head-row { flex-direction: column; align-items: flex-start; }
          .edu-card { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="exp-section" id="experience">
        <div className="exp-wrap">
          <div ref={headRef} className="exp-head-row" style={{ opacity: headVis ? 1 : 0, transform: headVis ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <div>
              <p className="exp-eyebrow">// work history</p>
              <h2 className="exp-title">where I've<br /><em>worked.</em></h2>
            </div>
            <a className="resume-btn" href="/resume.pdf" download>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v7M3 5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              download résumé
            </a>
          </div>

          <div className="exp-timeline">
            {EXPERIENCE.map((job, i) => <Card key={job.company} job={job} index={i} />)}
          </div>

          <div className="exp-divider"><div className="exp-divider-line" /><span className="exp-divider-label">education</span><div className="exp-divider-line" /></div>

          <div ref={eduRef} style={{ opacity: eduVis ? 1 : 0, transform: eduVis ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <div className="edu-card">
              <div>
                <p className="edu-school">{EDUCATION.school}</p>
                <p className="edu-degree">{EDUCATION.degree}</p>
                <p className="edu-meta">{EDUCATION.period}</p>
                <p className="edu-meta">GPA: {EDUCATION.gpa}</p>
                <span className="edu-honors">🏅 {EDUCATION.honors}</span>
              </div>
              <div>
                <p className="edu-courses-label">// relevant coursework</p>
                <div className="edu-courses">
                  {EDUCATION.courses.map((c) => <span key={c} className="edu-course">{c}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="exp-divider" style={{ marginTop: "3.5rem" }}><div className="exp-divider-line" /><span className="exp-divider-label">skills</span><div className="exp-divider-line" /></div>

          <div ref={skillsRef} className="skills-grid" style={{ opacity: skillsVis ? 1 : 0, transform: skillsVis ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            {SKILLS.map((g) => (
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
