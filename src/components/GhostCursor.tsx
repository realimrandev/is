/*
Design system (Cyber-Brutalist / Ghost Cursor):
- Cursor becomes a bright core + trailing ghosts.
- Disabled on touch devices.
*/

import { useEffect, useMemo, useRef } from "react";

type P = { x: number; y: number };

export default function GhostCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const points = useMemo<P[]>(() => Array.from({ length: 14 }).map(() => ({ x: 0, y: 0 })), []);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const root = rootRef.current;
    if (!root) return;

    let mx = window.innerWidth * 0.5;
    let my = window.innerHeight * 0.5;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      const stiffness = 0.22;
      points[0].x += (mx - points[0].x) * stiffness;
      points[0].y += (my - points[0].y) * stiffness;

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const cur = points[i];
        cur.x += (prev.x - cur.x) * (stiffness * 0.92);
        cur.y += (prev.y - cur.y) * (stiffness * 0.92);
      }

      const els = root.querySelectorAll<HTMLElement>("[data-ghost]");
      els.forEach((el, i) => {
        const p = points[i];
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [points]);

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 -z-10 hidden md:block" aria-hidden>
      {points.map((_, i) => {
        const t = i / (points.length - 1);
        const size = Math.round(18 - t * 12);
        const alpha = 0.9 - t * 0.8;
        const blur = Math.round(10 + t * 12);
        const color = i === 0 ? "rgba(0,255,174,0.95)" : "rgba(255,42,168,0.55)";
        return (
          <div
            key={i}
            data-ghost
            className="absolute left-0 top-0 rounded-full"
            style={{
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              background: color,
              opacity: alpha,
              filter: `blur(${blur}px)`,
              mixBlendMode: "screen",
            }}
          />
        );
      })}

      <div
        className="absolute left-0 top-0"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          background: "rgba(255,255,255,0.9)",
          borderRadius: 999,
          boxShadow: "0 0 18px rgba(0,255,174,0.8)",
        }}
      />
    </div>
  );
}
