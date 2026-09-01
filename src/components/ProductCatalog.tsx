import { useMemo, useState, type MouseEvent } from "react";
import { ArrowLeft, Send, MessageCircle, Users, Boxes } from "lucide-react";
import { formatToman } from "@/config";
import type { Product } from "@/lib/types";

const ICONS: Record<string, typeof Send> = {
  send: Send,
  "message-circle": MessageCircle,
  users: Users,
};

/** ویترین محصولات — رندر پویا از data/products.json بدون محدودیت تعداد */
export function ProductCatalog({
  products,
  onSelect,
}: {
  products: Product[];
  onSelect: (id: string) => void;
}) {
  const categories = useMemo(
    () => ["همه", ...Array.from(new Set(products.map((p) => p.category)))],
    [products],
  );
  const [filter, setFilter] = useState("همه");
  const visible = filter === "همه" ? products : products.filter((p) => p.category === filter);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--glow-opacity", "1");
  };

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--glow-opacity", "0");
  };

  return (
    <section id="products" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2>ویترین محصولات</h2>
          <p className="mt-3 text-muted-foreground">
            هر پنل مستقل، با قیمت‌گذاری و پلن‌های مخصوص خودش.
          </p>
        </div>

        {products.length > 6 && (
          <div className="reveal mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  filter === c
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Boxes;
            const min = Math.min(...p.plans.map((pl) => pl.priceToman));
            return (
              <article
                key={p.id}
                className="glass-card tilt-card reveal flex flex-col p-6"
                data-reveal-index={i % 3}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {p.category}
                  </span>
                </div>
                <h3 className="mt-4 text-lg">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.shortDescription}</p>
                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-muted-foreground">
                  شروع قیمت از{" "}
                  <span className="text-base font-bold text-foreground">{formatToman(min)}</span>{" "}
                  تومان
                </p>
                <button
                  type="button"
                  onClick={() => onSelect(p.id)}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  مشاهده پلن‌ها
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
