import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { usePageMotion, useScrollReveal } from "./hooks/useMotion";
import { useGridLens } from "./hooks/useGridLens";

export default function App() {
  usePageMotion();
  useScrollReveal();
  useGridLens();
  useEffect(() => {
    // Land #hash links on their section: once now, and again after the web fonts
    // swap in, since that reflows the text above the target.
    const id = decodeURIComponent(window.location.hash.slice(1));
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    if (id) {
      jump();
      document.fonts?.ready.then(() => {
        if (window.location.hash.slice(1) === id && window.scrollY > 0) jump();
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="ambient" aria-hidden="true">
        <div className="aurora">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="grid-field">
          <div className="grid-dots" />
        </div>
        <div className="grid-field grid-reveal-wrap">
          <div className="grid-reveal" />
        </div>
        <canvas className="grid-canvas" />
      </div>
      <a
        href="#main"
        className="btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
