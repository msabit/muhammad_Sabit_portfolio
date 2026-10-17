import { useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// True once the element has scrolled into view (never flips back).
export function useInView(options = { rootMargin: "0px 0px -12% 0px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return undefined;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return [ref, inView];
}

// Tilts an element toward the pointer (desktop mice only). Writes CSS variables
// instead of re-rendering, so it costs nothing while idle.
export function useTilt(max = 6) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !finePointer()) return undefined;
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);
  return ref;
}

// Counts from 0 to `target` once `start` turns true. Returns the target immediately
// when motion is reduced, so the real number is always what's shown at rest.
export function useCountUp(target, start, duration = 1400) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (!start || prefersReducedMotion()) {
      setValue(target);
      return undefined;
    }
    let frame = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);
  return value;
}

// Page-wide effects that don't belong to one component: the scroll progress bar,
// the pointer spotlight on interactive glass cards, and the background grid
// reveal that trails the pointer. All of them write CSS variables, never state.
export function usePageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--scroll", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Grid reveal eases toward the pointer (about 18% of the gap per frame) and the
    // loop stops once it has caught up, so nothing runs while the mouse is still.
    const ambient = document.querySelector(".ambient");
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let trail = 0;
    let started = false;
    const follow = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      ambient.style.setProperty("--gx", `${pos.x.toFixed(1)}px`);
      ambient.style.setProperty("--gy", `${pos.y.toFixed(1)}px`);
      trail = Math.hypot(target.x - pos.x, target.y - pos.y) > 0.5 ? requestAnimationFrame(follow) : 0;
    };

    const onPointer = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (ambient) {
        if (!started) {
          started = true;
          pos.x = target.x;
          pos.y = target.y;
          ambient.classList.add("has-pointer");
        }
        if (!trail) trail = requestAnimationFrame(follow);
      }

      const card = e.target instanceof Element && e.target.closest(".glass-interactive");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const spotlight = finePointer() && !prefersReducedMotion();
    if (spotlight) document.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(trail);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (spotlight) document.removeEventListener("pointermove", onPointer);
    };
  }, []);
}

// Reveals elements marked data-aos="fade-up|fade-left|fade-right" (optional
// data-aos-delay in ms) once they scroll into view. Replaces the AOS library;
// CSS lives under "Scroll reveal" in index.css. When the entrance finishes the
// attribute is removed, so the element's own hover transforms work again.
export function useScrollReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll("[data-aos]")];
    if (!els.length) return undefined;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.removeAttribute("data-aos"));
      return undefined;
    }
    const settle = (el) => {
      const onEnd = (e) => {
        if (e.target !== el || e.propertyName !== "opacity") return;
        el.removeEventListener("transitionend", onEnd);
        el.removeAttribute("data-aos");
        el.classList.remove("is-revealed");
        el.style.removeProperty("--aos-delay");
      };
      el.addEventListener("transitionend", onEnd);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          io.unobserve(el);
          const delay = el.getAttribute("data-aos-delay");
          if (delay) el.style.setProperty("--aos-delay", `${delay}ms`);
          settle(el);
          el.classList.add("is-revealed");
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
