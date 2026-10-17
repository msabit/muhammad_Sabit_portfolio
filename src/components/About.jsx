import {
  Squares2X2Icon,
  BoltIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import avatar from "../assets/profile.webp";
import { about, profile } from "../data/portfolio";

// The real photo now leads the hero, so About opens with quick facts instead of
// a second large portrait.
const facts = [
  { label: "Based in", value: profile.location },
  { label: "Building with React Native", value: "Since 2021" },
  // The hero already says these, so phones skip them.
  { label: "Platforms", value: "iOS & Android", phone: false },
  { label: "Shipped", value: "15+ apps to the App Store & Play Store", phone: false },
];
import SectionHeading from "./ui/SectionHeading";
import ProtectedImage from "./ui/ProtectedImage";

const icons = [Squares2X2Icon, BoltIcon, ShieldCheckIcon, UserGroupIcon];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="relative mx-auto w-full max-w-md lg:sticky lg:top-28 lg:self-start" data-aos="fade-right">
          <div className="glass flex flex-col gap-6 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <ProtectedImage
                wrapperClassName="relative block shrink-0"
                src={avatar}
                alt=""
                width={576}
                height={659}
                loading="lazy"
                decoding="async"
                className="h-16 w-16 rounded-2xl bg-white object-cover object-top"
              />
              <div className="flex flex-col">
                <p className="font-display text-xl font-bold">{profile.name}</p>
                <p className="text-sm text-muted">{profile.title}</p>
              </div>
            </div>
            <dl className="flex flex-col gap-4">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className={`flex flex-col gap-0.5 border-t border-line pt-4 ${f.phone === false ? "max-sm:hidden" : ""}`}
                >
                  <dt className="text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-muted">
                    {f.label}
                  </dt>
                  <dd className="font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <a href={`mailto:${profile.email}`} className="btn-primary w-full">
              Email me
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <SectionHeading id="about-heading" eyebrow="About me" title="Business requirements in, reliable apps out." />

          <div className="flex flex-col gap-5 text-lg leading-relaxed text-ink-soft" data-aos="fade-up">
            {about.paragraphs.map((p, i) => (
              <p key={p.slice(0, 24)} className={`text-pretty ${i > 0 ? "max-sm:hidden" : ""}`}>
                {p}
              </p>
            ))}
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:gap-4" aria-label="Technical strengths">
            {about.strengths.map((s, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li key={s.title} className="glass glass-interactive flex flex-col gap-3 p-4 sm:p-6" data-aos="fade-up" data-aos-delay={i * 60}>
                  <span
                    className="flex h-10 w-10 items-center justify-center border border-line-strong text-accent"
                    style={{ borderRadius: "var(--radius-sm)", background: "var(--glass-2)" }}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-bold leading-snug sm:text-lg">{s.title}</h3>
                  <p className="text-base leading-relaxed text-muted max-sm:hidden">{s.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
