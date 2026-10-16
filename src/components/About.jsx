import {
  Squares2X2Icon,
  BoltIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import SabitImage from "../assets/Sabit.webp";
import { about, profile } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";

const icons = [Squares2X2Icon, BoltIcon, ShieldCheckIcon, UserGroupIcon];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="relative mx-auto w-full max-w-md lg:sticky lg:top-28 lg:self-start" data-aos="fade-right">
          <div className="glass p-3">
            <img
              src={SabitImage}
              width={768}
              height={1004}
              loading="lazy"
              decoding="async"
              alt={`${profile.name} in a navy suit`}
              className="aspect-[768/1004] h-auto w-full object-cover"
              style={{ borderRadius: "calc(var(--radius-lg) - 0.5rem)" }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <SectionHeading id="about-heading" eyebrow="About me" title="Business requirements in, reliable apps out." />

          <div className="flex flex-col gap-5 text-lg leading-relaxed text-ink-soft" data-aos="fade-up">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-pretty">
                {p}
              </p>
            ))}
          </div>

          <ul className="grid gap-4 sm:grid-cols-2" aria-label="Technical strengths">
            {about.strengths.map((s, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li key={s.title} className="glass glass-interactive flex flex-col gap-3 p-6" data-aos="fade-up" data-aos-delay={i * 60}>
                  <span
                    className="flex h-10 w-10 items-center justify-center border border-line-strong text-accent"
                    style={{ borderRadius: "var(--radius-sm)", background: "var(--glass-2)" }}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold">{s.title}</h3>
                  <p className="text-base leading-relaxed text-muted">{s.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
