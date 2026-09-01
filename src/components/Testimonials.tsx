import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

/** نظرات مشتریان — گرید در دسکتاپ، اسلایدر ساده در موبایل */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const current = items[index];

  const go = (dir: number) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <section id="testimonials" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2>نظر مشتریان</h2>
          <p className="mt-3 text-muted-foreground">تجربه کسانی که با پنل‌های ما کار می‌کنند.</p>
        </div>

        {/* دسکتاپ و تبلت */}
        <div className="mt-12 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Card key={t.name} item={t} index={i % 3} />
          ))}
        </div>

        {/* موبایل: اسلایدر */}
        <div className="mt-10 sm:hidden">
          {current && <Card item={current} index={0} />}
          <div className="mt-4 flex justify-center gap-3">
            <button
              type="button"
              aria-label="نظر قبلی"
              onClick={() => go(-1)}
              className="glass-card grid h-10 w-10 place-items-center"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="نظر بعدی"
              onClick={() => go(1)}
              className="glass-card grid h-10 w-10 place-items-center"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ item, index }: { item: Testimonial; index: number }) {
  return (
    <article className="glass-card glass-hover reveal p-6" data-reveal-index={index}>
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/25 font-bold">
          {item.name.charAt(0)}
        </span>
        <div>
          <h3 className="text-sm">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{item.title}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-1" aria-label={`امتیاز ${item.rating} از ۵`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < item.rating ? "fill-accent text-accent" : "text-muted-foreground"}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{item.text}</p>
      {item.relatedProduct && (
        <p className="mt-4 inline-block rounded-full border border-border px-3 py-1 text-xs text-accent">
          {item.relatedProduct}
        </p>
      )}
    </article>
  );
}
