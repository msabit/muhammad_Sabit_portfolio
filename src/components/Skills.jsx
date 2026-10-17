import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { skillCategories } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";

// Phones show the first few categories; everything is visible from `sm` up.
const PHONE_COUNT = 4;

export default function Skills() {
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading id="skills-heading" eyebrow="Skills & technologies" title="The stack I ship production apps with.">
          Grouped by where each tool sits in a mobile product.
        </SectionHeading>

        <div
          id="skill-list"
          className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${
            showAll ? "" : "max-sm:[&>div:nth-child(n+5)]:hidden"
          }`}
        >
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

        {skillCategories.length > PHONE_COUNT ? (
          <div className="flex justify-center sm:hidden">
            <button
              type="button"
              className="btn-glass px-6"
              aria-expanded={showAll}
              aria-controls="skill-list"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? "Show fewer skills" : `Show all ${skillCategories.length} skill groups`}
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
