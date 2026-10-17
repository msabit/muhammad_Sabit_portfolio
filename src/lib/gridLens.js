// Geometry for the background grid's "lens": grid points near the pointer are
// lifted (z) and pushed outward, so the grid reads as a dome under the cursor.

// Smoothstep-style falloff: 1 at the centre, easing to 0 at `radius`.
export function falloff(distance, radius) {
  if (distance >= radius) return 0;
  const t = 1 - distance / radius;
  return t * t * (3 - 2 * t);
}

// Displaces grid point (px, py) around centre (cx, cy). `strength` is how far
// points spread at the centre of the dome; `power` (0–1) fades the whole effect.
export function lensPoint(px, py, cx, cy, radius, strength, power = 1) {
  const dx = px - cx;
  const dy = py - cy;
  const z = falloff(Math.hypot(dx, dy), radius) * power;
  if (z === 0) return { x: px, y: py, z: 0 };
  return { x: px + dx * strength * z, y: py + dy * strength * z, z };
}

const round3 = (n) => Math.round(n * 1000) / 1000;

// Reads a CSS colour as { r, g, b, a } (a in 0–1). Handles hex (#rgb, #rgba,
// #rrggbb, #rrggbbaa, which the production CSS minifier emits) and rgb()/rgba()
// in comma or space syntax with an optional "/ alpha" (number or %).
// Returns null for anything else so callers can fall back.
export function parseColor(value) {
  const v = String(value).trim().toLowerCase();

  const hex = v.match(/^#([0-9a-f]{3,8})$/);
  if (hex) {
    let h = hex[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
    if (h.length !== 6 && h.length !== 8) return null;
    const n = (i) => parseInt(h.slice(i, i + 2), 16);
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? round3(n(6) / 255) : 1 };
  }

  const fn = v.match(/^rgba?\(\s*([^)]+)\)$/);
  if (fn) {
    const parts = fn[1].split(/[\s,/]+/).filter(Boolean);
    if (parts.length < 3) return null;
    const [r, g, b] = parts.slice(0, 3).map(Number);
    if ([r, g, b].some(Number.isNaN)) return null;
    const rawA = parts[3];
    const a = rawA === undefined ? 1 : rawA.endsWith("%") ? parseFloat(rawA) / 100 : parseFloat(rawA);
    return { r, g, b, a: round3(a) };
  }
  return null;
}
