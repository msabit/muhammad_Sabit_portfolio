import { useEffect, useMemo, useState } from "react";
import { ArrowTopRightOnSquareIcon, LockClosedIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { monogram, projects, projectGroups } from "../data/portfolio";
import { readParam, withParam } from "../lib/filter";
import { useInView } from "../hooks/useMotion";
import SectionHeading from "./ui/SectionHeading";

const INITIAL_COUNT = 6;

// Publicly available apps first, then client builds; original order kept within each.
const ordered = [...projects.filter((p) => p.href), ...projects.filter((p) => !p.href)];
const liveCount = ordered.filter((p) => p.href).length;

const filters = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  ...projectGroups,
].map((f) => ({
  ...f,
  count: ordered.filter((p) => f.id === "all" || (f.id === "live" ? p.href : p.group === f.id)).length,
}));

// One hue per group (RGB triplets) so the drawn tiles read as a set.
const GROUP_HUE = {
  commerce: "245 158 11",
  health: "16 185 129",
  telecom: "244 63 94",
  business: "56 189 248",
};

const filterIds = new Set(filters.map((f) => f.id));
const initialFilter = () => {
  const f = readParam(window.location.search, "filter");
  return filterIds.has(f) ? f : "all";
};

// Drawn stand-in for app art: the app's monogram as a home-screen icon on a tinted
// glass field. Honest about being a placeholder, unlike stock photography.
function AppTile({ project }) {
  const hue = GROUP_HUE[project.group] ?? "var(--ambient-1)";
  if (project.imageSrc) {
    return (
      <img
        src={project.imageSrc}
        alt={project.contain ? `${project.name} logo` : ""}
        width={800}
        height={500}
        loading="lazy"
        decoding="async"
        className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04] ${project.contain ? "bg-white object-contain p-8" : "object-cover"}`}
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center"
      style={{
        background: `radial-gradient(90% 120% at 50% 110%, rgb(${hue} / 0.45), transparent 70%), var(--glass-1)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--glass-border-strong) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04]">
        <span
          className="flex h-20 w-20 items-center justify-center font-display text-3xl font-extrabold text-white"
          style={{
            borderRadius: "1.375rem",
            background: `linear-gradient(145deg, rgb(${hue} / 0.95), rgb(${hue} / 0.55))`,
            boxShadow: `0 1px 0 0 rgb(255 255 255 / 0.35) inset, 0 18px 36px -14px rgb(${hue} / 0.8)`,
          }}
        >
          {monogram(project.name)}
        </span>
        <span className="text-sm font-medium text-ink-soft">{project.name.replace(/\s*\(.*\)/, "")}</span>
      </div>
    </div>
  );
}

function linkLabel(href) {
  return href.includes("play.google.com") ? "Google Play" : "Website";
}

function ProjectCard({ project, index }) {
  const live = Boolean(project.href);
  return (
    <li className="glass glass-interactive group relative flex flex-col overflow-hidden" style={{ "--i": index }}>
      <div className="relative m-2 mb-0 aspect-[16/10] overflow-hidden" style={{ borderRadius: "calc(var(--radius-lg) - 0.5rem)" }}>
        <AppTile project={project} />
        <span
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.8125rem] font-medium uppercase tracking-[0.08em] backdrop-blur-md"
          style={
            live
              ? { background: "rgb(6 30 22 / 0.6)", borderColor: "rgb(52 211 153 / 0.35)", color: "#a7f3d0" }
              : { background: "rgb(8 10 20 / 0.6)", borderColor: "rgb(255 255 255 / 0.18)", color: "#d6dae4" }
          }
        >
          {live ? (
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          ) : (
            <LockClosedIcon className="h-3 w-3" aria-hidden="true" />
          )}
          {live ? "Live" : "Client build"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-muted">{project.category}</p>
        <h3 className="font-display text-xl font-bold leading-snug">
          {live ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.name}
              <span className="sr-only"> on {linkLabel(project.href)} (opens in new tab)</span>
            </a>
          ) : (
            project.name
          )}
        </h3>
        <p className="text-base leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-1 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.map((t) => (
            <li key={t} className="chip-mono">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-sm">
          {live ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
              {linkLabel(project.href)}
              <ArrowTopRightOnSquareIcon
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          ) : (
            <span className="text-muted">Not publicly listed</span>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Projects() {
  // Starts at "all" on the server and first client render; the URL's filter is
  // applied right after hydration.
  const [filter, setFilter] = useState("all");

  // Keep the filter in the URL so a filtered list can be shared; follow back/forward.
  useEffect(() => {
    setFilter(initialFilter());
    const onPop = () => setFilter(initialFilter());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const choose = (id) => {
    setFilter(id);
    setShowAll(false);
    window.history.replaceState(
      null,
      "",
      withParam(window.location.href, "filter", id === "all" ? null : id),
    );
  };
  const [showAll, setShowAll] = useState(false);
  const [listRef, listInView] = useInView();

  const matched = useMemo(
    () =>
      ordered.filter((p) => filter === "all" || (filter === "live" ? p.href : p.group === filter)),
    [filter],
  );
  const displayed = showAll ? matched : matched.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section">
      <div className="container-page flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="projects-heading" eyebrow="Featured projects" title="Apps I've built and shipped.">
            {projects.length} projects across commerce, healthcare, telecom and business tools. {liveCount} are
            publicly available today.
          </SectionHeading>
        </div>

        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2" data-aos="fade-up">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="pill"
              aria-pressed={filter === f.id}
              onClick={() => choose(f.id)}
            >
              {f.label}
              <span className="text-xs tabular-nums opacity-70">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Keyed by filter so the cards cascade in again on every filter change. */}
        <ul
          key={filter}
          ref={listRef}
          id="project-list"
          className={`cascade grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${listInView ? "is-in" : ""}`}
          aria-live="polite"
        >
          {displayed.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i % INITIAL_COUNT} />
          ))}
        </ul>

        {matched.length > INITIAL_COUNT ? (
          <div className="flex justify-center">
            <button
              type="button"
              className="btn-glass px-6"
              aria-expanded={showAll}
              aria-controls="project-list"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? "Show fewer projects" : `Show all ${matched.length} projects`}
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
