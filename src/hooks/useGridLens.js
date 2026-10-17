import { useEffect } from "react";
import { lensPoint, parseColor } from "../lib/gridLens";
import { prefersReducedMotion } from "./useMotion";

const RADIUS = 230; // px of grid affected around the pointer
const STRENGTH = 0.15; // how far points spread at the dome's centre (kept subtle)
const EASE = 0.16; // share of the gap closed per frame when following the pointer

// Used only if a theme variable can't be read (keeps the accent hue, never red).
const FALLBACK = {
  dark: { line: { r: 154, g: 171, b: 255, a: 0.4 }, dot: { r: 190, g: 200, b: 255, a: 0.75 } },
  light: { line: { r: 64, g: 82, b: 218, a: 0.3 }, dot: { r: 64, g: 82, b: 218, a: 0.7 } },
};
const rgba = (c, a) => `rgba(${c.r},${c.g},${c.b},${a.toFixed(3)})`;

// Draws the active part of the background grid as a 3D dome that follows the
// pointer: lines bend over it, dots grow, catch a highlight and cast a shadow.
// Desktop mice only; touch and reduced motion keep the static CSS glow.
export function useGridLens() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;
    const canvas = document.querySelector(".grid-canvas");
    const ambient = document.querySelector(".ambient");
    const dots = document.querySelector(".grid-dots");
    if (!canvas || !ambient || !dots) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();

    // Colours come from the theme's CSS variables; re-read when the theme flips.
    let colors;
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const dark = document.documentElement.getAttribute("data-theme") !== "light";
      const fallback = dark ? FALLBACK.dark : FALLBACK.light;
      colors = {
        // Minified CSS stores these as hex (#9aabff66); parseColor reads both forms.
        line: parseColor(cs.getPropertyValue("--grid-line")) ?? fallback.line,
        dot: parseColor(cs.getPropertyValue("--grid-dot-active")) ?? fallback.dot,
        dark,
        cell: parseFloat(cs.getPropertyValue("--cell")) || 36,
      };
    };
    readColors();
    const themeWatch = new MutationObserver(readColors);
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const target = { x: -9999, y: -9999 };
    const pos = { x: -9999, y: -9999 };
    let inside = false;
    let power = 0;
    let frame = 0;

    // Match the CSS drift exactly by reading the dots layer's animation clock.
    const driftOffset = (cell) => {
      const anim = dots.getAnimations?.()[0];
      const t = Number(anim?.currentTime ?? 0);
      return ((t % 28000) / 28000) * cell;
    };

    const draw = () => {
      pos.x += (target.x - pos.x) * EASE;
      pos.y += (target.y - pos.y) * EASE;
      power += ((inside ? 1 : 0) - power) * 0.12;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      if (power > 0.01) {
        const { cell, line, dot, dark } = colors;
        const off = driftOffset(cell);
        // Grid intersections in viewport space (see .grid-field > div in index.css).
        const x0 = -cell + off + 1;
        const y0 = -cell + off + 1;
        const i0 = Math.floor((pos.x - RADIUS - x0) / cell) - 1;
        const i1 = Math.ceil((pos.x + RADIUS - x0) / cell) + 1;
        const j0 = Math.floor((pos.y - RADIUS - y0) / cell) - 1;
        const j1 = Math.ceil((pos.y + RADIUS - y0) / cell) + 1;
        const cols = i1 - i0 + 1;
        const pts = [];
        for (let j = j0; j <= j1; j++) {
          for (let i = i0; i <= i1; i++) {
            pts.push(lensPoint(x0 + i * cell, y0 + j * cell, pos.x, pos.y, RADIUS, STRENGTH, power));
          }
        }

        // Lines: each segment shaded by how high its ends sit on the dome.
        ctx.lineCap = "round";
        for (let k = 0; k < pts.length; k++) {
          const p = pts[k];
          const right = (k + 1) % cols !== 0 ? pts[k + 1] : null;
          const down = pts[k + cols];
          for (const q of [right, down]) {
            if (!q) continue;
            const z = (p.z + q.z) / 2;
            if (z <= 0.01) continue;
            ctx.strokeStyle = rgba(line, line.a * 1.05 * z);
            ctx.lineWidth = 0.5 + 0.45 * z;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        // Dots: shadow below-right, body, then a small highlight up-left.
        for (const p of pts) {
          if (p.z <= 0.02) continue;
          const r = 1 + 1.25 * p.z;
          ctx.fillStyle = dark ? `rgba(0,0,0,${(0.22 * p.z).toFixed(3)})` : `rgba(30,40,90,${(0.1 * p.z).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x + 0.8 * p.z, p.y + 1.2 * p.z, r, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = rgba(dot, dot.a * (0.15 + 0.6 * p.z));
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255,255,255,${(0.28 * p.z * p.z).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x - r * 0.35, p.y - r * 0.35, r * 0.38, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Keep animating while the pointer is in the window or the dome is fading out.
      frame = inside || power > 0.01 ? requestAnimationFrame(draw) : 0;
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!inside) {
        inside = true;
        if (pos.x < -999) {
          pos.x = target.x;
          pos.y = target.y;
        }
        ambient.classList.add("has-lens");
      }
      wake();
    };
    const onLeave = (e) => {
      if (!e.relatedTarget) {
        inside = false;
        wake();
      }
    };
    const onVisibility = () => {
      if (document.hidden) inside = false;
      wake();
    };

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      themeWatch.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      ambient.classList.remove("has-lens");
    };
  }, []);
}
