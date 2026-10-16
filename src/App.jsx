import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { usePageMotion } from "./hooks/useMotion";

export default function App() {
  usePageMotion();
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      offset: 40,
      once: true,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    // The page renders after the browser's own jump to #hash, so do that jump now.
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="ambient" aria-hidden="true">
        <span />
        <span />
        <span />
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
