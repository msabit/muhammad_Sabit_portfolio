import { skillCategories } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading id="skills-heading" eyebrow="Skills & technologies" title="The stack I ship production apps with.">
          Grouped by where each tool sits in a mobile product.
        </SectionHeading>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <div
              key={category.title}
              className="glass flex flex-col gap-4 p-6"
              data-aos="fade-up"
              data-aos-delay={(i % 4) * 60}
            >
              <h3 className="text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-muted">{category.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="chip">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
