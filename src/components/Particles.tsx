import { useEffect, useRef } from "react";

/** پس‌زمینه ذرات با Canvas خام و سبک — تعداد ذرات وابسته به اندازه صفحه */
export function Particles() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;

    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    let parts: P[] = [];

    const build = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(90, Math.round((w * h) / 22000));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 0.6,
        c: Math.random() > 0.5 ? "108,60,225" : "0,212,255",
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},0.7)`;
        ctx.fill();
      }
      // خطوط اتصال بین ذرات نزدیک
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i]!;
          const b = parts[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(108,60,225,${(1 - d / 120) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    build();
    draw();
    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
