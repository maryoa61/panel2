import { useState } from "react";
import { siteConfig } from "@/config";
import type { Product } from "@/lib/types";

const LEGAL = {
  terms: {
    title: "قوانین و مقررات",
    body: "استفاده از پنل‌ها به معنای پذیرش قوانین سرویس است. بازگشت وجه تا ۷ روز پس از خرید و در صورت عدم استفاده از سرویس امکان‌پذیر است. سوءاستفاده از پنل برای فعالیت‌های غیرقانونی موجب قطع سرویس بدون بازگشت وجه می‌شود.",
  },
  privacy: {
    title: "حریم خصوصی",
    body: "اطلاعات شما تنها برای ارائه سرویس و پشتیبانی استفاده می‌شود، به‌صورت رمزنگاری‌شده نگهداری می‌شود و در اختیار هیچ شخص ثالثی قرار نمی‌گیرد.",
  },
};

/** فوتر — لینک‌های سریع محصولات از products.json و مودال‌های قوانین */
export function Footer({ products, onSelect }: { products: Product[]; onSelect: (id: string) => void }) {
  const [modal, setModal] = useState<null | keyof typeof LEGAL>(null);

  return (
    <footer className="border-t border-border px-5 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold glow-text">{siteConfig.brand}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            سازنده پنل‌های مدیریت اختصاصی برای کسب‌وکارهای ایرانی.
          </p>
        </div>

        <nav aria-label="محصولات">
          <h2 className="text-sm font-bold">محصولات</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {products.map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => onSelect(p.id)} className="hover:text-foreground">
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="لینک‌های مفید">
          <h2 className="text-sm font-bold">لینک‌ها</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <button type="button" onClick={() => setModal("terms")} className="hover:text-foreground">
                قوانین و مقررات
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setModal("privacy")} className="hover:text-foreground">
                حریم خصوصی
              </button>
            </li>
            {siteConfig.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold">روش‌های پرداخت</h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {["شتاب", "زرین‌پال", "USDT (TRC20)", "بیت‌کوین"].map((m) => (
              <span key={m} className="rounded-lg border border-border px-3 py-1.5">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.brand} — تمامی حقوق محفوظ است.
      </p>

      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={LEGAL[modal].title}
          className="fixed inset-0 z-[60] grid place-items-center bg-background/80 p-5 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div className="glass-card max-w-lg p-7" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold">{LEGAL[modal].title}</h2>
            <p className="mt-4 text-sm text-muted-foreground">{LEGAL[modal].body}</p>
            <button
              type="button"
              onClick={() => setModal(null)}
              className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
