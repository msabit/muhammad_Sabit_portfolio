import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { experience, education } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="experience-heading" eyebrow="Experience" title="Five teams, one craft.">
            React Native roles since 2021, from developer to senior engineer and consultant.
          </SectionHeading>

          <div className="glass flex flex-col gap-5 p-6" data-aos="fade-up">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold">
              <AcademicCapIcon className="h-5 w-5 text-accent" aria-hidden="true" />
              Education
            </h3>
            <ul className="flex flex-col gap-4">
              {education.map((e) => (
                <li key={e.degree} className="flex flex-col gap-0.5">
                  <span className="font-semibold">{e.degree}</span>
                  <span className="text-sm text-muted">{e.school}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="relative flex flex-col gap-4 pl-8 sm:pl-10">
          <span
            aria-hidden="true"
            className="timeline-draw absolute bottom-6 left-[0.6875rem] top-6 w-px sm:left-[0.9375rem]"
            style={{ background: "linear-gradient(var(--accent), var(--glass-border) 70%, transparent)" }}
          />
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.role}`} className="relative" data-aos="fade-left" data-aos-delay={i * 80}>
              <span
                aria-hidden="true"
                className="absolute -left-8 top-7 flex h-6 w-6 items-center justify-center rounded-full border sm:-left-10 sm:h-8 sm:w-8"
                style={{
                  background: "var(--bg-elevated)",
                  borderColor: job.current ? "var(--accent)" : "var(--glass-border-strong)",
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: job.current ? "var(--accent)" : "var(--muted)" }}
                />
              </span>
              <div className="glass glass-interactive flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-xl font-bold">{job.role}</h3>
                  <p className="font-medium text-accent">{job.company}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                  {job.current ? (
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[0.8125rem] font-medium uppercase tracking-[0.08em]"
                      style={{ background: "var(--live-bg)", color: "var(--live-ink)" }}
                    >
                      Current
                    </span>
                  ) : null}
                  <span className="text-sm tabular-nums text-muted">{job.period}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
