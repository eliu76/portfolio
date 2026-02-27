"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
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
