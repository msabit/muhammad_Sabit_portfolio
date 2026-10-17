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
