import { useState } from "react";
import { ArrowDownTrayIcon, PaperAirplaneIcon } from "@heroicons/react/20/solid";
import ResumePDF from "../assets/MuhammadSabit_Resume.pdf";
import { profile, socialLinks } from "../data/portfolio";
import { buildMailto, submitContact } from "../lib/contact";
import SocialIcon from "./ui/SocialIcon";

const CONTACT_EMAIL = profile.email;
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? "";
const EMPTY = { firstName: "", lastName: "", email: "", message: "" };

const fields = [
  { name: "firstName", label: "First name", type: "text", autoComplete: "given-name", half: true },
  { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name", half: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@example.com" },
];

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY);
  const [state, setState] = useState({ status: "idle" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      message: formData.message,
    };
    setState({ status: "sending" });
    const result = await submitContact(payload, { key: WEB3FORMS_KEY });
    if (result.status === "mailto") window.location.href = buildMailto(CONTACT_EMAIL, payload);
    if (result.status === "sent") setFormData(EMPTY);
    setState(result);
  };

  const sending = state.status === "sending";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <div className="container-page">
        <div className="glass-strong grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14 lg:p-14" data-aos="fade-up">
          <div className="flex flex-col gap-6">
            <p className="eyebrow">Get in touch</p>
            <h2 id="contact-heading" className="heading-lg text-balance">
              Have an app to build or ship?
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Whether you&apos;re hiring or need a React Native engineer for a project, send a message and I&apos;ll get back to you.
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="w-fit break-all font-display text-xl font-bold underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-[var(--accent)] sm:text-2xl"
            >
              {CONTACT_EMAIL}
            </a>

            <ul className="flex flex-col gap-2 max-sm:hidden" aria-label="Contact links">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="glass glass-interactive flex min-h-[52px] items-center gap-3 px-4 py-2.5"
                    style={{ borderRadius: "var(--radius-md)" }}
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <span className="flex h-8 w-8 items-center justify-center text-accent" aria-hidden="true">
                      <SocialIcon path={link.path} />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="font-semibold">{link.name}</span>
                      <span className="text-sm text-muted">
                        {link.name === "Call"
                          ? profile.phone
                          : link.name === "Email"
                            ? CONTACT_EMAIL
                            : link.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                      </span>
                    </span>
                    {link.external ? <span className="sr-only">(opens in new tab)</span> : null}
                  </a>
                </li>
              ))}
            </ul>

            <a href={ResumePDF} download="MuhammadSabit_Resume.pdf" className="btn-glass w-fit px-5 max-sm:hidden">
              <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          </div>

          <form onSubmit={handleSubmit} className="glass flex flex-col gap-5 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
                  <label htmlFor={f.name} className="mb-2 block text-sm font-semibold text-ink-soft">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    required
                    name={f.name}
                    id={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    autoComplete={f.autoComplete}
                    placeholder={f.placeholder}
                    spellCheck={f.type === "email" ? false : undefined}
                    className="field"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink-soft">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or role"
                  className="field resize-y"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="btn-primary min-h-[52px] w-full text-base disabled:cursor-wait disabled:opacity-70"
            >
              <PaperAirplaneIcon className="h-4 w-4" aria-hidden="true" />
              {sending ? "Sending…" : WEB3FORMS_KEY ? "Send message" : "Send via email app"}
            </button>
            <p
              role="status"
              aria-live="polite"
              className="text-center text-sm"
              style={{
                color:
                  state.status === "sent"
                    ? "var(--live-ink)"
                    : state.status === "error"
                      ? "var(--error-ink)"
                      : "var(--muted)",
              }}
            >
              {state.status === "sent" && "Thanks — your message is on its way. I’ll reply by email."}
              {state.status === "error" && `${state.message} You can also email ${CONTACT_EMAIL}.`}
              {state.status === "mailto" &&
                `Your email app should now be open with this message. If not, write to ${CONTACT_EMAIL}.`}
              {(state.status === "idle" || sending) &&
                (WEB3FORMS_KEY
                  ? "Goes straight to my inbox. I reply by email."
                  : "Opens your email app with this message pre-filled.")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
