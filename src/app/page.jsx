"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
