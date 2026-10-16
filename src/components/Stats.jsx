import { stats } from "../data/portfolio";
import { useCountUp, useInView } from "../hooks/useMotion";

// "15+" → { number: 15, suffix: "+" }; values without a leading number are shown as-is.
function splitValue(value) {
  const m = String(value).match(/^(\d+)(.*)$/);
  return m ? { number: Number(m[1]), suffix: m[2] } : null;
}

function StatValue({ value, start }) {
  const parts = splitValue(value);
  const shown = useCountUp(parts?.number ?? 0, start && Boolean(parts));
  if (!parts) return value;
  return (
    <>
      <span aria-hidden="true" className="tabular-nums">
        {shown}
        {parts.suffix}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

export default function Stats() {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -15% 0px" });
  return (
    <section aria-label="Achievements and statistics" className="pb-8">
      <div className="container-page">
        <dl ref={ref} className="glass grid grid-cols-2 overflow-hidden lg:grid-cols-4" data-aos="fade-up">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-2 p-6 sm:p-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${
                i > 1 ? "border-t border-line lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="order-2 text-sm leading-snug text-muted">{stat.label}</dt>
              <dd className="order-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                <StatValue value={stat.value} start={inView} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
