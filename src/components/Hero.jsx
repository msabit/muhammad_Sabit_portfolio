import { ArrowRightIcon, ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import pfp from "../assets/profile.webp";
import ResumePDF from "../assets/MuhammadSabit_Resume.pdf";
import { profile, socialLinks } from "../data/portfolio";
import SocialIcon from "./ui/SocialIcon";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10">
        <div className="flex flex-col gap-7" data-aos="fade-up">
          <p className="glass inline-flex w-fit items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm text-ink-soft" style={{ borderRadius: "9999px" }}>
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping" style={{ background: "var(--live-dot)" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--live-dot)" }} />
            </span>
            {profile.title}
          </p>

          <h1 id="hero-heading" className="heading-xl text-balance">
            <span className="block text-lg font-medium tracking-normal text-muted sm:text-xl">Hello, I&apos;m</span>
            {profile.name}
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl">
            I design and ship high-performance <span className="text-ink">iOS and Android apps</span> with
            React Native and TypeScript: 5+ years of experience and 15+ apps shipped to the App Store and Play Store.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary px-6 text-base">
              View my work
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={ResumePDF} download="MuhammadSabit_Resume.pdf" className="btn-glass px-6 text-base">
              <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          </div>

          <ul className="flex flex-wrap items-center gap-2" aria-label="Contact and social links">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  title={link.name}
                  className="btn-icon"
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <SocialIcon path={link.path} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md" data-aos="fade-up" data-aos-delay="100">
          <div className="glass-strong relative p-3">
            <div className="overflow-hidden" style={{ borderRadius: "calc(var(--radius-lg) - 0.5rem)" }}>
              <img
                src={pfp}
                alt={`Portrait of ${profile.name}`}
                width={576}
                height={659}
                fetchpriority="high"
                className="aspect-[576/659] h-auto w-full object-cover"
              />
            </div>
          </div>
          <div className="glass-label absolute bottom-8 left-3 px-4 py-3 sm:-left-10 sm:bottom-10">
            <p className="text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-muted">Platforms</p>
            <p className="font-display text-base font-bold">iOS &amp; Android</p>
          </div>
          <div className="glass-label absolute right-3 top-6 px-4 py-3 sm:-right-8 sm:top-8">
            <p className="text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-muted">Core stack</p>
            <p className="font-display text-base font-bold">React Native · TS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
