import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Loot8Logo from "../assets/loot8.png";

const projects = [
  {
    id: 1,
    name: "Konjae",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
    used: "React Native, Node.js, MongoDB",
    description:
      "A high-scale B2B wholesale marketplace application facilitating bulk trade and inventory management.",
    category: "B2B Marketplace",
  },
  {
    id: 2,
    name: "POS (Tablet, Mobile)",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    used: "React Native, TypeScript, SQLite",
    description:
      "A flexible Point of Sale system designed for cross-device retail transactions and sales reporting of restaurant.",
    category: "Retail & Restaurant",
  },
  {
    id: 3,
    name: "Abs Timesheet",
    href: "https://play.google.com/store/apps/details?id=com.abstimesheet",
    imageSrc:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    used: "React Native, Redux, Firebase",
    description:
      "An employee productivity tool for clock-in/out management and automated payroll reporting.",
    category: "HR & Productivity",
  },
  {
    id: 4,
    name: "Fairly Even",
    href: "https://play.google.com/store/apps/details?id=com.fairlyeven",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    used: "React Native, GraphQL, PostgreSQL",
    description:
      "A business management application focused on POS client management, training program coordination, and customer lead generation.",
    category: "Business Management",
  },
  {
    id: 5,
    name: "Pharmacy",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    used: "React Native, REST API, MySQL",
    description:
      "A healthcare delivery application for managing prescriptions and local medicine inventory.",
    category: "Healthcare",
  },
  {
    id: 6,
    name: "Field Services",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
    used: "React Native, Google Maps API, WebSocket",
    description:
      "An operational tool for workforce management, featuring real-time task assignment and location tracking via Google Maps.",
    category: "Operations & Logistics",
  },
  {
    id: 7,
    name: "Orma Planet Customer",
    href: "https://play.google.com/store/apps/details?id=it.ormacollection.orma.mobile&hl=en",
    imageSrc:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
    used: "React Native, Firebase, Google Maps",
    description:
      "A pet clinic application that allows users to maintain pet medical records, manage appointment bookings, buy and adopt pets, and discover nearby parks with check-in and check-out functionality.",
    category: "Pet Care",
  },
  {
    id: 8,
    name: "Orma Planet Professionals",
    href: "https://play.google.com/store/apps/details?id=com.company.ormapro&hl=en",
    imageSrc:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80",
    used: "React Native, Node.js, MongoDB",
    description:
      "A veterinary management application that empowers professionals to manage appointments, availability and holidays, define services, and oversee pet shelter operations.",
    category: "Pet Care Professional",
  },
  {
    id: 9,
    name: "Millennium Pharmacy",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
    used: "React Native, Express.js, PostgreSQL",
    description:
      "A healthcare e-commerce application built to streamline medicine sales, prescription workflows, and patient record management.",
    category: "Healthcare E-commerce",
  },
  {
    id: 10,
    name: "Amis Choice",
    href: "https://play.google.com/store/apps/details?id=com.app.amischoice&hl=en",
    imageSrc:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    used: "React Native, Stripe, Redux",
    description:
      "An e-commerce grocery application designed to handle online purchasing, sales tracking, and secure card payment transactions.",
    category: "E-commerce",
  },
  {
    id: 11,
    name: "Educo GYM",
    href: "https://play.google.com/store/apps/details?id=com.trainerize.educogym",
    imageSrc:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    used: "React Native, Video Streaming, Firebase",
    description:
      "A fitness management app featuring workout tracking, membership tiers, and video integration for tutorials.",
    category: "Fitness & Health",
  },
  {
    id: 12,
    name: "Jazz VAS Apps",
    href: "https://play.google.com/store/apps/details?id=com.jazz.game.world",
    imageSrc:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    used: "React Native, Telecom APIs, Node.js",
    description:
      "A suite of value-added service apps (Rung, Game World, Sitaron ka Haal) for telecom users, covering gaming, horoscopes, and caller tunes.",
    category: "Telecom Services",
  },
  {
    id: 13,
    name: "Toyogo Kiosk",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80",
    used: "React, Electron, SQLite",
    description:
      "A self-service kiosk application built to streamline cash-and-carry ordering through an intuitive product selection and order management system.",
    category: "Retail Kiosk",
  },
  {
    id: 14,
    name: "Loot8",
    href: "https://loot8.io/",
    imageSrc: Loot8Logo,
    used: "React Native, Blockchain, Web3",
    description:
      "A specialized marketplace app for digital assets and NFTs, focusing on high-fidelity media rendering.",
    category: "NFT & Blockchain",
  },
  {
    id: 15,
    name: "Zong Discount Bazaar",
    href: "https://play.google.com/store/apps/details?id=com.zdb.android",
    imageSrc:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    used: "React Native, REST API, Redis",
    description:
      "A comprehensive lifestyle and rewards app offering real-time deals and discounts for millions of users.",
    category: "Lifestyle & Rewards",
  },
  {
    id: 16,
    name: "OPA Tag (NFC)",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    used: "React Native, NFC Technology, Cloud Storage",
    description:
      "A digital networking solution utilizing NFC technology for instant contact and profile sharing.",
    category: "Digital Networking",
  },
];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  // Show first 8 projects or all projects based on state
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div id="projects">
      <div className="mx-auto max-w-2xl px-6 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg leading-7">Browse my recent</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">
          Projects
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="group relative ring-2 ring-base-300 bg-base-200 rounded-2xl shadow-xl"
              data-aos="flip-left"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:brightness-75 duration-300 delay-100 lg:h-80 rounded-t-2xl ">
                <img
                  src={project.imageSrc}
                  alt={project.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between p-4">
                <div className="p-4">
                  <h3 className="text-lg font-bold">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {project.name}
                    </a>
                  </h3>
                  <p className="mt-1 mb-5 text-sm">{project.description}</p>
                  <p className="text-sm font-medium">{project.used}</p>
                </div>
              </div>
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
