"use client";

import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .scroll-progress {
          position: fixed;
          top: 0; left: 0;
          height: 2px;
          background: var(--accent);
          z-index: 200;
          transition: width 0.1s linear;
          transform-origin: left;
        }
      `}</style>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
    </>
  );
}
