// Single source of truth for portfolio content.
// Everything here comes from the previous version of the site — edit copy here,
// not inside components.
import Loot8Logo from "../assets/loot8.webp";

export const profile = {
  name: "Muhammad Sabit",
  title: "Senior React Native Developer",
  summary:
    "Senior React Native developer with 5+ years of experience and 15+ apps shipped to the App Store and Play Store.",
  email: "muhammadsabit@gmail.com",
  phone: "+92 312 5003066",
  phoneHref: "tel:+923125003066",
};

export const navigation = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

// Icon paths are 16×16 (Bootstrap Icons), reused from the original site.
export const socialLinks = [
  {
    name: "LinkedIn",
    label: "LinkedIn profile",
    href: "https://www.linkedin.com/in/muhammadsabit/",
    external: true,
    path: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z",
  },
  {
    name: "GitHub",
    label: "GitHub profile",
    href: "https://github.com/msabit",
    external: true,
    path: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z",
  },
  {
    name: "Call",
    label: "Call +92 312 5003066",
    href: "tel:+923125003066",
    path: "M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z",
  },
  {
    name: "Email",
    label: "Email muhammadsabit@gmail.com",
    href: "mailto:muhammadsabit@gmail.com",
    path: "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z",
  },
];

export const stats = [
  { value: "5+", label: "Years building with React Native" },
  { value: "15+", label: "Apps shipped to the App Store & Play Store" },
  { value: "16", label: "Projects featured in this portfolio" },
  { value: "5", label: "Companies & product teams" },
];

export const about = {
  paragraphs: [
    "I am an innovative React Native Mobile Engineer with over 5 years of professional experience designing, developing, and delivering high-performance mobile applications for both iOS and Android. Throughout my career, I have successfully shipped 15+ complex apps to the App Store and Play Store, ranging from consumer-facing products to enterprise solutions.",
    "Beyond technical skills, I excel at translating complex business requirements into functional and efficient solutions, collaborating effectively with cross-functional teams, and mentoring junior developers to strengthen team capability. My goal is to help clients and organizations bring their ideas to life efficiently, while delivering apps that are reliable, fast, and user-friendly.",
  ],
  strengths: [
    {
      title: "Scalable architecture",
      text: "Deep expertise in TypeScript and scalable app architecture, with a focus on clean, maintainable, reusable code.",
    },
    {
      title: "Native & performance",
      text: "Custom native modules and performance optimization for apps that feel fast on both iOS and Android.",
    },
    {
      title: "Reliable delivery",
      text: "CI/CD pipelines, automated testing and debugging for smooth deployments and minimal production downtime.",
    },
    {
      title: "Team & mentoring",
      text: "Turning business requirements into working software alongside cross-functional teams, and mentoring junior developers.",
    },
  ],
};

export const experience = [
  { role: "Senior React Native Developer", company: "PhenTech Pvt", period: "Dec 2023 – Present", current: true },
  { role: "React Native Consultant", company: "Neural Metrics Pvt", period: "June 2023 – Feb 2024" },
  { role: "React Native Developer", company: "InfinityBits", period: "April 2023 – Dec 2023" },
  { role: "React Native Developer", company: "EConceptions Pvt", period: "April 2022 – March 2023" },
  { role: "React Native Developer", company: "TechMelo", period: "Feb 2021 – March 2022" },
];

export const education = [
  { degree: "Bachelor of Science in Computer Science (BSCS)", school: "PMAS University, Rawalpindi" },
  { degree: "Intermediate in Computer Science (ICS)", school: "Punjab Group of Colleges" },
];

// Headline technologies shown as large badges.
export const coreTech = [
  "React Native",
  "React",
  "TypeScript",
  "JavaScript (ES6+)",
  "Redux Toolkit",
  "REST APIs",
  "Firebase",
  "Native iOS/Android Modules",
  "CI/CD",
];

export const skillCategories = [
  { title: "Core Mobile Development", skills: ["React Native", "TypeScript", "JavaScript (ES6+)", "Native API Rendering", "Native iOS/Android Modules"] },
  { title: "State Management", skills: ["Redux Toolkit", "Redux", "React Query", "Context API"] },
  { title: "Native & Hybrid Environments", skills: ["Xcode", "Android Studio", "Expo", "Java/Swift Modules"] },
  { title: "Data & Backend Integration", skills: ["REST APIs", "GraphQL", "Firebase (Firestore)", "Firebase Auth", "Push Notifications", "Social Authentication"] },
  { title: "Storage & Databases", skills: ["SQLite (Offline Storage)", "Document Request Models"] },
  { title: "Third-Party Ecosystem", skills: ["Stripe (Payments)", "RevenueCat (In-App Purchases)", "Google Maps API", "AppsFlyer"] },
  { title: "UI/UX & Web Standards", skills: ["Figma-to-Code Translation", "Flexbox", "HTML5", "CSS3"] },
  { title: "Development & Professional Tools", skills: ["Git/GitHub", "CI/CD", "Unit Testing", "Postman", "Jira (Task Estimation)"] },
];

export const projectGroups = [
  { id: "commerce", label: "Commerce & Retail" },
  { id: "health", label: "Health & Care" },
  { id: "telecom", label: "Telecom" },
  { id: "business", label: "Business & Ops" },
];

// Cards draw a monogram tile for each app. Set `imageSrc` (and `contain: true` for a
// logo) to show real artwork instead, as Loot8 does.
export const projects = [
  { id: 1, name: "Konjae", group: "commerce", category: "B2B Marketplace", href: null, stack: ["React Native", "Node.js", "MongoDB"], description: "A high-scale B2B wholesale marketplace application facilitating bulk trade and inventory management." },
  { id: 2, name: "POS (Tablet, Mobile)", group: "commerce", category: "Retail & Restaurant", href: null, stack: ["React Native", "TypeScript", "SQLite"], description: "A flexible point of sale system designed for cross-device retail transactions and restaurant sales reporting." },
  { id: 3, name: "Abs Timesheet", group: "business", category: "HR & Productivity", href: "https://play.google.com/store/apps/details?id=com.abstimesheet", stack: ["React Native", "Redux", "Firebase"], description: "An employee productivity tool for clock-in/out management and automated payroll reporting." },
  { id: 4, name: "Fairly Even", group: "business", category: "Business Management", href: "https://play.google.com/store/apps/details?id=com.fairlyeven", stack: ["React Native", "GraphQL", "PostgreSQL"], description: "A business management application focused on POS client management, training program coordination, and customer lead generation." },
  { id: 5, name: "Pharmacy", group: "health", category: "Healthcare", href: null, stack: ["React Native", "REST API", "MySQL"], description: "A healthcare delivery application for managing prescriptions and local medicine inventory." },
  { id: 6, name: "Field Services", group: "business", category: "Operations & Logistics", href: null, stack: ["React Native", "Google Maps API", "WebSocket"], description: "An operational tool for workforce management, featuring real-time task assignment and location tracking via Google Maps." },
  { id: 7, name: "Orma Planet Customer", group: "health", category: "Pet Care", href: "https://play.google.com/store/apps/details?id=it.ormacollection.orma.mobile&hl=en", stack: ["React Native", "Firebase", "Google Maps"], description: "A pet clinic application to maintain pet medical records, manage appointment bookings, buy and adopt pets, and discover nearby parks with check-in and check-out." },
  { id: 8, name: "Orma Planet Professionals", group: "health", category: "Pet Care Professional", href: "https://play.google.com/store/apps/details?id=com.company.ormapro&hl=en", stack: ["React Native", "Node.js", "MongoDB"], description: "A veterinary management application for managing appointments, availability and holidays, defining services, and overseeing pet shelter operations." },
  { id: 9, name: "Millennium Pharmacy", group: "health", category: "Healthcare E-commerce", href: null, stack: ["React Native", "Express.js", "PostgreSQL"], description: "A healthcare e-commerce application built to streamline medicine sales, prescription workflows, and patient record management." },
  { id: 10, name: "Amis Choice", group: "commerce", category: "E-commerce", href: "https://play.google.com/store/apps/details?id=com.app.amischoice&hl=en", stack: ["React Native", "Stripe", "Redux"], description: "An e-commerce grocery application designed to handle online purchasing, sales tracking, and secure card payment transactions." },
  { id: 11, name: "Educo GYM", group: "health", category: "Fitness & Health", href: "https://play.google.com/store/apps/details?id=com.trainerize.educogym", stack: ["React Native", "Video Streaming", "Firebase"], description: "A fitness management app featuring workout tracking, membership tiers, and video integration for tutorials." },
  { id: 12, name: "Jazz VAS Apps", group: "telecom", category: "Telecom Services", href: "https://play.google.com/store/apps/details?id=com.jazz.game.world", stack: ["React Native", "Telecom APIs", "Node.js"], description: "A suite of value-added service apps (Rung, Game World, Sitaron ka Haal) for telecom users, covering gaming, horoscopes, and caller tunes." },
  { id: 13, name: "Toyogo Kiosk", group: "commerce", category: "Retail Kiosk", href: null, stack: ["React", "Electron", "SQLite"], description: "A self-service kiosk application that streamlines cash-and-carry ordering through intuitive product selection and order management." },
  { id: 14, name: "Loot8", group: "commerce", category: "NFT & Blockchain", href: "https://loot8.io/", imageSrc: Loot8Logo, contain: true, stack: ["React Native", "Blockchain", "Web3"], description: "A specialized marketplace app for digital assets and NFTs, focusing on high-fidelity media rendering." },
  { id: 15, name: "Zong Discount Bazaar", group: "telecom", category: "Lifestyle & Rewards", href: "https://play.google.com/store/apps/details?id=com.zdb.android", stack: ["React Native", "REST API", "Redis"], description: "A comprehensive lifestyle and rewards app offering real-time deals and discounts for millions of users." },
  { id: 16, name: "OPA Tag (NFC)", group: "business", category: "Digital Networking", href: null, stack: ["React Native", "NFC Technology", "Cloud Storage"], description: "A digital networking solution utilizing NFC technology for instant contact and profile sharing." },
];

// Two-letter monogram for the drawn app tile: initials of the first two words,
// else the first two letters of a single word.
export function monogram(name) {
  const words = name.replace(/\(.*?\)/g, "").replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return words[0][0].toUpperCase() + words[0][1].toLowerCase();
}
