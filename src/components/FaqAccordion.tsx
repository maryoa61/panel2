import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";

/** آکاردئون سوالات متداول — فقط یک آیتم هم‌زمان باز، با پشتیبانی کیبورد و ARIA */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="reveal text-center">
          <h2>سوالات متداول</h2>
          <p className="mt-3 text-muted-foreground">پاسخ پرتکرارترین پرسش‌ها درباره محصولات.</p>
        </div>

        <div className="mt-10 space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="glass-card reveal overflow-hidden" data-reveal-index={0}>
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start text-sm font-semibold"
                  >
                    {item.q}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className="grid transition-all duration-300"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-muted-foreground">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
