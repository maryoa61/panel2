import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config";
import type { Product } from "@/lib/types";

const NAV = [
  { id: "hero", label: "صفحه اصلی" },
  { id: "products", label: "محصولات" },
  { id: "pricing", label: "پلن‌ها و قیمت‌ها" },
  { id: "contact", label: "تماس" },
];

/** هدر چسبان با اسکرول‌اسپای، منوی دسته‌بندی محصولات و منوی همبرگری موبایل */
export function Header({ products }: { products: Product[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5], rootMargin: "-80px 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <a href="#hero" className="flex items-center gap-2 text-lg font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary shadow-[var(--shadow-glow)]">
            <span className="text-primary-foreground">پ</span>
          </span>
          <span className="glow-text">{siteConfig.brand}</span>
        </a>

        <nav aria-label="ناوبری اصلی" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.id === "products" ? (
              <div key={item.id} className="group relative">
                <a
                  href="#products"
                  className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm transition-colors ${
                    active === item.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </a>
                <div className="glass-card invisible absolute start-0 top-full w-56 p-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  {categories.map((c) => (
                    <a
                      key={c}
                      href="#products"
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      {c}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-md px-4 py-2 text-sm transition-colors ${
                  active === item.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <a
          href="#pricing"
          className="hidden rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 lg:inline-block"
        >
          خرید پنل
        </a>

        <button
          type="button"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="glass-card grid h-10 w-10 place-items-center lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* پنل کشویی از راست برای موبایل و تبلت */}
      <div
        className={`fixed inset-y-0 end-0 z-50 w-72 border-s border-border bg-popover/95 p-6 backdrop-blur-xl transition-transform lg:hidden ${
          open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        <nav className="mt-14 flex flex-col gap-2" aria-label="ناوبری موبایل">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
