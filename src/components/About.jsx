import { AcademicCapIcon, BriefcaseIcon } from "@heroicons/react/20/solid";
import SabitImage from "../assets/Sabit.webp";

const experience = [
  {
    role: "Senior React Native Developer",
    company: "PhenTech Pvt",
    period: "Dec 2023 – Present",
  },
  {
    role: "React Native Consultant",
    company: "Neural Metrics Pvt",
    period: "June 2023 – Feb 2024",
  },
  {
    role: "React Native Developer",
    company: "InfinityBits",
    period: "April 2023 – Dec 2023",
  },
  {
    role: "React Native Developer",
    company: "EConceptions Pvt",
    period: "April 2022 – March 2023",
  },
  {
    role: "React Native Developer",
    company: "TechMelo",
    period: "Feb 2021 – March 2022",
  },
];

const education = [
  "Bachelor of Science in Computer Science (BSCS), PMAS University, Rawalpindi",
  "Intermediate in Computer Science (ICS), Punjab Group of Colleges",
];

export default function About() {
  return (
    <section
      className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-lg leading-7">Get to know more</p>
              <h2
                id="about-heading"
                className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl text-balance"
              >
                About Me
              </h2>
              <p className="mt-6 text-lg leading-8" data-aos="fade-right">
                I am an innovative React Native Mobile Engineer with over 5
                years of professional experience designing, developing, and
                delivering high-performance mobile applications for both iOS and
                Android. Throughout my career, I have successfully shipped 15+
                complex apps to the App Store and Play Store, ranging from
                consumer-facing products to enterprise solutions. I have deep
                expertise in TypeScript, scalable app architecture, custom
                native modules, and performance optimization, with a strong
                focus on building clean, maintainable, and reusable code. I am
                proficient in CI/CD pipelines, automated testing, and debugging,
                ensuring smooth deployments and minimal downtime for production
                apps. Beyond technical skills, I excel at translating complex
                business requirements into functional and efficient solutions,
                collaborating effectively with cross-functional teams, and
                mentoring junior developers to strengthen team capability. My
                goal is to help clients and organizations bring their ideas to
                life efficiently, while delivering apps that are reliable, fast,
                and user-friendly.
              </p>
            </div>
          </div>
        </div>
        <div
          className="-ml-12 -mt-12 p-12 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden"
          data-aos="fade-left"
        >
          <img
            className="w-full max-w-lg h-auto object-cover ring-2 ring-base-300 rounded-xl shadow-xl lg:max-w-xl"
            src={SabitImage}
            width={768}
            height={1004}
            loading="lazy"
            alt="Muhammad Sabit in a navy suit"
          />
        </div>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:gap-x-8 lg:px-8">
          <div className="text-base leading-7">
            <div className="grid gap-x-6 sm:grid-cols-2">
              <div
                className="ring-2 ring-base-300 bg-base-200 rounded-2xl mt-10 p-6 shadow-xl"
                data-aos="zoom-in"
              >
                <BriefcaseIcon className="h-5 w-5 mx-auto" aria-hidden="true" />
                <h3 className="text-2xl text-center font-bold tracking-tight mb-6">
                  Professional Experience
                </h3>
                <ol className="space-y-4">
                  {experience.map((job) => (
                    <li key={`${job.company}-${job.role}`}>
                      <h4 className="font-bold text-base">{job.role}</h4>
                      <p className="text-sm opacity-80">
                        {job.company} | {job.period}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
              <div
                className="ring-2 ring-base-300 bg-base-200 rounded-2xl mt-10 p-5 shadow-xl"
                data-aos="zoom-in"
              >
                <AcademicCapIcon
                  className="h-5 w-5 mx-auto"
                  aria-hidden="true"
                />
                <h3 className="text-2xl text-center font-bold tracking-tight">
                  Education
                </h3>
                <ul className="mt-3 list-disc list-inside space-y-3">
                  {education.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
