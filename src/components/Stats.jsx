import { stats } from "../data/portfolio";

export default function Stats() {
  return (
    <section aria-label="Achievements and statistics" className="pb-8">
      <div className="container-page">
        <dl className="glass grid grid-cols-2 overflow-hidden lg:grid-cols-4" data-aos="fade-up">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-2 p-6 sm:p-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${
                i > 1 ? "border-t border-line lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="order-2 text-sm leading-snug text-muted">{stat.label}</dt>
              <dd className="order-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
