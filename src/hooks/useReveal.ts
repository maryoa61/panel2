import { useEffect } from "react";

/**
 * انیمیشن fade-in با IntersectionObserver.
 * هر المان با کلاس .reveal هنگام ورود به viewport کلاس .is-visible می‌گیرد،
 * و کارت‌های داخل یک گرید با تاخیر پلکانی ۱۰۰ms ظاهر می‌شوند.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const index = Number(el.dataset["revealIndex"] ?? 0);
          el.style.transitionDelay = `${index * 100}ms`;
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}
