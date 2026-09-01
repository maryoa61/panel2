import { Check, Star } from "lucide-react";
import { formatToman } from "@/config";
import type { Product } from "@/lib/types";

/** پلن‌های قیمتی تب‌بندی‌شده به ازای هر محصول */
export function PricingTabs({
  products,
  selectedId,
  onSelect,
}: {
  products: Product[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const product = products.find((p) => p.id === selectedId) ?? products[0];
  if (!product) return null;

  return (
    <section id="pricing" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2>پلن‌ها و قیمت‌ها</h2>
          <p className="mt-3 text-muted-foreground">
            محصول موردنظر را انتخاب کنید تا پلن‌های همان پنل نمایش داده شود.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="انتخاب محصول"
          className="reveal mt-8 flex flex-wrap justify-center gap-2"
        >
          {products.map((p) => (
            <button
              key={p.id}
              role="tab"
              type="button"
              aria-selected={p.id === product.id}
              onClick={() => onSelect(p.id)}
              className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                p.id === product.id
                  ? "border-transparent bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {product.plans.map((plan, i) => (
            <article
              key={plan.id}
              data-reveal-index={i % 3}
              className={`glass-card glass-hover reveal relative flex flex-col p-7 ${
                plan.highlighted
                  ? "border-primary/60 shadow-[var(--shadow-glow)] lg:scale-[1.04]"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 start-6 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                  <Star className="h-3.5 w-3.5" aria-hidden="true" />
                  پیشنهاد ویژه
                </span>
              )}
              <h3 className="text-lg">{plan.name}</h3>
              <p className="mt-4 text-3xl font-extrabold">
                {formatToman(plan.priceToman)}{" "}
                <span className="text-base font-normal text-muted-foreground">تومان</span>
              </p>
              <p className="mt-1 text-sm text-accent">معادل {plan.priceUSDT} تتر (USDT)</p>

              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[color:var(--success)]" aria-hidden="true" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`${product.appUrl}?plan=${plan.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "border border-border text-foreground hover:bg-secondary"
                }`}
              >
                انتخاب این پلن
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
