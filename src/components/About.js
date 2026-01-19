import { useEffect } from "react";
import {
  MapPinIcon,
  AtSymbolIcon,
  CalendarIcon,
  AcademicCapIcon,
  BriefcaseIcon,
} from "@heroicons/react/20/solid";
import AOS from "aos";
import "aos/dist/aos.css";
import SabitImage from "../assets/Sabit.png";
const features = [
  {
    name: "Date of Birth:",
    description: "February 28th, 1997",
    icon: CalendarIcon,
  },
  {
    name: "Email:",
    description: "muhammadsabit@gmail.com",
    icon: AtSymbolIcon,
  },
  {
    name: "Location:",
    description: "Islamabad, Pakistan",
    icon: MapPinIcon,
  },
];

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div
      className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0"
      id="about"
    >
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h2 className="text-lg leading-7">Get to know more</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">
                About Me
              </p>
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
                and user-friendly.{" "}
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
            alt="Muhammad Sabit - React Native Mobile Engineer"
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
                <h2 className="text-2xl text-center font-bold tracking-tight mb-6">
                  Professional Experience
                </h2>

                {/* PhenTech */}
                <div className="mb-4">
                  <h3 className="font-bold text-base">
                    Senior React Native Developer
                  </h3>
                  <p className="text-sm opacity-80">
                    PhenTech Pvt | Dec 2023 – Present
                  </p>
                </div>

                {/* Neural Metrics */}
                <div className="mb-4">
                  <h3 className="font-bold text-base">
                    React Native Consultant
                  </h3>
                  <p className="text-sm opacity-80">
                    Neural Metrics Pvt | June 2023 – Feb 2024
                  </p>
                </div>

                {/* InfinityBits */}
                <div className="mb-4">
                  <h3 className="font-bold text-base">
                    React Native Developer
                  </h3>
                  <p className="text-sm opacity-80">
                    InfinityBits | April 2023 – Dec 2023
                  </p>
                </div>

                {/* EConceptions */}
                <div className="mb-4">
                  <h3 className="font-bold text-base">
                    React Native Developer
                  </h3>
                  <p className="text-sm opacity-80">
                    EConceptions Pvt | April 2022 – March 2023
                  </p>
                </div>

                {/* TechMelo */}
                <div>
                  <h3 className="font-bold text-base">
                    React Native Developer
                  </h3>
                  <p className="text-sm opacity-80">
                    TechMelo | Feb 2021 – March 2022
                  </p>
                </div>
              </div>
              <div
                className="ring-2 ring-base-300 bg-base-200 rounded-2xl mt-10 p-5 shadow-xl"
                data-aos="zoom-in"
              >
                <AcademicCapIcon
                  className="h-5 w-5 mx-auto"
                  aria-hidden="true"
                />
                <h2 className=" text-2xl text-center font-bold tracking-tigh">
                  Education
                </h2>
                <p className="mt-3 list-item list-inside">
                  bachelor in computer science(BSCS) from PMAS University
                  RawalPindi
                </p>
                <p className="mt-3 list-item list-inside">
                  Intermediate in Computer Science(ICS) from Punjab Group of
                  Colleges
                </p>
              </div>
            </div>
            {/* <dl
              className="mt-10 space-y-8 text-base leading-7 lg:max-w-none"
              data-aos="fade-right"
            >
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold">
                    <feature.icon
                      className="absolute left-1 top-1 h-5 w-5"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl> */}
          </div>
        </div>
      </div>
    </div>
  );
}
