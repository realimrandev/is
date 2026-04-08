/*
Design system (Cyber-Brutalist / Ghost Cursor):
- Dark base, neon accents, gritty texture.
- Broken grids + diagonals + big typography.
- Cursor is a "ghost" trail; background has subtle grid + noise.
*/

import { useEffect, useMemo, useRef } from "react";

type Dot = { x: number; y: number; vx: number; vy: number; r: number; a: number };

export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dots = useMemo<Dot[]>(() => {
    const arr: Dot[] = [];
    for (let i = 0; i < 26; i++) {
      arr.push({
        x: Math.random() * 1000,
        y: Math.random() * 600,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 40 + Math.random() * 120,
        a: 0.04 + Math.random() * 0.06,
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const drawGrid = (w: number, h: number) => {
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;

      const step = 56;
      for (let x = 0; x < w + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h + step; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = "rgba(0,255,174,0.16)";
      for (let x = 28; x < w + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawNoise = (w: number, h: number) => {
      const img = ctx.getImageData(0, 0, w, h);
      const data = img.data;
      for (let i = 0; i < data.length; i += 16) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 10;
      }
      ctx.putImageData(img, 0, 0);
    };

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // base wash
      const base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, "rgba(10,12,16,1)");
      base.addColorStop(1, "rgba(6,7,10,1)");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      // drifting blobs
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -200) d.x = w + 200;
        if (d.x > w + 200) d.x = -200;
        if (d.y < -200) d.y = h + 200;
        if (d.y > h + 200) d.y = -200;

        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
        g.addColorStop(0, `rgba(0,255,174,${d.a})`);
        g.addColorStop(0.55, `rgba(255,42,168,${d.a * 0.7})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(d.x - d.r, d.y - d.r, d.r * 2, d.r * 2);
      }

      drawGrid(w, h);

      // subtle noise overlay (cheap: small area then scaled)
      ctx.save();
      ctx.globalAlpha = 0.08;
      const nw = Math.min(520, w);
      const nh = Math.min(320, h);
      drawNoise(nw, nh);
      ctx.restore();

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [dots]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 block"
      aria-hidden="true"
    />
  );
}
