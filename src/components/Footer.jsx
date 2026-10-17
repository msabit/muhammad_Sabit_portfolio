import { ArrowUpIcon } from "@heroicons/react/20/solid";
import { navigation, profile, socialLinks } from "../data/portfolio";
import SocialIcon from "./ui/SocialIcon";

export default function Footer() {
  return (
    <footer className="pb-8 pt-4">
      <div className="container-page">
        <div className="glass flex flex-col gap-6 px-6 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-display font-bold">{profile.name}</p>
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-1 gap-y-1 max-sm:hidden">
            {navigation.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="nav-link">
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {socialLinks
              .filter((l) => l.external)
              .map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-label={link.label}
                  className="btn-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon path={link.path} />
                </a>
              ))}
            <a href="#top" className="btn-icon" aria-label="Back to top">
              <ArrowUpIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
