import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { navigation, profile } from "../data/portfolio";
import useActiveSection from "../hooks/useActiveSection";
import ResumePDF from "../assets/MuhammadSabit_Resume.pdf";

const THEME_COLORS = { dark: "#070b16", light: "#eef1f8" };

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="btn-icon"
    >
      {isDark ? (
        <SunIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}

export default function Header() {
  // index.html sets data-theme before first paint; read it back as the start value.
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark",
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(navigation.map((n) => n.id));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((m) => m.setAttribute("content", THEME_COLORS[theme]));
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Storage unavailable (private mode); theme still applies for this visit.
    }
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 h-0.5" />
      <nav
        aria-label="Global"
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full py-2 pl-4 pr-2 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled ? "glass-strong" : "border border-transparent"
        }`}
        style={{ borderRadius: "9999px" }}
      >
        <a href="#top" className="flex min-h-[44px] items-center gap-3 rounded-full pr-2">
          <span
            aria-hidden="true"
            className="glass-strong flex h-9 w-9 items-center justify-center font-display text-sm font-extrabold text-ink"
            style={{ borderRadius: "0.75rem" }}
          >
            MS
          </span>
          <span className="font-display text-base font-bold tracking-tight">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link"
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <a href={ResumePDF} download="MuhammadSabit_Resume.pdf" className="btn-primary hidden sm:inline-flex">
            Download CV
          </a>
          <button
            type="button"
            className="btn-icon lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        <Dialog.Panel
          className="glass-strong fixed inset-y-3 right-3 z-50 flex w-[min(20rem,calc(100%-1.5rem))] flex-col p-5"
          style={{ background: "var(--bg-elevated)" }}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-lg font-bold">Menu</Dialog.Title>
            <button type="button" className="btn-icon" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-1">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="nav-link flex min-h-[48px] items-center text-base"
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3 pt-6">
            <a href={ResumePDF} download="MuhammadSabit_Resume.pdf" className="btn-primary">
              Download CV
            </a>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Theme</span>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
