import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { siteConfig, telegramLink } from "@/config";
import type { Product } from "@/lib/types";

/** پاک‌سازی ورودی کاربر برای جلوگیری از XSS */
function sanitize(value: string) {
  return value.replace(/[<>]/g, "").trim().slice(0, 1000);
}

/** فرم تماس — ارسال از طریق لینک تلگرام با پیام از پیش پر شده */
export function ContactSection({ products }: { products: Product[] }) {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = sanitize(String(data.get("name") ?? ""));
    const contact = sanitize(String(data.get("contact") ?? ""));
    const product = sanitize(String(data.get("product") ?? ""));
    const message = sanitize(String(data.get("message") ?? ""));

    if (!name || !contact || !message) {
      setStatus({ type: "error", message: "لطفاً نام، راه ارتباطی و متن پیام را کامل کنید." });
      return;
    }
    const isEmail = contact.includes("@");
    if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact)) {
      setStatus({ type: "error", message: "فرمت ایمیل واردشده معتبر نیست." });
      return;
    }

    const text = `سلام 👋\nنام: ${name}\nراه ارتباطی: ${contact}${product ? `\nمحصول: ${product}` : ""}\nپیام: ${message}`;
    window.open(telegramLink(text), "_blank", "noopener,noreferrer");
    setStatus({ type: "success", message: "پیام شما آماده ارسال در تلگرام شد. ممنون از تماس‌تان!" });
    form.reset();
  };

  return (
    <section id="contact" className="px-5 py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={onSubmit} noValidate className="glass-card reveal p-7">
          <h2>تماس و پشتیبانی</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            سوالی دارید؟ فرم زیر را پر کنید تا در تلگرام پاسخ‌تان را بدهیم.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              نام و نام خانوادگی
              <input
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </label>
            <label className="text-sm">
              ایمیل یا شماره تماس
              <input
                name="contact"
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </label>
          </div>

          <label className="mt-4 block text-sm">
            محصول مرتبط (اختیاری)
            <select
              name="product"
              className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-accent"
            >
              <option value="">انتخاب کنید…</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-4 block text-sm">
            پیام شما
            <textarea
              name="message"
              rows={4}
              required
              className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </label>

          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
          >
            <Send className="h-4 w-4 rtl-mirror" aria-hidden="true" />
            ارسال پیام
          </button>

          {status && (
            <p
              role="status"
              className={`mt-4 text-sm ${status.type === "success" ? "text-[color:var(--success)]" : "text-destructive"}`}
            >
              {status.message}
            </p>
          )}
        </form>

        <div className="glass-card reveal flex flex-col justify-center p-7 text-center" data-reveal-index={1}>
          <h3 className="text-lg">پشتیبانی ۲۴ ساعته</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            تیم ما هر روز هفته در تلگرام پاسخگوی شماست.
          </p>
          <a
            href={telegramLink(siteConfig.telegramPrefill)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            <Send className="h-5 w-5 rtl-mirror" aria-hidden="true" />
            گفتگو در تلگرام
          </a>
        </div>
      </div>
    </section>
  );
}
