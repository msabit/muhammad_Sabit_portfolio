export default function SectionHeading({ id, eyebrow, title, children, align = "left" }) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-4 ${centered ? "mx-auto max-w-2xl items-center text-center" : "max-w-3xl"}`}
      data-aos="fade-up"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="heading-lg text-balance">
        {title}
      </h2>
      {children ? <p className="text-pretty text-lg leading-relaxed text-muted max-sm:hidden">{children}</p> : null}
    </div>
  );
}
