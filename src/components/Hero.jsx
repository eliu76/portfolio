"use client";

import { useState, useEffect, useRef } from "react";

const COMMANDS = {
  help: `available commands:
  about      → who is evan
  skills     → what evan builds with
  education  → where evan studied
  quote      → evan's favorite quote
  movies     → evan's favorite movies
  contact    → how to reach evan
  clear      → clear terminal`,
  about: `evan liu — software engineer.
cs @ university of maryland, class of '25.
builds for the web, digs into ML, and finds the elegant solution.
creative · hardworking · adaptive.`,
  skills: `languages   → python, javascript, typescript, java, c
web         → react, next.js, node.js, fastapi
ml / data   → pytorch, tensorflow, scikit-learn, cuda
devops      → aws, docker, kubernetes, gitlab ci/cd`,
  education: `university of maryland, college park
b.s. computer science — 2025
gpa: 3.7 · gemstone honors program 🏅`,
  quote: `"every second counts."
— the bear`,
  movies: `interstellar - christopher nolan
  parasite - bong joon ho
  the dark knight - christopher nolan
dune part two - denis villanueve`,
  contact: `github    → github.com/eliu76
linkedin  → linkedin.com/in/evan-liu-767429250
email     → evanliu76@gmail.com`,
  clear: "__CLEAR__",
};

const TAGLINES = [
  "software engineer.",
  "web builder.",
  "ml tinkerer.",
  "creative problem solver.",
  "always learning.",
];

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [termInput, setTermInput] = useState("");
  const [termHistory, setTermHistory] = useState([
    { type: "system", text: 'welcome to evan\'s terminal. type "help" to start.' },
  ]);
  const [mounted, setMounted] = useState(false);
  const termBottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  useEffect(() => {
    const current = TAGLINES[taglineIndex];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else {
      setIsDeleting(false);
      setTaglineIndex((i) => (i + 1) % TAGLINES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, taglineIndex]);

  useEffect(() => {
    termBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [termHistory]);

  const handleCommand = (e) => {
    if (e.key !== "Enter") return;
    const raw = termInput.trim().toLowerCase();
    setTermInput("");
    if (!raw) return;
    const newHistory = [...termHistory, { type: "input", text: `$ ${raw}` }];
    if (raw in COMMANDS) {
      const result = COMMANDS[raw];
      if (result === "__CLEAR__") {
        setTermHistory([{ type: "system", text: 'terminal cleared. type "help" for commands.' }]);
        return;
      }
      newHistory.push({ type: "output", text: result });
    } else {
      newHistory.push({ type: "error", text: `command not found: "${raw}". try "help".` });
    }
    setTermHistory(newHistory);
  };

  return (
    <>
      <style>{`
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding-top: 64px;
        }
        .hero-left {
          display: flex; flex-direction: column; justify-content: center;
          padding: 4rem 3rem;
          border-right: 1px solid var(--border);
        }
        .hero-eyebrow {
          font-family: var(--mono); font-size: 0.72rem; color: var(--accent);
          letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 1.5rem;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.5s 0.2s ease, transform 0.5s 0.2s ease;
        }
        .hero-eyebrow.vis { opacity: 1; transform: translateY(0); }
        .hero-name {
          font-family: var(--serif);
          font-size: clamp(3.5rem, 7vw, 6rem);
          line-height: 0.95; letter-spacing: -0.02em; color: var(--fg);
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.6s 0.35s ease, transform 0.6s 0.35s ease;
        }
        .hero-name.vis { opacity: 1; transform: translateY(0); }
        .hero-name em { color: var(--accent); font-style: italic; }
        .hero-tagline {
          font-family: var(--mono); font-size: 1rem; color: var(--fg2);
          margin: 1.5rem 0 2.5rem; min-height: 1.5rem;
          opacity: 0; transition: opacity 0.5s 0.55s ease;
        }
        .hero-tagline.vis { opacity: 1; }
        .cursor {
          display: inline-block; width: 2px; height: 1em;
          background: var(--accent); margin-left: 2px; vertical-align: text-bottom;
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hero-bio {
          font-size: 1rem; line-height: 1.7; color: var(--fg2);
          max-width: 420px; margin-bottom: 3rem;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.5s 0.7s ease, transform 0.5s 0.7s ease;
        }
        .hero-bio.vis { opacity: 1; transform: translateY(0); }
        .hero-quote {
          border-left: 2px solid var(--accent); padding-left: 1rem;
          font-family: var(--serif); font-style: italic; font-size: 0.95rem;
          color: var(--fg2); line-height: 1.5;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.5s 0.9s ease, transform 0.5s 0.9s ease;
        }
        .hero-quote.vis { opacity: 1; transform: translateY(0); }
        .hero-quote cite {
          display: block; font-style: normal; font-family: var(--mono);
          font-size: 0.72rem; margin-top: 0.4rem; letter-spacing: 0.05em; color: var(--accent);
        }
        .hero-right {
          display: flex; flex-direction: column; justify-content: center;
          align-items: center; padding: 4rem 3rem; background: var(--bg2);
        }
        .terminal-label {
          font-family: var(--mono); font-size: 0.7rem; color: var(--fg2);
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 0.75rem; align-self: flex-start;
          opacity: 0; transition: opacity 0.5s 1s ease;
        }
        .terminal-label.vis { opacity: 1; }
        .terminal {
          width: 100%; max-width: 520px; background: #1c1a18;
          border-radius: 8px; overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1);
          opacity: 0; transform: translateY(20px) scale(0.98);
          transition: opacity 0.6s 0.8s ease, transform 0.6s 0.8s ease;
          cursor: text;
        }
        .terminal.vis { opacity: 1; transform: translateY(0) scale(1); }
        .term-header {
          background: #2a2825; padding: 0.65rem 1rem;
          display: flex; align-items: center; gap: 0.5rem;
          border-bottom: 1px solid #333;
        }
        .term-dot { width: 10px; height: 10px; border-radius: 50%; }
        .term-dot.r { background: #ff5f57; }
        .term-dot.y { background: #febc2e; }
        .term-dot.g { background: #28c840; }
        .term-title { font-family: var(--mono); font-size: 0.7rem; color: #666; margin-left: auto; }
        .term-body {
          padding: 1.25rem; min-height: 280px; max-height: 320px;
          overflow-y: auto; font-family: var(--mono); font-size: 0.78rem;
          line-height: 1.8; scrollbar-width: thin; scrollbar-color: #333 transparent;
        }
        .t-system { color: #8a8480; }
        .t-input  { color: #e8d5c4; }
        .t-output { color: #a8c5a0; white-space: pre-line; }
        .t-error  { color: #e88080; }
        .term-input-row {
          display: flex; align-items: center;
          padding: 0.5rem 1.25rem 1rem; border-top: 1px solid #2a2825; gap: 0.5rem;
        }
        .term-prompt { color: var(--accent); font-family: var(--mono); font-size: 0.78rem; }
        .term-input {
          flex: 1; background: transparent; border: none; outline: none;
          color: #e8d5c4; font-family: var(--mono); font-size: 0.78rem;
          caret-color: var(--accent);
        }
        .scroll-hint {
          position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
          font-family: var(--mono); font-size: 0.65rem; color: var(--fg2);
          letter-spacing: 0.08em; opacity: 0;
          animation: fadeUp 0.5s 1.8s forwards;
        }
        .scroll-line {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, transparent, var(--accent));
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes fadeUp { to { opacity: 1; } }

        @media (max-width: 768px) {
          .hero { grid-template-columns: 1fr; }
          .hero-left { border-right: none; border-bottom: 1px solid var(--border); padding: 3rem 1.5rem; }
          .hero-right { padding: 2rem 1.5rem; }
        }
      `}</style>

      <section className="hero" id="home" style={{ position: "relative" }}>
        <div className="hero-left">
          <p className={`hero-eyebrow ${mounted ? "vis" : ""}`}>cs · umd '25 · software engineer</p>
          <h1 className={`hero-name ${mounted ? "vis" : ""}`}>evan<br /><em>liu.</em></h1>
          <p className={`hero-tagline ${mounted ? "vis" : ""}`}>
            {displayed}<span className="cursor" />
          </p>
          <p className={`hero-bio ${mounted ? "vis" : ""}`}>
            I'm a software engineer who builds for the web, digs into machine learning, and cares deeply about craft. I love finding the clean solution in a messy problem.
          </p>
          <blockquote className={`hero-quote ${mounted ? "vis" : ""}`}>
            "every second counts."
            <cite>— The Bear</cite>
          </blockquote>
        </div>

        <div className="hero-right">
          <p className={`terminal-label ${mounted ? "vis" : ""}`}>// interactive terminal</p>
          <div className={`terminal ${mounted ? "vis" : ""}`} onClick={() => inputRef.current?.focus()}>
            <div className="term-header">
              <div className="term-dot r" />
              <div className="term-dot y" />
              <div className="term-dot g" />
              <span className="term-title">evan@portfolio ~</span>
            </div>
            <div className="term-body">
              {termHistory.map((line, i) => (
                <div key={i} className={`t-${line.type}`}>{line.text}</div>
              ))}
              <div ref={termBottomRef} />
            </div>
            <div className="term-input-row">
              <span className="term-prompt">$</span>
              <input
                ref={inputRef}
                className="term-input"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                onKeyDown={handleCommand}
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          scroll
          <div className="scroll-line" />
        </div>
      </section>
    </>
  );
}
