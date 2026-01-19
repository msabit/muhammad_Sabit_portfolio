import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import AOS from "aos";
import "aos/dist/aos.css";

const coreMobileDevelopment = [
  {
    name: "React Native (Expert)",
    value: 95,
    icon: CheckCircleIcon,
  },
  {
    name: "TypeScript",
    value: 90,
    icon: CheckCircleIcon,
  },
  {
    name: "JavaScript (ES6+)",
    value: 95,
    icon: CheckCircleIcon,
  },
  {
    name: "Native API Rendering",
    value: 85,
    icon: CheckCircleIcon,
  },
  {
    name: "Native iOS/Android Modules",
    value: 80,
    icon: CheckCircleIcon,
  },
];

const stateManagement = [
  {
    name: "React Query",
    value: 85,
    icon: CheckCircleIcon,
  },
  {
    name: "Redux",
    value: 90,
    icon: CheckCircleIcon,
  },
  {
    name: "Redux Toolkit",
    value: 95,
    icon: CheckCircleIcon,
  },
  {
    name: "Context API",
    value: 90,
    icon: CheckCircleIcon,
  },
];

const nativeHybridEnvironments = [
  {
    name: "Android Studio",
    value: 85,
    icon: CheckCircleIcon,
  },
  {
    name: "Xcode",
    value: 85,
    icon: CheckCircleIcon,
  },
  {
    name: "Expo",
    value: 90,
    icon: CheckCircleIcon,
  },
  {
    name: "Java/Swift Modules",
    value: 75,
    icon: CheckCircleIcon,
  },
];

const dataBackendIntegration = [
  {
    name: "REST APIs",
    value: 95,
    icon: CheckCircleIcon,
  },
  {
    name: "GraphQL",
    value: 75,
    icon: CheckCircleIcon,
  },
  {
    name: "Firebase (Firestore)",
    value: 90,
    icon: CheckCircleIcon,
  },
  {
    name: "Firebase Auth",
    value: 90,
    icon: CheckCircleIcon,
  },
  {
    name: "Push Notifications",
    value: 95,
    icon: CheckCircleIcon,
  },
  {
    name: "Social Authentication",
    value: 90,
    icon: CheckCircleIcon,
  },
];

const storageDatabases = [
  {
    name: "SQLite (Offline Storage)",
    value: 90,
    icon: CheckCircleIcon,
  },
  {
    name: "Document Request Models",
    value: 85,
    icon: CheckCircleIcon,
  },
];

const thirdPartyEcosystem = [
  {
    name: "Stripe (Payments)",
    value: 85,
    icon: CheckCircleIcon,
  },
  {
    name: "RevenueCat (In-App Purchases)",
    value: 85,
    icon: CheckCircleIcon,
  },
  {
    name: "Google Maps API",
    value: 90,
    icon: CheckCircleIcon,
  },
  {
    name: "AppsFlyer",
    value: 85,
    icon: CheckCircleIcon,
  },
];

const uiUxWebStandards = [
  {
    name: "HTML5",
    value: 95,
    icon: CheckCircleIcon,
  },
  {
    name: "CSS3",
    value: 90,
    icon: CheckCircleIcon,
  },
  {
    name: "Flexbox",
    value: 95,
    icon: CheckCircleIcon,
  },
  {
    name: "Figma-to-Code Translation",
    value: 90,
    icon: CheckCircleIcon,
  },
];

const developmentTools = [
  {
    name: "Git/GitHub",
    value: 95,
    icon: CheckCircleIcon,
  },
  {
    name: "Jira (Task Estimation)",
    value: 90,
    icon: CheckCircleIcon,
  },
  {
    name: "Postman",
    value: 95,
    icon: CheckCircleIcon,
  },
  {
    name: "Unit Testing",
    value: 80,
    icon: CheckCircleIcon,
  },
];

const skillCategories = [
  {
    title: "Core Mobile Development",
    skills: coreMobileDevelopment,
    gridCols: "lg:grid-cols-2",
  },
  {
    title: "State Management",
    skills: stateManagement,
    gridCols: "lg:grid-cols-2",
  },
  {
    title: "Native & Hybrid Environments",
    skills: nativeHybridEnvironments,
    gridCols: "lg:grid-cols-2",
  },
  {
    title: "Data & Backend Integration",
    skills: dataBackendIntegration,
    gridCols: "lg:grid-cols-2",
  },
  {
    title: "Storage & Databases",
    skills: storageDatabases,
    gridCols: "lg:grid-cols-2",
  },
  {
    title: "Third-Party Ecosystem",
    skills: thirdPartyEcosystem,
    gridCols: "lg:grid-cols-2",
  },
  {
    title: "UI/UX & Web Standards",
    skills: uiUxWebStandards,
    gridCols: "lg:grid-cols-2",
  },
  {
    title: "Development & Professional Tools",
    skills: developmentTools,
    gridCols: "lg:grid-cols-2",
  },
];

export default function Skills() {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  // Show first 2 categories or all categories based on state
  const displayedCategories = showAll
    ? skillCategories
    : skillCategories.slice(0, 2);

  return (
    <div className="py-24 sm:py-32" id="skills">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl leading-7">Explore my</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">
            Technical Skills
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-y-10">
          {displayedCategories.map((category, index) => (
            <div
              key={category.title}
              className="mt-10 max-w-2xl sm:mt-10 lg:mt-10 lg:max-w-4xl bg-base-200 ring-2 ring-base-300 rounded-2xl p-5 shadow-xl"
              data-aos="zoom-in"
              data-aos-delay={index * 50}
            >
              <p className="text-2xl text-center font-bold mb-6">
                {category.title}
              </p>
              <dl
                className={`grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none ${category.gridCols} lg:gap-y-6`}
              >
                {category.skills.map((skill) => (
                  <div key={skill.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg">
                        <skill.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      {skill.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7">
                      <progress
                        className="progress w-3/4"
                        value={skill.value}
                        max="100"
                      ></progress>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <button
            className="btn btn-outline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View More"}
          </button>
        </div>
      </div>
    </div>
  );
}
