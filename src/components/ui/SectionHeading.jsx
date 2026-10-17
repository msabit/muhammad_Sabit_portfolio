import { Fragment } from "react";
import { useInView } from "../../hooks/useMotion";

// Section title whose words rise one after another from behind their own
// baseline when it scrolls into view (CSS under "Split headings" in index.css).
export default function SectionHeading({ id, eyebrow, title, children, align = "left" }) {
  const centered = align === "center";
  const [ref, inView] = useInView({ rootMargin: "0px 0px -15% 0px" });
  const words = String(title).split(" ");
  return (
    <div
      className={`flex flex-col gap-4 ${centered ? "mx-auto max-w-2xl items-center text-center" : "max-w-3xl"}`}
      data-aos="fade-up"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} ref={ref} className={`heading-lg text-balance split-words ${inView ? "is-in" : ""}`}>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="word">
              <span style={{ "--w": i }}>{word}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </h2>
      {children ? <p className="text-pretty text-lg leading-relaxed text-muted max-sm:hidden">{children}</p> : null}
    </div>
  );
}
